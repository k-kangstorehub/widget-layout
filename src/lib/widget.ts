import { IWidget, NODE_TYPE } from "./node";
import WidgetNode from "./widget_node";

class Widget {
    id: string;
    type: NODE_TYPE = NODE_TYPE.WIDGET;

    componentName: string;
    selected: boolean = false;
    parent: WidgetNode | null = null;

    constructor(widget: IWidget) {
        this.id = widget.id;
        this.componentName = widget.componentName;
    }
    update() {}
}

export default Widget;
