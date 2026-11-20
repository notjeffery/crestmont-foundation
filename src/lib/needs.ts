   export type Need = { id: string; label: string; ready: string[] };

   export const needs: Need[] = [
     { id: "housing", label: "Housing & Mortgage", ready: ["Your lease or mortgage statement", "Any notice from your landlord or lender", "Recent proof of income, if you have it"] },
     { id: "food", label: "Food & Nutrition", ready: ["The number of people in your household", "Any dietary needs or allergies", "The best way to reach you"] },
     { id: "education", label: "Education", ready: ["The student's name and school or program", "Grade level or the subject you need help with", "Any upcoming deadlines"] },
     { id: "health", label: "Health & Wellness", ready: ["A short description of what you need", "Any bills or letters you've received", "Insurance details, if you have them"] },
     { id: "disability", label: "Disability Support", ready: ["The kind of support or equipment you need", "Any benefits you currently receive", "Photos of the space, if it's about home accessibility"] },
     { id: "disaster", label: "Disaster & Home Emergency", ready: ["Photos of the damage, if it's safe to take them", "Your insurance claim number, if you've filed one", "Where you're staying right now"] },
     { id: "other", label: "Something else", ready: ["A short description of your situation", "Any deadlines or notices you've received", "The best way and time to reach you"] },
   ];

   export const getNeed = (id?: string) => needs.find((n) => n.id === id);