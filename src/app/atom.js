import { atom, atomFamily, selector } from 'recoil';

// Atom để trigger fetch lại
export const refreshUserDataAtom = atom({
    key: 'refreshUserDataAtom',
    default: 0,
});

export const refreshUserDataAtom2 = atomFamily({
    key: 'refreshUserDataAtom2',
    default: 0,
});
// Selector phụ thuộc vào atom
export const userDataQuery = selector({
    key: 'userDataQuery',
    get: async ({ get }) => {
        const response = await fetch("https://jsonplaceholder.typicode.com/todos/1")
        const count = get(refreshUserDataAtom);
        return await response.json();
    },
    set: ({ set }, newValue) => {
        set(refreshUserDataAtom, 4 * newValue);
    },
});