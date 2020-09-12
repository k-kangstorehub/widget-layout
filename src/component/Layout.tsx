import { makeStyles } from "@material-ui/styles";
import React, { Fragment } from "react";

import useChildNodes from "../hook/useChildNodes";
import Node, { DIRECTION } from "../lib/node";
import Factory from "./Factory";
import Splitter from "./Splitter";

const useStyle = makeStyles({
    root: (props: { node: Node }) => {
        const { node } = props;
        const parent = node.parent;
        const size = parent?.children.length || 1;
        const splitterOffset = (10 * (size - 1)) / size;
        const width =
            parent?.direction === DIRECTION.ROW ||
            parent?.direction === DIRECTION.ROWREV
                ? `calc(${100 / parent.children.length}% - ${splitterOffset}px)`
                : "100%";

        const height =
            parent?.direction === DIRECTION.COLUMN ||
            parent?.direction === DIRECTION.COLUMNREV
                ? `calc(${100 / parent.children.length}% - ${splitterOffset}px)`
                : "100%";

        return {
            width,
            height,
            display: "flex",
            backgroundColor: node.backgroundColor,
            flexDirection: node.direction,
        };
    },
});

const Layout = (props: { node: Node }) => {
    const { node } = props;

    const childNodes = useChildNodes(node);
    const classes = useStyle({
        node,
    });

    return (
        <div key={node.id} className={classes.root}>
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
