import { atom, selectorFamily, useRecoilState } from 'recoil';

const itemsState = atom({
  key: 'itemsState',
  default: {
    1: 'Item 1',
    2: 'Item 2',
    3: 'Item 3',
  },
});

const itemSelector = selectorFamily({
  key: 'itemSelector',
  get: (itemId) => ({ get }) => get(itemsState)[itemId],
  set: (itemId) => ({ set, get }, newValue) => {
    set(itemsState, { ...get(itemsState), [itemId]: newValue });
  },
});

function ItemComponent({ itemId }) {
  const [item, setItem] = useRecoilState(itemSelector(itemId));

  return (
    <div>
      Item {itemId}: <input type="text" value={item} onChange={(e) => setItem(e.target.value)} />
    </div>
  );
}

function SelectorSet() {
    return (
        <div>
            <ItemComponent itemId={1}/>
            <ItemComponent itemId={2}/>
            <ItemComponent itemId={3}/>
        </div>
    )
}

export default SelectorSet