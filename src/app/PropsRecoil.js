import React from 'react';
import ComponentRender from './ComponentRender';
import { Button } from 'antd';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';


const countAtom = atom({
    key: 'countAtom',
    default: 1,
})

const countAtom2 = atom({
    key: 'countAtom2',
    default: 1,
})


const ComponentA = () => {
    const setCount = useSetRecoilState(countAtom)
    const setCount2 = useSetRecoilState(countAtom)
    return <ComponentRender color='yellow'>
        Component A {" "}
        <Button onClick={() => {
            setCount(prev => prev + 1);
            setCount(prev => prev + 1)
        }}>
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
    const count2 = useRecoilValue(countAtom2)
    console.log("render", count2);
    return <ComponentRender color='orange'>
        {count}
    </ComponentRender>
}


const PropsRecoil = () => {
    return (
        <ComponentRender style={{ display: "flex", gap: 60 }}>
            Component parent
            <ComponentA />
            <ComponentCount />
            <ComponentB />
        </ComponentRender>
    );
}

export default PropsRecoil;
