import { makeStyles } from "@material-ui/styles";
import interact from "interactjs";
import React, { useEffect, useRef } from "react";

const useStyle = makeStyles({
    top: {
        "&:hover": {
            border: "2px dashed",
        },
        position: "absolute",
        width: "calc(50% - 4px)",
        height: "calc(25% - 2px)",
        top: 0,
        left: "25%",
    },
    left: {
        "&:hover": {
            border: "2px dashed",
        },
        position: "absolute",
        width: "calc(25% - 2px)",
        height: "calc(50% - 4px)",
        top: "25%",
        left: 0,
    },
    bottom: {
        "&:hover": {
            border: "2px dashed",
        },
        position: "absolute",
        width: "calc(50% - 4px)",
        height: "calc(25% - 2px)",
        right: "25%",
        bottom: 0,
    },
    right: {
        "&:hover": {
            border: "2px dashed",
        },
        position: "absolute",
        width: "calc(25% - 2px)",
        height: "calc(50% - 4px)",
        bottom: "25%",
        right: 0,
    },
});

export enum MASK_PART {
    TOP = "top",
    LEFT = "left",
    BOTTOM = "bottom",
    RIGHT = "right",
}
const DropArea = (props: { part: MASK_PART }) => {
    const { part } = props;
    const ref = useRef<HTMLDivElement>(null);

    const classes = useStyle();

    useEffect(() => {
        interact(ref.current!).dropzone({
            ondrop: () => {},
        });
    }, []);

    return <div ref={ref} className={classes[part]} />;
};

export default DropArea;
