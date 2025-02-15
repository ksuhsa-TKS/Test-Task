import Server from './api/json-server';
import './App.css'
import { observer } from 'mobx-react';
import { lazy, Suspense } from 'react';

const LazyEditCard = lazy(() => import('./EditCard/EditCard'));
const LazyDeleteCard = lazy(() => import('./DeleteCard/DeleteCard'));
const LazyCards = lazy(() => import('./Cards/Cards'));

const App = () => {
  Server.getSeminars()

  return (
    <Suspense fallback={
      <div className='loading'>Идет загрузка данных, подождите...</div>
    }>
      {Server.edit && <LazyEditCard />}
      {Server.delete && <LazyDeleteCard />}

      <h1 className='title'>Семинары</h1>

      {Server.message === '' ? <LazyCards /> : <span>Упс... Произошла ошибка, перезагрузите страницу.</span>}
    </Suspense>
  )
}

export default observer(App)
