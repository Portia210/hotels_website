import Wrapper from "@/components/layout/Wrapper";
import MainHome from "./(homes)/home_1/page";

export const metadata = {
  title: "GoTrip: Home",
  description: "GoTrip - Travel & Tour",
};

export default function Home() {
  return (
    <>
      <Wrapper>
        <MainHome />
      </Wrapper>
    </>
  );
}
