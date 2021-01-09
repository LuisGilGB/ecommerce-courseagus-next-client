import { createContext, useEffect, useState } from "react";
import { loadPlatforms } from "../api/platforms";

export const PlatformsContext = createContext();

export const PlatformProvider = ({ children }) => {
  const [platforms, setPlatforms] = useState([]);

  useEffect(async () => {
    (async () => {
      const { statusText, data: loadedPlatforms } = await loadPlatforms();
      statusText.toUpperCase() === "OK" && setPlatforms(loadedPlatforms);
    })();
  }, []);

  return (
    <PlatformsContext.Provider value={{ platforms }}>
      {children}
    </PlatformsContext.Provider>
  );
};
