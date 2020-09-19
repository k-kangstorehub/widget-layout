import React from "react";

import {
    Layout,
    LayoutNode,
    DIRECTION,
    NODE_TYPE,
    ILayoutNode,
} from "widget-layout";

const test: ILayoutNode = {
    id: "root",
    type: NODE_TYPE.LAYOUT_NODE,
    direction: DIRECTION.COLUMN,
    backgroundColor: "blue",
    children: [
        {
            id: "A",
            type: NODE_TYPE.WIDGET_NODE,
            children: [
                {
                    id: "A_A",
                    type: NODE_TYPE.PANEL,
                    componentName: "button",
                },
                {
                    id: "A_B",
                    type: NODE_TYPE.PANEL,
                    componentName: "button",
                },
            ],
        },
        {
            id: "B",
            type: NODE_TYPE.LAYOUT_NODE,
            direction: DIRECTION.ROW,
            backgroundColor: "yellow",
            children: [
                {
                    id: "B_A",
                    type: NODE_TYPE.WIDGET_NODE,
                    children: [
                        {
                            id: "B_A_A",
                            type: NODE_TYPE.PANEL,
                            componentName: "button",
                        },
                        {
                            id: "B_A_B",
                            type: NODE_TYPE.PANEL,
                            componentName: "button",
                        },
                    ],
                },
                {
                    id: "B_B",
                    type: NODE_TYPE.WIDGET_NODE,
                    children: [
                        {
                            id: "B_B_A",
                            type: NODE_TYPE.PANEL,
                            componentName: "button",
                        },
                        {
                            id: "B_B_B",
                            type: NODE_TYPE.PANEL,
                            componentName: "button",
                        },
                    ],
                },
            ],
        },
        {
            id: "C",
            type: NODE_TYPE.WIDGET_NODE,
            children: [
                {
                    id: "C_A",
                    type: NODE_TYPE.PANEL,
                    componentName: "button",
                },
                {
                    id: "C_B",
                    type: NODE_TYPE.PANEL,
                    componentName: "button",
                },
            ],
        },
    ],
};

const rootNode = new LayoutNode(test);

console.log(rootNode);

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
