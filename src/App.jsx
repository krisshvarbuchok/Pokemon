import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { changeNavigation } from './redux/slice/navigationSlice';
import ContentPagination from './Content/ContentPagination';
import ContentInfiniteScroll from './Content/ContentInfiniteScroll';
import { fetchGetMoreAboutPokemon, fetchGetPokemon } from './redux/slice/listSlice';
import { useEffect } from 'react';

export const LIMIT = 5;
export const OFFSET = 5;

function App() {
  const navigation = useSelector(state => state.navigation);
  const dispatch = useDispatch();
  const { data } = useSelector(state => state.list);
  //console.log(data);

  useEffect(() => {
      dispatch(fetchGetPokemon({limit: LIMIT, offset: OFFSET}));
    }, []);
    useEffect(()=>{
      data.forEach(item => dispatch(fetchGetMoreAboutPokemon(item.url)))
    }, [data, dispatch])


  return (
    <div className='container'>
      <div className='display'>
        <div className='pokemons' onClick={() => dispatch(changeNavigation(''))}><p className='stylePokemon'>Покемоны</p></div>
        <div className='styleButton'>
        </div>
        <div className='panel'>
          <div className={navigation === 'pagination' ? 'active' : 'navigationPanel'} onClick={() => dispatch(changeNavigation('pagination'))}>Пагинация</div>
          <div className={navigation === 'infiniteScroll' ? 'active' : 'navigationPanel'} onClick={() => dispatch(changeNavigation('infiniteScroll'))}>Бесконечная прокрутка</div>
        </div>
        {navigation === 'pagination' && <ContentPagination />}
        {navigation === 'infiniteScroll' && <ContentInfiniteScroll />}
      </div>
    </div >
  )
}

export default App
