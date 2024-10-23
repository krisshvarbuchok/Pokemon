import { fetchGetMoreAboutPokemon, fetchGetPokemon } from "../redux/slice/listSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { Avatar, List, message } from 'antd';
import VirtualList from 'rc-virtual-list';

const fakeDataUrl = 'https://pokeapi.co/api/v2/pokemon/';
const ContainerHeight = 400;

const ContentInfiniteScroll = () => {
    const [data, setData] = useState([]);
    const [messageApi, contextHolder] = message.useMessage();
    //const { data } = useSelector(state => state.list);
    //console.log(data);
    const { info } = useSelector(state => state.list);
    const dispatch = useDispatch();
    //const itemsPerLoad = 10;
    //const [loadedItems, setLoadedItems] = useState(itemsPerLoad);
    //const [dataState, setData] = useState([]); // Ваши данные
    //console.log('dataState', dataState);

    const appendData = () => {
        fetch(fakeDataUrl)
            .then((res) => res.json())
            .then((body) => {
                setData(data.concat(body.results));
                message.success(`${body.results.length} more items loaded!`);
            });
    };
    useEffect(() => {
        appendData();
    }, []);

    const onScroll = (e) => {
        // Refer to: https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#problems_and_solutions
        if (Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - ContainerHeight) <= 1) {
            appendData();
        }
    };

    const success = () => {
        messageApi.open({
            type: 'success',
            content: '10 покемонов',
        });
    };

    // const loadMoreItems = () => {
    //     setLoadedItems((prevLoaded) => prevLoaded + itemsPerLoad);
    // };

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const newData = await dispatch(fetchGetPokemon({position: 100, offset: itemsPerLoad})).unwrap()
    //             setData((prev) => [...prev, ...newData])
    //             data.forEach(pokemon => {
    //                 dispatch(fetchGetMoreAboutPokemon(pokemon.name))
    //             })
    //         }
    //         catch (e) {
    //             console.log(e);

    //         }
    //     }
    //     fetchData()
    // }
    //     , []);




    return (
        <>
            <List>
                <VirtualList
                    data={data}
                    height={ContainerHeight}
                    itemHeight={47}
                    
                    onScroll={onScroll}
                >
                    {(item) => (
                        <List.Item key={item.url}>
                            <List.Item.Meta
                                avatar={<Avatar src={info[item.name]?.imgs}
                                alt={item.name} />}
                                title={item.name}
                               
                            />
                            
                        </List.Item>
                    )}
                </VirtualList>
            </List>
            {contextHolder}
            <Space>
                <Button onClick={success}>Success</Button>
            </Space>
            {/* <div>
                {dataState.slice(0, loadedItems).map((item) => {

                    return <li key={item.url} className="element">
                        <p>{item.name}</p>

                        <img
                            src={info[item.name]?.imgs}
                            alt={item.name}
                        />
                    </li>
                })}

                {/* <button onClick={loadMoreItems}>Загрузить ещё</button> */}
            {/*</div> */}
        </>
    )
}
export default ContentInfiniteScroll;