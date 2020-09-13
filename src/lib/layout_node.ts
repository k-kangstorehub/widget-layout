import { EventEmitter } from "events";

import { INode, NODE_EVENT } from "./node";

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

export interface ILayoutNode extends INode<ILayoutNode> {
    // type: NODE_TYPE;
    direction: DIRECTION;
    backgroundColor: string;
    componentName?: string;
}

class LayoutNode extends EventEmitter implements INode<LayoutNode> {
    id: string;
    children: LayoutNode[];
    // type: NODE_TYPE;
    direction: DIRECTION;
    backgroundColor: string;
    componentName?: string;
    parent: LayoutNode | null;
    offset: number;

    constructor(node: ILayoutNode) {
        super();
        this.id = node.id;
        // this.type = node.type;
        this.children = node.children.map((child) => new LayoutNode(child));
        this.direction = node.direction;
        this.backgroundColor = node.backgroundColor;
        this.componentName = node.componentName;
        this.parent = null;
        this.offset = 0;
    }

    addNode(node: LayoutNode) {
        node.parent = this;
        this.children = [...this.children, node];
        this.update();
    }
    update() {
        this.emit(NODE_EVENT.UPDATE);
    }
}

export default LayoutNode;
