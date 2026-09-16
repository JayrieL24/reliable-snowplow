import type { FaqItem } from "@/components/ui/faq-section";

/* Content shared by the home page and the Refer a Customer page. Everything here comes
   from the client's changelist unless marked as a draft. */

export const RELIABLE_PHONE = { label: "330-467-7273", href: "tel:+13304677273" };

export type Sector = {
  name: string;
  slug: string;
  /** Finishes "Refer a …", e.g. "medical property". */
  cta: string;
  detail: string;
  why: string;
  services: string[];
  /** Full-bleed photo, 1080×1440, for large stages. */
  image: string;
  /** The same photo at carousel-card size, so the deck doesn't pull 1.8 MB of stage art. */
  card: string;
  /** object-position for narrow photo columns, set so the crew or equipment stays in frame. */
  focus: string;
};

/* Sector names and examples come from the client's outline (Commercial Image Showcasing).
   DRAFT — needs client review: every `why` line and `services` pick is our wording. Photos
   are generated winter scenes illustrating each property type. */
export const SECTORS: Sector[] = [
  {
    name: "Medical",
    slug: "medical",
    cta: "medical property",
    detail: "Hospitals and medical campuses, where safe surfaces are critical.",
    why: "Patients, staff and emergency vehicles arrive around the clock, so entrances, walkways and parking have to stay clear through the whole storm.",
    services: ["Snow plowing", "Sidewalk de-icing", "Liquid de-icing"],
    image: "/images/sectors/medical-snow.webp",
    card: "/images/sectors/cards/medical-snow.webp",
    focus: "50% 60%",
  },
  {
    name: "Distribution",
    slug: "distribution",
    cta: "distribution site",
    detail: "Distribution centers and warehouse lots.",
    why: "Trucks run on a schedule. Docks, truck courts and employee lots need to stay open from one shift to the next.",
    services: ["Snow plowing", "Lot de-icing / salting", "Snow evacuations"],
    image: "/images/sectors/distribution-snow.webp",
    card: "/images/sectors/cards/distribution-snow.webp",
    focus: "50% 50%",
  },
  {
    name: "Retail",
    slug: "retail",
    cta: "retail property",
    detail: "Malls, strip centers and lifestyle centers.",
    why: "Shoppers judge a store from the parking lot. Clear lots and sidewalks before opening keep doors open and slip risks down.",
    services: ["Snow plowing", "Sidewalk shoveling", "Lot de-icing / salting"],
    image: "/images/sectors/retail-snow.webp",
    card: "/images/sectors/cards/retail-snow.webp",
    focus: "50% 50%",
  },
  {
    name: "Transportation",
    slug: "transportation",
    cta: "terminal or yard",
    detail: "Trucking terminals and intermodal yards.",
    why: "Terminals work early and late. Yards and lanes need to stay passable for drivers and equipment at every hour.",
    services: ["Snow plowing", "Lot de-icing / salting", "Snow evacuations"],
    image: "/images/sectors/transportation-snow.webp",
    card: "/images/sectors/cards/transportation-snow.webp",
    focus: "50% 50%",
  },
  {
    name: "Airports",
    slug: "airports",
    cta: "airport property",
    detail: "Airport parking, roadways and walkways.",
    why: "Travelers and staff move on tight timelines, so parking, pickup roadways and walkways have to stay safe and open.",
    services: ["Snow plowing", "Liquid de-icing", "Sidewalk de-icing"],
    image: "/images/sectors/airports-snow.webp",
    card: "/images/sectors/cards/airports-snow.webp",
    focus: "50% 50%",
  },
  {
    name: "Class A office",
    slug: "class-a-office",
    cta: "office property",
    detail: "Class A office buildings and corporate campuses.",
    why: "Tenants expect a clean arrival: garages, entrances and walkways ready before the workday starts.",
    services: ["Snow plowing", "Sidewalk shoveling", "Sidewalk de-icing"],
    image: "/images/sectors/class-a-office-snow.webp",
    card: "/images/sectors/cards/class-a-office-snow.webp",
    focus: "50% 50%",
  },
  {
    name: "Entire portfolios",
    slug: "portfolio",
    cta: "portfolio",
    detail: "Every site in a portfolio, with one service partner.",
    why: "One partner and one standard across every site, backed by 50 satellite locations throughout Ohio.",
    services: ["Managed services", "Snow plowing", "Lot de-icing / salting"],
    image: "/images/sectors/portfolio-snow.webp",
    card: "/images/sectors/cards/portfolio-snow.webp",
    focus: "50% 50%",
  },
];

/** "a" or "an" for a sector's CTA noun. */
export const article = (noun: string) => (/^[aeiou]/i.test(noun) ? "an" : "a");

/* Referral terms from the client's outline (Refer a Customer page: fee structure, eligibility,
   service limitations; Referral Process Overview). The fee is shown separately. */
export const CUSTOMER_FACTS = [
  { term: "Eligibility", text: "Committed to high service standards, and the lot is salted when plowed." },
  { term: "Best fit", text: "Walmart-size lots or larger, with dedicated equipment and crews living within 15 minutes." },
  { term: "Follow-up", text: "An automatic confirmation, then contact within one business day." },
];

/* Home-page FAQ: the program as a whole, both sides of it, so the customer-specific set
   stays on the Refer a Customer page. Answers only use facts from the changelist; the
   figures match CUSTOMER_FAQS and WORKER_FAQS.
   DRAFT — needs client review, in particular when the customer fee is actually paid. */
export const GENERAL_FAQS: FaqItem[] = [
  {
    id: "who",
    q: "Who can I refer?",
    a: "Two kinds of referral. A commercial property that needs snow and ice service: medical campuses, distribution centers, retail, trucking terminals and intermodal yards, airports, Class A office space or an entire portfolio. Or a snow fighter looking for winter work.",
  },
  {
    id: "earn",
    q: "What do I earn for a referral?",
    a: "For a commercial customer, a 5% referral fee for each entity you refer, up to $3,000 per commercial referral. For a worker, $1 for every hour they work, for as long as they keep working.",
  },
  {
    id: "how",
    q: "How do I make a referral?",
    a: "Use the customer or worker form and share their name, how to reach them and a little about the property or the person. It takes about two minutes, and you get an automatic reply confirming it arrived.",
  },
  {
    id: "after",
    q: "What happens after I refer someone?",
    a: "You get the automatic confirmation, then a short PDF, 2 to 5 pages, explaining how the program works. The team contacts you within one business day and takes it from there.",
  },
  {
    id: "areas",
    q: "Where does Reliable work?",
    a: "All of Ohio, from 50 satellite locations, so crews are never more than 15 minutes from the properties they protect, and snow fighters work within 15 minutes of home.",
  },
  {
    id: "fit",
    q: "What makes a good commercial referral?",
    a: "Lots the size of a Walmart or larger, where Reliable can assign dedicated equipment and crews living within 15 minutes of the site. Customers should be committed to high service standards and have the lot salted when it's plowed. There is limited availability for route work at smaller sites.",
  },
  {
    id: "experience",
    q: "Do the workers I refer need experience?",
    a: "Not always. Some positions need no experience, like sidewalk shoveling, and others do, like wheel loader operator or foreman. Every position is paid the next day after the work is done.",
  },
];

/* The client's "Top Ten Questions for Customers" (seven listed). Answers only use facts from
   the changelist, plus the service-area counties listed on reliablesnowplowing.net.
   DRAFT — needs client review, especially "payment" (the changelist gives the fee but not
   when it's paid) and "family-owned" (our wording). */
export const CUSTOMER_FAQS: FaqItem[] = [
  {
    id: "benefits",
    q: "What are the benefits of working with Reliable?",
    a: "Reliable is a family-owned company with 40 years of experience and a proven Autopilot system. Crews are never more than 15 minutes away, working from 50 satellite locations throughout Ohio, and safety comes first. We make it easy for our customers.",
  },
  {
    id: "customers",
    q: "What type of customers are you seeking?",
    a: "Commercial properties: medical campuses, distribution centers, retail, transportation (trucking terminals and intermodal yards), airports, Class A office space and entire portfolios. Eligible customers are committed to high service standards and have the lot salted when it's plowed.",
  },
  {
    id: "route-work",
    q: "Why is there limited availability for route work with smaller customers?",
    a: "Reliable focuses on larger sites, lots the size of a Walmart or bigger, where it can assign dedicated equipment and crews who live within 15 minutes of the property. That model leaves limited availability for route work serving smaller sites.",
  },
  {
    id: "areas",
    q: "What areas do you service?",
    a: "All of Ohio, from 50 satellite locations. That includes the Akron, Canton, Cleveland and Youngstown areas and Ashtabula, Cuyahoga, Erie, Geauga, Lake, Lorain, Lucas, Mahoning, Medina, Portage, Richland, Sandusky, Seneca, Stark, Summit, Trumbull, Wayne and Wood counties.",
  },
  {
    id: "update",
    q: "When can I expect an update after a referral?",
    a: "Right away you'll get an automatic reply confirming your referral arrived, followed by a short PDF (2 to 5 pages) with the program details. The team contacts you within one business day.",
  },
  {
    id: "payment",
    q: "When will I receive payment?",
    a: "Commercial referrals earn a 5% referral fee for each entity, up to $3,000 per referral. The program details PDF you receive after referring explains when the fee is paid.",
  },
  {
    id: "family-owned",
    q: "What advantages does working with a family-owned company have over private equity firms?",
    a: "Reliable has been family owned for 40 years. The family that runs the company is the one making the commitment to unbeatable service, and it has built that service across Ohio for four decades rather than for a quick sale.",
  },
];

/* Services named on reliablesnowplowing.net. */
export const RELIABLE_SERVICES = ["Snow plowing", "Lot de-icing / salting", "Sidewalk shoveling", "Sidewalk de-icing", "Liquid de-icing", "Snow evacuations", "Managed services"];

/* Service area listed on reliablesnowplowing.net. */
export const SERVICE_AREA = {
  cities: ["Akron", "Canton", "Cleveland", "Youngstown"],
  counties: [
    "Ashtabula", "Cuyahoga", "Erie", "Geauga", "Lake", "Lorain", "Lucas", "Mahoning", "Medina",
    "Portage", "Richland", "Sandusky", "Seneca", "Stark", "Summit", "Trumbull", "Wayne", "Wood",
  ],
};
