// Sample reviews only. No ratings, no counts, no real-looking names, and no review schema.
// DRAFT: replace with real Google or Zillow reviews.
const SAMPLES = [
  {
    text: "We were selling one house and buying the next at the same time. One agent handled both, and the dates lined up.",
    who: "Sample client, Nevada",
  },
  {
    text: "Every question got a straight answer, usually the same day. We always knew what was happening next.",
    who: "Sample client, Pennsylvania",
  },
  {
    text: "Our agent spotted a problem with the house before we made an offer. That saved us a lot of trouble.",
    who: "Sample client, Illinois",
  },
];

export function Reviews() {
  return (
    <section aria-labelledby="reviews-title" className="section">
      <div className="wrap">
        <p className="label text-muted">Clients</p>
        <h2 id="reviews-title" className="mt-3 text-[2.5rem] md:text-[3.5rem]">
          What clients say.
        </h2>
        <ul className="mt-12 grid max-w-2xl gap-8 lg:max-w-none lg:grid-cols-3 lg:gap-6">
          {SAMPLES.map((s, i) => (
            <li key={i} className={`sheet flex flex-col p-6 md:p-7 ${i === 1 ? "lg:mt-10" : ""}`}>
              <p className="label inline-block self-start rounded-[4px] border border-dashed border-muted px-2 py-1 text-[0.75rem] tracking-[0.08em] text-muted">
                Sample review: replace with real Google or Zillow reviews
              </p>
              <blockquote className="font-display mt-5 flex-1 text-[1.25rem] leading-snug text-ink">
                &ldquo;{s.text}&rdquo;
              </blockquote>
              <p className="mt-6 text-[0.9375rem] text-muted">{s.who}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
