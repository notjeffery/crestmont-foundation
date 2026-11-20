import { images } from "@/lib/images";

export type Program = {
  id: string;
  title: string;
  /** Short category label shown on the card and in the details modal. */
  tag: string;
  /** One-line teaser shown on the card. */
  tagline: string;
  /** Fuller description, used on the home page and in the details modal. */
  text: string;
  image: string;
};

// Program ids match the ids in src/lib/needs.ts so "Apply" can pre-select the need on /apply.
export const programs: Program[] = [
  { id: "housing", title: "Housing & Mortgage Help", tag: "Housing", tagline: "Everyone deserves a safe, stable place to call home.", text: "Rental aid, foreclosure prevention, and mortgage assistance to keep families safely in their homes.", image: images.programs.housing },
  { id: "food", title: "Food & Nutrition", tag: "Basic Needs", tagline: "Nourishing families, one meal at a time.", text: "Pantries, meal programs, and groceries for families and individuals at risk of hunger.", image: images.programs.food },
  { id: "education", title: "Education", tag: "Education", tagline: "Every learner deserves room to grow.", text: "Tutoring, scholarships, school supplies, and adult learning programs that open doors.", image: images.programs.education },
  { id: "health", title: "Health & Wellness", tag: "Health", tagline: "Care that supports the whole person.", text: "Care navigation, mental health support, and help with medical bills for the whole person.", image: images.programs.health },
  { id: "disability", title: "Disability Support", tag: "Accessibility", tagline: "Independence starts with the right support.", text: "Home accessibility, equipment, and guidance on benefits and services.", image: images.programs.disability },
  { id: "disaster", title: "Disaster & Home Emergency Relief", tag: "Emergency Relief", tagline: "Fast, caring help when the unexpected hits home.", text: "Fast help after storms, fires, floods, or sudden damage to your home, plus long-term recovery support.", image: images.programs.disaster },
  { id: "other", title: "Other Support", tag: "General Support", tagline: "Not sure where you fit? Start here.", text: "Emergency cash aid, utilities, and help for needs that don't fit anywhere else.", image: images.programs.other },
];
