'use client';

import useTrans from '@/hooks/useTrans';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import PersonalInfo from './PersonalInfo';
import { getUserRoleClient } from '@/utils/roleCheck';

const Index = () => {
  const { t } = useTrans();
  const params = useParams();
  const clerkId = params.id;
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  );
  const currentRole = getUserRoleClient();
  
  const tabs = [
    {
      label: t('Dashboard.PersonalInfo.personalInfoLabel'),
      content: <PersonalInfo clerkId={clerkId} currentRole={currentRole}/>,
    },
  ];

  const [tabIndex, setTabIndex] = useState(0);

  return (
    <QueryClientProvider client={queryClient}>
      <Tabs
        className="tabs -underline-2 js-tabs"
        selectedIndex={tabIndex}
        onSelect={index => setTabIndex(index)}
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
    </QueryClientProvider>
  );
};

export default Index;
