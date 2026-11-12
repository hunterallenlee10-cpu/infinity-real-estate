import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Nav animateMark />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
      </main>
      <Footer />
    </>
  );
}
