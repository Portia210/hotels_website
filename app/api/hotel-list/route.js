import { CRAWLERUI_URL } from "@/constants/environment";
import { nextReturn } from "@/utils/api";
import axios from "axios";
import { cloneDeep } from "lodash";

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
  try {
    const data = await Promise.all([
      sendCommand(payload, "Booking"),
      sendCommand(payload, "Travelor"),
    ]);
    const bookingJob = data[0];
    const travelorJob = data[1];
    return nextReturn({
      bookingJob,
      travelorJob,
    });
  } catch (error) {
    console.error(error);
    return nextReturn(error, 500, "INTERNAL_SERVER_ERROR");
  }
}

const sendCommand = async (payload, dataSource) => {
  const body = cloneDeep(payload);
  body.dataSource = dataSource;
  if (dataSource === "Booking") {
    body.destination = await autoSelectBookingPlace(
      payload.destination.destination
    );
  }
  const response = await axios.post(`${CRAWLERUI_URL}/api/jobs`, body);
  return response.data;
};

const autoSelectBookingPlace = async (destination) => {
  if (!destination) throw new Error("Destination is required");
  const places = await axios
    .post(`${CRAWLERUI_URL}/api/booking/autocomplete`, {
      destination,
    })
    .then((res) => res?.data || []);
  const { placeId, address, dest_type, lat, lng } = places.shift();
  return { placeId, destination: address, dest_type, lat, lng };
};
