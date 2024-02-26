const ContactInfo = ({ t }) => {
  const contactContent = [
    {
      action: [
        {
          link: '/contact',
          text: t('Footer.contactUs'),
        },
      ],
    },
    {
      title: t('Footer.supportEmailAddress'),
      action: [
        {
          link: 'mailto:agent1spc@gmail.com',
          text: 'agent1spc@gmail.com',
        },
      ],
    },
    {
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
    {
      title: t('Footer.businessDetail'),
      action: [
        {
          title: t('Footer.phoneNumber'),
          link: 'tel:+972-53332-4495',
          text: '+972-53332-4495',
        },
        {
          title: t('Footer.address'),
          text: t('Footer.businessAddress'),
        },
      ],
    },
  ];
  return (
    <>
      {contactContent.map((item, idx) => (
        <div className="mt-30" key={idx}>
          {item.title && <div className={'text-16 mt-10'}>{item.title}</div>}
          {Array.isArray(item.action) && (
            <div>
              {item.action.map((action, index) => (
                <div key={index}>
                  {action.title && (
                    <div className={'text-16 mt-5'}>{action.title}</div>
                  )}
                  <a
                    href={action.link}
                    target="_blank"
                    className="d-block text-18 fw-500 text-blue-1"
                  >
                    {action.text}
                  </a>
                </div>
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
