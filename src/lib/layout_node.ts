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
    direction: DIRECTION;
    backgroundColor: string;
    componentName?: string;
}

class LayoutNode extends EventEmitter implements ILayoutNode {
    id: string;
    children: LayoutNode[];
    direction: DIRECTION;
    backgroundColor: string;
    componentName?: string;
    parent: LayoutNode | null;
    offset: number;
    height = 0;
    width = 0;

    constructor(node: ILayoutNode) {
        super();
        this.id = node.id;
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
        this.children.forEach((child) => child.update());
    }
}

export default LayoutNode;
