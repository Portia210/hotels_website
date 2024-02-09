import { TOURCOMPARE_BE_URL } from "@/constants/environment";
import { renderGuestText } from "@/utils/convertRoomInfo";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/he";
import useTrans from "./useTrans";

const useHotelInfoToast = () => {
  const { t, isReverse } = useTrans();
  if (isReverse) dayjs.locale("he");
  else dayjs.locale("en");

  const { getToken } = useAuth();

  const hideToast = () => {
    document.getElementById("liveToast")?.classList?.remove("show");
  };

  const dateFormat = (searchInput) => {
    const { checkInDate, checkOutDate } = searchInput;
    const startDay = dayjs(checkInDate);
    const endDay = dayjs(checkOutDate);

    const sameMonth = startDay.isSame(endDay, "month");

    if (sameMonth) {
      return `${startDay.format("ddd D.M")} - ${endDay.format("ddd D.M")}`;
    } else {
      return `${startDay.format("ddd D.M")} - ${endDay.format("ddd D.M")}`;
    }
  };

  const onCopyInfo = (hotel, price, searchInput, link) => {
    const starIcons = Array.from(Array(hotel?.stars).keys())
      .map(() => "⭐️") // Use a simple star character
      .join("");

    const dateText = `${t("SearchBox.dates")}: ${dateFormat(searchInput)}`;
    const adultText = renderGuestText(
      t("SearchBox"),
      "Adults",
      searchInput?.adults
    );
    const childrenText = renderGuestText(
      t("SearchBox"),
      "Childrens",
      searchInput?.childrens
    );
    const guestsText = `${adultText} ${childrenText}`;
    const priceText = `${t("Hotel.price")} ${price}`;
    const reviewsText = `${t("Hotel.guestReviewsUpper")}: ${
      hotel?.rate
    } ${starIcons}`;
    const hotelText = `${t("Hotel.hotel")}: ${hotel?.title}`;
    if (link) {
      link = `${t("Hotel.link")} ${link}`;
    } else {
      link = "";
    }
    let text = `${dateText}\n${hotelText}\n${guestsText}\n${priceText}\n${reviewsText}\n${link}`;
    navigator.clipboard.writeText(text);
  };

  const shortenLink = async (target) => {
    if (!target) return;
    try {
      const token = await getToken();
      return await axios
        .post(
          `${TOURCOMPARE_BE_URL}/api/v1/shortlink`,
          {
            target,
          },
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => res.data);
    } catch (error) {
      console.error(error);
      return "";
    }
  };

  return {
    dateFormat,
    hideToast,
    onCopyInfo,
    shortenLink,
  };
};

export default useHotelInfoToast;
