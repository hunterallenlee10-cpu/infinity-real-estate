import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./sections/Footer";
import { JsonLd } from "./JsonLd";

export function Shell({ children, schema, animateMark = false }: { children: ReactNode; schema?: object; animateMark?: boolean }) {
  return (
    <>
      {schema && <JsonLd data={schema} />}
      <Nav animateMark={animateMark} />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
    </>
  );
}
