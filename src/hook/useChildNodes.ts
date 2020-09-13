import { useEffect, useState } from "react";

import Node, { NODE_EVENT } from "../lib/node";

export default (node: Node) => {
    const [childNodes, setChildNodes] = useState(node.children);
    useEffect(() => {
        node.on(NODE_EVENT.UPDATE, () => {
            console.log("test test");
            setChildNodes([...node.children]);
        });
    }, [node]);
    return childNodes;
};
