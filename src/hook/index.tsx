import { createContext, useContext, useReducer } from "react";

import Node, { DIRECTION, NODE_TYPE } from "../lib/node";

const rootNode = new Node({
    id: "root",
    type: NODE_TYPE.LAYER,
    direction: DIRECTION.COLUMN,
    children: [],
    backgroundColor: "green",
});

const reducer = (state: Node, action: { payload: any }): Node => {
    return state;
};

export const NodeContext = createContext(rootNode);

export const useNode = () => {
    const rootNode = useContext(NodeContext);

    const [state, dispatch] = useReducer(reducer, rootNode);
};
