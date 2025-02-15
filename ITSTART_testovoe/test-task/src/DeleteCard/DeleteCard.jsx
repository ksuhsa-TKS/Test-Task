import Server from '../api/json-server'
import './DeleteCard.css'

// Что случайно не удалить не тот семинар я добавила название семинара в окно соглашения.

const DeleteCard = () => {
  return (
    <article className='modal'>
      <div className='window'>
        <span className="window__descr">
          Выдействительно хотите удалить семинар: "{Server.seminar.title}"?
        </span>

        <span className="window__btn">
          <button onClick={() => { Server.deleteSeminar(Server.seminar.id) }}>Удалить</button>
          <button onClick={() => { Server.switchDelete() }} >Отмена</button>
        </span>
      </div>
    </article>
  )
}

export default DeleteCard
