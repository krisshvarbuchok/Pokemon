import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { LIMIT, OFFSET } from '../App';
import { clearInfo, fetchGetMoreAboutPokemonScroll, fetchGetPokemon, fetchGetPokemonForScroll } from "../redux/slice/listSlice";


const style = {
    height: 60,
    border: "1px solid green",
    margin: 6,
    padding: 8
};

const ContentInfiniteScroll = () => {
    const dispatch = useDispatch();
    const { infoScroll } = useSelector(state => state.list);
    const {dataScroll} = useSelector(state => state.list);
    const [data, setData] = useState([]);
    const [offset, setOffset] = useState(5);
    console.log('dataScroll' , dataScroll);
    
    console.log('infoScroll',infoScroll);
    console.log('data in scroll', data);


    const fetchMoreData = () => {
        console.log('secound');
        
        console.log('offset', offset);
        console.log('--------------------------------------');
        setData((data) => [...data, ...infoScroll])
        
        dispatch(fetchGetPokemonForScroll({ limit: 5, offset: offset }))
        setOffset((offset) => offset + 5)
        
    };
    useEffect(()=>{
        dataScroll.forEach(item => dispatch(fetchGetMoreAboutPokemonScroll(item.url)))
    }, [dataScroll, dispatch])
   
    useEffect(() => {
        console.log('first');
        setData((data) => [...data, ...infoScroll])
        //dispatch(clearInfo())
        fetchMoreData()
    }, [dispatch])

    // const success = () => {
    //     messageApi.open({
    //         type: 'success',
    //         content: '10 покемонов',
    //     });
    // };






    return (
        <>
            <div>
                <InfiniteScroll
                    dataLength={data.length}
                    next={fetchMoreData}
                    hasMore={true}
                    loader={<h4>Loading...</h4>}
                >
                    {data.map((i, index) => (

                        <div style={style} className="scroll" key={index}>
                            {i.name}
                            {console.log('third')}
                            <img
                                src={i[i.name].img}
                                alt={i.name}
                            />
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
        </>
    )
}
export default ContentInfiniteScroll;