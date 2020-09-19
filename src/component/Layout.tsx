import { makeStyles } from "@material-ui/styles";
import React, { Fragment, useEffect, useRef } from "react";

import useChildNodes from "../hook/useChildNodes";
import { DIRECTION, NODE_TYPE } from "../lib";
import LayoutNode from "../lib/layout_node";
import WidgetNode from "../lib/widget_node";
import Splitter from "./Splitter";
import Widget from "./Widget";

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
        node.width = ref.current!.getBoundingClientRect().width;
        node.height = ref.current!.getBoundingClientRect().height;
    }, [childNodes, node]);

    console.debug(`[Info] ${node.id} update`, node);
    return (
        <div id={node.id} ref={ref} className={classes.root}>
            {childNodes.map((child, index, array) => (
                <Fragment key={child.id}>
                    {child.type === NODE_TYPE.WIDGET_NODE ? (
                        <Widget key={child.id} node={child as WidgetNode} />
                    ) : null}
                    {child.type === NODE_TYPE.LAYOUT_NODE ? (
                        <Layout key={child.id} node={child as LayoutNode} />
                    ) : null}

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
