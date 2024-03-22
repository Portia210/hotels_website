'use client';

import React, { useEffect, useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import PersonalInfo from './PersonalInfo';
import useTrans from '@/hooks/useTrans';
import UserBilling from './UserBilling';
import { useRouter } from 'next/navigation';

const Index = () => {
  const router = useRouter();
  const { t } = useTrans();
  const tabs = [
    {
      label: t('Dashboard.PersonalInfo.personalInfoLabel'),
      content: <PersonalInfo />,
      value: 'personalInfo',
    },
    {
      label: t('Billing.billingTab'),
      content: <UserBilling />,
      value: 'billing',
    },
  ];

  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const hash = window?.location?.hash;
    const tab = tabs.findIndex(tab => tab?.value === hash.replace('#', ''));
    if (tab > -1) setTabIndex(tab);
  }, []);

  return (
    <Tabs
      className="tabs -underline-2 js-tabs"
      selectedIndex={tabIndex}
      onSelect={index => {
        router.push(`#${tabs[index].value}`);
        setTabIndex(index);
      }}
    >
      <TabList className="tabs__controls row x-gap-40 y-gap-10 lg:x-gap-20">
        {tabs.map((tab, index) => (
          <Tab key={index} className="col-auto">
            <button className="tabs__button text-18 lg:text-16 text-light-1 fw-500 pb-5 lg:pb-0 js-tabs-button">
              {tab.label}
            </button>
          </Tab>
        ))}
      </TabList>

      <div className="tabs__content pt-30 js-tabs-content">
        {tabs.map((tab, index) => (
          <TabPanel
            key={index}
            className={`-tab-item-${index + 1} ${
              tabIndex === index ? 'is-tab-el-active' : ''
            }`}
          >
            {tab.content}
          </TabPanel>
        ))}
      </div>
    </Tabs>
  );
};

export default Index;
