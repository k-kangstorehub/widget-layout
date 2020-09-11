import React, { Fragment, useEffect, useState } from "react";

import Node, { NODE_EVENT } from "../lib/node";
import Factory from "./Factory";
import Splitter from "./Splitter";

const Layout = (props: { node: Node }) => {
    const { node } = props;

    const [childNodes, setChildNodes] = useState(node.children);
    useEffect(() => {
        node.on(NODE_EVENT.UPDATE, () => {
            setChildNodes(node.children);
        });
    }, [node]);

    return (
        <div
            key={node.id}
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                backgroundColor: node.backgroundColor,
                flexDirection: node.direction,
            }}
        >
            <Factory componentName={node.componentName} />

            {childNodes.map((child, index, array) => (
                <Fragment key={child.id}>
                    <Layout key={child.id} node={child} />
                    {array.length === index + 1 ? null : (
                        <Splitter parent={node} />
                    )}
                </Fragment>
            ))}
        </div>
    );
};

export default Layout;
