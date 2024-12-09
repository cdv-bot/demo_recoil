

import React from 'react';

const ComponentRender = ({ children, color = "red" }) => {
    const id = React.useId();

    React.useEffect(() => {
        const dom = document.getElementById(id);
        setTimeout(() => {
            if (dom) {
                dom.style.backgroundColor = 'white';
            }
        }, 300)
        return () => {
            if (dom) {
                dom.style.backgroundColor = color;
            }
        }
    })
    return (
        <div id={id} style={{ border: "3px solid #eee", padding: "20px", marginTop: "20px   " }}>
            {children}
        </div>
    );
}

export default ComponentRender;
