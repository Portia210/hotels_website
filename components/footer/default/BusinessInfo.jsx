export default function BusinessInfo({ t }) {
  const contactContent = [
    {
      action: [
        {
          title: t('Footer.address'),
          text: t('Footer.businessAddress'),
        },
        {
          title: t('Footer.phoneNumber'),
          link: 'tel:+972-53332-4495',
          text: '+972-53332-4495',
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
                    className="d-block text-18 fw-500 text-blue-1 text-nowrap"
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
}
