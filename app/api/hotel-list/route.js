import { CRAWLERUI_URL } from "@/constants/environment";
import { nextReturn } from "@/utils/api";
import axios from "axios";

// Send Crawling Command
export async function POST(request) {
  const payload = await request.json();
  try {
    const response = await axios.post(
      `${CRAWLERUI_URL}/api/jobs/session`,
      payload
    );
    return nextReturn(response.data);
  } catch (error) {
    console.error(error);
    return nextReturn(error, 500, "INTERNAL_SERVER_ERROR");
  }
}