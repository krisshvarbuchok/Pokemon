import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearInfo, fetchGetPokemon } from "../redux/slice/listSlice";
import {LIMIT, OFFSET} from '../App';
import "../styles.scss";

const ContentPagination = () => {
    //const { data } = useSelector(state => state.list);
    //console.log(data);
    const {count} = useSelector( state => state.list);
   // console.log(count);
    
    const { info } = useSelector(state => state.list);
   
    //console.log('info', info);
    const dispatch = useDispatch();

    const itemsPerPage = LIMIT;//элементов на странице
    const [currentPage, setCurrentPage] = useState(1);
    //const startIndex = (currentPage - 1) * itemsPerPage;
   // const endIndex = startIndex + itemsPerPage;
   // const currentItems = info.slice(startIndex, endIndex);
    const totalPages = Math.floor(count / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        //console.log('object', {limit: LIMIT, offset: OFFSET * page});
        dispatch(clearInfo())
        dispatch(fetchGetPokemon({limit: LIMIT, offset: OFFSET * page}))
      };
      


    return (
        <div className="list">
            <ul>
                {info.map(item => {
                    return <li key={item[item.name].id} className="element table">
                        <p>{item.name}</p>

                        <img
                            src={item[item.name].img}
                            alt={item.name}
                        />
                    </li>
                })}


            </ul>
            <div>hello</div>
            <div className="page">
                {info.length !== 0 &&
                    <button onClick={() => handlePageChange(currentPage - 1)}
                        className="pageButton"
                        disabled={currentPage === 1}
                    >{'<'}</button>}
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className="pageButton"
                        onClick={() => handlePageChange(index + 1)}
                        disabled={currentPage === index + 1}
                    >
                        {index + 1}
                    </button>

                ))}
                {info.length !== 0 &&
                    <button onClick={() => handlePageChange(currentPage + 1)}
                        className="pageButton"
                        disabled={currentPage === totalPages}
                    >{'>'}</button>}
            </div>
        </div>
    )
}
export default ContentPagination;