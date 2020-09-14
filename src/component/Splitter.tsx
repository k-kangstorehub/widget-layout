import { makeStyles } from "@material-ui/styles";
import interact from "interactjs";
import React, { Fragment, useEffect, useRef, useState } from "react";

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
        };
    },
    shadow: (props: {
        parent: LayoutNode;
        dragging: boolean;
        offset: { x: number; y: number };
        primary: LayoutNode;
        secondary: LayoutNode;
    }) => {
        const { parent, dragging, offset, primary, secondary } = props;
        if (!dragging) {
            return { display: "none" };
        }
        let x =
            parent.direction === DIRECTION.ROW ||
            parent.direction === DIRECTION.ROWREV
                ? offset.x
                : 0;
        let y =
            parent.direction === DIRECTION.ROW ||
            parent.direction === DIRECTION.ROWREV
                ? 0
                : offset.y;
        if (
            parent.direction === DIRECTION.ROW ||
            parent.direction === DIRECTION.ROWREV
        ) {
            if (x < -primary.width) {
                x = -primary.width;
            }
            if (x > secondary.width) {
                x = secondary.width;
            }
        } else {
            if (y < -primary.height) {
                y = -primary.height;
            }
            if (y > secondary.height) {
                y = secondary.height;
            }
        }

        const transform = `translate(${x}px, ${y}px)`;

        return {
            transform,
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
    const [offset, setOffest] = useState({ x: 0, y: 0 });
    useEffect(() => {
        let x1: number = 0;
        let y1: number = 0;
        interact(ref.current!).draggable({
            listeners: {
                start: (event) => {
                    setDragging(true);
                    x1 = event.clientX0;
                    y1 = event.clientY0;
                },
                move: (event) => {
                    setOffest({
                        x: event.client.x - x1,
                        y: event.client.y - y1,
                    });
                },
                end: (event) => {
                    if (
                        parent.direction === DIRECTION.ROW ||
                        parent.direction === DIRECTION.ROWREV
                    ) {
                        primary.offset += event.client.x - x1;
                        secondary.offset += -(event.client.x - x1);
                    } else {
                        primary.offset += event.client.y - y1;
                        secondary.offset += -(event.client.y - y1);
                    }
                    parent.update();
                    // primary.update();
                    // secondary.update();
                    setDragging(false);
                },
            },
            cursorChecker: (action, interactable, element, interacting) => {
                return parent.direction === DIRECTION.ROW ||
                    parent.direction === DIRECTION.ROWREV
                    ? "ew-resize"
                    : "ns-resize";
            },
        });
    }, [
        primary,
        primary.offset,
        parent,
        parent.direction,
        secondary,
        secondary.offset,
    ]);

    const classes = useStyle({
        parent,
        dragging,
        offset,
        primary,
        secondary,
    });

    return (
        <Fragment>
            <div ref={ref} className={classes.root}>
                <div className={classes.shadow} />
            </div>
        </Fragment>
    );
};

export default Splitter;
