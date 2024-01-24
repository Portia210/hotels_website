import Header1 from "@/components/header/header-1";
import { useMessages } from 'next-intl';

const DefaultHeader = () => {
  const messages = useMessages();
  return <Header1 messages={messages}/>;
};

export default DefaultHeader;
