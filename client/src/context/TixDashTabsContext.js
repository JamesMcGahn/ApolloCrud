import { createContext, useState, useMemo } from 'react';

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
  const value = useMemo(
    () => ({ tabStatuses, setTabStatuses, currentTab, setCurrentTab }),
    [tabStatuses, currentTab],
  );

  return (
    <TixDashTabContext.Provider value={value}>
      {children}
    </TixDashTabContext.Provider>
  );
}
