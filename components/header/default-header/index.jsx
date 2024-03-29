import TransConfig from "@/components/config/TransConfig";
import Header1 from "@/components/header/header-1";
import { useMessages } from "next-intl";

const DefaultHeader = () => {
  const messages = useMessages();
  return (
    <>
      <Header1 />
      <TransConfig messages={messages} />
    </>
  );
};

export default DefaultHeader;
