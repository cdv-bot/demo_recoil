import { atomFamily, selectorFamily, useRecoilState, useRecoilValue } from 'recoil';


const itemState = atomFamily({
    key: 'itemState',
    default: (id) => `Default value for item ${id}`,
});


const itemSelector = selectorFamily({
    key: 'itemSelector',
    get: (id) => ({ get }) => {
        const item = get(itemState(id));
        return `Giá trị selector ${item.toUpperCase()}`;
    },
});

function Item({ id }) {
    const [value, setValue] = useRecoilState(itemState(id));
    const processedValue = useRecoilValue(itemSelector(id));

    return (
        <div>
            <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
            />
            <p>Original: {value}</p>
            <p>{processedValue}</p>
        </div>
    );
}

function SelectorFamily() {
    return (
        <div>
            <Item id={1} />
            <>-----------------</>
            <Item id={2} />
        </div>
    );
}

export default SelectorFamily;


