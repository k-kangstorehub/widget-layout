import { useEffect, useState } from "react";

import { LayoutNode, NODE_EVENT } from "../lib";

const useChildNodes = (node: LayoutNode) => {
    const [childNodes, setChildNodes] = useState(node.children);
    useEffect(() => {
        node.on(NODE_EVENT.UPDATE, () => {
            setChildNodes([...node.children]);
        });
    }, [node]);
    return childNodes;
};

export default useChildNodes;
