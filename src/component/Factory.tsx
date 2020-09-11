import React, { useEffect,useState } from "react";

import { A_BLayout, ALayout } from "../App";
import Widget from "./Widget";

const addLayout = () => {
    ALayout.addNode(A_BLayout);
};

const Factory = (props: { componentName: string | undefined }) => {
    const { componentName } = props;
    const [component, setComponent] = useState<JSX.Element | null>(null);
    useEffect(() => {
        switch (componentName) {
            case "div": {
                setComponent(
                    <div>
                        <button onClick={addLayout}>test button</button>
                    </div>
                );
                break;
            }
            default: {
                setComponent(null);
                break;
            }
        }
    }, [componentName]);

    return <Widget>{component}</Widget>;
};

export default Factory;
