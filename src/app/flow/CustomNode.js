import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";

const nodeStyle = {
    height: 36,
    minWidth: 150,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid black",
    borderRadius: "4px",
};

const CustomNode = memo(({ data }) => {
    const { isSpouse, isSibling, label, direction } = data;
    const isTreeHorizontal = direction === "LR";

    const getTargetPosition = () => {
        if (isSpouse) {
            return isTreeHorizontal ? Position.Top : Position.Left;
        } else if (isSibling) {
            return isTreeHorizontal ? Position.Bottom : Position.Right;
        }
        return isTreeHorizontal ? Position.Left : Position.Top;
    };

    return (
        <div
            style={nodeStyle}
            onDragStart={(event) => {
                console.log("E");
                event.preventDefault();
                event.dataTransfer.effectAllowed = "move";
            }}
        >
            {isSpouse && (
                <Handle
                    type="source"
                    position={isTreeHorizontal ? Position.Right : Position.Bottom}
                    id={isTreeHorizontal ? Position.Right : Position.Bottom}
                />
            )}
            {isSibling && (
                <Handle
                    type="source"
                    position={isTreeHorizontal ? Position.Top : Position.Left}
                    id={isTreeHorizontal ? Position.Top : Position.Left}
                />
            )}
            {!isSpouse && !isSibling && (
                <Handle
                    type="source"
                    position={isTreeHorizontal ? Position.Right : Position.Bottom}
                    id={isTreeHorizontal ? Position.Right : Position.Bottom}
                />
            )}
            <Handle
                type="target"
                position={getTargetPosition()}
                id={getTargetPosition()}
            />
            <div>{label}</div>
        </div>
    );
});

export default CustomNode;
