import { makeStyles } from "@material-ui/styles";
import interact from "interactjs";
import React, { useEffect, useRef } from "react";

import { useStateContainer } from "../hook";
import { DIRECTION } from "../lib";
import WidgetNode from "../lib/widget_node";
import Tab from "./Tab";

export enum MASK_PART {
    TOP = "top",
    LEFT = "left",
    BOTTOM = "bottom",
    RIGHT = "right",
    MIDDLE = "middle",
}

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
        display: "flex",
    }),
    panel: () => ({
        position: "relative",
        height: "calc(100% - 25px)",
    }),
    top: {
        pointerEvents: "none",
        border: "2px dashed",
        position: "absolute",
        width: "calc(100% - 4px)",
        height: "50%",
        top: 0,
        left: 0,
    },
    right: {
        pointerEvents: "none",
        border: "2px dashed",
        position: "absolute",
        width: "50%",
        height: "calc(100% - 4px)",
        top: 0,
        left: 0,
    },
    bottom: {
        pointerEvents: "none",
        border: "2px dashed",
        position: "absolute",
        width: "calc(100% - 4px)",
        height: "50%",
        right: 0,
        bottom: 0,
    },
    left: {
        pointerEvents: "none",
        border: "2px dashed",
        position: "absolute",
        width: "50%",
        height: "calc(100% - 4px)",
        bottom: 0,
        right: 0,
    },
    middle: {
        pointerEvents: "none",
        border: "2px dashed",
        position: "absolute",
        width: "calc(100% - 4px)",
        height: "calc(100% - 4px)",
        bottom: 0,
        right: 0,
    },
    hide: {
        display: "none",
    },
});

const Widget = (props: { node: WidgetNode }) => {
    const { node } = props;

    const classes = useStyle({ node });
    const titlebarRef = useRef<HTMLDivElement>(null);
    const widgetRef = useRef<HTMLDivElement>(null);
    const [
        maskPartContainer,
        maskPart,
        setMaskPart,
    ] = useStateContainer<MASK_PART | null>(null);

    useEffect(() => {});

    console.debug(`[Info] ${node.id} Widget update`);

    useEffect(() => {
        interact(titlebarRef.current!).dropzone({
            ondrop: (event) => {
                console.debug("drop");
            },
        });
    }, []);

    useEffect(() => {
        interact(widgetRef.current!)
            .dropzone({
                accept: ".Tab",
            })
            .on("drop", (event) => {
                setMaskPart(null);
                console.log(
                    "test test",
                    maskPartContainer.current,
                    titlebarRef.current
                );
            })
            .on("dropmove", (event) => {
                const rect = widgetRef.current?.getBoundingClientRect();
                console.log(event.dragEvent.client.x, event.dragEvent.client.y);
                console.log(rect?.x, rect?.y);

                console.log(rect?.width, rect?.height);

                if (rect) {
                    if (
                        event.dragEvent.client.x > rect.x + rect.width / 4 &&
                        event.dragEvent.client.x <
                            rect.x + (rect.width / 4) * 3 &&
                        event.dragEvent.client.y > rect.y + rect.height / 4 &&
                        event.dragEvent.client.y <
                            rect.y + (rect.height / 4) * 3
                    ) {
                        console.debug("[Info] move to right");
                        setMaskPart(MASK_PART.MIDDLE);
                        return;
                    }
                    if (
                        event.dragEvent.client.x > rect.x &&
                        event.dragEvent.client.x < rect.x + rect.width / 4
                    ) {
                        console.debug("[Info] move to right");
                        setMaskPart(MASK_PART.RIGHT);
                        return;
                    }

                    if (
                        event.dragEvent.client.x >
                            rect.x + (rect.width / 4) * 3 &&
                        event.dragEvent.client.x < rect.x + rect.width
                    ) {
                        console.debug("[Info] move to left");
                        setMaskPart(MASK_PART.LEFT);
                        return;
                    }

                    if (
                        event.dragEvent.client.y > rect.y &&
                        event.dragEvent.client.y < rect.y + rect.height / 4
                    ) {
                        console.debug("[Info] move to top");
                        setMaskPart(MASK_PART.TOP);
                        return;
                    }

                    if (
                        event.dragEvent.client.y >
                            rect.y + (rect.height / 4) * 3 &&
                        event.dragEvent.client.y < rect.y + rect.height
                    ) {
                        console.debug("[Info] move to bottom");
                        setMaskPart(MASK_PART.BOTTOM);
                        return;
                    }
                }
            })
            .on("dragleave", () => {
                setMaskPart(null);
            });
    }, [maskPartContainer, setMaskPart]);

    return (
        <div id={node.id} className={classes.root}>
            <div ref={titlebarRef} className={classes.titlebar}>
                {node.children.map((child) => (
                    <Tab key={child.id} widget={child} />
                ))}
            </div>
            <div ref={widgetRef} className={classes.panel}>
                <div className={classes[maskPart ? maskPart : "hide"]} />
                Panel
            </div>
        </div>
    );
};

export default Widget;
