import { images } from "@/lib/images";

export type Program = {
  id: string;
  title: string;
  text: string;
  image: string;
};

// Program ids match the ids in src/lib/needs.ts so "Apply" can pre-select the need on /get-help.
export const programs: Program[] = [
  { id: "housing", title: "Housing & Mortgage Help", text: "Rental aid, foreclosure prevention, and mortgage assistance to keep families safely in their homes.", image: images.programs.housing },
  { id: "food", title: "Food & Nutrition", text: "Pantries, meal programs, and groceries for families and individuals at risk of hunger.", image: images.programs.food },
  { id: "education", title: "Education", text: "Tutoring, scholarships, school supplies, and adult learning programs that open doors.", image: images.programs.education },
  { id: "health", title: "Health & Wellness", text: "Care navigation, mental health support, and help with medical bills for the whole person.", image: images.programs.health },
  { id: "disability", title: "Disability Support", text: "Home accessibility, equipment, and guidance on benefits and services.", image: images.programs.disability },
  { id: "disaster", title: "Disaster & Home Emergency Relief", text: "Fast help after storms, fires, floods, or sudden damage to your home, plus long-term recovery support.", image: images.programs.disaster },
  { id: "other", title: "Other Support", text: "Emergency cash aid, utilities, and help for needs that don't fit anywhere else.", image: images.programs.other },
];
