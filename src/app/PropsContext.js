import React from 'react';
import ComponentRender from './ComponentRender';
import { Button } from 'antd';


const CountContext = React.createContext({})

const ComponentA = () => {
    const { setCount } = React.useContext(CountContext)
    return <ComponentRender color='yellow'>
        Component A {" "}
        <Button onClick={() => setCount(prev => prev + 1)}>
            Tăng
        </Button>
    </ComponentRender>
}
const ComponentB = () => {
    const { setCount } = React.useContext(CountContext)
    return <ComponentRender color="blue">
        Component B {" "}
        <Button onClick={() => setCount(prev => prev - 1)}>
            Giảm
        </Button>
    </ComponentRender>
}

const ComponentCount = () => {
    const { count } = React.useContext(CountContext)
    return <ComponentRender color='orange'>
        {count}
    </ComponentRender>
}


const PropsContext = () => {
    const [count, setCount] = React.useState(1)
    return (
        <CountContext.Provider value={{ count, setCount }}>
            <ComponentRender style={{ display: "flex", gap: 60 }}>
                Component parent
                <ComponentA />
                <ComponentCount />
                <ComponentB />
            </ComponentRender>
        </CountContext.Provider>
    );
}

export default PropsContext;
