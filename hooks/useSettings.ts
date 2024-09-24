import { fetchSettings } from "@/actions/content-manager";
import React, { useEffect, useState } from "react";

const useSettings = () => {
  const [settings, setSettings] = useState<any>([]);

  let settingsTimeout: NodeJS.Timeout | null = null;

  const fetchAllSettings = async () => {
    try {
      const data: any = await fetchSettings();
      if (data && data.success) {
        setSettings(data.settings);
      }
    } catch (error) {
      console.error("Error fetching live exchanges:", error);
    } finally {
      settingsTimeout = setTimeout(fetchAllSettings, 1000);
    }
  };

  useEffect(() => {
    fetchAllSettings();
    return () => {
      if (settingsTimeout) clearTimeout(settingsTimeout);
    };
  }, []);

  return settings;
};

export default useSettings;
