import axios from "axios";

class HotelService {
  async sendCommand(searchInput) {
    const result = await axios
      .post("/api/hotel-list", searchInput)
      .then((res) => res.data);
    return result;
  }
}
const hotelService = new HotelService();
export default hotelService;
