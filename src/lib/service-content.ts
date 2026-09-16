import type { LucideIcon } from "lucide-react";
import { BadgeDollarSign, Clock3, GraduationCap, Timer } from "lucide-react";
import { POSITIONS } from "@/lib/worker-content";

/* The eleven positions winterworkerswanted.com lists — the client's changelist calls it
   "the site with the services they need workers for". Titles, photos and the requirement
   lines all come from that site; only the one-line descriptions below are our wording. */

export type ServiceItem = {
  name: string;
  slug: string;
  detail: string;
  why: string;
  image: string;
  /** object-position, set so the crew or machine stays in frame through the card's crop. */
  focus: string;
};

/* DRAFT — needs client review: one line per position describing the work. */
const WORK_DETAIL: Record<string, string> = {
  "plow-subcontractor": "Run your own truck or machine on Reliable's routes.",
  "sidewalk-shoveler": "Clear walkways, entrances and steps by hand.",
  "compact-loader-operator": "Push and stack snow from a heated compact loader.",
  "skid-steer-operator": "Work lots and tight corners from a heated cab.",
  "wheel-loader-operator": "Move and stack the big piles on larger sites.",
  "salt-truck-driver": "Run salt routes and treat lots through the storm.",
  "foreman": "Lead a crew and keep a site's whole job on schedule.",
  "mechanic": "Keep the fleet running from a heated shop.",
  "sidewalk-foreman": "Coordinate the sidewalk teams across a site.",
  "utility-player": "Fill in wherever the storm needs you most.",
  "dispatcher": "Coordinate crews and equipment as the storm moves.",
};

/* Built from POSITIONS so the titles, photos and requirements stay in one place; the
   "what's included" line is each position's own bullet list from the client's site. */
export const WORK_CARDS: ServiceItem[] = POSITIONS.map((position) => ({
  name: position.title,
  slug: position.slug,
  detail: WORK_DETAIL[position.slug] ?? "",
  why: position.perks.join(" · "),
  image: position.image,
  focus: position.focus,
}));

/* Facts beside the deck, all stated on winterworkerswanted.com or in the changelist. */
export const SERVICE_NOTES: { icon: LucideIcon; title: string; text: string; accent?: boolean }[] = [
  { icon: Clock3, title: "Next day pay", text: "Next day pay on every position." },
  { icon: Timer, title: "15 minutes from home", text: "Work within 15 minutes of where you live." },
  { icon: GraduationCap, title: "No experience needed", text: "Some roles need none at all; others want experience.", accent: true },
  { icon: BadgeDollarSign, title: "Competitive rates", text: "Paid rates across all winter positions." },
];
