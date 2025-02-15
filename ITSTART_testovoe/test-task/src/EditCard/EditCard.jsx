import { observer } from 'mobx-react'
import { useForm } from 'react-hook-form'
import Server from '../api/json-server'
import './EditCard.css'

// Мы получаем данные с сервера (json-server) и передаем в компоненты для дальнейшего изменения.

const EditCard = () => {
  const { register, handleSubmit, getValues, formState: { errors } } = useForm()

  const onSubmit = () => { Server.updateSeminars(Server.seminar.id, { ...getValues() }) }

  const editDate = Server.seminar.date.split('.').reverse().join('-')

  return (
    <article className='modal'>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <label className="form__lable">
          Название семинара
          <input type="text" className="form__input" defaultValue={Server.seminar.title}
            {...register("title", { required: "Какое название семинара?" })} />
          {errors.title?.message && <span >{errors.title?.message}</span>}
        </label>

        <label className="form__lable">
          Ссылка на изображение
          <input type="text" className="form__input" defaultValue={Server.seminar.photo} />
        </label>

        <label className="form__lable">
          Описание семинара
          <textarea className="form__textarea" rows='5' defaultValue={Server.seminar.description}
            {...register("description", { required: "Что будет происходить?" })} ></textarea>
          {errors.description?.message && <span >{errors.description?.message}</span>}
        </label>

        <span className='form__data'>
          <label className="form__lable">
            Дата
            <input type="date" className="form__input" defaultValue={editDate}
              {...register("date", { required: "Какая дата?" })} />
            {errors.date?.message && <span >{errors.date?.message}</span>}
          </label>

          <label className="form__lable">
            Время
            <input type="time" className="form__input" defaultValue={Server.seminar.time}
              {...register("time", { required: "Какое время?" })} />
            {errors.time?.message && <span >{errors.time?.message}</span>}
          </label>
        </span>

        <span className="form__btn">
          <button type='submit'>Сохранить</button>
          <button type='button' onClick={() => { Server.switchEdit() }}>Отменить</button>
        </span>
      </form>
    </article >
  )
}

export default observer(EditCard)
