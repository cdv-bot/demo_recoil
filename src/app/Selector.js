import { Button } from 'antd';
import React from 'react';
import { atom, selector, useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from 'recoil';

const userIdAtom = atom({
    key: 'userIdAtom',
    default: 1,
});

const fetchTodoSelector = selector({
    key: 'fetchTodoSelector',
    get: async ({ get }) => {
        const id = get(userIdAtom);
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        return data;
    },
});

const ComponentCallAPI = () => {
    const setUserId = useSetRecoilState(userIdAtom)
    const data = useRecoilValueLoadable(fetchTodoSelector);

    if (data.state === 'loading') return <p>Loading...</p>;
    if (data.state === 'hasError') return <p>Error</p>;
    return (
        <div>
            <Button onClick={() => setUserId(prev => prev + 1)}>Click</Button>
            <div>
                {JSON.stringify(data)}
            </div>
        </div>
    );
}


const countAtom = atom({
    key: 'countAtom',
    default: 0,
});

const doubledCountSelector = selector({
    key: 'doubledCountSelector',
    get: ({ get }) => {
        const count = get(countAtom);
        return count * 2;
    },
    set: ({ set, get }, newValue) => {
        const currentCount = get(countAtom);
        const newCount = Math.floor(Number(newValue + currentCount) / 2);
        if (!isNaN(newCount)) {
            set(countAtom, newCount);
        }
    },
});

const ComponentLogic = () => {
    const doubledCount = useRecoilValue(doubledCountSelector);
    const setDoubledCount = useSetRecoilState(doubledCountSelector);

    const increment = () => setDoubledCount((prev) => prev + 2);
    return <>
        <button onClick={increment}>Increment</button>
        <p>{doubledCount}</p>
    </>
}


const Selector = () => {
    return <>
        {/* <ComponentCallAPI /> */}
        <ComponentLogic />
    </>
}

export default Selector;
