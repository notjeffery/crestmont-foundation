// Definition of the multi-step application form shown at /apply/form.
// Ported from the Household Resilience Fund form. Edit steps, fields and options here.

export type Depends = { name: string; value: string };

type Base = {
  name: string;
  label: string;
  required?: boolean;
  hint?: string;
  /** Only show this field when another field has this value. */
  dependsOn?: Depends;
};

export type InputField = Base & {
  kind: "text" | "tel" | "email" | "date" | "number";
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number | string;
  inputMode?: "numeric" | "decimal";
};
export type RadioField = Base & { kind: "radio"; options: string[] };
export type CheckboxField = Base & {
  kind: "checkboxes";
  /** `exclusive` options (e.g. "None of the above") clear every other choice. */
  options: { value: string; exclusive?: boolean }[];
};
export type TextareaField = Base & { kind: "textarea"; rows?: number };
export type GroupField = { kind: "group"; label: string; fields: InputField[] };
/** One card per dependent child, driven by the `childCount` field. */
export type ChildrenField = { kind: "children"; dependsOn: Depends };

export type Field = InputField | RadioField | CheckboxField | TextareaField | GroupField | ChildrenField;

export type Step = { id: string; label: string; title: string; fields: Field[] };

const yesNo = ["Yes", "No"];
const opts = (...values: string[]) => values.map((value) => ({ value }));

export const beforeYouApply = {
  label: "Before you apply",
  title: "Before You Apply",
  intro: [
    "Thank you for your interest in Crestmont Foundation.",
    "Crestmont Foundation exists to provide compassionate assistance to individuals and families experiencing temporary hardship.",
    "Every application is carefully reviewed by our team to ensure available resources are distributed fairly, responsibly, and to households facing genuine need.",
    "Completing this application does not guarantee funding, as assistance depends on eligibility, verification, available resources, and program capacity.",
  ],
  callout:
    "We understand that asking for help can be difficult. Our team reviews every application with dignity, confidentiality, and compassion.",
  outro: "Please answer each question honestly and completely.",
  certificationTitle: "Applicant Certification",
  certifications: [
    { name: "certifyAccurate", text: "I certify that the information provided is true and complete to the best of my knowledge." },
    { name: "understandFalseInfo", text: "I understand that intentionally providing false or misleading information may result in denial of assistance." },
    { name: "understandFunding", text: "I understand that assistance through Crestmont Foundation is provided based on available funding and eligibility requirements." },
    { name: "authorizeVerification", text: "I authorize Crestmont Foundation to verify information necessary to evaluate my application." },
    { name: "understandDocumentation", text: "I understand that supporting documentation may be required before assistance can be approved." },
  ],
  certificationError: "Please confirm all five statements to continue.",
};

export const steps: Step[] = [
  {
    id: "applicant",
    label: "Applicant information",
    title: "Applicant Information",
    fields: [
      { kind: "text", name: "firstName", label: "Legal First Name", required: true },
      { kind: "text", name: "middleName", label: "Middle Name" },
      { kind: "text", name: "lastName", label: "Last Name", required: true },
      { kind: "text", name: "preferredName", label: "Preferred Name" },
      { kind: "date", name: "dob", label: "Date of Birth", required: true },
      { kind: "radio", name: "gender", label: "Gender", options: ["Female", "Male", "Non-binary", "Prefer not to answer"] },
      { kind: "tel", name: "phone", label: "Primary Phone Number", required: true },
      { kind: "tel", name: "phone2", label: "Secondary Phone Number" },
      { kind: "email", name: "email", label: "Email Address", required: true },
      { kind: "radio", name: "preferredContact", label: "Preferred Method of Contact", required: true, options: ["Phone", "Text", "Email"] },
    ],
  },
  {
    id: "household",
    label: "Household information",
    title: "Household Information",
    fields: [
      {
        kind: "radio",
        name: "householdType",
        label: "What best describes your household?",
        required: true,
        options: [
          "Single adult",
          "Couple without children",
          "Single parent",
          "Couple with children",
          "Two-parent household",
          "Multi-generational household",
          "Other",
        ],
      },
      {
        kind: "group",
        label: "How many people currently live in your household? *",
        fields: [
          { kind: "number", name: "numAdults", label: "Adults (18+)", required: true, min: 1, step: 1, inputMode: "numeric" },
          { kind: "number", name: "numChildren", label: "Children (0–17)", required: true, min: 0, step: 1, inputMode: "numeric" },
          { kind: "number", name: "numSeniors", label: "Seniors (65+)", required: true, min: 0, step: 1, inputMode: "numeric" },
        ],
      },
      {
        kind: "checkboxes",
        name: "responsibleFor",
        label: "Are you currently responsible for any of the following?",
        required: true,
        hint: "Check all that apply.",
        options: [
          ...opts(
            "Children under 5",
            "Children 6–17",
            "Senior adult",
            "Person with a disability",
            "Veteran",
            "Pregnant household member",
            "Foster child",
          ),
          { value: "None of the above", exclusive: true },
        ],
      },
      { kind: "radio", name: "hasDependentChildren", label: "Dependent children under 18", required: true, options: yesNo },
      {
        kind: "number",
        name: "childCount",
        label: "Number of dependent children",
        required: true,
        min: 1,
        max: 10,
        step: 1,
        inputMode: "numeric",
        hint: "Up to 10. A section will appear for each child.",
        dependsOn: { name: "hasDependentChildren", value: "Yes" },
      },
      { kind: "children", dependsOn: { name: "hasDependentChildren", value: "Yes" } },
    ],
  },
  {
    id: "housing",
    label: "Housing status",
    title: "Housing Status",
    fields: [
      {
        kind: "radio",
        name: "housingStatus",
        label: "Which best describes your current housing?",
        required: true,
        options: [
          "Renting",
          "Homeowner",
          "Staying with family",
          "Staying with friends",
          "Transitional housing",
          "Shelter",
          "Hotel/Motel",
          "Living in vehicle",
          "Currently unhoused",
          "Other",
        ],
      },
      {
        kind: "radio",
        name: "housingDuration",
        label: "How long have you lived at your current residence?",
        required: true,
        options: ["Less than 3 months", "3–12 months", "1–3 years", "More than 3 years"],
      },
      { kind: "radio", name: "housingAtRisk", label: "Are you currently at risk of losing your housing?", required: true, options: yesNo },
      {
        kind: "textarea",
        name: "housingRiskExplain",
        label: "If yes, please explain.",
        required: true,
        rows: 4,
        dependsOn: { name: "housingAtRisk", value: "Yes" },
      },
      { kind: "radio", name: "evictionNotice", label: "Have you received an eviction notice?", required: true, options: yesNo },
      {
        kind: "radio",
        name: "utilityShutoff",
        label: "Has your electricity, water, or gas received a shutoff notice?",
        required: true,
        options: yesNo,
      },
    ],
  },
  {
    id: "employment",
    label: "Employment",
    title: "Employment",
    fields: [
      {
        kind: "radio",
        name: "employmentStatus",
        label: "Current employment status",
        required: true,
        options: ["Full-time", "Part-time", "Self-employed", "Seasonal", "Unemployed", "Retired", "Student", "Unable to work"],
      },
      {
        kind: "text",
        name: "unemployedDuration",
        label: "If unemployed, how long have you been unemployed?",
        required: true,
        dependsOn: { name: "employmentStatus", value: "Unemployed" },
      },
    ],
  },
  {
    id: "income",
    label: "Income",
    title: "Income",
    fields: [
      {
        kind: "checkboxes",
        name: "incomeSources",
        label: "Primary source of household income",
        required: true,
        hint: "Check all that apply.",
        options: [
          ...opts(
            "Employment",
            "Self-employment",
            "Social Security",
            "SSI",
            "SSDI",
            "Veteran Benefits",
            "Child Support",
            "Retirement",
            "Public Assistance",
          ),
          { value: "None", exclusive: true },
        ],
      },
      {
        kind: "number",
        name: "agi2024",
        label: "Prior Year Household Adjusted Gross Income (2024) ($)",
        required: true,
        min: 0,
        step: 0.01,
        inputMode: "decimal",
        placeholder: "$ 0.00",
      },
      {
        kind: "date",
        name: "lastFilingDate",
        label: "Most Recent Filing Date",
        required: true,
        hint: "Enter the date you last submitted a return.",
      },
      {
        kind: "radio",
        name: "taxYear2025Status",
        label: "Tax Year 2025 Filing Status",
        required: true,
        options: [
          "Filed (Return submitted to the IRS)",
          "Filed Extension (Deadline extended to Oct 15, 2026)",
          "Not Filed (Still preparing / pending)",
          "Not Required (Income below filing threshold)",
        ],
      },
    ],
  },
  {
    id: "hardship",
    label: "Financial hardship",
    title: "Financial Hardship",
    fields: [
      {
        kind: "checkboxes",
        name: "hardshipCircumstances",
        label: "What circumstances contributed to your current hardship?",
        required: true,
        hint: "Check all that apply.",
        options: opts(
          "Job loss",
          "Reduced work hours",
          "Medical emergency",
          "Disability",
          "Domestic violence",
          "Death of household member",
          "Natural disaster",
          "Housing crisis",
          "Utility disconnection",
          "Vehicle breakdown",
          "Childcare costs",
          "Inflation / rising living expenses",
          "Mental health crisis",
          "Family emergency",
          "Other",
        ),
      },
      {
        kind: "radio",
        name: "hardshipStart",
        label: "Approximately when did your hardship begin?",
        required: true,
        options: ["Within the last 30 days", "1–3 months ago", "3–6 months ago", "More than 6 months ago"],
      },
    ],
  },
  {
    id: "request",
    label: "Assistance request",
    title: "Assistance Request",
    fields: [
      {
        kind: "checkboxes",
        name: "assistanceType",
        label: "What type of assistance are you requesting today?",
        required: true,
        hint: "Check all that apply.",
        options: opts(
          "Rent assistance",
          "Mortgage assistance",
          "Utility assistance",
          "Groceries",
          "Diapers",
          "Baby formula",
          "Medical expenses",
          "Prescription medication",
          "Transportation",
          "Emergency hotel",
          "Household essentials",
          "Other",
        ),
      },
      {
        kind: "number",
        name: "amountRequested",
        label: "What is the total amount requested? ($)",
        required: true,
        min: 1,
        step: 0.01,
        inputMode: "decimal",
        placeholder: "$ 0.00",
      },
      {
        kind: "radio",
        name: "paymentTo",
        label: "Who should payment be made to?",
        required: true,
        options: ["Self (Applicant)", "Landlord", "Utility Company", "Pharmacy", "Store", "Other Vendor"],
      },
    ],
  },
];
