import { observer } from 'mobx-react'
import Server from '../api/json-server'
import './Card.css'

// В этот компоненте мы передаем данные семинара на сервер для дальнейшей работы с другими компонентами.

const Card = ({ seminar }) => {
  return (
    <div className="card">
      <span className="card__img">
        <img src={seminar.photo} alt={seminar.title} />
      </span>

      <div className="card__wrap">
        <h2 className='card__title'>{seminar.title}</h2>
        <p>{seminar.description}</p>

        <span className="card__data">
          <span>{seminar.date}</span>
          <span>{seminar.time}</span>
        </span>

        <span className="card__btn">
          <button onClick={() => { Server.switchEdit(seminar) }}>Изменить</button>
          <button onClick={() => { Server.switchDelete(seminar) }}>Удалить</button>
        </span>
      </div>
    </div>
  )
}

export default observer(Card)
