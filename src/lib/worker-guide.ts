import type { FaqItem } from "@/components/ui/faq-section";
import { SFU_PHONE } from "@/lib/worker-content";

/* Structure of the Worker Referral Program Guide, shown on /worker-guide and painted on the
   3D book's contents page. Chapter titles and summaries only use facts from the client's
   changelist and winterworkerswanted.com.
   DRAFT — needs client review. The real guide PDF hasn't been supplied yet, so chapters 5
   and 6 describe what the guide should cover rather than quoting it. */

export type GuideChapter = {
  title: string;
  summary: string;
};

export const GUIDE_CHAPTERS: GuideChapter[] = [
  { title: "How the program works", summary: "Refer a snow fighter, and earn once they start working." },
  { title: "Earning $1 for every hour", summary: "$1.00 for every hour they work, for as long as they stay." },
  { title: "Positions and experience", summary: "Roles for first-timers and for seasoned operators." },
  { title: "Next day pay", summary: "Every position is paid the day after the work is done." },
  { title: "Safety first", summary: "What's expected on every site, in every storm." },
  { title: "Rules and expectations", summary: "What counts as a referral, and what's expected of workers." },
  { title: "Top questions", summary: "Answers on experience, shifts and service areas." },
];

/* Questions about the guide itself, for the FAQ at the foot of /worker-guide.
   DRAFT — needs client review, in particular the launch timing of the PDF. */
export const GUIDE_FAQS: FaqItem[] = [
  {
    id: "audience",
    q: "Who is the guide for?",
    a: "Anyone referring a snow fighter to Reliable, and the snow fighters they refer. It covers the program from both sides: what referrers earn, and what workers can expect.",
  },
  {
    id: "before-referring",
    q: "Do I need to read it before I refer someone?",
    a: "No. You can send a referral through the form on the Refer a Worker page at any time. The guide is there so you know the rules, rates and roles before you make the introduction.",
  },
  {
    id: "sharing",
    q: "Can I share the guide with the person I'm referring?",
    a: "Yes. It's written for snow fighters as well as referrers, so it's a good way to show someone what working with Reliable looks like.",
  },
  {
    id: "positions",
    q: "Where can I see the open positions?",
    a: "On the Refer a Worker page, or on WinterWorkersWanted.com, which lists every winter position Reliable is hiring for.",
  },
  {
    id: "not-covered",
    q: "What if my question isn't in the guide?",
    a: `Call SFU at ${SFU_PHONE.label}. The team can answer questions about the program, a specific role, or a referral you've already made.`,
  },
];
