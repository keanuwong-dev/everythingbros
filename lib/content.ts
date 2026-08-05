import {
  Droplets,
  Sparkles,
  Trash2,
  Leaf,
  HeartHandshake,
  SprayCan,
  Home,
  Recycle,
  Shovel,
  type LucideIcon,
} from "lucide-react";

export const HERO = {
  headline: "Everything Bros",
  subhead: "Premium Home Services",
  body: "Professional exterior cleaning and home services for homeowners who want reliable, high-quality work.",
  serviceTags: [
    "Window Cleaning",
    "Pressure Washing",
    "Gutter Cleaning",
    "Junk Removal",
    "Concierge Services",
    "And Everything in Between",
  ],
  trustSignals: ["Serving Edmonds & Lynnwood", "Free quotes"],
} as const;

export type ServiceItem = {
  name: string;
  details?: string[];
  icon: LucideIcon;
};

export const EXTERIOR_SERVICES: ServiceItem[] = [
  {
    name: "Pressure washing",
    details: ["Driveways", "Patios/Decks", "Sidewalks/Walkways", "Siding", "Fences"],
    icon: Droplets,
  },
  {
    name: "Soft washing",
    details: ["House Wash", "Fence", "Deck"],
    icon: SprayCan,
  },
  {
    name: "Gutter cleaning",
    details: ["Gutter Cleanouts", "Downspout Clearing"],
    icon: Home,
  },
  { name: "Junk removal", icon: Trash2 },
  { name: "Garbage bin cleaning", icon: Recycle },
  {
    name: "Window Cleaning",
    details: [
      "Interior & Exterior",
      "Screens",
      "Tracks",
      "Skylights",
      "Sliding Glass Doors",
    ],
    icon: Sparkles,
  },
  {
    name: "Moss Removal",
    details: [
      "Roof Moss Removal (Moss Treatment, Moss Removal, Roof Cleanup)",
      "Ground Moss Removal",
    ],
    icon: Leaf,
  },
  { name: "Lawn Mowing", icon: Shovel },
];

export const HOME_ASSISTANCE_SERVICES = [
  "Grocery/Pharmacy Runs",
  "Senior Companionship",
  "Dog Walking",
  "Store Returns",
  "Tech Support",
  "House Cleaning",
  "House Sitting",
  "Garage Cleaning",
  "Donation Pickup/Delivery",
] as const;

export const PAINTING_CALLOUT =
  "Need painting? We partner with JC Painting Pro, a trusted local painting company. Contact us and we'll connect you with them for a free estimate.";

export const WHY_CHOOSE_US = [
  "Reliable communication",
  "High-quality work",
  "Friendly local service",
  "Flexible scheduling",
  "Fast response times",
  "Great for busy homeowners and seniors",
  "We treat every job like it matters",
  "Transparent, upfront pricing",
] as const;

export const PRICING = [
  { service: "Driveway Cleaning", price: "$79" },
  { service: "Gutter Cleaning", price: "$99" },
  { service: "Window Cleaning", price: "$119" },
  { service: "House Washing", price: "$199" },
  { service: "Moss Treatment", price: "$149" },
  { service: "Junk Removal", price: "$75" },
  { service: "Garbage Bin Cleaning", price: "$25" },
  { service: "Home Assistance", price: "$20" },
] as const;

export const PRICING_DISCLAIMER =
  "Prices shown are starting prices and may vary based on property size, accessibility, condition, project scope, and travel requirements. Contact us for a free personalized quote.";

export const ABOUT = {
  title: "The Everything Bros",
  intro:
    "Founded by two best friends with a simple goal: to deliver quality work homeowners can trust.",
} as const;

export const FOUNDERS = [
  {
    initials: "CS",
    name: "Cavan Schillinger",
    role: "Co-founder",
    bio: "2025 graduate of Edmonds-Woodway High School, studying Finance at Washington State University. Played basketball and tennis all four years of high school while developing a strong interest in business, marketing, and entrepreneurship. At WSU, involved with the Women's Basketball Scout Team, campus business clubs, and founder of a marketing agency (@cavancreativeco) focused on helping local businesses grow through content creation and social media strategy.",
  },
  {
    initials: "KD",
    name: "Kaiden Davies",
    role: "Co-founder",
    bio: "2025 graduate of Edmonds-Woodway High School, studying Business at Santa Clara University. Competed in basketball, cross country, and track all four years while building a strong work ethic through athletics and business experience. Previously ran a lawn care business in Edmonds that supported Washington Kids in Transition, a local charity organization. Enjoys golf, basketball, and entrepreneurship outside of school and business.",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Cavan did an excellent job! He is hardworking and will get the job done right. I highly recommend Cavan for your service needs.",
    author: "Gwen R.",
    location: "Lynnwood",
  },
  {
    quote: "Professional, on time, and great communication from start to finish.",
    author: "Placeholder",
    location: "Edmonds",
  },
  {
    quote: "Our driveway and windows look brand new. Would hire again.",
    author: "Placeholder",
    location: "Mountlake Terrace",
  },
] as const;

export const CONTACT_SERVICES = [
  "Pressure washing",
  "Soft washing",
  "Gutter cleaning",
  "Junk removal",
  "Garbage bin cleaning",
  "Window cleaning",
  "Moss removal",
  "Lawn mowing",
  "Home assistance",
  "Other",
] as const;
