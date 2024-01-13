import { CRAWLERUI_URL } from "@/constants/environment";
import { nextReturn } from "@/utils/api";
import axios from "axios";

export async function GET(request) {
  try {
    const sessionId = request.nextUrl.searchParams.get("sessionId");
    const session = await axios
      .get(`${CRAWLERUI_URL}/api/jobs/session/${sessionId}`)
      .then((res) => res.data);
    return nextReturn(session);
  } catch (error) {
    return nextReturn(error, 500, "INTERNAL_SERVER_ERROR");
  }
}

// Get session
export async function POST(request) {
  const payload = await request.json();
  try {
    const sessionId = await axios
      .post(`${CRAWLERUI_URL}/api/jobs/session`, payload)
      .then((res) => res.data);
    return nextReturn(sessionId);
  } catch (error) {
    console.error(error);
    return nextReturn(error, 500, "INTERNAL_SERVER_ERROR");
  }
}
