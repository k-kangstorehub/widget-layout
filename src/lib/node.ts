import { EventEmitter } from "events";

export enum DIRECTION {
    COLUMN = "column",
    COLUMNREV = "column-reverse",
    ROW = "row",
    ROWREV = "row-reverse",
}

export enum NODE_TYPE {
    SPLITTER = "SPLITTER",
    LAYER = "LAYER",
}

export interface INode {
    id: string;
    type: NODE_TYPE;
    children: INode[];
    direction: DIRECTION;
    backgroundColor: string;
    componentName?: string;
}

class Node extends EventEmitter implements INode {
    id: string;
    type: NODE_TYPE;
    children: Node[];
    direction: DIRECTION;
    backgroundColor: string;
    componentName?: string;

    constructor(node: INode) {
        super();
        this.id = node.id;
        this.type = node.type;
        this.children = node.children.map((child) => new Node(child));
        this.direction = node.direction;
        this.backgroundColor = node.backgroundColor;
        this.componentName = node.componentName;
    }

    addNode(node: Node) {
        this.children = [...this.children, node];
        this.emit("addNode");
    }
}

export default Node;
