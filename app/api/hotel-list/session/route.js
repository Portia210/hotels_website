import { nextReturn } from "@/utils/api";

// Get session
export async function POST() {
  const data = {
    text: "hello",
  };

  return nextReturn(data);
}
