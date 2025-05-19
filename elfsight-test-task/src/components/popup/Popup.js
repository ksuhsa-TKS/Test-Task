import styled, { css } from 'styled-components';
import { PopupEpisodes } from './PopupEpisodes';
import { PopupHeader } from './PopupHeader';
import { PopupInfo } from './PopupInfo';
import { useCallback, useEffect } from 'react';

export function Popup({ settings: { visible, content = {} }, setSettings }) {
  // Навешиваем useCallback для корректной работы и изменяем обработку события, так как
  // ранее обработчик навешивался на сам элемент, а не на псевдоэлемент.
  const togglePopup = useCallback(() => {
    setSettings((prevState) => ({
      ...prevState,
      // Так же здесь мы можем указать сразу false, так как это всегда закрытие окна.
      visible: false
    }));
  }, [setSettings]);

  // Эффект для управления прокруткой body.
  useEffect(() => {
    if (visible) {
      // Запоминаем позицию скролла.
      const scrollY = window.scrollY;
      // Блокируем прокрутку при этом оставляем скроллбар видимым, что бы контент не прыгал.
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflowY = 'scroll';

      return () => {
        // При размонтировании возвращаем стстояние как было.
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.overflowY = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [visible]);

  // Так же стоит добавить проверку на наличие контента и подготовить заглушку на случай
  // если нет данных.
  if (!content || !visible) return null;

  const {
    name,
    gender,
    image,
    status,
    species,
    type,
    origin,
    location,
    episode: episodes
  } = content;

  return (
    <PopupContainer visible={visible}>
      <StyledPopup>
        <CloseIcon onClick={togglePopup} />

        <PopupHeader
          name={name}
          gender={gender}
          image={image}
          status={status}
          species={species}
          type={type}
        />

        <PopupInfo origin={origin} location={location} />

        <PopupEpisodes episodes={episodes} />
      </StyledPopup>
    </PopupContainer>
  );
}

const PopupContainer = styled.div`
  position: fixed;
  z-index: 10;
  background: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100vh;
  color: #fff;
  top: 0;
  left: 0;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  transition: opacity 0.3s, visibility 0.3s;

  ${({ visible }) =>
    visible &&
    css`
      opacity: 1;
      visibility: initial;
      pointer-events: all;
    `}
`;

const StyledPopup = styled.div`
  position: relative;
  width: 40%;
  margin: 0 auto;
  height: auto;
  max-height: 90vh;
  margin-top: calc(10vh - 20px);
  background: #263750;
  border-radius: 15px;
  padding: 20px 40px;
  border: 2px solid #83bf46;
  overflow: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 930px) {
    width: 80%;
  }

  @media (max-width: 600px) {
    width: 95%;
  }
`;

const CloseIcon = styled.div`
  cursor: pointer;
  position: fixed;
  right: calc(30% - 10px);
  top: calc(10vh - 30px);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #83bf46aa;

  &:before,
  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 20px;
    height: 2px;
    background: #fff;
  }

  &:before {
    left: 4.5px;
    transform: rotate(-45deg);
  }

  &:after {
    right: 4.5px;
    transform: rotate(45deg);
  }

  @media (max-width: 930px) {
    right: calc(10% - 10px);
  }

  @media (max-width: 600px) {
    right: calc(3% - 10px);
  }
`;
