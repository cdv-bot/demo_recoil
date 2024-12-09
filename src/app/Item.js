import React, { useEffect, useMemo, useRef } from 'react';
import { convertLayout } from './page';

function Item({ item, layout, setIgnoreLayoutChange, setLayout, setDom, cols, updateLayout }) {
    const itemRef = useRef()
    useEffect(() => {
        setDom(prev => ({
            ...prev,
            [item.i]: itemRef.current
        }))
    }, [])

    const handleGim = async (itemId) => {
        setIgnoreLayoutChange(true);

        const array = [...layout];
        const indexToRemove = layout.findIndex(item => item.i === itemId);
        const indexPin = array.findLastIndex(i => i.static);
        const itemToMove = array.splice(indexToRemove, 1)[0];

        const insertIndex = indexPin === -1 ? 0 : itemToMove.static ? indexPin : indexPin + 1;

        array.splice(insertIndex, 0, {
            ...itemToMove,
            static: !itemToMove.static
        });

        setLayout(convertLayout(array, true, cols));

        await new Promise(res => setTimeout(() => res(), 1000));
        setIgnoreLayoutChange(false);
    };

    const all = useMemo(() => {
        return Array.from({ length: item.i }, (_, i) => i)
    }, [item.i])
    return (
        <div
            ref={itemRef}
            key={item.i}
            style={{ position: 'relative', height: "max-content", background: "red" }}
        >
            <button onClick={(e) => {
                handleGim(item.i);
            }}>{item.static ? "Bỏ ghim" : "Ghim"}</button>
            <div>{item.i}</div>
            {all.map(i => {
                return <div key={i}>
                    {i}
                </div>
            })}

        </div>
    );
}

export default Item;