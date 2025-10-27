import {
  Wifi,
  Waves,
  Dumbbell,
  Car,
  PawPrint,
  Tv,
  Thermometer,
  Cigarette,
  Cable,
  Maximize,
  Bath,
  Phone,
  Sprout,
  Hammer,
  Bus,
  Mountain,
  VolumeX,
  Home,
  Warehouse,
  Building,
  Castle,
  Trees,
  LucideIcon,
} from "lucide-react";

export enum AmenityEnum {
  WasherDryer = "WasherDryer",
  AirConditioning = "AirConditioning",
  Dishwasher = "Dishwasher",
  HighSpeedInternet = "HighSpeedInternet",
  HardwoodFloors = "HardwoodFloors",
  WalkInClosets = "WalkInClosets",
  Microwave = "Microwave",
  Refrigerator = "Refrigerator",
  Pool = "Pool",
  Gym = "Gym",
  Parking = "Parking",
  PetsAllowed = "PetsAllowed",
  WiFi = "WiFi",
}

export const AmenityIcons: Record<AmenityEnum, LucideIcon> = {
  WasherDryer: Waves,
  AirConditioning: Thermometer,
  Dishwasher: Waves,
  HighSpeedInternet: Wifi,
  HardwoodFloors: Home,
  WalkInClosets: Maximize,
  Microwave: Tv,
  Refrigerator: Thermometer,
  Pool: Waves,
  Gym: Dumbbell,
  Parking: Car,
  PetsAllowed: PawPrint,
  WiFi: Wifi,
};

export enum HighlightEnum {
  HighSpeedInternetAccess = "HighSpeedInternetAccess",
  WasherDryer = "WasherDryer",
  AirConditioning = "AirConditioning",
  Heating = "Heating",
  SmokeFree = "SmokeFree",
  CableReady = "CableReady",
  SatelliteTV = "SatelliteTV",
  DoubleVanities = "DoubleVanities",
  TubShower = "TubShower",
  Intercom = "Intercom",
  SprinklerSystem = "SprinklerSystem",
  RecentlyRenovated = "RecentlyRenovated",
  CloseToTransit = "CloseToTransit",
  GreatView = "GreatView",
  QuietNeighborhood = "QuietNeighborhood",
}

export const HighlightIcons: Record<HighlightEnum, LucideIcon> = {
  HighSpeedInternetAccess: Wifi,
  WasherDryer: Waves,
  AirConditioning: Thermometer,
  Heating: Thermometer,
  SmokeFree: Cigarette,
  CableReady: Cable,
  SatelliteTV: Tv,
  DoubleVanities: Maximize,
  TubShower: Bath,
  Intercom: Phone,
  SprinklerSystem: Sprout,
  RecentlyRenovated: Hammer,
  CloseToTransit: Bus,
  GreatView: Mountain,
  QuietNeighborhood: VolumeX,
};

export enum PropertyTypeEnum {
  Rooms = "Rooms",
  Tinyhouse = "Tinyhouse",
  Apartment = "Apartment",
  Villa = "Villa",
  Townhouse = "Townhouse",
  Cottage = "Cottage",
}

export const PropertyTypeIcons: Record<PropertyTypeEnum, LucideIcon> = {
  Rooms: Home,
  Tinyhouse: Warehouse,
  Apartment: Building,
  Villa: Castle,
  Townhouse: Home,
  Cottage: Trees,
};

// Add this constant at the end of the file
export const NAVBAR_HEIGHT = 52; // in pixels

// Test users for development
export const testUsers = {
  tenant: {
    username: "Carol White",
    userId: "us-east-2:76543210-90ab-cdef-1234-567890abcdef",
    signInDetails: {
      loginId: "carol.white@example.com",
      authFlowType: "USER_SRP_AUTH",
    },
  },
  tenantRole: "tenant",
  manager: {
    username: "John Smith",
    userId: "us-east-2:12345678-90ab-cdef-1234-567890abcdef",
    signInDetails: {
      loginId: "john.smith@example.com",
      authFlowType: "USER_SRP_AUTH",
    },
  },
  managerRole: "manager",
};

export const testimonials = [
  {
    text: "Found my dream apartment in just 2 weeks! The search filters made it so easy to find exactly what I was looking for. Highly recommend!",
    author: {
      name: "sarah_homes",
      imgUrl: "https://i.pravatar.cc/150?img=1",
    },
  },
  {
    text: "Best real estate platform I've used. The virtual tours saved me so much time. Closed on my new condo last month!",
    author: {
      name: "mike_realty",
      imgUrl: "https://i.pravatar.cc/150?img=2",
    },
  },
  {
    text: "As a first-time buyer, I was nervous. But the detailed listings and responsive agents made the process smooth and stress-free.",
    author: {
      name: "jessica_moves",
      imgUrl: "https://i.pravatar.cc/150?img=3",
    },
  },
  {
    text: "Sold my house in under a month! The exposure this platform gave me was incredible. Way better than traditional listings.",
    author: {
      name: "david_properties",
      imgUrl: "https://i.pravatar.cc/150?img=4",
    },
  },
  {
    text: "The neighborhood insights were a game-changer. Knew everything about schools, safety, and amenities before even visiting. Love my new home!",
    author: {
      name: "emily_newplace",
      imgUrl: "https://i.pravatar.cc/150?img=5",
    },
  },
  {
    text: "Fantastic experience from start to finish. The mortgage calculator helped me budget perfectly. Now I'm a proud homeowner!",
    author: {
      name: "chris_homeowner",
      imgUrl: "https://i.pravatar.cc/150?img=6",
    },
  },
  {
    text: "I've recommended this to all my friends. The customer service is top-notch and the listings are always up to date. Found my perfect studio!",
    author: {
      name: "amanda_living",
      imgUrl: "https://i.pravatar.cc/150?img=7",
    },
  },
  {
    text: "After months of searching elsewhere, I found THE ONE here in 3 days. The notification system is brilliant. Thank you!",
    author: {
      name: "robert_finds",
      imgUrl: "https://i.pravatar.cc/150?img=8",
    },
  },
  {
    text: "As an investor, I appreciate the market analytics and pricing trends. Closed on 3 properties this year through this platform!",
    author: {
      name: "lisa_invests",
      imgUrl: "https://i.pravatar.cc/150?img=9",
    },
  },
  {
    text: "The mobile app is so convenient. I was house hunting during my lunch breaks! Now settling into my beautiful new home. 5 stars!",
    author: {
      name: "kevin_settled",
      imgUrl: "https://i.pravatar.cc/150?img=10",
    },
  },
];
