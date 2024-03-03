import { z } from "zod";

export const CreateCheckoutSessionZSchema = z.object({
  planId: z.string(),
  currency: z.string(),
  quantity: z.number(),
});