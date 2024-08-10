import React, { useEffect } from 'react';
import { convertLayout } from './page';

function Item({ item, layout, setIgnoreLayoutChange, setLayout, cols }) {
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

    return (
        <div
            key={item.i}
            style={{ position: 'relative' }}
        >
            <button onClick={(e) => {
                handleGim(item.i);
            }}>{item.static ? "Bỏ ghim" : "Ghim"}</button>
            <div>{item.i}</div>
            <div>{JSON.stringify(item.static)}</div>
        </div>
    );
}

export default Item;