import { makeStyles } from "@material-ui/styles";
import interact from "interactjs";
import lodash from "lodash";
import React, { useEffect, useRef, useState } from "react";

import { DIRECTION } from "../lib";
import LayoutNode from "../lib/layout_node";
import WidgetNode from "../lib/widget_node";

const useStyle = makeStyles({
    root: (props: { parent: LayoutNode; dragging: boolean }) => {
        const { parent, dragging } = props;
        const hoverBackgroundColor = "#00000085";
        return {
            width:
                parent.direction === DIRECTION.ROW ||
                parent.direction === DIRECTION.ROWREV
                    ? 10
                    : "100%",
            height:
                parent?.direction === DIRECTION.ROW ||
                parent?.direction === DIRECTION.ROWREV
                    ? "100%"
                    : 10,
            backgroundColor: dragging ? hoverBackgroundColor : "#00000000",
            touchAction: "none",
        };
    },
});

const Splitter = (props: {
    parent: LayoutNode;
    primary: LayoutNode | WidgetNode;
    secondary: LayoutNode | WidgetNode;
}) => {
    const { parent, primary, secondary } = props;
    const [dragging, setDragging] = useState(false);

    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        let primaryOffset = 0;
        let secondaryOffset = 0;
        interact(ref.current!).draggable({
            listeners: {
                start: () => {
                    primaryOffset = primary.offset;
                    secondaryOffset = secondary.offset;
                    setDragging(true);
                },
                move: lodash.throttle((event) => {
                    if (
                        parent.direction === DIRECTION.ROW ||
                        parent.direction === DIRECTION.ROWREV
                    ) {
                        primary.offset =
                            primaryOffset + event.client.x - event.clientX0;
                        secondary.offset =
                            secondaryOffset - (event.client.x - event.clientX0);
                    } else {
                        primary.offset =
                            primaryOffset + event.client.y - event.clientY0;
                        secondary.offset =
                            secondaryOffset - (event.client.y - event.clientY0);
                    }
                    requestAnimationFrame(() => parent.update());
                }, 16),
                end: () => {
                    parent.update();
                    setDragging(false);
                },
            },
            cursorChecker: () => {
                return parent.direction === DIRECTION.ROW ||
                    parent.direction === DIRECTION.ROWREV
                    ? "ew-resize"
                    : "ns-resize";
            },
        });
    }, [primary, parent, secondary]);

    const classes = useStyle({
        parent,
        dragging,
    });

    return <div ref={ref} className={classes.root} />;
};

export default Splitter;
