export enum NODE_EVENT {
    UPDATE = "UPDATE",
}

export default interface INode {
    offset: number;
    height: number;
    width: number;

    update: () => void;
}

export enum DIRECTION {
    COLUMN = "column",
    COLUMNREV = "column-reverse",
    ROW = "row",
    ROWREV = "row-reverse",
}

export enum NODE_TYPE {
    LAYOUT_NODE = "LAYOUT_NODE",
    WIDGET_NODE = "WIDGET_NODE",
    WIDGET = "WIDGET",
}

export interface ILayoutNode {
    id: string;
    type: NODE_TYPE.LAYOUT_NODE;
    direction: DIRECTION;
    children: Array<IWidgetNode | ILayoutNode>;

    backgroundColor?: string;
}

export interface IWidgetNode {
    id: string;
    type: NODE_TYPE.WIDGET_NODE;
    children: IWidget[];
}

export interface IWidget {
    id: string;
    type: NODE_TYPE.WIDGET;
    componentName: string;
}
