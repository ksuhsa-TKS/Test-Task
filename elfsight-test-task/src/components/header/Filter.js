import styled from 'styled-components';
import { DropDownList } from './DropDownList';
import { FilterProvider } from './FilterProvider';
import { useData } from '../providers';
import { useCallback, useState } from 'react';

const initialFilters = {
  name: '',
  status: '',
  species: '',
  type: '',
  gender: ''
};

const API_BASE_URL = 'https://rickandmortyapi.com/api/character/';

export function Filter() {
  const { apiURL, setApiURL } = useData();
  const { statusList, genderList, speciesList } = FilterProvider();
  const [filters, setFilters] = useState(initialFilters);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;

    setFilters((prev) => ({ ...prev, [name]: value }));
  }, []);

  const updateURL = useCallback((url, filters) => {
    const newURL = new URL(url);
    // Сбрасивыем на первую страницу.
    newURL.searchParams.set('page', '1');

    // Очищаем предыдущие параметры фильтрации.
    ['name', 'status', 'species', 'type', 'gender'].forEach((param) => {
      newURL.searchParams.delete(param);
    });

    // Добавляем только активные фильтры.
    Object.entries(filters).forEach(([key, value]) => {
      value && newURL.searchParams.set(key, value);
    });

    return newURL;
  }, []);

  const applyFilters = useCallback(() => {
    const newURL = updateURL(apiURL, filters);
    setApiURL(newURL);
  }, [apiURL, filters, setApiURL, updateURL]);

  const resetFilters = useCallback(() => {
    setFilters(initialFilters);

    const newURL = updateURL(API_BASE_URL, initialFilters);

    setApiURL(newURL.toString());
  }, [setApiURL, updateURL]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      applyFilters();
    },
    [applyFilters]
  );

  return (
    <FilterContainer onSubmit={handleSubmit}>
      <DropDownList
        nameList="Status"
        listItem={statusList}
        onChange={handleInputChange}
        valueList={filters.status}
      />

      <DropDownList
        nameList="Gender"
        listItem={genderList}
        onChange={handleInputChange}
        valueList={filters.gender}
        wrapper
      />

      <DropDownList
        nameList="Species"
        listItem={speciesList}
        onChange={handleInputChange}
        valueList={filters.species}
        wrapper
      />

      <InputField
        name="name"
        type="text"
        placeholder="Name"
        onChange={handleInputChange}
        value={filters.name}
        wrapper
      />

      <InputField
        name="type"
        type="text"
        placeholder="Type"
        onChange={handleInputChange}
        value={filters.type}
        wrapper
      />

      <BtnContainer>
        <BtnApply type="submit">Apply</BtnApply>
        <BtnReset type="button" onClick={resetFilters}>
          Reset
        </BtnReset>
      </BtnContainer>
    </FilterContainer>
  );
}

const FilterContainer = styled.form`
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
  max-width: 561px;

  @media (max-width: 950px) {
    gap: 15px;
  }
  @media (max-width: 530px) {
    flex-flow: column;
  }
`;

const InputField = styled.input.attrs({
  type: 'text'
})`
  border: 1px solid #83bf46;
  border-radius: 8px;
  padding: 12px 16px;
  width: 180px;
  height: 40px;
  background: #263750;
  font-size: 16px;
  color: #f5f5f5;
  transition: all 0.2s ease-in-out;

  &::placeholder {
    color: #b3b3b3;
  }

  &:focus,
  &:hover,
  &:active {
    outline: none;
    border-color: #83bf46;
    background: #346;
  }

  @media (max-width: 950px) {
    width: 150px;
  }
  @media (max-width: 530px) {
    width: 240px;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 530px) {
    width: 100%;
    justify-content: center;
  }
`;

const Btn = styled.button`
  border-radius: 8px;
  padding: 12px;
  width: 85px;
  height: 40px;
  background: transparent;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  @media (max-width: 950px) {
    width: 70px;
  }
  @media (max-width: 530px) {
    width: 100%;
  }
`;

const BtnApply = styled(Btn)`
  border: 1px solid #83bf46;
  color: #83bf46;

  &:hover {
    background: #83bf46;
    color: #fff;
  }
`;

const BtnReset = styled(Btn)`
  border: 1px solid #ff5152;
  color: #ff5152;

  &:hover {
    background: #ff5152;
    color: #fff;
  }
`;
