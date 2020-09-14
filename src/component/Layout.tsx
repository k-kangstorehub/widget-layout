import { makeStyles } from "@material-ui/styles";
import React, { Fragment, useEffect, useRef } from "react";

import useChildNodes from "../hook/useChildNodes";
import LayoutNode, { DIRECTION } from "../lib/layout_node";
import Factory from "./Factory";
import Splitter from "./Splitter";

const useStyle = makeStyles({
    root: (props: { node: LayoutNode }) => {
        const { node } = props;
        const parent = node.parent;
        const size = parent?.children.length || 1;
        const splitterOffset = (10 * (size - 1)) / size;
        const width =
            parent?.direction === DIRECTION.ROW ||
            parent?.direction === DIRECTION.ROWREV
                ? `calc(${
                      100 / parent.children.length
                  }% - ${splitterOffset}px + ${node.offset}px)`
                : "100%";

        const height =
            parent?.direction === DIRECTION.COLUMN ||
            parent?.direction === DIRECTION.COLUMNREV
                ? `calc(${
                      100 / parent.children.length
                  }% - ${splitterOffset}px + ${node.offset}px)`
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

const Layout = (props: { node: LayoutNode }) => {
    const { node } = props;

    const ref = useRef<HTMLDivElement>(null);

    const childNodes = useChildNodes(node);
    const classes = useStyle({
        node,
    });

    useEffect(() => {
        console.log(node.id, ref.current!.getBoundingClientRect());
        node.width = ref.current!.getBoundingClientRect().width;
        node.height = ref.current!.getBoundingClientRect().height;
    }, [childNodes, node]);
    return (
        <div ref={ref} key={node.id} className={classes.root}>
            <Factory componentName={node.componentName} />

            {childNodes.map((child, index, array) => (
                <Fragment key={child.id}>
                    <Layout key={child.id} node={child} />
                    {array.length === index + 1 ? null : (
                        <Splitter
                            parent={node}
                            primary={child}
                            secondary={array[index + 1]}
                        />
                    )}
                </Fragment>
            ))}
        </div>
    );
};

export default Layout;
