export type AccommodationType = 'Hotel' | 'Apartment' | 'Hostel' | 'Guest House' | 'Other';

export interface TripFormData {
  origin: string;
  destination: string;
  days: number | '';
  travellers: number | '';
  accommodation: AccommodationType | '';
}

export interface DayPlanItem {
  dayNumber: number;
  title: string;
  description: string;
  activities: string[];
  theme?: string;
}

export interface GeneratedTripPlan {
  id: string;
  origin: string;
  destination: string;
  days: number;
  travellers: number;
  accommodation: AccommodationType;
  generatedAt: string;
  summary: string;
  itinerary: DayPlanItem[];
}

/**
 * Generates an adaptive, structured day-by-day itinerary based on user parameters.
 * Modular architecture ready to be connected to external travel APIs or Gemini AI.
 */
export function generateTripPlan(input: TripFormData): GeneratedTripPlan {
  const origin = input.origin.trim();
  const destination = input.destination.trim();
  const days = typeof input.days === 'number' && input.days > 0 ? input.days : 1;
  const travellers = typeof input.travellers === 'number' && input.travellers > 0 ? input.travellers : 1;
  const accommodation = (input.accommodation || 'Hotel') as AccommodationType;

  const itinerary: DayPlanItem[] = [];

  const travellerLabel = travellers === 1 ? 'solo exploration' : `${travellers} travellers`;
  const stayText = accommodation === 'Other' ? 'selected lodging' : accommodation.toLowerCase();

  if (days === 1) {
    itinerary.push({
      dayNumber: 1,
      title: `Arrival, Essential Highlights & Departure`,
      description: `Maximize your single-day trip from ${origin} with an efficient loop through ${destination}'s signature sights before concluding your visit.`,
      activities: [
        `Morning arrival in ${destination} and convenient luggage drop-off at your ${stayText}`,
        `Visit the central landmark and landmark historic district`,
        `Enjoy authentic regional cuisine for lunch recommended for ${travellerLabel}`,
        `Afternoon stroll through prominent public squares or scenic viewpoints`,
        `Evening souvenir shopping and smooth return transit to ${origin}`,
      ],
      theme: 'Express Highlights',
    });
  } else if (days === 2) {
    itinerary.push(
      {
        dayNumber: 1,
        title: `Arrival, Check-in & Orientation in ${destination}`,
        description: `Travel from ${origin}, check in to your ${stayText}, and embark on an afternoon introductory walk around the key downtown quarter.`,
        activities: [
          `Arrive from ${origin} and check into your ${stayText}`,
          `Orient yourself around the central district and main avenues`,
          `Explore local cafes and enjoy a relaxed dinner at a regional restaurant`,
          `Evening observation point overlooking the illuminated city skyline`,
        ],
        theme: 'Arrival & Settle In',
      },
      {
        dayNumber: 2,
        title: `Key Attractions, Local Culture & Departure`,
        description: `Dedicate your morning to ${destination}'s premier cultural sites and artisan markets before beginning transit back to ${origin}.`,
        activities: [
          `Morning visit to the top historic monument and national museum`,
          `Browse local bazaars and craft stores for keepsakes`,
          `Farewell lunch sampling signature local delicacies`,
          `Check out of ${stayText} and proceed with departure to ${origin}`,
        ],
        theme: 'Heritage & Departure',
      }
    );
  } else {
    // 3 or more days: dynamic curated sequence
    for (let day = 1; day <= days; day++) {
      if (day === 1) {
        itinerary.push({
          dayNumber: 1,
          title: `Arrival & Settling into ${destination}`,
          description: `Journey from ${origin} to ${destination}. Check into your ${stayText} and take an easy-paced orientation tour of the neighborhood.`,
          activities: [
            `Arrive in ${destination} from ${origin} and transfer to your ${stayText}`,
            `Check-in, refresh, and unpack comfortably`,
            `Leisurely afternoon stroll through neighboring pedestrian streets`,
            `Welcome dinner featuring authentic local dishes suited for ${travellerLabel}`,
          ],
          theme: 'Arrival & Orientation',
        });
      } else if (day === days) {
        itinerary.push({
          dayNumber: day,
          title: `Final Sights & Return Journey to ${origin}`,
          description: `Conclude your visit to ${destination} with a relaxed morning, last-minute gift shopping, and comfortable transit home.`,
          activities: [
            `Breakfast at a beloved local bakery or cafe near your ${stayText}`,
            `Final stroll through scenic parks or waterfront promenade`,
            `Pick up traditional handicrafts and regional souvenirs`,
            `Check out of accommodation and commence your return journey to ${origin}`,
          ],
          theme: 'Wrap-up & Departure',
        });
      } else {
        // Intermediate days cycle through structured travel themes
        const intermediateIndex = (day - 2) % 5;
        switch (intermediateIndex) {
          case 0:
            itinerary.push({
              dayNumber: day,
              title: `Iconic Landmarks & Architectural Heritage`,
              description: `A full day exploring the renowned historical monuments, architectural marvels, and primary cultural treasures of ${destination}.`,
              activities: [
                `Guided or self-guided morning walk through historic monuments and plazas`,
                `Midday visit to the premier city museum or gallery collection`,
                `Lunch in the old town quarter featuring regional specialties`,
                `Sunset view from a celebrated scenic terrace or hilltop viewpoint`,
              ],
              theme: 'Heritage & Culture',
            });
            break;
          case 1:
            itinerary.push({
              dayNumber: day,
              title: `Scenic Excursions & Natural Surroundings`,
              description: `Venture slightly beyond the center to experience the natural beauty, gardens, or panoramic landscapes surrounding ${destination}.`,
              activities: [
                `Morning visit to prominent national parks, gardens, or valley trails`,
                `Outdoor picnic or alfresco dining with scenic views`,
                `Afternoon leisurely exploration of botanical grounds or viewpoints`,
                `Relaxing evening tea and casual dinner in a quiet district`,
              ],
              theme: 'Nature & Scenery',
            });
            break;
          case 2:
            itinerary.push({
              dayNumber: day,
              title: `Artisans, Traditional Bazaars & Local Flavors`,
              description: `Immerse yourself in the authentic daily pulse of ${destination}, exploring lively marketplaces, craft studios, and food streets.`,
              activities: [
                `Morning visit to vibrant craft markets and traditional bazaars`,
                `Interact with local artisans producing textiles, ceramics, or woodwork`,
                `Street food tasting tour curated for ${travellerLabel}`,
                `Evening cultural performance or relaxing stroll through lively squares`,
              ],
              theme: 'Local Life & Markets',
            });
            break;
          case 3:
            itinerary.push({
              dayNumber: day,
              title: `Hidden Neighborhoods & Contemporary Arts`,
              description: `Discover the modern pulse of ${destination} through independent cafes, contemporary galleries, and bohemian quarters.`,
              activities: [
                `Explore trendy creative quarters, art spaces, and concept boutiques`,
                `Specialty coffee break in an artistic neighbourhood`,
                `Visit to modern civic spaces, libraries, or modern architecture`,
                `Dinner at an acclaimed contemporary bistro`,
              ],
              theme: 'Modern Culture',
            });
            break;
          case 4:
          default:
            itinerary.push({
              dayNumber: day,
              title: `Regional Day Excursion & Exploration`,
              description: `Take a scenic short day trip to notable surrounding towns, heritage ruins, or scenic lakefronts nearby ${destination}.`,
              activities: [
                `Morning transfer to a notable neighboring historic town or scenic reserve`,
                `Exploration of unique regional landmarks and distinct architecture`,
                `Traditional countryside or lakefront lunch`,
                `Late afternoon return to your ${stayText} for an evening of rest`,
              ],
              theme: 'Day Excursion',
            });
            break;
        }
      }
    }
  }

  return {
    id: `trip-${Date.now()}`,
    origin,
    destination,
    days,
    travellers,
    accommodation,
    generatedAt: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    summary: `${days} Days in ${destination} from ${origin} for ${travellers} ${
      travellers === 1 ? 'traveller' : 'travellers'
    } staying in ${accommodation}.`,
    itinerary,
  };
}
