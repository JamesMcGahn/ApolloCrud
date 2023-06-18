import { createContext, useState, useMemo } from 'react';

export const TixHistoryContext = createContext();

export function TixHistoryProvider({ children }) {
  const [ticketHistory, setTicketHistory] = useState([]);

  const addHistory = (tix) => {
    const set = new Set([...ticketHistory]);
    set.add(tix);
    setTicketHistory(Array.from(set));
  };

  const removeHistory = (tix) => {
    const tixx = [...ticketHistory];
    const tickets = tixx.filter((ptixes) => ptixes !== tix);
    setTicketHistory(tickets);
  };

  const value = useMemo(
    () => ({ ticketHistory, addHistory, removeHistory }),
    [ticketHistory],
  );
  return (
    <TixHistoryContext.Provider value={value}>
      {children}
    </TixHistoryContext.Provider>
  );
}
