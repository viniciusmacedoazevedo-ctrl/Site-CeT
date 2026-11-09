"use client";

import { useEffect, useRef, useState } from "react";
import type { Map as MapLibreMap, StyleSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { Box, Compass, Loader2, LocateFixed, Pause, RotateCw } from "lucide-react";
import type { Unit } from "@/data/units";

/**
 * Mapa 3D interativo de uma unidade.
 *
 * Tecnologia: MapLibre GL JS (código aberto) + tiles vetoriais do
 * OpenFreeMap (dados OpenStreetMap). Não exige chave de API nem tem custo
 * por visualização. Os prédios em 3D são extrudados a partir da altura
 * cadastrada no OpenStreetMap; onde não houver altura, usa-se um valor
 * padrão baixo. Nenhuma construção é inventada: só aparecem prédios que
 * existem na base do OpenStreetMap.
 */

const STYLE_URL = process.env.NEXT_PUBLIC_MAP_STYLE_URL ?? "https://tiles.openfreemap.org/styles/positron";

const palette = {
  background: "#f3f6f8",
  water: "#c9e9f3",
  park: "#e5f0ea",
  residential: "#eef2f5",
  roadMinor: "#ffffff",
  roadMajor: "#ffffff",
  roadCasing: "#d6dfe7",
  buildingLow: "#dfe7ee",
  buildingHigh: "#9fb8cc",
  label: "#3d5468",
};

function brandStyle(style: StyleSpecification): StyleSpecification {
  const layers = style.layers
    .filter((l) => l.id !== "building" && l.id !== "natural_earth")
    .map((l) => {
      const layer = structuredClone(l) as typeof l & { paint?: Record<string, unknown> };
      layer.paint = { ...(layer.paint ?? {}) };
      if (l.id === "background") layer.paint["background-color"] = palette.background;
      if (l.id === "water") layer.paint["fill-color"] = palette.water;
      if (l.id === "park") layer.paint["fill-color"] = palette.park;
      if (l.id === "landuse_residential") layer.paint["fill-color"] = palette.residential;
      if (l.id === "highway_minor") layer.paint["line-color"] = palette.roadMinor;
      if (l.id.endsWith("_inner") && l.id.startsWith("highway")) layer.paint["line-color"] = palette.roadMajor;
      if (l.id.endsWith("_casing") && l.id.startsWith("highway")) layer.paint["line-color"] = palette.roadCasing;
      if (l.type === "symbol" && l.id.startsWith("highway-name")) layer.paint["text-color"] = palette.label;
      return layer;
    });

  const firstSymbol = layers.findIndex((l) => l.type === "symbol");
  const buildings = {
    id: "cet-buildings-3d",
    type: "fill-extrusion",
    source: "openmaptiles",
    "source-layer": "building",
    minzoom: 13,
    paint: {
      "fill-extrusion-color": [
        "interpolate", ["linear"], ["coalesce", ["get", "render_height"], 6],
        0, palette.buildingLow,
        40, "#c3d3e0",
        120, palette.buildingHigh,
      ],
      "fill-extrusion-height": ["interpolate", ["linear"], ["zoom"], 13, 0, 14.5, ["coalesce", ["get", "render_height"], 6]],
      "fill-extrusion-base": ["coalesce", ["get", "render_min_height"], 0],
      "fill-extrusion-opacity": 0.92,
      "fill-extrusion-vertical-gradient": true,
    },
  } as unknown as StyleSpecification["layers"][number];
  layers.splice(firstSymbol === -1 ? layers.length : firstSymbol, 0, buildings);
  return { ...style, layers };
}

function markerElement(unit: Unit) {
  const el = document.createElement("div");
  el.className = "cet-marker";
  el.setAttribute("role", "img");
  el.setAttribute("aria-label", `C&T Consultores — unidade ${unit.city}`);
  el.innerHTML = `
    <span class="cet-marker__pulse"></span>
    <span class="cet-marker__pin">
      <img src="/images/branding/icon-192.png" alt="" width="40" height="40" />
    </span>
    <span class="cet-marker__label">C&amp;T · ${unit.city}</span>`;
  return el;
}

type Status = "idle" | "loading" | "ready" | "error";

export function UnitMap({ unit, active }: { unit: Unit; active: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MapLibreMap | null>(null);
  const orbitRef = useRef<number | null>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [is3d, setIs3d] = useState(true);
  const [orbiting, setOrbiting] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  // Carrega somente quando a seção se aproxima da tela e a aba está ativa.
  useEffect(() => {
    if (!active || shouldLoad || !containerRef.current) return;
    const io = new IntersectionObserver((e) => e[0].isIntersecting && setShouldLoad(true), { rootMargin: "300px" });
    io.observe(containerRef.current);
    return () => io.disconnect();
  }, [active, shouldLoad]);

  useEffect(() => {
    if (!shouldLoad || mapRef.current || !containerRef.current) return;
    let cancelled = false;
    setStatus("loading");
    (async () => {
      try {
        const [maplibregl, styleRes] = await Promise.all([import("maplibre-gl"), fetch(STYLE_URL)]);
        if (!styleRes.ok) throw new Error("style");
        const style = brandStyle((await styleRes.json()) as StyleSpecification);
        if (cancelled || !containerRef.current) return;
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const map = new maplibregl.Map({
          container: containerRef.current,
          style,
          center: unit.coordinates,
          zoom: reduce ? unit.camera.zoom : 13.2,
          pitch: reduce ? unit.camera.pitch : 0,
          bearing: reduce ? unit.camera.bearing : 0,
          maxPitch: 75,
          minZoom: 11,
          maxZoom: 19.5,
          cooperativeGestures: true,
          attributionControl: { compact: true },
          locale: {
            "NavigationControl.ZoomIn": "Aproximar",
            "NavigationControl.ZoomOut": "Afastar",
            "NavigationControl.ResetBearing": "Apontar para o norte",
            "CooperativeGesturesHandler.WindowsHelpText": "Use Ctrl + rolagem para dar zoom no mapa",
            "CooperativeGesturesHandler.MacHelpText": "Use ⌘ + rolagem para dar zoom no mapa",
            "CooperativeGesturesHandler.MobileHelpText": "Use dois dedos para mover o mapa",
          },
        });
        mapRef.current = map;
        map.addControl(new maplibregl.NavigationControl({ visualizePitch: true }), "top-right");
        map.addControl(new maplibregl.FullscreenControl(), "top-right");
        new maplibregl.Marker({ element: markerElement(unit), anchor: "bottom" }).setLngLat(unit.coordinates).addTo(map);

        map.once("load", () => {
          if (cancelled) return;
          setStatus("ready");
          if (!reduce) {
            map.flyTo({ center: unit.coordinates, ...unit.camera, duration: 3200, essential: true, curve: 1.3 });
          }
        });
        map.on("error", (e) => {
          // Erros pontuais de tiles não derrubam o mapa; só tratamos falha antes do carregamento.
          if (!map.loaded() && !map.isStyleLoaded()) console.warn("Mapa:", e.error?.message);
        });
        map.on("dragstart", stopOrbit);
        map.on("mousedown", stopOrbit);
        map.on("touchstart", stopOrbit);
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [shouldLoad, unit]);

  // Libera o WebGL ao desmontar.
  useEffect(() => () => { stopOrbit(); mapRef.current?.remove(); mapRef.current = null; }, []);

  // Redimensiona quando a aba volta a ficar visível.
  useEffect(() => {
    if (active) requestAnimationFrame(() => mapRef.current?.resize());
    else stopOrbit();
  }, [active]);

  function stopOrbit() {
    if (orbitRef.current) cancelAnimationFrame(orbitRef.current);
    orbitRef.current = null;
    setOrbiting(false);
  }

  function toggleOrbit() {
    const map = mapRef.current;
    if (!map) return;
    if (orbitRef.current) return stopOrbit();
    setOrbiting(true);
    let last = performance.now();
    const step = (t: number) => {
      const dt = t - last;
      last = t;
      map.rotateTo((map.getBearing() + dt * 0.006) % 360, { duration: 0, around: unit.coordinates });
      orbitRef.current = requestAnimationFrame(step);
    };
    orbitRef.current = requestAnimationFrame(step);
  }

  function toggle3d() {
    const map = mapRef.current;
    if (!map) return;
    const next = !is3d;
    setIs3d(next);
    map.easeTo({ pitch: next ? unit.camera.pitch : 0, bearing: next ? unit.camera.bearing : 0, duration: 900 });
  }

  function recenter() {
    stopOrbit();
    setIs3d(true);
    mapRef.current?.flyTo({ center: unit.coordinates, ...unit.camera, duration: 1400, essential: true });
  }

  const controlBtn =
    "inline-flex items-center gap-1.5 rounded-full border border-line bg-white/95 px-3.5 py-2 text-xs font-semibold text-navy shadow-[var(--shadow-soft)] backdrop-blur transition hover:border-cyan hover:text-brand disabled:opacity-50";

  return (
    <div className="relative size-full overflow-hidden bg-[#eef3f7]">
      <div ref={containerRef} className="size-full" aria-label={`Mapa 3D interativo da unidade ${unit.city}`} role="application" />

      {status !== "ready" && (
        <div className="absolute inset-0 grid place-items-center">
          <div aria-hidden className="grid-paper absolute inset-0 opacity-70" />
          {status === "error" ? (
            <p className="relative max-w-xs rounded-xl bg-white p-4 text-center text-sm text-muted shadow-[var(--shadow-soft)]">
              Não foi possível carregar o mapa agora. Use os botões ao lado para abrir a localização no Google Maps.
            </p>
          ) : (
            <p className="relative inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-navy shadow-[var(--shadow-soft)]">
              <Loader2 className="size-4 animate-spin text-cyan" aria-hidden /> Carregando mapa 3D…
            </p>
          )}
        </div>
      )}

      <div className="absolute left-3 right-14 top-3 flex flex-wrap gap-2 sm:left-4 sm:top-4">
        <button type="button" className={controlBtn} onClick={toggle3d} disabled={status !== "ready"} aria-pressed={is3d}>
          <Box className="size-3.5" aria-hidden /> {is3d ? "Visão 2D" : "Visão 3D"}
        </button>
        <button type="button" className={controlBtn} onClick={toggleOrbit} disabled={status !== "ready"} aria-pressed={orbiting}>
          {orbiting ? <Pause className="size-3.5" aria-hidden /> : <RotateCw className="size-3.5" aria-hidden />}
          {orbiting ? "Parar giro" : "Girar"}
        </button>
        <button type="button" className={controlBtn} onClick={recenter} disabled={status !== "ready"}>
          <LocateFixed className="size-3.5" aria-hidden /> Centralizar
        </button>
      </div>
      <span className="absolute bottom-4 left-4 hidden items-center gap-1.5 rounded-full bg-navy/80 px-3 py-2 text-[0.68rem] font-medium text-white/90 backdrop-blur md:inline-flex">
          <Compass className="size-3.5" aria-hidden /> Arraste com o botão direito ou Ctrl para inclinar e girar
        </span>
    </div>
  );
}
