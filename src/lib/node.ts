export interface INode<I extends INode<I>> {
    id: string;
    children: Array<I>;
}

export enum NODE_EVENT {
    UPDATE = "UPDATE",
}
