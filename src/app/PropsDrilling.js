import React from 'react';
import ComponentRender from './ComponentRender';
import { Button } from 'antd';


const ComponentA = ({ setCount }) => {
    return <ComponentRender color='yellow'>
        Component A {" "}
        <Button onClick={() => setCount(prev => prev + 1)}>
            Tăng
        </Button>
    </ComponentRender>
}
const ComponentB = ({ setCount }) => {
    return <ComponentRender color="blue">
        Component B {" "}
        <Button onClick={() => setCount(prev => prev - 1)}>
            Giảm
        </Button>
    </ComponentRender>
}

const ComponentCount = ({ count }) => {
    return <ComponentRender color='orange'>
        {count}
    </ComponentRender>
}

const PropsDrilling = () => {
    const [count, setCount] = React.useState(1)
    return (
        <ComponentRender style={{ display: "flex", gap: 60 }}>
            Component parent
            <ComponentA setCount={setCount} />
            <ComponentCount count={count} />
            <ComponentB setCount={setCount} />
        </ComponentRender>
    );
}

export default PropsDrilling;
