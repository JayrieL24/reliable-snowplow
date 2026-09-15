import type { FaqItem } from "@/components/ui/faq-section";

/* Content for the Refer a Worker page. Facts come from the client's changelist unless noted;
   positions and perks come from winterworkerswanted.com ("Snow Fighters Wanted"). */

export const SFU_PHONE = { label: "330-908-8080", href: "tel:+13309088080" };
export const WINTER_WORKERS_WANTED = "https://www.winterworkerswanted.com/";

export type Position = { title: string; slug: string; image: string; focus: string; perks: string[] };

/* The winter worker list, as published on winterworkerswanted.com. */
export const POSITIONS: Position[] = [
  { title: "Plow Subcontractor", slug: "plow-subcontractor", image: "/images/work/plow-subcontractor.png", focus: "8% 45%", perks: ["Pick-ups", "Dump trucks", "Loaders", "Skid steers"] },
  { title: "Sidewalk Shoveler", slug: "sidewalk-shoveler", image: "/images/work/sidewalk-shovelers.png", focus: "50% 55%", perks: ["Individuals or teams", "Pick-up or SUV with hitch", "Dependable vehicle"] },
  { title: "Compact Loader Operator", slug: "compact-loader-operator", image: "/images/work/compact-loader.png", focus: "50% 55%", perks: ["Enclosed loader with heat", "New low-hour machines", "Two-way radio"] },
  { title: "Skid-Steer Operator", slug: "skid-steer-operator", image: "/images/work/skid-steer.png", focus: "30% 70%", perks: ["Enclosed with heat", "New low-hour machines", "Two-way radio"] },
  { title: "Wheel Loader Operator", slug: "wheel-loader-operator", image: "/images/work/wheel-loader.png", focus: "50% 55%", perks: ["Experienced operators only", "Enclosed with heat", "New low-hour machines"] },
  { title: "Salt Truck Driver", slug: "salt-truck-driver", image: "/images/work/salt-truck.png", focus: "15% 60%", perks: ["3 & 5 ton trucks", "CDL not always needed", "GPS-equipped, newer fleet"] },
  { title: "Foreman", slug: "foreman", image: "/images/work/foreman.png", focus: "50% 45%", perks: ["Leadership role", "Experience needed", "Leadership workshops provided"] },
  { title: "Mechanic", slug: "mechanic", image: "/images/work/mechanics.png", focus: "50% 70%", perks: ["First & second shift", "Heated bays with lifts", "Parts stocked"] },
  { title: "Sidewalk Foreman", slug: "sidewalk-foreman", image: "/images/work/sidewalk-foreman.png", focus: "78% 30%", perks: ["Coordinate sidewalk teams", "Experience needed", "Leadership workshops provided"] },
  { title: "Utility Player", slug: "utility-player", image: "/images/work/utility-players.png", focus: "55% 60%", perks: ["Flexible or set hours", "Salt trucks & wheel loaders", "Light mechanical work"] },
  { title: "Dispatcher", slug: "dispatcher", image: "/images/work/dispatchers.png", focus: "50% 45%", perks: ["Can work from home", "Team environment", "Two-way radio"] },
];

/* Options from the client's form spec. */
export const HOW_KNOWN = ["Past worker", "Current worker", "Client", "Acquaintance"];

/* The client's "Top Questions for Workers". DRAFT — needs client review. Answers use the
   changelist and winterworkerswanted.com; "24/7 availability" and "second shift" aren't
   defined in either source, so those two answers are placeholders to confirm. */
export const WORKER_FAQS: FaqItem[] = [
  {
    id: "experience",
    q: "Do workers need previous experience?",
    a: "Not always. Reliable has a range of jobs: some require no experience, like sidewalk shoveling, and some require experience, like wheel loader operator and foreman.",
  },
  {
    id: "why-reliable",
    q: "Why would someone want to work at Reliable?",
    a: "Next day pay for all positions, work within 15 minutes of home from 50 satellite locations across Ohio, newer low-hour equipment, and a family-owned company with a 40-year track record.",
  },
  {
    id: "paid",
    q: "How do I get paid?",
    a: "Every position is paid the next day after the work is done. The team explains how pay is delivered when you're hired.",
  },
  {
    id: "availability",
    q: "Is 24/7 availability required?",
    a: "It depends on the position. Some roles, like utility players, offer flexible or set hours. Reliable will go over availability for the specific role with each applicant.",
  },
  {
    id: "second-shift",
    q: "What constitutes a second shift?",
    a: "Reliable runs multiple shifts through a storm, and some roles, like mechanics, work first and second shift. Reliable will explain shift times for each position.",
  },
  {
    id: "areas",
    q: "What areas do you operate in?",
    a: "All of Ohio, from 50 satellite locations, so snow fighters work within 15 minutes of home.",
  },
  {
    id: "next-day-pay",
    q: "What is next-day pay?",
    a: "You're paid the day after you work. Reliable offers next day pay for all positions.",
  },
];

/* Ready-to-send messages for referrers to share with friends (the changelist's discussion
   points: a separate email and a separate text to promote). DRAFT — copy for client review. */
export const SHARE_EMAIL = {
  subject: "Winter work close to home with Reliable Snow Plowing",
  body: `Hi,

Reliable Snow Plowing is hiring snow fighters across Ohio this winter, and I thought of you.

• Next day pay for all positions
• Work within 15 minutes of home, from 50 satellite locations
• Jobs for experienced operators and for people just starting out

See the open positions at ${WINTER_WORKERS_WANTED}
or call ${SFU_PHONE.label}. Mention my name when you reach out.`,
};

export const SHARE_TEXT = `Reliable Snow Plowing is hiring snow fighters near you. Next day pay for all positions and work close to home. See jobs: ${WINTER_WORKERS_WANTED} (mention my name!)`;
