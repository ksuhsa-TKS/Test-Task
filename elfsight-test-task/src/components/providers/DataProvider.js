import axios from 'axios';
import { useCallback } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const API_URL = 'https://rickandmortyapi.com/api/character/';

export function DataProvider({ children }) {
  const [activePage, setActivePage] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [info, setInfo] = useState({});
  const [apiURL, setApiURL] = useState(API_URL);

  // Оборачиваем fetchData в useCallback для стабильной ссылки на функцию.
  const fetchData = useCallback(
    async (url) => {
      setIsFetching(true);
      setIsError(false);

      await axios
        .get(url)
        .then(({ data }) => {
          setIsFetching(false);
          setCharacters(data.results);
          setInfo(data.info);

          const urlObj = new URL(apiURL);
          const page = urlObj.searchParams.get('page') || 1;
          setActivePage(Number(page) - 1);
        })
        .catch((e) => {
          setIsFetching(false);
          setIsError(true);
          console.error(e);
        });
    },
    [apiURL]
  );

  useEffect(() => {
    fetchData(apiURL);
  }, [apiURL, fetchData]);

  // Убираем fetchData из зависимости, так как функция больше не влияет на данные.
  const dataValue = useMemo(
    () => ({
      activePage,
      setActivePage,
      apiURL,
      setApiURL,
      characters,
      isFetching,
      isError,
      info
    }),
    [activePage, apiURL, characters, isFetching, isError, info]
  );

  return (
    <DataContext.Provider value={dataValue}>{children}</DataContext.Provider>
  );
}

const DataContext = createContext({});

export const useData = () => useContext(DataContext);
