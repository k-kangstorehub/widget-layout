import { makeStyles } from "@material-ui/styles";
import interact from "interactjs";
import React, { useEffect, useRef } from "react";

import Node, { DIRECTION } from "../lib/node";

const useStyle = makeStyles({
    root: (props: { parent: Node }) => {
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
            // cursor:
            //     parent.direction === DIRECTION.ROW ||
            //     parent.direction === DIRECTION.ROWREV
            //         ? "ew-resize"
            //         : "ns-resize",
            backgroundColor: "black",
        };
    },
});

const Splitter = (props: { parent: Node }) => {
    const { parent } = props;

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        interact(ref.current!).draggable({
            listeners: {
                start: (event) => {
                    console.log("drag start", event);
                },
                move: (event) => {
                    console.log("drag move", event);
                },
                end: () => {},
            },
            cursorChecker: (action, interactable, element, interacting) => {
                return parent.direction === DIRECTION.ROW ||
                    parent.direction === DIRECTION.ROWREV
                    ? "ew-resize"
                    : "ns-resize";
            },
        });
    }, [parent.direction]);

    const classes = useStyle({ parent });

    return <div ref={ref} className={classes.root} />;
};

export default Splitter;
