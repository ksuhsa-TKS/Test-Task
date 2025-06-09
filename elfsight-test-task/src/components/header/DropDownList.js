import styled, { css } from 'styled-components';
import { useState, useCallback, useEffect, useRef } from 'react';
import { ReactComponent as Arrow } from '../../assets/drop-down-list/arrow.svg';
import { ReactComponent as Cross } from '../../assets/drop-down-list/cross.svg';

export const DropDownList = ({ nameList, listItem, onChange, valueList }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const value = valueList || nameList;

  const toggleDropdown = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeDropdown = useCallback(() => setIsOpen(false), []);

  const handleSelect = useCallback(
    (e) => {
      closeDropdown();
      onChange({
        target: {
          name: nameList.toLowerCase(),
          value: e.target.innerHTML
        }
      });
    },
    [nameList, onChange, closeDropdown]
  );

  const handleReset = useCallback(
    (e) => {
      e.stopPropagation();
      onChange({
        target: {
          name: nameList.toLowerCase(),
          value: ''
        }
      });
    },
    [nameList, onChange]
  );

  // Закрываем список если клик происходит вне его окна.
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeDropdown]);

  return (
    <DropDownListWrap ref={dropdownRef}>
      <SelectionBtn
        onClick={toggleDropdown}
        $isSelected={value !== nameList}
        aria-expanded={isOpen}
      >
        {value}
        {value === nameList ? (
          <ArrowIcon $isOpen={isOpen} />
        ) : (
          <CrossIcon onClick={handleReset} />
        )}
      </SelectionBtn>

      {isOpen && (
        <DropdownMenu>
          {listItem.map((item) => (
            <DropdownItem
              key={item}
              onClick={handleSelect}
              $isActive={value === item}
            >
              {item}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </DropDownListWrap>
  );
};

const DropDownListWrap = styled.div`
  position: relative;
  width: fit-content;
`;

const SelectionBtn = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid #83bf46;
  border-radius: 8px;
  padding: 12px 12px 12px 16px;
  width: 180px;
  height: 40px;
  background: #263750;
  font-size: 16px;
  color: ${({ $isSelected }) =>
    $isSelected
      ? 'var(--text-primary, #f5f5f5)'
      : 'var(--text-secondary, #b3b3b3)'};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:focus-visible,
  &:hover,
  &:active {
    outline: none;
    border: 1px solid #83bf46;
    background: #346;
  }

  @media (max-width: 950px) {
    width: 150px;
  }

  @media (max-width: 530px) {
    width: 240px;
  }
`;

const DropdownMenu = styled.ul`
  position: absolute;
  display: flex;
  justify-content: space-between;
  flex-flow: column;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  margin-top: 6px;
  width: 180px;
  max-height: 158px;
  background: #fff;
  box-shadow: 0 1px 4px 0 rgba(12, 12, 13, 0.05),
    0 1px 4px 0 rgba(12, 12, 13, 0.1);
  z-index: 20;
  overflow: hidden auto;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #d9d9d9;
  }

  @media (max-width: 950px) {
    width: 150px;
  }

  @media (max-width: 530px) {
    width: 240px;
  }
`;

const DropdownItem = styled.li`
  padding: 8px 16px;
  cursor: pointer;
  ${({ $isActive }) =>
    $isActive &&
    css`
      font-weight: 600;
      background: rgba(131, 191, 70, 0.1);
    `}
  &:hover {
    background: rgba(131, 191, 70, 0.2);
  }
`;

const IconStyle = css`
  width: 16px;
  height: 16px;
  transition: all 0.2s ease-in-out;
`;

const ArrowIcon = styled(Arrow)`
  ${IconStyle}
  stroke: #b2b2b2;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'none')};
`;

const CrossIcon = styled(Cross)`
  ${IconStyle}
  stroke: #f5f5f5;
  &:hover {
    stroke: #83bf46;
  }
`;
