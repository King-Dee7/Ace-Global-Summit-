export interface Partner {
  name: string;
  /** Logo in /public/partners (SVG or transparent PNG). Without one, the name is shown as text. */
  logo?: string;
  /** Set for white logos so they show up on the light background */
  invert?: boolean;
}

// To add a partner: drop their logo into public/partners/ and add or replace an entry below.
// Everything from Kora Capital down is made-up demo branding — swap for real partners.
export const PARTNERS: Partner[] = [
  { name: "Reinvent Africa Network", logo: "/reinvent-logo-white.png", invert: true },
  { name: "Accra Marriott Hotel" },
  { name: "Kora Capital", logo: "/partners/kora-capital.svg" },
  { name: "Sankofa Pay", logo: "/partners/sankofa-pay.svg" },
  { name: "Volta Energy", logo: "/partners/volta-energy.svg" },
  { name: "Adinkra Labs", logo: "/partners/adinkra-labs.svg" },
  { name: "Baobab Ventures", logo: "/partners/baobab-ventures.svg" },
  { name: "Lumen Air", logo: "/partners/lumen-air.svg" },
  { name: "Nkwa Health", logo: "/partners/nkwa-health.svg" },
  { name: "Zuri Media", logo: "/partners/zuri-media.svg" },
];
