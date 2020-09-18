import React, { useEffect, useState } from "react";

import Widget from "./Widget";

const addLayout = () => {};

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
