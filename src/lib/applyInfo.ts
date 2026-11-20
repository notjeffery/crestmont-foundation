// Write-up shown on /apply before applicants reach the form.
// Edit the copy, eligibility lists and amounts here; the page reads everything from this file.

export const about = [
  "Crestmont Foundation provides direct assistance to qualifying households experiencing hardship, unexpected medical expenses, loss of income, or another emergency that threatens household stability.",
  "Our programs are designed to help individuals and families overcome an unexpected crisis before temporary hardship becomes long-term instability.",
  "Assistance is reviewed individually, with dignity, respect, and compassion. Depending on verified need and available funding, assistance may be delivered directly to a landlord, utility provider, pharmacy, or other verified vendor.",
];

export const howToApply = [
  "Applications are accepted online. Complete the confidential multi-step form with accurate household, income, housing, and hardship information. Pre-approved applicants will be asked to provide verifying documentation before funding is confirmed.",
  "Individuals and families may apply directly or be referred by a school, healthcare provider, faith-based organization, social worker, community organization, housing agency, government agency, or partner nonprofit.",
];

export const responseTime =
  "Our team reviews applications as promptly as possible. Timing depends on application volume, funding availability, and urgency.";

export const eligibility = {
  intro:
    "Crestmont Foundation assistance is intended for individuals and families facing genuine financial hardship that affects their ability to maintain a safe and stable household. Receiving assistance from another program does not automatically disqualify an applicant.",
  prioritySituationsLabel: "Priority may be given to households experiencing:",
  prioritySituations: [
    "Loss of employment or income",
    "Medical emergency, serious illness, or disability",
    "Housing instability or eviction risk",
    "Utility shut-off notices",
    "Domestic violence or safety concerns",
    "Natural disaster or displacement",
  ],
  priorityGroupsLabel: "Priority may also be given to:",
  priorityGroups: [
    "Dependent children",
    "Seniors on fixed incomes",
    "Veterans",
    "Individuals with disabilities",
    "Caregivers facing hardship",
    "Other documented emergencies",
  ],
};

export const eligibleAssistance = {
  intro: "Assistance may be available for verified essential household expenses.",
  groups: [
    {
      title: "Housing & utilities",
      items: [
        "Past-due rent and mortgage support",
        "Security deposits and emergency lodging",
        "Electricity, gas, water, sewer, and heating fuel",
        "Internet needed for work or education",
      ],
    },
    {
      title: "Food & essentials",
      items: ["Groceries and fresh produce", "Infant formula and diapers", "Hygiene and cleaning supplies"],
    },
    {
      title: "Health & transport",
      items: [
        "Prescription medications",
        "Medical equipment and transport",
        "Emergency healthcare costs",
        "Public transit, fuel, and essential repairs",
      ],
    },
    {
      title: "Emergency needs",
      items: ["Clothing and household essentials", "Disaster recovery supplies", "Basic furniture when necessary"],
    },
  ],
};

export const childSupport = {
  amount: "$450 in additional assistance per child",
  before: "Households with dependent children under 17 may be eligible for up to ",
  after:
    ". This support helps reduce the financial burden on parents during a crisis and may cover needs such as food, diapers, formula, clothing, school supplies, housing stability, or childcare.",
};

export const disclaimer =
  "Meeting eligibility criteria does not guarantee funding. Funding decisions are based on verified need, program guidelines, and resources available at the time of review.";
