export interface INode<C> {
    id: string;
    children: Array<C>;
}

export enum NODE_EVENT {
    UPDATE = "UPDATE",
}
