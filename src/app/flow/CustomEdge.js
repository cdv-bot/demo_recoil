"use client";
import {
    BaseEdge,
    EdgeLabelRenderer,
    getStraightPath,
    useReactFlow,
} from "@xyflow/react"; // Hoặc từ 'reactflow' nếu dùng đúng thư viện đó

export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY }) {
    const { setEdges } = useReactFlow();
    const [edgePath, labelX, labelY] = getStraightPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
    });

    // Tính góc xoay của cạnh
    const angle = Math.atan2(targetY - sourceY, targetX - sourceX) * (180 / Math.PI);

    return (
        <>
            <BaseEdge id={id} path={edgePath} />
            <EdgeLabelRenderer>
                <select name="cars" id="cars" style={{
                    position: "absolute",
                    transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px) rotate(${angle}deg)`,
                    pointerEvents: "all",
                }}
                    className="nodrag nopan">
                    <option value="AND">AND</option>
                    <option value="OR">OR</option>
                </select>
            </EdgeLabelRenderer>
        </>
    );
}
