import { useState, useEffect } from 'react';
import { textConverter } from '../../utils/textConverter';
import axios from 'axios';

const API_URL = 'https://rickandmortyapi.com/api/character/';

export function FilterProvider() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchAllCharacters = async () => {
      let allCharacters = [];
      let nextUrl = API_URL;

      while (nextUrl) {
        const { data } = await axios.get(nextUrl);
        allCharacters = [...allCharacters, ...data.results];
        nextUrl = data.info.next;
      }

      setCharacters(allCharacters);
    };

    fetchAllCharacters();
  }, []);

  const getUniqueList = (key) => {
    return [...new Set(characters.map((el) => textConverter(el[key])))];
  };

  return {
    statusList: getUniqueList('status'),
    genderList: getUniqueList('gender'),
    speciesList: getUniqueList('species')
  };
}
