"use client"
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
    ReactFlow,
    addEdge,
    ConnectionLineType,
    Panel,
    useNodesState,
    useEdgesState,
    useReactFlow,
    ReactFlowProvider,
    useStoreApi,
} from "@xyflow/react";

import CustomNode from "./CustomNode";
import { initialTree, treeRootId } from "./nodes-edges";
import { layoutElements } from "./layout-elements";

import "@xyflow/react/dist/style.css";

const nodeTypes = {
    custom: CustomNode,
};

const { nodes: initialNodes, edges: initialEdges } = layoutElements(
    initialTree,
    treeRootId,
    "LR"
);

const MIN_DISTANCE = 180;
const Content = () => {
    const store = useStoreApi();
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
    const { getInternalNode, } = useReactFlow();

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    const getClosestEdge = useCallback((node) => {
        const { nodeLookup } = store.getState();
        const internalNode = getInternalNode(node.id);

        const closestNode = Array.from(nodeLookup.values()).reduce(
            (res, n) => {
                if (n.id !== internalNode.id) {
                    const dx =
                        n.internals.positionAbsolute.x -
                        internalNode.internals.positionAbsolute.x;
                    const dy =
                        n.internals.positionAbsolute.y -
                        internalNode.internals.positionAbsolute.y;
                    const d = Math.sqrt(dx * dx + dy * dy);

                    if (d < res.distance && d < MIN_DISTANCE) {
                        res.distance = d;
                        res.node = n;
                    }
                }

                return res;
            },
            {
                distance: Number.MAX_VALUE,
                node: null,
            },
        );

        if (!closestNode.node) {
            return null;
        }

        const closeNodeIsSource =
            closestNode.node.internals.positionAbsolute.x <
            internalNode.internals.positionAbsolute.x;

        return {
            id: closeNodeIsSource
                ? `${closestNode.node.id}-${node.id}`
                : `${node.id}-${closestNode.node.id}`,
            source: closeNodeIsSource ? closestNode.node.id : node.id,
            target: closeNodeIsSource ? node.id : closestNode.node.id,
        };
    }, []);

    const onNodeDrag = useCallback(
        (event, node) => {
            const closeEdge = getClosestEdge(node);
            setEdges((es) => {
                const nextEdges = es.filter((e) => e.className !== 'temp');

                if (
                    closeEdge &&
                    !nextEdges.find(
                        (ne) =>
                            ne.source === closeEdge.source && ne.target === closeEdge.target,
                    )
                ) {
                    closeEdge.className = 'temp';
                    nextEdges.push(closeEdge);
                }

                return nextEdges;
            });
        },
        [getClosestEdge, setEdges],
    );

    const onNodeDragStop = useCallback(
        (event, node) => {
            isDrag.current = false
            // const boundingBox = event.target.getBoundingClientRect();

            // const viewport_x = event.pageX - boundingBox.left;
            // const viewport_y = event.pageY - boundingBox.top;
            // const a = screenToFlowPosition({ x: viewport_x, y: viewport_y });
            // const b = flowToScreenPosition({ x: viewport_x, y: viewport_y });
            // // console.log({ viewport_x, viewport_y, a, b });
            // const nodeFilter = nodes.map(i => {

            //     if (i.id === node.id) {
            //         return {
            //             ...i,
            //             data: {
            //                 ...node.data,
            //                 ...a
            //             }, ...a
            //         }
            //     }
            //     return { ...i }
            // })
            const closeEdge = getClosestEdge(node);
            setEdges((es) => {
                const nextEdges = es.filter((e) => e.className !== 'temp');

                if (
                    closeEdge &&
                    !nextEdges.find(
                        (ne) =>
                            ne.source === closeEdge.source && ne.target === closeEdge.target,
                    )
                ) {
                    nextEdges.push(closeEdge);
                }
                const nextEdgesFilter = nextEdges.filter(e => e.id !== "fake").map((e) => e.source === "fake" ? { ...e, source: e.source_real } : e)
                return nextEdgesFilter;
            });
            setNodes(prev => prev.filter(i => i.id !== "fake"))
        },
        [getClosestEdge],
    );
    const isDrag = useRef(false)

    const onNodeDragStart = (event, node) => {
        console.log(event);
        console.log("1", node);
    }
    const refCurrentNode = useRef("")
    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={(e, node) => {
                const eFake = [{ ...e[0], id: "fake" }]
                if (e[0].dragging) {
                    const id = e[0].id;


                    const edgesFilter = edges.map(i => {

                        if (i.target === id) {
                            return [{
                                ...id,
                                source: ""
                            }, { ...i, id: "fake", target: "fake" }]
                        }
                        if (i.source === id) {
                            return {
                                ...i,
                                source: "fake",
                                source_real: id
                            }
                        }
                        return i
                    }).flat()
                    const nodesFind = nodes.find(i => i.id === id)
                    const isNodeFake = nodes.some(i => i.id === "fake");
                    if (!isNodeFake) {
                        const nodeFake = [...nodes, { ...nodesFind, id: "fake", id_fake: id, }];
                        setNodes(nodeFake)
                    }
                    setEdges(edgesFilter)
                } else {
                    refCurrentNode.current = edges

                }
                onNodesChange(e)

            }}
            onNodeMouseEnter={(e, n) => {

            }}
            onNodeMouseLeave={(e) => {
                // console.log("leave");
                // isDrag.current = true
            }}
            onNodeMouseMove={(e) => {
                // console.log("move");
            }}
            onConnect={onConnect}
            onNodeDragStart={onNodeDragStart}
            onNodeDrag={onNodeDrag}
            onNodeDragStop={onNodeDragStop}
            nodeTypes={nodeTypes}
            fitView
        >

        </ReactFlow >
    );
};

const LayoutFlow = () => {
    return (<div style={{ height: "100vh", width: "100wh" }}>
        <ReactFlowProvider>
            <Content />
        </ReactFlowProvider>
    </div>
    );
};

export default LayoutFlow;
