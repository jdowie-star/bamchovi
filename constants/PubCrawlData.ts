export type PubData = {
  id: number;
  name: string;
  description: string;
  url: string;
  imageUrl: string;
  specialFeature?: string;
};

export const MANCHESTER_PUB_CRAWL: PubData[] = [
  {
    id: 1,
    name: "The Wharf",
    description: "Start your journey at this picturesque canalside pub with stunning views of Castlefield Basin. Enjoy a traditional British ale in this Grade II listed building.",
    url: "https://www.tripadvisor.co.uk/Restaurant_Review-g187069-d3327134-Reviews-The_Wharf-Manchester_Greater_Manchester_England.html",
    imageUrl: "https://media-cdn.tripadvisor.com/media/photo-s/0f/64/e9/0d/the-wharf-castlefield.jpg",
    specialFeature: "Gorgeous waterside seating with historic bridge views"
  },
  {
    id: 2,
    name: "Bunny Jackson's",
    description: "Step into this American-style dive bar for live music, cheap beer, and the city's most famous chicken wings. A lively atmosphere that channels New Orleans vibes.",
    url: "https://bunnysdivebars.co.uk/bunnyjacksons/",
    imageUrl: "https://bunnysdivebars.co.uk/wp-content/uploads/sites/4/2023/09/Gallery-1-1.jpg",
    specialFeature: "10p chicken wings and nightly live music"
  },
  {
    id: 3,
    name: "The Refuge",
    description: "Located in the stunning Principal Hotel, this grand Victorian space offers craft cocktails and small plates in one of Manchester's most impressive interiors.",
    url: "https://www.refugemcr.co.uk/",
    imageUrl: "https://www.refugemcr.co.uk/wp-content/uploads/2020/03/TheRefuge_Jan19ByJamesMoore-10-1600x1066.jpg",
    specialFeature: "Stunning Victorian architecture with lush interior garden"
  },
  {
    id: 4,
    name: "Rain Bar",
    description: "A three-storey converted Victorian warehouse beside the Rochdale canal, offering real ales and hearty pub food with a riverside terrace.",
    url: "https://www.rain-bar.co.uk/",
    imageUrl: "https://media-cdn.tripadvisor.com/media/photo-s/16/9b/e0/8e/rain-bar.jpg",
    specialFeature: "Beautiful canal-side terrace perfect for sunny days"
  },
  {
    id: 5,
    name: "The Temple",
    description: "Originally a Victorian public toilet, this tiny underground bar is now a Manchester institution. Small but mighty, with great music and character.",
    url: "https://www.tripadvisor.co.uk/Attraction_Review-g187069-d7717068-Reviews-The_Temple-Manchester_Greater_Manchester_England.html",
    imageUrl: "https://media-cdn.tripadvisor.com/media/photo-s/08/a2/cf/e7/the-temple.jpg",
    specialFeature: "Former underground Victorian toilet with legendary jukebox"
  },
  {
    id: 6,
    name: "Speak in Code",
    description: "A hidden speakeasy cocktail bar with no signage, serving creative mixology in an intimate setting. Look for the unmarked door and the right code to enter.",
    url: "https://speakincodebar.com/",
    imageUrl: "https://speakincodebar.com/wp-content/uploads/2022/02/Drinksmadeforinstagram-scaled.jpeg",
    specialFeature: "Hidden entrance and prohibition-era atmosphere"
  },
  {
    id: 7,
    name: "Salt Dog Slim's",
    description: "Liverpool's famous bar brings its steins, shots and hot dogs to Manchester. A raucous party spot with plenty of character and salt-rimmed cocktails.",
    url: "https://www.saltdogslims.com/cocktail-bar-manchester/",
    imageUrl: "https://www.saltdogslims.com/wp-content/uploads/2021/11/IMG_0182-min-1024x682.jpg",
    specialFeature: "Dollar bills on the ceiling and steins of German beer"
  },
  {
    id: 8,
    name: "Sinclair's Oyster Bar",
    description: "Historic pub dating back to 1720, serving some of the cheapest pints in Manchester. Sits alongside the Old Wellington in a picturesque cobbled square.",
    url: "https://www.tripadvisor.co.uk/Restaurant_Review-g187069-d858226-Reviews-Sinclair_s_Oyster_Bar-Manchester_Greater_Manchester_England.html",
    imageUrl: "https://media-cdn.tripadvisor.com/media/photo-s/02/df/72/e8/sinclair-s-oyster-bar.jpg",
    specialFeature: "One of Manchester's oldest pubs with Tudor-style architecture"
  },
  {
    id: 9,
    name: "The Washhouse",
    description: "Disguised as a launderette, this secret bar requires you to 'book a wash' by phone to gain entry. Creative cocktails served in a dimly lit, exclusive setting.",
    url: "https://www.washhousemcr.com/",
    imageUrl: "https://images.squarespace-cdn.com/content/v1/5e8cd725fb8d8b3a8051aa1b/4c4c13bc-9bc8-43f4-98a8-8a9f7ce8ecee/bar2.jpg",
    specialFeature: "Disguised as a launderette with a hidden entrance"
  },
  {
    id: 10,
    name: "Ramona",
    description: "Detroit-style pizza and margaritas in a transformed former MOT garage. Indoor and outdoor spaces with fire pits, creating a unique industrial-chic vibe.",
    url: "https://www.takemetoramona.com/",
    imageUrl: "https://images.squarespace-cdn.com/content/v1/5ffe8e75b79c4e3a58c16747/1619694366079-2I9YNCZCB9CIG4KGAQTY/DSC00047.jpg",
    specialFeature: "Converted MOT garage with tipi bar and wood-fired pizza"
  },
  {
    id: 11,
    name: "Lost Cat",
    description: "A quirky Northern Quarter bar with retro vibes, arcade games, and excellent cocktails. Look for the neon cat sign to find this hidden gem.",
    url: "https://lostcatnq.co.uk/",
    imageUrl: "https://lostcatnq.co.uk/wp-content/uploads/2022/09/Lost-Cat-03_09_2022-118-2-1-scaled.jpg",
    specialFeature: "Vintage arcade games and neon-lit atmosphere"
  },
  {
    id: 12,
    name: "Crazy Pedro's",
    description: "Late-night pizza parlor and mezcal bar with eclectic décor and a party atmosphere. Famous for unusual pizza toppings and frozen margaritas.",
    url: "https://crazypedros.co.uk/crazy-pedros-pizza-parlour-nq/",
    imageUrl: "https://crazypedros.co.uk/wp-content/uploads/2020/03/crazy-pedros-NQ-MCR.jpg",
    specialFeature: "Open until 4am with quirky pizza toppings"
  },
  {
    id: 13,
    name: "Behind Closed Doors",
    description: "A hidden basement bar with 70s décor, rotary phones at each table to order drinks, and risqué artwork. Knock to enter this adults-only establishment.",
    url: "https://www.bcdnq.com/manchester/",
    imageUrl: "https://media-cdn.tripadvisor.com/media/photo-s/17/d2/a9/b2/main-bar.jpg",
    specialFeature: "Retro phones to order drinks and vintage adult magazines as decor"
  },
];