import { makeStyles } from "@material-ui/styles";
import React, { FC, useEffect, useState } from "react";

import { DIRECTION, NODE_EVENT } from "../lib";
import WidgetNode from "../lib/widget_node";

const useStyle = makeStyles({
    root: (props: { node: WidgetNode }) => {
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
        };
    },
    titlebar: () => ({
        height: "25px",
    }),
});

const Widget: FC<{ node: WidgetNode }> = (props) => {
    const { children, node } = props;
    const [counter, setCounter] = useState(0);
    const classes = useStyle({ node });

    useEffect(() => {
        node.on(NODE_EVENT.UPDATE, () => {
            setCounter((c) => c + 1);
            console.log(node.offset);
        });
    }, [node]);

    return (
        <div id={node.id} className={classes.root}>
            <div className={classes.titlebar}></div>
            <div>Widget{counter}</div>
        </div>
    );
};

export default Widget;
