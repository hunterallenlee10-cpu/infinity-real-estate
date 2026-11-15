// "Who to ask for" lists on the Buy and Sell pages. Every line is taken from that agent's own published bio.
export type AskGroup = { label: string; agents: { slug: string; why: string }[] };

export const buyGroups: AskGroup[] = [
  {
    label: "Your first home",
    agents: [
      { slug: "teresa-gallegos", why: "Finds joy in handing over the keys for the first time." },
      { slug: "sylwia-baker", why: "Navigates the way for first-time buyers." },
    ],
  },
  {
    label: "Veterans and active duty",
    agents: [{ slug: "jenny-lynn-johnston", why: "A certified Veterans Association Representative." }],
  },
  {
    label: "Luxury homes",
    agents: [
      { slug: "ellie-plante", why: "Your Luxury Home Advisor. Known as a tenacious negotiator." },
      { slug: "sylwia-baker", why: "Provides help in the luxury market." },
    ],
  },
  {
    label: "New construction",
    agents: [{ slug: "breanna-freeburg-smith", why: "Eleven years across traditional sales, new builds and rentals." }],
  },
  {
    label: "Investment and rental property",
    agents: [
      { slug: "peg-steich", why: "Owns several rental properties herself." },
      { slug: "jenny-lynn-johnston", why: "Has sold high-rise condominiums and investment properties." },
      { slug: "ellie-plante", why: "Loves to work with investors." },
    ],
  },
  {
    label: "Relocating",
    agents: [{ slug: "ellie-plante", why: "Works with families relocating from in or out of state." }],
  },
  {
    label: "A second pair of eyes on the house",
    agents: [{ slug: "fred-shibler", why: "30 years in the home remodeling and repairs business." }],
  },
  {
    label: "Commercial property and leasing",
    agents: [{ slug: "joe-geeting", why: "Experience in both residential and commercial sales and leasing." }],
  },
  {
    label: "In Greek or Polish",
    agents: [
      { slug: "dina-valencia", why: "Fluent in English and Greek." },
      { slug: "sylwia-baker", why: "Fluent in English and Polish." },
    ],
  },
];

export const sellGroups: AskGroup[] = [
  {
    label: "Pricing and marketing",
    agents: [
      { slug: "jenny-lynn-johnston", why: "Clients appreciate her ability to accurately price and market a home." },
      { slug: "ellie-plante", why: "On the ground running to work out the best marketing strategies." },
    ],
  },
  {
    label: "Selling and buying at once",
    agents: [{ slug: "teresa-gallegos", why: "Her specialty is the move-up buyer: sell the current home and trade up." }],
  },
  {
    label: "Spotting problems before you list",
    agents: [{ slug: "fred-shibler", why: "30 years in remodeling and repairs. He can spot it right away." }],
  },
  {
    label: "Short sales and distressed property",
    agents: [
      { slug: "breanna-freeburg-smith", why: "Has worked in foreclosures and short sales." },
      { slug: "sylwia-baker", why: "Works with distressed property." },
    ],
  },
  {
    label: "Rental and investment property",
    agents: [
      { slug: "peg-steich", why: "Owns several rental properties and worked 11.5 years for a real estate attorney." },
      { slug: "breanna-freeburg-smith", why: "Works with rentals." },
    ],
  },
  {
    label: "Commercial sales and leasing",
    agents: [{ slug: "joe-geeting", why: "Experience in both residential and commercial sales and leasing." }],
  },
  {
    label: "Luxury homes",
    agents: [
      { slug: "ellie-plante", why: "Your Luxury Home Advisor." },
      { slug: "sylwia-baker", why: "Provides help in the luxury market." },
    ],
  },
];
