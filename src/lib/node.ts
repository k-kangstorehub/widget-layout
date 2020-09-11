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

export enum NODE_EVENT {
    UPDATE = "UPDATE",
}

class Node extends EventEmitter implements INode {
    id: string;
    type: NODE_TYPE;
    children: Node[];
    direction: DIRECTION;
    backgroundColor: string;
    componentName?: string;
    parent: Node | null;

    constructor(node: INode) {
        super();
        this.id = node.id;
        this.type = node.type;
        this.children = node.children.map((child) => new Node(child));
        this.direction = node.direction;
        this.backgroundColor = node.backgroundColor;
        this.componentName = node.componentName;
        this.parent = null;
    }

    addNode(node: Node) {
        node.parent = this;
        this.children = [...this.children, node];
        this.update();
    }
    update() {
        this.emit(NODE_EVENT.UPDATE);
    }
}

export default Node;
