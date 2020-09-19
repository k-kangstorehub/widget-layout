import { makeStyles } from "@material-ui/styles";
import interact from "interactjs";
import React, { useEffect, useRef, useState } from "react";

import { DIRECTION } from "../lib";
import WidgetNode from "../lib/widget_node";
import DropArea, { MASK_PART } from "./DropArea";
import Tab from "./Tab";

const useStyle = makeStyles({
    root: (props: { node: WidgetNode; showDropMask: boolean }) => {
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
    dropMask: (props: { showDropMask: boolean }) => {
        const { showDropMask } = props;
        return {
            display: showDropMask ? undefined : "none",
            position: "absolute",
            height: "100%",
            width: "100%",
            backgroundColor: "#00000085",
        };
    },
});

const Widget = (props: { node: WidgetNode }) => {
    const { node } = props;
    const [showDropMask, setShowDropMask] = useState(false);

    const classes = useStyle({ node, showDropMask });
    const titlebarRef = useRef<HTMLDivElement>(null);
    const widgetRef = useRef<HTMLDivElement>(null);
    const dropMaskRef = useRef<HTMLDivElement>(null);
    const topMaskRef = useRef<HTMLDivElement>(null);
    const leftMaskRef = useRef<HTMLDivElement>(null);
    const bottomMaskRef = useRef<HTMLDivElement>(null);
    const rightMaskRef = useRef<HTMLDivElement>(null);
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
            .on("dragenter", (event) => {
                console.debug("dragenter");
                setShowDropMask(true);
            });
    }, []);

    useEffect(() => {
        interact(dropMaskRef.current!)
            .dropzone({
                ondrop: () => {
                    setShowDropMask(false);
                },
            })
            .on("dragleave", () => {
                console.log("dragleave");
                setShowDropMask(false);
            });
    }, []);

    return (
        <div id={node.id} className={classes.root}>
            <div ref={titlebarRef} className={classes.titlebar}>
                {node.children.map((child) => (
                    <Tab key={child.id} widget={child} />
                ))}
            </div>
            <div ref={widgetRef} className={classes.panel}>
                <div ref={dropMaskRef} className={classes.dropMask}>
                    <DropArea part={MASK_PART.TOP} />
                    <DropArea part={MASK_PART.LEFT} />
                    <DropArea part={MASK_PART.BOTTOM} />
                    <DropArea part={MASK_PART.RIGHT} />
                </div>
                Panel
            </div>
        </div>
    );
};

export default Widget;
