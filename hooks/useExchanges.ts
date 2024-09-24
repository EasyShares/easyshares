import { OnlineUsers } from "@/actions/online-users";
import { LiveExchages } from "@/actions/transactions";
import { useEffect, useState } from "react";

const useExchanges = () => {
  const [exchanges, setExchanges] = useState<any>([]);
  const [onlineusers, setOnlineusers] = useState<any>([]);

  let liveExchangesTimeout: NodeJS.Timeout | null = null;
  let onlineUsersTimeout: NodeJS.Timeout | null = null;

  const fetchLiveExchanges = async () => {
    try {
      const data: any = await LiveExchages();
      if (data && data.success) {
        setExchanges(data.exchanges);
      }
    } catch (error) {
      console.error("Error fetching live exchanges:", error);
    } finally {
      liveExchangesTimeout = setTimeout(fetchLiveExchanges, 1000);
    }
  };

  const fetchOnlineUsers = async () => {
    try {
      const data: any = await OnlineUsers();
      if (data && data.success) {
        setOnlineusers(data.users);
      }
    } catch (error) {
      console.error("Error fetching online users:", error);
    } finally {
      onlineUsersTimeout = setTimeout(fetchOnlineUsers, 1000);
    }
  };

  useEffect(() => {
    fetchLiveExchanges();
    fetchOnlineUsers();
    return () => {
      if (liveExchangesTimeout) clearTimeout(liveExchangesTimeout);
      if (onlineUsersTimeout) clearTimeout(onlineUsersTimeout);
    };
  }, []);

  return { exchanges, onlineusers };
};

export default useExchanges;
