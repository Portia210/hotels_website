import { z } from "zod";

export const OrderInfoZSchema = z.object({
  code: z.string(),
  name: z.string(),
  currency: z.string(),
  price: z.number(),
  quantity: z.number(),
  status: z.string().optional(),
});