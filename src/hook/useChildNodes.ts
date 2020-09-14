import { useEffect, useState } from "react";

import LayoutNode from "../lib/layout_node";
import { NODE_EVENT } from "../lib/node";

export default (node: LayoutNode) => {
    const [childNodes, setChildNodes] = useState(node.children);
    useEffect(() => {
        node.on(NODE_EVENT.UPDATE, () => {
            setChildNodes([...node.children]);
        });
    }, [node]);
    return childNodes;
};
