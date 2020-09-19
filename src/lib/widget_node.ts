import { EventEmitter } from "events";

import LayoutNode from "./layout_node";
import INode, { IWidgetNode, NODE_EVENT, NODE_TYPE } from "./node";
import Panel from "./panel";

class WidgetNode extends EventEmitter implements INode {
    id: string;
    type: NODE_TYPE = NODE_TYPE.WIDGET_NODE;

    children: Panel[] = [];
    parent: LayoutNode;

    offset = 0;
    height = 0;
    width = 0;

    constructor(node: IWidgetNode, parent: LayoutNode) {
        super();
        this.id = node.id;
        this.parent = parent;
        this.children = node.children.map((child) => new Panel(child, this));
    }

    update() {
        this.emit(NODE_EVENT.UPDATE);
    }
}

export default WidgetNode;
