export const SITE = {
  name: "Everything Bros",
  tagline: "Premium Home Services",
  phone: "(408) 840-8299",
  phoneHref: "tel:+14088408299",
  email: "everythingbros23@gmail.com",
  emailHref: "mailto:everythingbros23@gmail.com",
  instagram: "#",
  facebook: "#",
  seasonalNote:
    "Everything Bros operates seasonally from May–September. Summer 2026 availability.",
} as const;

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
] as const;

export const NEIGHBORHOODS = [
  "Edmonds",
  "The Bowl of Edmonds",
  "Pine Park",
  "Woodway",
  "Esperance",
  "Perrinville",
  "Lynnwood",
  "Cedar Valley",
  "Alderwood",
  "Mountlake Terrace",
  "Brier",
] as const;
