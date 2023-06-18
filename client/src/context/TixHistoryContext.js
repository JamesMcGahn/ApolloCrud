import { createContext, useState, useMemo } from 'react';

export const TixHistoryContext = createContext();

export function TixHistoryProvider({ children }) {
  const [ticketHistory, setTicketHistory] = useState([]);

  const addHistory = (tix) => {
    const tixx = [...ticketHistory];
    const tickets = tixx.filter((ptixes) => ptixes !== tix);
    setTicketHistory([...tickets, tix]);
  };

  const value = useMemo(() => ({ ticketHistory, addHistory }), [ticketHistory]);
  return (
    <TixHistoryContext.Provider value={value}>
      {children}
    </TixHistoryContext.Provider>
  );
}
