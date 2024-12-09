import React from 'react';
import ComponentRender from './ComponentRender';
import { Button } from 'antd';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';


const countAtom = atom({
    key: 'countAtomEffect',
    default: 1,
});

const ComponentA = () => {
    const setCount = useSetRecoilState(countAtom)
    return <ComponentRender color='yellow'>
        Component A {" "}
        <Button onClick={() => setCount(prev => prev + 1)}>
            Tăng
        </Button>
    </ComponentRender>
}
const ComponentB = () => {
    const setCount = useSetRecoilState(countAtom)
    return <ComponentRender color="blue">
        Component B {" "}
        <Button onClick={() => setCount(prev => prev - 1)}>
            Giảm
        </Button>
    </ComponentRender>
}

const ComponentCount = () => {
    const count = useRecoilValue(countAtom)
    return <ComponentRender color='orange'>
        {JSON.stringify(count)}
    </ComponentRender>
}


const EffectAtom = () => {
    return (
        <>
            <ComponentRender style={{ display: "flex", gap: 60 }}>
                Component parent
                <ComponentA />
                <ComponentCount />
                <ComponentB />
            </ComponentRender>
        </>
    );
}

export default EffectAtom;

// effects: [
//     ({ setSelf }) => {
//         fetch(`https://jsonplaceholder.typicode.com/todos/1`)
//             .then((res) => res.json())
//             .then((data) => {
//                 setSelf(data);
//             })
//             .catch((err) => console.error(err));
//     },
// ],

// ({ setSelf, onSet }) => {
//     const savedValue = localStorage.getItem('myAtom');
//     if (savedValue != null) {
//         setSelf(Number(savedValue));
//     }
//     onSet((newValue, oldValue) => {
//         localStorage.setItem('myAtom', JSON.stringify(newValue));
//     });
// },