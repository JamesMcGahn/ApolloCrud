import { createContext, useState } from 'react';

export const TixDashTabContext = createContext();

export function TixDashTabsProvider({ children }) {
  const [tabStatuses, setTabStatuses] = useState([
    'All',
    'New',
    'Open',
    'Pending',
    'Blocked',
    'Closed',
  ]);
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <TixDashTabContext.Provider
      value={{ tabStatuses, setTabStatuses, currentTab, setCurrentTab }}
    >
      {children}
    </TixDashTabContext.Provider>
  );
}
