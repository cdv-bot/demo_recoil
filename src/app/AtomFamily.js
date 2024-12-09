import React from 'react';
import ComponentRender from './ComponentRender';
import { Button } from 'antd';
import { atom, atomFamily, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';


const countAtom = atomFamily({
    key: 'countAtom',
    default: 1
})

const ComponentA = () => {
    const [count, setCount] = useRecoilState(countAtom(1))
    return <ComponentRender color='yellow'>
        Component A {" "}
        <Button onClick={() => setCount(prev => prev + 1)}>
            Tăng
        </Button>
        <span style={{ padding: 20 }}>
            {count}
        </span>
        <Button onClick={() => setCount(prev => prev - 1)}>
            Giảm
        </Button>
    </ComponentRender>
}
const ComponentB = () => {
    const [count, setCount] = useRecoilState(countAtom(1))
    return <ComponentRender color="blue">
        Component B {" "}
        <Button onClick={() => setCount(prev => prev + 1)}>
            Tăng
        </Button>
        <span style={{ padding: 20 }}>
            {count}
        </span>
        <Button onClick={() => setCount(prev => prev - 1)}>
            Giảm
        </Button>
    </ComponentRender>
}

const AtomFamily = () => {
    return (
        <ComponentRender style={{ display: "flex", gap: 60 }}>
            Component parent
            <ComponentA />
            <ComponentB />
        </ComponentRender>
    );
}

export default AtomFamily;
