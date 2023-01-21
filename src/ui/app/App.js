import {useEffect} from "react";
import Spinner from "../components/Spinner";
import {fetchData} from "../../bll/filterSlice";
import {loadingStatus} from "../../bll/appSlice";
import {useDispatch, useSelector} from "react-redux";
import {FilterPanel} from "../components/FilterPanel";
import {ListDirections} from "../components/ListDirections";
import {ListPossibleDirections} from "../components/ListPossibleDirections";
import '../styles/app.scss'
import SourceLink from "../components/SourceLink";

export const App = () => {
  const dispatch = useDispatch()

  const status = useSelector(loadingStatus);

  useEffect(() => {
    dispatch(fetchData())
  }, [])

  return (
    <div className='container'>
      <SourceLink/>

      {status === 'loading' && <Spinner/>}

      <main className={`content ${status === 'loading' ? 'loading' : ''}`}>
        <FilterPanel/>

        <ListDirections/>

        <ListPossibleDirections/>
      </main>
    </div>
  )
}

