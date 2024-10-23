import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGetMoreAboutPokemon, fetchGetPokemon } from "../redux/slice/listSlice";

const ContentPagination = () => {
    const { data } = useSelector(state => state.list);
    console.log(data);
    //const { info } = useSelector(state => state.list);
   
    //console.log('info', info);
    const dispatch = useDispatch();

    const itemsPerPage = 5;//элементов на странице
    const [currentPage, setCurrentPage] = useState(1);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = data.slice(startIndex, endIndex);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
      };


    return (
        <div className="list">
            <ul>
                {currentItems.map(item => {
                    return <li key={item.name} className="element">
                        <p>{item.name}</p>

                        {/* <img
                            src={info[item.name]?.imgs}
                            alt={item.name}
                        /> */}
                    </li>
                })}


            </ul>
            <div className="page">
                {currentItems.length !== 0 &&
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
                {currentItems.length !== 0 &&
                    <button onClick={() => handlePageChange(currentPage + 1)}
                        className="pageButton"
                        disabled={currentPage === totalPages}
                    >{'>'}</button>}
            </div>
        </div>
    )
}
export default ContentPagination;