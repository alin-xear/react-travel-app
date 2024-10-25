import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        alert("There was an error loading data..");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, [setCities]);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (err) {
      console.log(err);
      alert("There was an error loading data..");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        setCities,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const returnValue = useContext(CitiesContext);
  if (returnValue === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return returnValue;
}

export { CitiesProvider, useCities };
