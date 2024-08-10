"use client";
import { useEffect, useMemo, useRef, useState } from 'react';
import ReactGridLayout, { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { SizeMe } from 'react-sizeme';
import "./globals.css";
import Item from './Item';
import useResize from './useResize';

const ResponsiveGridLayout = WidthProvider(Responsive);
const n = 25;
const data = Array.from({ length: n }, (_, i) => ({ i: `${i + 1}`, x: 0, y: 0, w: 1, h: 4 }));

export const convertLayout = (data, isPin, col = 6) => {
    let x = 0;
    let y = 0;
    const HEIGHT = 4;
    const WIDTH = 1
    return data.map((item) => {
        const layoutItem = isPin ? {
            ...item,
            static: !!item.static,
            i: item.i,
            x,
            y,
            w: WIDTH,
            h: HEIGHT
        } : {
            i: item.i,
            x,
            y,
            w: WIDTH,
            h: HEIGHT,
        };

        if (x === col - 1) {
            x = 0;
            y += HEIGHT;
        } else {
            x += 1;
        }

        return layoutItem;
    });
};

const MyGridLayout = () => {
    const { width, height } = useResize()
    const [layout, setLayout] = useState(() => convertLayout(data));
    const [ignoreLayoutChange, setIgnoreLayoutChange] = useState(false);

    const cols = useMemo(() => {
        let columns;
        if (width >= 1200) { // lg
            columns = 6;
        } else if (width >= 992) { // md
            columns = 2;
        } else if (width >= 768) { // sm
            columns = 2;
        } else if (width >= 576) { // xs
            columns = 2;
        } else { // xxs
            columns = 1;
        }
        return columns
    }, [width])

    const handleLayoutChange = (newLayout) => {
        if (!ignoreLayoutChange) {
            setLayout(newLayout);
        }
    };


    useEffect(() => {
        document.querySelectorAll('.no-drag').forEach(element => {
            element.addEventListener('mousedown', (e) => {
                e.preventDefault();
            }, { passive: false });
        });
    }, [layout])



    useEffect(() => {
        setLayout((prev) => convertLayout(prev, true, cols))
    }, [cols])
    return (
        <ReactGridLayout
            measureBeforeMount={false}
            className="layout"
            layout={layout}
            cols={cols}
            rowHeight={40}
            width={width}
            isResizable={false}
            isDroppable
            allowOverlap={false}
            preventCollision={false}
            onLayoutChange={handleLayoutChange}
            margin={[10, 10]}
        >
            {layout.map(item => (
                <div key={item.i} className={`grid-item ${item.static ? "no-drag" : ""}`}>
                    <Item key={item.i} cols={cols} item={item} layout={layout} setIgnoreLayoutChange={setIgnoreLayoutChange} setLayout={setLayout} />
                </div>)
            )
            }
        </ReactGridLayout>
    );
};

export default MyGridLayout;
