import "./App.css";

import React from "react";

import Layout from "./component/Layout";
import LayoutNode, { DIRECTION } from "./lib/layout_node";

const rootNode = new LayoutNode({
    id: "root",
    direction: DIRECTION.COLUMN,
    children: [],
    backgroundColor: "yellow",
});

export const ALayout = new LayoutNode({
    id: "A",
    direction: DIRECTION.COLUMN,
    children: [],
    backgroundColor: "red",
});

const BLayout = new LayoutNode({
    id: "B",
    direction: DIRECTION.ROW,
    children: [],
    backgroundColor: "red",
});

const CLayout = new LayoutNode({
    id: "C",
    direction: DIRECTION.ROW,
    children: [],
    backgroundColor: "green",
});

const A_ALayout = new LayoutNode({
    id: "A_A",
    direction: DIRECTION.ROW,
    children: [],
    backgroundColor: "green",
    componentName: "div",
});

export const A_BLayout = new LayoutNode({
    id: "A_B",
    direction: DIRECTION.ROW,
    children: [],
    backgroundColor: "yellow",
});

const B_ALayout = new LayoutNode({
    id: "B_A",
    direction: DIRECTION.ROW,
    children: [],
    backgroundColor: "green",
});

const B_BLayout = new LayoutNode({
    id: "B_B",
    direction: DIRECTION.ROW,
    children: [],
    backgroundColor: "blue",
});

rootNode.addNode(ALayout);
rootNode.addNode(BLayout);
rootNode.addNode(CLayout);
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
