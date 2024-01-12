import { z } from "zod";

export const SearchInputSchema = z.object({
  checkInDate: z.string(),
  checkOutDate: z.string(),
  destination: z.object({
    placeId: z.string(),
    destination: z.string(),
    lat: z.number(),
    lng: z.number(),
  }),
  rooms: z.number(),
  adults: z.number(),
  childrens: z.number(),
  childrenAges: z.array(z.number()),
  guests: z.string(),
});
