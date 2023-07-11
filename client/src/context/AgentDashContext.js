import { createContext, useState, useMemo } from 'react';

export const AgentDashContext = createContext();

export function AgentDashProvider({ children }) {
  const [dashOpen, setDashOpen] = useState(true);

  const value = useMemo(
    () => ({ dashOpen, setDashOpen }),
    [dashOpen, setDashOpen],
  );

  return (
    <AgentDashContext.Provider value={value}>
      {children}
    </AgentDashContext.Provider>
  );
}
