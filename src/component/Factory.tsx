import React from "react";

import { A_BLayout, ALayout } from "../App";

const addLayout = () => {
    ALayout.addNode(A_BLayout);
};

const Factory = (props: { componentName: string | undefined }) => {
    const { componentName } = props;

    switch (componentName) {
        case "div": {
            return (
                <div>
                    <button onClick={addLayout}>test button</button>
                </div>
            );
        }
        default: {
            return null;
        }
    }
};

export default Factory;
