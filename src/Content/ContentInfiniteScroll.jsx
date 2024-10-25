import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';


const ContentInfiniteScroll = () => {
    const [pokemon, setPokemon] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [offset, setOffset] = useState(0);
    const limit = 10; // Количество загружаемых элементов

    const fetchPokemon = async () => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
            const data = await response.json();

            // Получаем данные для каждого покемона и добавляем их в массив
            const pokemonDataPromises = data.results.map(async (p) => {
                const pokemonResponse = await fetch(p.url);
                return pokemonResponse.json();
            });

            const pokemonData = await Promise.all(pokemonDataPromises);

            // Обновляем состояние покемонов с изображениями
            setPokemon((prevPokemon) => [...prevPokemon, ...pokemonData]);
            setHasMore(data.results.length > 0); // Устанавливаем флаг, если есть еще покемоны
            setOffset((prevOffset) => prevOffset + limit); // Увеличиваем смещение для следующего запроса
        } catch (error) {
            console.error("Ошибка при загрузке покемонов:", error);
            setHasMore(false); // В случае ошибки отключаем бесконечную прокрутку
        }
    };

    useEffect(() => {
        fetchPokemon(); // Загружаем покемонов при первом рендере
    }, []);


    return (
        <div>
            <InfiniteScroll
                dataLength={pokemon.length}
                next={fetchPokemon} // Функция загрузки следующей порции данных
                hasMore={hasMore} // Флаг, указывающий, есть ли еще данные
                loader={<h4>Загрузка...</h4>} // Сообщение во время загрузки
                endMessage={<p>Больше покемонов нет</p>} // Сообщение в конце списка
            >
                {pokemon.map((p) => (
                    <div key={p.id} style={{ padding: '10px', borderBottom: '1px solid #ccc', display: 'flex', alignItems: 'center' }}>
                        <img src={p.sprites.front_default} alt={p.name} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                        <span>{p.name}</span>
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    );
};
export default ContentInfiniteScroll;