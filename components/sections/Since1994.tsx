import { markets } from "@/lib/markets";

const VALUES = [
  "Authentic, conscientious, and thorough representation.",
  "Our communication is always clear.",
  "Each client is treated as an individual.",
];

// Narrow centred timeline. No dates per state: none are published.
export function Since1994() {
  return (
    <section id="about" aria-labelledby="about-title" className="section scroll-mt-20">
      <div className="wrap">
        <div className="mx-auto max-w-xl text-center">
          <p className="label text-muted">About Infinity</p>
          <h2 id="about-title" className="mt-3 text-[2.5rem] md:text-[3.5rem]">
            Since 1994.
          </h2>
        </div>

        <ol className="relative mx-auto mt-12 max-w-xl text-center">
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-1/2 w-px -translate-x-1/2 bg-slate" />
          <li className="relative pb-10">
            <span aria-hidden="true" className="relative mx-auto block h-4 w-4 rounded-full border-2 border-ink bg-ink" />
            <p className="font-display relative mt-3 inline-block bg-paper px-3 text-[1.625rem] leading-snug font-semibold text-ink md:text-[1.875rem]">
              Established in 1994 in Nevada.
            </p>
          </li>
          <li className="relative pb-10">
            <span aria-hidden="true" className="relative mx-auto block h-4 w-4 rounded-full border-2 border-ink bg-paper" />
            <p className="font-display relative mt-3 inline-block bg-paper px-3 text-[1.375rem] leading-snug font-semibold text-ink md:text-[1.5rem]">
              Later expanded elsewhere in the country.
            </p>
          </li>
          {/* DRAFT: ask the owner the year each state opened */}
          <li className="relative">
            <ul className="relative grid grid-cols-2 gap-3 sm:grid-cols-4">
              {(["PA", "IL", "NV", "MD"] as const).map((code) => {
                const m = markets.find((x) => x.code === code)!;
                return (
                  <li key={code} className="sheet px-3 py-4">
                    <span aria-hidden="true" className="mx-auto block h-2.5 w-2.5 rotate-45 border border-ink bg-plat" />
                    <p className="mt-2 font-medium text-ink">{m.name}</p>
                    <p className="mt-0.5 text-[0.8125rem] leading-snug text-muted">{m.serviceArea}</p>
                  </li>
                );
              })}
            </ul>
          </li>
        </ol>

        <ul className="mt-20 grid gap-8 border-t border-rule pt-10 md:grid-cols-3 md:gap-10">
          {VALUES.map((v) => (
            <li key={v}>
              <p className="font-display text-[1.5rem] leading-snug text-ink md:text-[1.625rem]">{v}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
