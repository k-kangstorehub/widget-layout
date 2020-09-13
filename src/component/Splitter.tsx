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
    }) => {
        const { parent, dragging, offset } = props;
        if (!dragging) {
            return { display: "none" };
        }
        const x =
            parent.direction === DIRECTION.ROW ||
            parent.direction === DIRECTION.ROWREV
                ? offset.x
                : 0;
        const y =
            parent.direction === DIRECTION.ROW ||
            parent.direction === DIRECTION.ROWREV
                ? 0
                : offset.y;
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
    firstNode: LayoutNode;
    secondNode: LayoutNode;
}) => {
    const { parent, firstNode, secondNode } = props;

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
                        console.log("test test", event.client.x - x1);
                        firstNode.offset += event.client.x - x1;
                        secondNode.offset += -(event.client.x - x1);
                    } else {
                        firstNode.offset += event.client.y - y1;
                        secondNode.offset += -(event.client.y - y1);
                    }
                    firstNode.update();
                    secondNode.update();
                    parent.update();
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
        firstNode,
        firstNode.offset,
        parent,
        parent.direction,
        secondNode,
        secondNode.offset,
    ]);

    const classes = useStyle({ parent, dragging, offset });

    return (
        <Fragment>
            <div ref={ref} className={classes.root}>
                <div className={classes.shadow} />
            </div>
        </Fragment>
    );
};

export default Splitter;
