import { action, makeObservable, observable, runInAction } from 'mobx'

const API_URL = 'http://localhost:3000'

class Server {
  list = []
  message = ''
  seminar = null
  edit = false
  delete = false

  constructor() {
    makeObservable(this, {
      list: observable,
      message: observable,
      seminar: observable,
      edit: observable,
      delete: observable,

      getSeminars: action.bound,
      updateSeminars: action.bound,
      deleteSeminar: action.bound,
      switchEdit: action.bound,
      switchDelete: action.bound,
    })
  }

  getSeminars = () => {
    fetch(`${API_URL}/seminars`).then((res) => res.json())
      .then((data) => runInAction(() => { this.list = data }))
      .catch((err) => runInAction(() => { this.message = err.message }))
  }

  updateSeminars = (id, value) => {
    const editDate = value.date.split('-').reverse().join('.')

    fetch(`${API_URL}/seminars/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        title: value.title,
        description: value.description,
        date: editDate,
        time: value.time,
        photo: value.photo,
      }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' }
    })
      .then((res) => res.json())
      .then((data) => {
        const i = this.list.findIndex(el => el.id === id)
        runInAction(() => { this.list.splice(i, 1, data) })
      })
      .catch((err) => runInAction(() => { this.message = err.message }))

    this.seminar = null
    this.switchEdit()
  }

  deleteSeminar = (id) => {
    fetch(`${API_URL}/seminars/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        res.status === 200 ? runInAction(() => { this.list = this.list.filter(el => el.id !== id) })
          : runInAction(() => { this.message = res.status })
      })

    this.seminar = null
    this.switchDelete()
  }

  switchEdit = (seminar = null) => {
    seminar === null ? (this.edit = !this.edit) : (this.seminar = seminar, this.edit = !this.edit)
  }

  switchDelete = (seminar = null) => {
    seminar === null ? (this.delete = !this.delete) : (this.seminar = seminar, this.delete = !this.delete)
  }
}

export default new Server()
