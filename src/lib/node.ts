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
    PANEL = "PANEL",
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
    children: IPanel[];
}

export interface IPanel {
    id: string;
    type: NODE_TYPE.PANEL;
    componentName: string;
}
