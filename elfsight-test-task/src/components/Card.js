/* eslint-disable import/no-unused-modules */
import styled from 'styled-components';
import { ReactComponent as Male } from '../assets/genders/male.svg';
import { ReactComponent as Female } from '../assets/genders/female.svg';
import { ReactComponent as Genderless } from '../assets/genders/genderless.svg';

// Выносим иконки и цветовое решение отдельно для быстрого доступа и стандартизации.
const GENDER_ICONS = {
  Male: { Icon: Male, fill: '#33b3c8', size: 20 },
  Female: { Icon: Female, fill: 'pink', size: 24 },
  unknown: { Icon: Genderless, fill: '#999', size: 24 },
  Genderless: { Icon: Genderless, fill: '#999', size: 24 }
};

const STATUS_COLORS = {
  Alive: '#83bf46',
  Dead: '#ff5152',
  default: '#968c9d'
};

// Так же изменим наименование компонентов и стилей на более простое и
// понятное по структуре карточки.
export function Card({
  status,
  name,
  species,
  type,
  gender,
  image,
  onClickHandler
}) {
  return (
    <CardContainer onClick={onClickHandler}>
      <CardImg src={image} alt={name} />

      <CardContent>
        <CardHeader name={name} gender={gender} />

        <CardMeta status={status} species={species} type={type} />
      </CardContent>
    </CardContainer>
  );
}

export function CardHeader({ name, gender, className }) {
  const { Icon, fill, size } = GENDER_ICONS[gender] || {};

  return (
    <HeaderContainer className={className}>
      <CardName>{name}</CardName>
      {Icon && (
        <GenderIcon>
          <Icon width={size} heigth={size} fill={fill} title={gender} />
        </GenderIcon>
      )}
    </HeaderContainer>
  );
}

export function CardMeta({ status, species, type, className }) {
  return (
    <MetaContainer className={className}>
      <StatusIndicator status={status}>{status}</StatusIndicator>
      &nbsp;-&nbsp;
      <span>{species}</span>
      {type && <TypeInfo>{type}</TypeInfo>}
    </MetaContainer>
  );
}

// Так же изменим последовательность стилей в зависимости от очередности компонентов.
const CardContainer = styled.div`
  max-width: 400px;
  width: 100%;
  background: #263750;
  border-radius: 10px;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    cursor: pointer;
    transform: scale(1.01);
    box-shadow: 5px 5px 8px rgba(0, 0, 0, 0.2);
  }

  &:hover .card-title {
    color: #83bf46;
  }
`;

const CardImg = styled.img`
  width: 100%;
  border-radius: 10px 10px 0 0;
`;

const CardContent = styled.div`
  padding: 20px;
  color: #fff;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const CardName = styled.h2`
  margin-right: 8px;
  max-width: 100%;
  white-space: nowrap;
  font-size: 24px;
  text-overflow: ellipsis;
  overflow: hidden;
  transition: color 0.3s;

  @media (max-width: 450px) {
    max-width: 130px;
    font-size: 18px;
  }
`;

const GenderIcon = styled.div`
  display: flex;
  flex-shrink: 0;
`;

const MetaContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  aligen-items: center;
`;

const StatusIndicator = styled.span`
  display: flex;
  align-items: center;
  text-transform: capitalize;

  &::before {
    content: '';
    display: block;
    margin-right: 8px;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background-color: ${({ status }) =>
      STATUS_COLORS[status] || STATUS_COLORS.default};
  }
`;

const TypeInfo = styled.p`
  margin-top: 20px;
  width: 100%;
  color: #ddd;
  font-size: 16px;
`;
