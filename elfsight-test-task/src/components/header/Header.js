import styled from 'styled-components';
import { Logo } from './Logo';
import { Filter } from './Filter';

export function Header() {
  return (
    <HeaderContainer>
      <Logo />

      <Filter />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 950px) {
    flex-flow: column;
    gap: 30px;
  }
`;
