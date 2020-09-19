import { IPanel, NODE_TYPE } from "./node";
import WidgetNode from "./widget_node";

class Panel {
    id: string;
    type: NODE_TYPE = NODE_TYPE.PANEL;

    componentName: string;
    selected: boolean = false;
    parent: WidgetNode;

    constructor(panel: IPanel, parent: WidgetNode) {
        this.id = panel.id;
        this.componentName = panel.componentName;
        this.parent = parent;
    }
}

export default Panel;
