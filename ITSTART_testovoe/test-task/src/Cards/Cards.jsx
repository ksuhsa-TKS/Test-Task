import { observer } from "mobx-react"
import Card from "../Card/Card"
import Server from "../api/json-server"
import './Cards.css'

const Cards = () => {
  return (
    <ul className='cards'>
      {Server.list.map((el) => (
        <li className='cards__item' key={el.id}>
          <Card seminar={el} />
        </li>
      ))}
    </ul>
  )
}

export default observer(Cards)
