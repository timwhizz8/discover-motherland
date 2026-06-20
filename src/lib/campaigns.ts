export interface Campaign {
  id: string;
  title: string;
  location: string;
  country: string;
  dateRange: string;
  duration: string;
  price: number;
  currency: string;
  category: "Safari" | "Cultural" | "Adventure" | "Landmark";
  badge?: "BESTSELLER" | "LIMITED SPOTS" | "NEW" | "SOLD OUT";
  highlights: string[];
  inclusions: string[];
  image: string;
  description: string;
  groupSize: string;
}

export const campaigns: Campaign[] = [
  {
    id: "kruger-big5",
    title: "Kruger Big 5 Safari",
    location: "Kruger National Park",
    country: "South Africa",
    dateRange: "15 Aug – 22 Aug 2026",
    duration: "7 nights / 8 days",
    price: 28500,
    currency: "ZAR",
    category: "Safari",
    badge: "BESTSELLER",
    highlights: ["Big 5 game drives", "Luxury bush lodge", "Sundowner drinks", "Expert ranger"],
    inclusions: ["Accommodation", "All meals", "Game drives", "Park fees", "Airport transfers"],
    image: "/gallery-kruger.png",
    description: "Experience the ultimate Big 5 safari in the iconic Kruger National Park. Stay in a premium bush lodge and track lion, elephant, rhino, buffalo and leopard with expert field rangers.",
    groupSize: "Max 8 guests",
  },
  {
    id: "victoria-falls-escape",
    title: "Victoria Falls Adventure",
    location: "Livingstone / Victoria Falls",
    country: "Zambia & Zimbabwe",
    dateRange: "3 Sep – 8 Sep 2026",
    duration: "5 nights / 6 days",
    price: 19800,
    currency: "ZAR",
    category: "Adventure",
    badge: "LIMITED SPOTS",
    highlights: ["Devil's Pool swim", "Helicopter flight over falls", "Bungee jump", "Sunset cruise"],
    inclusions: ["Boutique hotel", "Breakfast & dinner", "Activities", "Visa assistance"],
    image: "/gallery-victoria-falls.png",
    description: "Stand at the edge of the world's largest waterfall. Swim in Devil's Pool, soar over the falls in a helicopter, and experience the Zambezi by sunset cruise.",
    groupSize: "Max 12 guests",
  },
  {
    id: "sun-city-getaway",
    title: "Sun City Luxury Retreat",
    location: "Sun City Resort",
    country: "South Africa",
    dateRange: "10 Oct – 14 Oct 2026",
    duration: "4 nights / 5 days",
    price: 14900,
    currency: "ZAR",
    category: "Landmark",
    badge: "NEW",
    highlights: ["Palace of the Lost City", "Valley of Waves", "Casino entertainment", "Spa access"],
    inclusions: ["Palace Hotel stay", "Breakfast", "Valley of Waves passes", "Show tickets"],
    image: "/gallery-suncity.png",
    description: "Indulge in the splendour of Africa's premier entertainment resort. Stay in the iconic Palace of the Lost City, enjoy world-class gaming, spa treatments, and the famous Valley of Waves waterpark.",
    groupSize: "Couples & families welcome",
  },
  {
    id: "gold-reef-joburg",
    title: "Gold Reef City & Joburg Heritage",
    location: "Johannesburg",
    country: "South Africa",
    dateRange: "22 Nov – 25 Nov 2026",
    duration: "3 nights / 4 days",
    price: 8900,
    currency: "ZAR",
    category: "Cultural",
    highlights: ["Gold mine tour", "Gold Reef theme park", "Soweto township tour", "Apartheid Museum"],
    inclusions: ["4-star hotel", "Breakfast", "Guided tours", "Entrance fees"],
    image: "/hero-savanna.png",
    description: "Discover the rich cultural tapestry of Johannesburg. From the gold-rush history of Gold Reef City to the moving Apartheid Museum and vibrant Soweto streets.",
    groupSize: "Max 16 guests",
  },
  {
    id: "masai-mara-migration",
    title: "Masai Mara Great Migration",
    location: "Masai Mara Reserve",
    country: "Kenya",
    dateRange: "5 Jul – 12 Jul 2027",
    duration: "7 nights / 8 days",
    price: 42000,
    currency: "ZAR",
    category: "Safari",
    badge: "LIMITED SPOTS",
    highlights: ["Wildebeest river crossing", "Hot air balloon safari", "Maasai village visit", "Photography workshops"],
    inclusions: ["Luxury tented camp", "All meals & drinks", "Game drives", "Balloon safari", "Transfers"],
    image: "/gallery-lion.png",
    description: "Witness one of nature's greatest spectacles — over 1.5 million wildebeest crossing the Mara River. A once-in-a-lifetime experience from a luxury tented camp.",
    groupSize: "Max 6 guests",
  },
  {
    id: "cape-winelands",
    title: "Cape Winelands & Coast",
    location: "Cape Town & Stellenbosch",
    country: "South Africa",
    dateRange: "20 Mar – 26 Mar 2027",
    duration: "6 nights / 7 days",
    price: 22000,
    currency: "ZAR",
    category: "Cultural",
    highlights: ["Table Mountain", "Cape Point", "Wine tasting tours", "Whale watching (seasonal)"],
    inclusions: ["Boutique guesthouse", "Breakfast & 2 dinners", "All tours & tastings", "Car hire"],
    image: "/hero-savanna.png",
    description: "From the shadow of Table Mountain to the vine-covered hills of Stellenbosch. Savour world-class wines, dramatic coastal drives, and the unique fynbos landscape of the Cape.",
    groupSize: "Max 10 guests",
  },
];

export const categories = ["All", "Safari", "Cultural", "Adventure", "Landmark"] as const;
export type Category = typeof categories[number];
