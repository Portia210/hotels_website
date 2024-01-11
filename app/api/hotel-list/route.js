import { nextReturn } from "@/utils/api";

// Check Crawling Status
export async function GET(_, context) {
  const data = {
    text: "hello",
  };

  return nextReturn(data);
}

// Send Crawling Command
export async function POST(request) {
  const payload = await request.json();
  const data = {
    text: "hello",
  };

  return nextReturn(data);
}
