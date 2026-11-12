// DRAFT: confirm roster, titles, years and phone numbers are current. The old site was last updated in 2022 and 2023.
// Bios are copied word for word from the state team pages on infinitypa.com. Tags come only from each agent's own bio.
// Matching uses place, transaction type, property type and language of service only (fair housing).

import type { StateCode } from "./markets";

export type Need =
  | "buying"
  | "selling"
  | "both"
  | "first-home"
  | "investment"
  | "luxury"
  | "commercial"
  | "new-construction"
  | "veteran";

export type Language = "english" | "greek" | "polish";

export type Agent = {
  slug: string;
  name: string;
  /** The name they go by, used in buttons: "Call Peg" */
  first: string;
  initials: string;
  state: StateCode;
  /** Title exactly as listed; null when the current site lists none */
  title: string | null;
  experience: string;
  cell: { display: string; e164: string } | null;
  email: string | null;
  photo: { src: string; w: number; h: number; alt: string; position: string } | null;
  needs: Need[];
  languages: Language[];
  areas: string[];
  /** Short, human chips from the bio, shown on cards */
  highlights: string[];
  quote: string | null;
  bio: string[];
  bioList?: { heading?: string; items: string[] };
  note?: string;
};

export const agents: Agent[] = [
  {
    slug: "peg-steich",
    name: "Peggy “Peg” Steich",
    first: "Peg",
    initials: "PS",
    state: "MD",
    title: "Licensed Agent MD",
    experience: "11.5+ years",
    cell: { display: "(301) 992-5145", e164: "+13019925145" },
    email: "peg.infinitymd@gmail.com",
    photo: null, // TODO: real headshot from Peg Steich
    needs: ["buying", "selling", "both", "investment"],
    languages: ["english"],
    areas: [],
    highlights: ["Rental owner", "11.5 years with a real estate attorney"],
    quote: "Your happiness and satisfaction is my number one goal!",
    bio: [
      "I am a licensed agent for the State of Maryland available to provide you with a one on one buying and selling experience.  Having worked for the past 11.5 years for a real estate attorney and owning several rental properties, I have experience in several facets of the real estate arena.  Being a mother and grandmother, I find it important for make the buying or selling process enjoyable and stress free for the entire family.  Your happiness and satisfaction is my number one goal!",
    ],
  },
  {
    slug: "fred-shibler",
    name: "Fred Shibler",
    first: "Fred",
    initials: "FS",
    state: "PA",
    title: "Licensed Agent PA",
    experience: "9+ years",
    cell: { display: "(717) 451-4169", e164: "+17174514169" },
    email: "fshibler@gmail.com",
    photo: null, // TODO: real headshot from Fred Shibler
    needs: ["buying", "selling"],
    languages: ["english"],
    areas: [],
    highlights: ["30 years in remodeling and repairs", "Spots home problems early"],
    quote: "If there are problems with the home you are trying to buy or sell, I can spot it right away.",
    bio: [
      "If you are looking for an agent who is not just trying to make another sale but one that wants to help you, as a client, to find a house you are happy and excited about, then you’re looking for me.",
      "I have 30 years in the home remodeling and repairs business and started selling real estate nine years ago. If there are problems with the home you are trying to buy or sell, I can spot it right away.",
      "Give me a call and show you how my experience can help you circumvent problems selling your home or help you find a new home without unforeseen problems.",
      "I truly want you to be happy with your purchase of a new home.",
    ],
  },
  {
    slug: "johnathan-luckenbaugh",
    name: "Johnathan Luckenbaugh",
    first: "Johnathan",
    initials: "JL",
    state: "PA",
    title: "Licensed Agent PA",
    experience: "21+ years",
    cell: { display: "(717) 521-7095", e164: "+17175217095" },
    email: "johnathanluck@gmail.com",
    photo: null, // TODO: real headshot from Johnathan Luckenbaugh
    needs: ["buying", "selling"],
    languages: ["english"],
    areas: [],
    highlights: ["21+ years licensed"],
    quote: null,
    bio: [],
    note: "Johnathan has not published a bio yet. Call or text him directly.", // DRAFT: ask Johnathan for a short bio
  },
  {
    slug: "brittany-gruver",
    name: "Brittany Gruver",
    first: "Brittany",
    initials: "BG",
    state: "PA",
    title: "Licensed Agent PA",
    experience: "19+ years",
    cell: { display: "(717) 659-3311", e164: "+17176593311" },
    email: "gruverb123@gmail.com",
    photo: null, // TODO: real headshot from Brittany Gruver
    needs: ["buying", "selling"],
    languages: ["english"],
    areas: [],
    highlights: ["19+ years licensed"],
    quote: null,
    bio: [],
    note: "Brittany has not published a bio yet. Call or text her directly.", // DRAFT: ask Brittany for a short bio
  },
  {
    slug: "joe-geeting",
    name: "Joe Geeting",
    first: "Joe",
    initials: "JG",
    state: "PA",
    title: "Licensed Agent PA",
    experience: "7 years",
    cell: { display: "(717) 891-7234", e164: "+17178917234" },
    email: "joe@infinitypa.com",
    photo: {
      src: "/images/09-agent-PA-joe-geeting.webp",
      w: 760,
      h: 669,
      alt: "Joe Geeting, Pennsylvania real estate agent, in a light shirt in front of a stone wall",
      position: "50% 30%",
    },
    needs: ["buying", "selling", "commercial"],
    languages: ["english"],
    areas: [],
    highlights: ["Residential and commercial", "Sales and leasing"],
    quote: "I am results oriented and place a high value on communication and transparency.",
    bio: [],
    // Joe published his bio as a list. Shown exactly as written, one line per item.
    bioList: {
      items: [
        "I'm a father of two",
        "I've owned 3 restaurants and a car dealership",
        "I have experience in both residential and commercial real estate sales and leasing",
        "I am results oriented and place a high value on communication and transparency",
        "I love being on the water and am an avid boater",
        "I drink my coffee black",
        "I like long walks on the beach",
      ],
    },
  },
  {
    slug: "breanna-freeburg-smith",
    name: "Breanna Freeburg-Smith",
    first: "Breanna",
    initials: "BF",
    state: "IL",
    title: "Licensed Broker/Agent",
    experience: "11 years",
    cell: { display: "(630) 621-7384", e164: "+16306217384" },
    email: "breanna@infinityil.com",
    photo: {
      src: "/images/06-agent-IL-breanna-freeburg-smith.webp",
      w: 350,
      h: 525,
      alt: "Breanna Freeburg-Smith, Illinois real estate broker, hugging her horse outdoors",
      position: "40% 35%",
    },
    needs: ["buying", "selling", "new-construction", "investment"],
    languages: ["english"],
    areas: [],
    highlights: ["New builds", "Foreclosures and short sales", "Rentals"],
    quote: "I am simply a call, text, or email away.",
    bio: [
      "I have been in the Real Estate industry for eleven years, working in traditional sales, foreclosures, short sales, new builds, and rentals. My experience can help translate the complex world of real estate and make you comfortable every step of the way. I uphold the highest standards for my relationships with my clients and take pride in being honest and knowledgeable so that I can make you a well-informed Buyer and Seller. After all, I love what I do! I am simply a call, text, or email away. I will be there assisting you before you make the big decision, during the process, and after you’ve become a homeowner.",
      "When I am not working, I enjoy taking my dogs out to explore various forest preserves. I also leisurely and competitively ride English and Western on my six-year-old Thoroughbred. Look out for me on a trail ride through the Cook County trail system or the local county fairs! My husband and I love to cook together and also go boating on Lake Michigan.",
    ],
  },
  {
    slug: "dina-valencia",
    name: "Dina Valencia",
    first: "Dina",
    initials: "DV",
    state: "IL",
    // DRAFT: Dina's bio says "eight years" (licensed since 2012); her card says 11 years. Showing the card figure. Confirm.
    title: "Licensed Broker/Agent",
    experience: "11 years",
    cell: { display: "(312) 646-8003", e164: "+13126468003" },
    email: "dina@infinityil.com",
    photo: {
      src: "/images/07-agent-IL-dina-valencia.webp",
      w: 350,
      h: 457,
      alt: "Dina Valencia, Illinois real estate broker, portrait on white",
      position: "50% 30%",
    },
    needs: ["buying", "selling"],
    languages: ["english", "greek"],
    areas: ["Chicagoland"],
    highlights: ["Fluent in Greek", "Built on referrals"],
    quote: "My success is based almost exclusively on positive referrals.",
    // DRAFT: the sentence "As a licensed real estate broker since 2012, I have dedicated eight years..." is left off until the years are confirmed.
    bio: [
      "When I am not assisting my real estate clients, I enjoy spending time with family. I am Fluent in English and Greek. My success is based almost exclusively on positive referrals with an extensive professional background in sales and management. I strive to provide excellent customer service, commitment to work hard, listen to details, and follow-through. As a devoted broker, my top priority is my client. I aim to achieve the best outcome in every transaction and ensure the home buying or selling process is effortless and stress-free. As a client, you will benefit from my in-depth knowledge of the local housing market and my altruistic approach to business.",
      "I look forward to helping you achieve your real estate goals.",
    ],
    bioList: {
      heading: "Fun Facts about Dina.",
      items: [
        "Entrepreneur",
        "Multitasker",
        "Team Player",
        "Motivated",
        "I Love Fast Cars!",
        "100% Greek to the Core! Parents Names Are Nick and Toula, Just Like in the Movie.",
        "Into Philosophy",
        "I Love Shopping",
        "Love to Read and Learn New Things",
        "Always Up for a Challenge",
      ],
    },
  },
  {
    slug: "sylwia-baker",
    name: "Sylwia Baker",
    first: "Sylwia",
    initials: "SB",
    state: "IL",
    // DRAFT: Sylwia's bio says licensed since 2014; her card says 9 years. Showing the card figure. Confirm.
    title: "Licensed Broker",
    experience: "9 years",
    cell: { display: "(815) 909-6549", e164: "+18159096549" },
    email: "Sylwia@infinityil.com",
    photo: {
      src: "/images/08-agent-IL-sylwia-baker.webp",
      w: 373,
      h: 608,
      alt: "Sylwia Baker, Illinois real estate broker, platinum hair and black turtleneck on a dark backdrop",
      position: "50% 25%",
    },
    needs: ["buying", "selling", "first-home", "luxury", "investment"],
    languages: ["english", "polish"],
    areas: [],
    highlights: ["Fluent in Polish", "First-time buyers", "Distressed property", "Luxury"],
    quote: "My business is built on dedication, communication, determination, and trust.",
    bio: [
      "Sylwia is originally from Krasnik, Poland. Her name is pronounced Sylvia.",
      // DRAFT: opening clause "As a licensed agent since 2014," left off until the years are confirmed.
      "My business is built on dedication, communication, determination, and trust.",
      "I am committed to listening and understanding my clients' needs and wants and utilizing my negotiation skills to ensure a successful transaction. I specialize in all areas of the Real Estate business, whether it be navigating the way for first-time buyers, trying to score that perfect distressed property, or providing help in the luxury market. Away from Real Estate, I love spending time with friends and family. I enjoy traveling and have new experiences. I’m fluent in English and Polish.",
    ],
  },
  {
    slug: "ellie-plante",
    name: "Ellen (Ellie) Plante",
    first: "Ellie",
    initials: "EP",
    state: "NV",
    title: "Associate Broker, CRS, GRI",
    experience: "Your Luxury Home Advisor",
    cell: { display: "(435) 229-9096", e164: "+14352299096" },
    email: "eplante6@yahoo.com",
    photo: {
      src: "/images/01-agent-NV-ellen-plante-BEST.webp",
      w: 1200,
      h: 1286,
      alt: "Ellen Plante, Nevada associate broker, smiling in a white blouse on a dark studio backdrop",
      position: "50% 22%",
    },
    needs: ["buying", "selling", "luxury", "investment"],
    languages: ["english"],
    areas: ["Lake Las Vegas", "Henderson", "Boulder City"],
    highlights: ["Luxury", "Relocation", "Investors", "Tenacious negotiator"],
    quote: "Known in the industry as a “tenacious negotiator.”",
    // DRAFT: three sentences claiming "top 1%" and "top performing" are left off. The site makes no ranking claims.
    bio: [
      "Ellen (Ellie) Plante has built a strong client following in Southern Nevada’s real estate industry. You’ll see her all over the valley, and she especially enjoys serving the areas of Lake Las Vegas, Henderson, and Boulder City. With her reputation for being one of the hardest-working, committed professionals, Ellie believes that there is nothing she cannot do when it comes to serving her buyers’ and sellers’ highest aspirations, and her clients feel the same. As soon as a home is put on the market, or she understands what her buyers are looking for, Ellie is on the ground running to work out the best marketing strategies and locate the perfect home. A natural disposition for connecting with people from all walks of life, Ellie loves to work with investors, seniors, and families who are relocating from in or out of state.",
      "Ellie began her real estate career in 2002, and with her strong business background, she dove right into the ownership of a franchise in Utah representing a national brand. After five years, she moved on to become a broker for an established global luxury brand, opening one of its Utah branches. Known in the industry as a “tenacious negotiator,” Ellie believes that the work of real estate is not for the timid or the fainthearted. No two houses are identical, so if her buyers see a home they’re interested in, she tells them that hesitation and procrastination are not an option.",
      "Giving 110% in everything she does, Ellie excels at most everything outside of real estate as well. She went from a 36 handicap in her golf game to a 16 in one year, later reaching a 9. She is a 4.0 tennis player, and just recently began playing pickleball, winning the silver in the Huntsman Senior Tournaments averaging 4.5 as a player. She and her husband, Bill, a Firefighter and Paramedic for the city of Las Vegas since 2001, both enjoy heading out for a relaxing boating excursion on Lake Mead.",
      "Real Estate is a “People Business” so unless you really enjoy talking in person and on the phone with dozens of people every day, this is not the career for you. We’re not always lucky enough in life to find the perfect career that complements and enhances our personality and character, but there is truly no other career that I could have embraced that would have utilized all of my skills and talents that I have been blessed with. With Real Estate, I’m not working hard for some faceless corporation, I’m working for real people whom I can talk to, laugh with and share the joy of happiness when they finally move into their Dream Home.",
    ],
  },
  {
    slug: "jenny-lynn-johnston",
    name: "Jenny Lynn Johnston",
    first: "Jenny",
    initials: "JJ",
    state: "NV",
    title: null, // not listed on the current site
    experience: "6 years",
    cell: { display: "(702) 769-7309", e164: "+17027697309" },
    email: "jljsellslv@gmail.com",
    photo: {
      src: "/images/02-agent-NV-jenny-lynn-johnston.webp",
      w: 1007,
      h: 1057,
      alt: "Jenny Lynn Johnston, Nevada real estate agent, in a black leather jacket and Realtor t-shirt",
      position: "55% 25%",
    },
    needs: ["buying", "selling", "investment", "veteran"],
    languages: ["english"],
    areas: ["Henderson", "Las Vegas Valley"],
    highlights: ["Veterans", "High-rise condos", "All price ranges"],
    quote: "Her intimate knowledge of this region... gives her the enthusiasm and desire to make her home, your home.",
    bio: [
      "For nearly twenty years, Jenny has raised her family in the Henderson and Las Vegas Valley and is a local expert in all things that this community has to offer.  Her intimate knowledge of this region and experiences of living here for so many years, gives her the enthusiasm and desire to make her home, your home.",
      "Jenny has sold homes in all price ranges from starter homes and multi million dollar estates to high rise condominiums and investment properties.  Her business is based on more than 80 percent referrals from satisfied clients.  Most importantly, she provides the most excellent customer service to buyers and sellers in order to earn their trust, referrals and repeat business.  Jenny is also a certified Veterans Association Representative and loves working with our nation's veterans and active-duty members and their families.",
      "Clients appreciate her flexibility, low pressure sales, patience, ability to listen and hear what her clients want, negotiation skills, and her ability to accurately price and market a home.",
    ],
  },
  {
    slug: "teresa-gallegos",
    name: "Teresa Gallegos",
    first: "Teresa",
    initials: "TG",
    state: "NV",
    title: "Broker-salesperson",
    experience: "8 years",
    cell: { display: "(702) 528-0173", e164: "+17025280173" },
    email: "teresa@infinitynv.com",
    photo: {
      src: "/images/03-agent-NV-teresa-gallegos.webp",
      w: 325,
      h: 487,
      alt: "Teresa Gallegos, Nevada broker-salesperson, in a black blouse with arms crossed",
      position: "50% 20%",
    },
    needs: ["buying", "selling", "both", "first-home"],
    languages: ["english"],
    areas: ["Las Vegas", "Henderson"],
    highlights: ["Move-up buyers", "First-time buyers", "Las Vegas native"],
    quote: "Teresa’s specialty is the move-up buyer.",
    bio: [
      "Teresa Gallegos has been a broker-salesperson serving the Las Vegas & Henderson areas for over 8 years.  Teresa is a native of this city & has enjoyed watching it grow over the decades.  She is passionate about serving her community with buying and selling real estate.  Teresa’s goal is to help as many families as possible, become home owners and finds joy in handing over the keys for the first time to clients.  Teresa’s specialty is the move-up buyer where she is able to make the process smooth and painless when clients want to sell their current home and trade up to their dream home.",
    ],
  },
  {
    slug: "shannon-davis",
    name: "Shannon Davis",
    first: "Shannon",
    initials: "SD",
    state: "NV",
    title: null, // not listed on the current site
    experience: "3 years",
    cell: { display: "(702) 327-6913", e164: "+17023276913" },
    email: "Shannon@infinitynv.com",
    photo: {
      src: "/images/04-agent-NV-shannon-davis.webp",
      w: 797,
      h: 926,
      alt: "Shannon Davis, Nevada real estate agent, in a navy blazer by a city window",
      position: "50% 25%",
    },
    needs: ["buying", "selling"],
    languages: ["english"],
    areas: ["Las Vegas", "Las Vegas Valley"],
    highlights: ["35 years calling Las Vegas home"],
    quote: "My extensive knowledge of the Las Vegas Valley and its neighborhoods...",
    bio: [
      "With nearly 35 years of calling Las Vegas home, I have a deep-rooted connection to this vibrant city and its surrounding areas. I've proudly served as a licensed realtor for over 3 years, and during this time, I've had the privilege of helping countless clients find their dream homes. My extensive knowledge of the Las Vegas Valley and its neighborhoods, coupled with a genuine passion for assisting others, makes me your ideal partner in the real estate journey.",
    ],
  },
  {
    slug: "victoria-ledon-knapik",
    name: "Victoria Ledon-Knapik",
    first: "Victoria",
    initials: "VK",
    state: "NV",
    title: null, // not listed on the current site
    experience: "Not listed",
    cell: null, // DRAFT: Victoria's phone is not published. Calls and texts route to the main line.
    email: null, // DRAFT: Victoria's email is not published.
    // TODO: a better headshot from Victoria Ledon-Knapik (current one is phone-screenshot quality; shown small only)
    photo: {
      src: "/images/05-agent-NV-victoria-ledon-knapik.webp",
      w: 749,
      h: 1080,
      alt: "Victoria Ledon-Knapik, Nevada real estate agent, in a black top in front of lavender flowers",
      position: "50% 22%",
    },
    needs: ["buying", "selling"],
    languages: ["english"],
    areas: ["Las Vegas"],
    highlights: ["Born and raised in Las Vegas", "Family in real estate 20 years"],
    quote: "My family has been in Real Estate for the last 20 years in the Vegas community.",
    bio: [
      "My name is Victoria Ledon-Knapik. I'm born and raised in Las Vegas. My family came from Cuba. I went to Bishop Gorman Highschool and UNLV for college. Happily married to my husband, JR, and we have two amazing children and two pups. My family has been in Real Estate for the last 20 years in the Vegas community and I love the industry. In my free time I love to cook and escape the Vegas heat in San Diego!",
    ],
  },
];

// DRAFT: recount once the roster is confirmed.
export const AGENT_COUNT = agents.length;

export const agentBySlug = (slug: string) => agents.find((a) => a.slug === slug);
export const agentsInState = (state: StateCode) => agents.filter((a) => a.state === state);
