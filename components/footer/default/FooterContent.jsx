import Link from 'next/link';

const FooterContent = ({ t, isReverse }) => {
  
  const data = [
    {
      id: 1,
      title: t('Footer.quickLinks'),
      menuList: [
        { name: t('Footer.userGuide'), routerPath: '/' },
        { name: t('Footer.termOfUse'), routerPath: '/' },
        { name: t('Footer.privacyPolicy'), routerPath: '/' },
      ],
    },
    {
      id: 2,
      title: t('Footer.services'),
      menuList: [
        { name: t('Footer.shortenLink'), routerPath: '/shorten-link' },
        {
          name: t('Footer.citiesInCountry'),
          routerPath: '/#destinationsWeLove',
        },
        {
          name: t('Footer.popularTouristAttractions'),
          routerPath: '/#destinationsWeLove',
        },
      ],
    },
  ];

  return (
    <>
      {data.map(item => (
        <div className="col-xl-3 col-lg-3 col-sm-6" key={item.id}>
          <h5 className={`text-16 mb-30 fw-${isReverse ? '600': '500'}`}>{item.title}</h5>
          <div className="d-flex y-gap-10 flex-column">
            {item.menuList.map((menu, i) => (
              <Link
                href={menu.routerPath}
                key={i}
                dangerouslySetInnerHTML={{
                  __html: <>{menu.name}</>,
                }}
              ></Link>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default FooterContent;
