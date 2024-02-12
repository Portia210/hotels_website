const ContactInfo = () => {
  const contactContent = [
    {
      id: 1,
      title: "Need live support?",
      action: "mailto:xyz@abc.com",
      text: "hi@gotrip.com",
    },
    {
      id: 2,
      title: "Contact Page",
      action: "/contact",
      text: "Contact us",
    },
    {
      id: 3,
      title: "Support WhatsApp Group",
      action: "/contact",
      text: "Join our WhatsApp Group",
    },
  ];
  return (
    <>
      {contactContent.map((item) => (
        <div className="mt-30" key={item.id}>
          <div className={"text-14 mt-30"}>{item.title}</div>
          <a href={item.action} target="_blank" className="text-18 fw-500 text-blue-1 mt-5">
            {item.text}
          </a>
        </div>
      ))}
    </>
  );
};

export default ContactInfo;
