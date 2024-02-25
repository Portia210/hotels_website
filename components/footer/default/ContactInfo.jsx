const ContactInfo = () => {
  const contactContent = [
    {
      id: 1,
      title: 'Need live support?',
      action: 'mailto:xyz@abc.com',
      text: 'hi@gotrip.com',
    },
    {
      id: 2,
      title: 'Contact Page',
      action: [
        {
          link: '/contact',
        },
      ],
      text: 'Contact us',
    },
    {
      id: 3,
      title: 'Support WhatsApp Group',
      action: [
        {
          link: 'https://chat.whatsapp.com/JrGL7UOxEqQIsMhCKivh1S',
          text: 'Hebrew WhatsApp Group',
        },
        {
          link: 'https://chat.whatsapp.com/JqYHRcwAwQx9bi7b11vg9I',
          text: 'English WhatsApp Group',
        },
      ],
    },
  ];
  return (
    <>
      {contactContent.map(item => (
        <div className="mt-30" key={item.id}>
          <div className={'text-16 mt-30'}>{item.title}</div>
          {Array.isArray(item.action) && (
            <div>
              {item.action.map((action, index) => (
                <a
                  href={action.link}
                  key={index}
                  target="_blank"
                  className="d-block text-18 fw-500 text-blue-1 mt-5"
                >
                  {action.text}
                </a>
              ))}
            </div>
          )}
          {!Array.isArray(item.action) && (
            <a
              href={item.action}
              className="text-14 text-blue-500 hover:underline"
            >
              {item.text}
            </a>
          )}
        </div>
      ))}
    </>
  );
};

export default ContactInfo;
