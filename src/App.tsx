import "./App.css";

import React from "react";

import Layout from "./component/Layout";
import Node, { DIRECTION, NODE_TYPE } from "./lib/node";

const rootNode = new Node({
    id: "root",
    type: NODE_TYPE.LAYER,
    direction: DIRECTION.COLUMN,
    children: [],
    backgroundColor: "yellow",
});

export const ALayout = new Node({
    id: "A",
    type: NODE_TYPE.LAYER,
    direction: DIRECTION.COLUMN,
    children: [],
    backgroundColor: "red",
});

const BLayout = new Node({
    id: "B",
    type: NODE_TYPE.LAYER,
    direction: DIRECTION.ROW,
    children: [],
    backgroundColor: "red",
});

const A_ALayout = new Node({
    id: "A_A",
    type: NODE_TYPE.LAYER,
    direction: DIRECTION.ROW,
    children: [],
    backgroundColor: "green",
    componentName: "div",
});

export const A_BLayout = new Node({
    id: "A_B",
    type: NODE_TYPE.LAYER,
    direction: DIRECTION.ROW,
    children: [],
    backgroundColor: "yellow",
});

const B_ALayout = new Node({
    id: "B_A",
    type: NODE_TYPE.LAYER,
    direction: DIRECTION.ROW,
    children: [],
    backgroundColor: "green",
});

const B_BLayout = new Node({
    id: "B_B",
    type: NODE_TYPE.LAYER,
    direction: DIRECTION.ROW,
    children: [],
    backgroundColor: "blue",
});

rootNode.addNode(ALayout);
rootNode.addNode(BLayout);
ALayout.addNode(A_ALayout);
// ALayout.addNode(A_BLayout);
BLayout.addNode(B_ALayout);
BLayout.addNode(B_BLayout);

function App() {
    return (
        <div
            className="App"
            style={{ height: 500, width: 500, backgroundColor: "grey" }}
        >
            <Layout node={rootNode} />
        </div>
    );
}

export default App;
