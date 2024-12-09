export const treeRootId = 1;
export const initialTree = {
    1: {
        id: "1",
        name: "rootroot",
        type: "input",
        children: ["2", "3", "11"],
    },
    2: { id: "20", name: "child23" },
    2: { id: "2", name: "child2" },
    3: {
        id: "3",
        name: "child3",
        children: ["4", "5"],
    },
    4: { id: "4", name: "grandChild4" },
    5: { id: "5", name: "grandChild5" },
    6: { id: "6", name: "spouse of child 3", isSpouse: true },
    8: {
        id: "8",
        name: "root sibling",
    },
    9: {
        id: "9",
        name: "child3 sibling",
    },
    10: {
        id: "10",
        name: "root spouse",
    },
    11: { id: "11", name: "child11", children: ["12", "13"] },
    12: { id: "12", name: "child12", children: ["14", "15"] },
    13: {
        id: "13",
        name: "child13child13child13child13child13child13child13child13child13child13",
    },
    14: { id: "14", name: "child14" },
    15: { id: "15", name: "child15" },
    17: { id: "17", name: "hidden" }
};
