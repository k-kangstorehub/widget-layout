import { makeStyles } from "@material-ui/styles";
import interact from "interactjs";
import lodash from "lodash";
import React, { useEffect, useRef, useState } from "react";

import LayoutNode, { DIRECTION } from "../lib/layout_node";

const useStyle = makeStyles({
    root: (props: { parent: LayoutNode }) => {
        const { parent } = props;
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
            backgroundColor: "black",
            touchAction: "none",
        };
    },
});

const Splitter = (props: {
    parent: LayoutNode;
    primary: LayoutNode;
    secondary: LayoutNode;
}) => {
    const { parent, primary, secondary } = props;

    const ref = useRef<HTMLDivElement>(null);
    const [dragging, setDragging] = useState(false);
    useEffect(() => {
        let primaryOffset = 0;
        let secondaryOffset = 0;
        interact(ref.current!).draggable({
            listeners: {
                start: (event) => {
                    setDragging(true);
                    primaryOffset = primary.offset;
                    secondaryOffset = secondary.offset;
                },
                // move: (event) => {
                //     if (
                //         parent.direction === DIRECTION.ROW ||
                //         parent.direction === DIRECTION.ROWREV
                //     ) {
                //         primary.offset =
                //             primaryOffset + event.client.x - event.clientX0;
                //         secondary.offset =
                //             secondaryOffset - (event.client.x - event.clientX0);
                //     } else {
                //         primary.offset =
                //             primaryOffset + event.client.y - event.clientY0;
                //         secondary.offset =
                //             secondaryOffset - (event.client.y - event.clientY0);
                //     }
                //     requestAnimationFrame(() => parent.update());
                //     // parent.update();
                // },
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
                    parent.update();
                }, 10),
                end: (event) => {
                    setDragging(false);
                    parent.update();
                },
            },
            cursorChecker: (action, interactable, element, interacting) => {
                return parent.direction === DIRECTION.ROW ||
                    parent.direction === DIRECTION.ROWREV
                    ? "ew-resize"
                    : "ns-resize";
            },
        });
    }, [primary, parent, secondary]);

    const classes = useStyle({
        parent,
    });

    return <div ref={ref} className={classes.root} />;
};

export default Splitter;
