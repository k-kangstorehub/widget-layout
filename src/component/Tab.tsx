import interact from "interactjs";
import React, { useEffect, useRef } from "react";

import Widget from "../lib/panel";

const Tab = (props: { widget: Widget }) => {
    const { widget } = props;
    const ref = useRef(null);
    useEffect(() => {
        interact(ref.current!).draggable({});
    }, []);
    return (
        <div ref={ref} className="Tab">
            {widget.id}
        </div>
    );
};

export default Tab;
