import { createContext, useState, useMemo } from 'react';

export const TixHistoryContext = createContext();

export function TixHistoryProvider({ children }) {
  const [ticketHistory, setTicketHistory] = useState([]);

  const addHistory = (tix) => {
    const uniqueTickets = (arr, trackTixId = new Set()) => {
      return arr.filter(({ ticket }) => {
        return trackTixId.has(ticket) ? false : trackTixId.add(ticket);
      });
    };

    const newHistory = uniqueTickets([...ticketHistory, tix]);

    setTicketHistory(newHistory);
  };

  const removeHistory = (tix) => {
    const tixx = [...ticketHistory];
    const tickets = tixx.filter((ptixes) => !tix.includes(ptixes.ticket));
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
