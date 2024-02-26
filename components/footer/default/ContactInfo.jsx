const ContactInfo = ({ t }) => {
  const contactContent = [
    {
      id: 1,
      title: t('Footer.supportEmailAddress'),
      action: 'mailto:agent1spc@gmail.com',
      text: 'agent1spc@gmail.com',
    },
    {
      id: 2,
      title: t('Footer.contactPage'),
      action: [
        {
          link: '/contact',
          text: t('Footer.contactUs'),
        },
      ],
    },
    {
      id: 3,
      title: t('Footer.phoneNumber'),
      action: [
        {
          link: 'tel:+972-53332-4495',
          text: '+972-53332-4495',
        },
      ],
    },
    {
      id: 4,
      title: t('Footer.whatsappSupportGroup'),
      action: [
        {
          link: 'https://chat.whatsapp.com/JrGL7UOxEqQIsMhCKivh1S',
          text: t('Footer.hebrewGroup'),
        },
        {
          link: 'https://chat.whatsapp.com/JqYHRcwAwQx9bi7b11vg9I',
          text: t('Footer.englishGroup'),
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
              className="text-16 text-blue-500 hover:underline"
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
