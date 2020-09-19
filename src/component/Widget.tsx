import { makeStyles } from "@material-ui/styles";
import React from "react";

import { DIRECTION } from "../lib";
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

const Widget = (props: { node: WidgetNode }) => {
    const { node } = props;
    const classes = useStyle({ node });

    console.debug(`[Info] ${node.id} Widget update`);

    return (
        <div id={node.id} className={classes.root}>
            <div className={classes.titlebar}>title</div>
            <div>Widget</div>
        </div>
    );
};

export default Widget;
