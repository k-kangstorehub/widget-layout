import React, { FC } from "react";

const Widget: FC = (props) => {
    const { children } = props;
    return children ? (
        <div style={{ height: "100%", width: "100%" }}>{children}</div>
    ) : null;
};

export default Widget;