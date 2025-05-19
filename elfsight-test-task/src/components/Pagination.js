import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useData } from './providers';
import { useCallback } from 'react';

export function Pagination() {
  const [pages, setPages] = useState([]);
  const { apiURL, info, activePage, setActivePage, setApiURL } = useData();

  // Оборачиваем  обработчик клика в useCallback для мемоизации, так как
  // у нас будет зависимость от внешних данных.
  const handlePageClick = useCallback(
    (pageIndex) => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setActivePage(pageIndex);

      pages[pageIndex] && setApiURL(pages[pageIndex]);
    },
    [pages, setActivePage, setApiURL]
  );

  // Создаем обработчики для кнопок, это нужно для стабильности и вынесения вызова из разметки.
  const goToFirstPage = useCallback(() => handlePageClick(0), [
    handlePageClick
  ]);
  const goToPrevPage = useCallback(() => handlePageClick(activePage - 1), [
    handlePageClick,
    activePage
  ]);
  const goToNextPage = useCallback(() => handlePageClick(activePage + 1), [
    handlePageClick,
    activePage
  ]);
  const goToLastPage = useCallback(() => handlePageClick(info?.pages - 1), [
    handlePageClick,
    info?.pages
  ]);

  useEffect(() => {
    if (!info?.pages) return;

    const createdPages = Array.from({ length: info.pages }, (_, i) => {
      const URLWithPage = new URL(apiURL);
      URLWithPage.searchParams.set('page', i + 1);

      return URLWithPage;
    });

    setPages(createdPages);
  }, [apiURL, info]);

  if (!info?.pages || info.pages <= 1) return null;

  // Убираем вложенность элементов и изменяем оформление на более лаконичное и читаемое,
  // при этом не ломаем логику отрисовки.
  return (
    <StyledPagination>
      {activePage > 1 && (
        <>
          <Page onClick={goToFirstPage}>« First</Page>
          {activePage > 2 && <Ellipsis>...</Ellipsis>}
        </>
      )}

      {activePage > 0 && <Page onClick={goToPrevPage}>{activePage}</Page>}

      <Page active>{activePage + 1}</Page>

      {activePage < info.pages - 1 && (
        <Page onClick={goToNextPage}>{activePage + 2}</Page>
      )}

      {activePage < info.pages - 2 && (
        <>
          {activePage < info.pages - 3 && <Ellipsis>...</Ellipsis>}
          <Page onClick={goToLastPage}>Last »</Page>
        </>
      )}
    </StyledPagination>
  );
}

const StyledPagination = styled.div`
  width: 100%;
  text-align: center;
`;

const Page = styled.span`
  color: #fff;
  font-size: 18px;
  padding: 5px;
  cursor: pointer;
  transition: color 0.2s;
  ${({ active }) => active && 'color: #83bf46'};

  &:hover {
    color: #83bf46;
  }
`;

const Ellipsis = styled(Page)`
  cursor: default;

  &:hover {
    color: #fff;
  }
`;
