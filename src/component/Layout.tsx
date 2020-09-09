import React, { Fragment, useEffect, useState } from "react";

import Node from "../lib/node";
import Factory from "./Factory";

const Layout = (props: { node: Node }) => {
    const { node } = props;

    const [childNodes, setChildNodes] = useState(node.children);
    useEffect(() => {
        node.on("addNode", () => {
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
            <Fragment>
                {childNodes.map((child) => (
                    <Layout key={child.id} node={child} />
                ))}
            </Fragment>
        </div>
    );
};

export default Layout;
