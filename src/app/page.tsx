import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { Differentials } from "@/components/sections/Differentials";
import { Partners } from "@/components/sections/Partners";
import { Instagram } from "@/components/sections/Instagram";
import { Locations } from "@/components/sections/Locations";
import { UsefulLinks } from "@/components/sections/UsefulLinks";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Differentials />
      <Partners />
      <Instagram />
      <Locations />
      <UsefulLinks />
      <Contact />
    </>
  );
}
