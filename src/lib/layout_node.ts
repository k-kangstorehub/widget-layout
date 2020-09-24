import { EventEmitter } from "events";

import { DIRECTION, ILayoutNode, NODE_TYPE } from "./node";
import INode, { NODE_EVENT } from "./node";
import WidgetNode from "./widget_node";

class LayoutNode extends EventEmitter implements INode {
    id: string;
    type: NODE_TYPE;
    direction: DIRECTION;

    parent: LayoutNode | null;
    children: Array<LayoutNode | WidgetNode> = [];

    offset = 0;
    height = 0;
    width = 0;

    backgroundColor?: string;
    

    constructor(node: ILayoutNode, parent?: LayoutNode) {
        super();
        this.id = node.id;
        this.type = node.type;

        this.children = node.children
            .map((child) => {
                switch (child.type) {
                    case NODE_TYPE.LAYOUT_NODE: {
                        return new LayoutNode(child, this);
                    }
                    case NODE_TYPE.WIDGET_NODE: {
                        return new WidgetNode(child, this);
                    }
                    default: {
                        return null;
                    }
                }
            })
            .filter((child) => child != null) as Array<LayoutNode | WidgetNode>;

        this.direction = node.direction;
        this.backgroundColor = node.backgroundColor;
        this.parent = parent || null;
    }

    update() {
        this.emit(NODE_EVENT.UPDATE);
        this.children.forEach((child) => child.update());
    }
}

export default LayoutNode;
