"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";

interface MindMapNode {
  id: string;
  text: string;
  x: number;
  y: number;
  parentId: string | null;
  children: string[];
  color: string;
}

const COLORS = [
  { bg: "bg-blue-100", border: "border-blue-300", line: "#3B82F6" },
  { bg: "bg-green-100", border: "border-green-300", line: "#10B981" },
  { bg: "bg-yellow-100", border: "border-yellow-300", line: "#F59E0B" },
  { bg: "bg-purple-100", border: "border-purple-300", line: "#8B5CF6" },
  { bg: "bg-pink-100", border: "border-pink-300", line: "#EC4899" },
  { bg: "bg-indigo-100", border: "border-indigo-300", line: "#6366F1" },
  { bg: "bg-red-100", border: "border-red-300", line: "#EF4444" },
  { bg: "bg-orange-100", border: "border-orange-300", line: "#F97316" },
];

export default function MindMap() {
  const [nodes, setNodes] = useState<MindMapNode[]>([]);
  const [newNodeText, setNewNodeText] = useState<string>("");
  const [newChildText, setNewChildText] = useState<string>("");
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [colorIndex, setColorIndex] = useState(0);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (draggingNodeId && mapRef.current) {
        const rect = mapRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - offset.x;
        const y = e.clientY - rect.top - offset.y;
        setNodes(prevNodes =>
          prevNodes.map(node =>
            node.id === draggingNodeId ? { ...node, x, y } : node
          )
        );
      }
    };

    const handleMouseUp = () => {
      setDraggingNodeId(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingNodeId, offset]);

  const addCentralIdea = () => {
    if (newNodeText.trim() === "") return;
    
    const newNode: MindMapNode = {
      id: Date.now().toString(),
      text: newNodeText,
      x: mapRef.current ? mapRef.current.clientWidth / 2 : 500,
      y: mapRef.current ? mapRef.current.clientHeight / 2 : 500,
      parentId: null,
      children: [],
      color: `${COLORS[colorIndex].bg} ${COLORS[colorIndex].border}`,
    };
    
    setNodes(prevNodes => [...prevNodes, newNode]);
    setNewNodeText("");
    setColorIndex((colorIndex + 1) % COLORS.length);
  };

  const addChildNode = () => {
    if (newChildText.trim() === "" || !selectedNodeId) return;
    
    const parentNode = nodes.find(node => node.id === selectedNodeId);
    if (!parentNode) return;

    const angle = Math.random() * 2 * Math.PI;
    const distance = 150;
    const newNode: MindMapNode = {
      id: Date.now().toString(),
      text: newChildText,
      x: parentNode.x + distance * Math.cos(angle),
      y: parentNode.y + distance * Math.sin(angle),
      parentId: selectedNodeId,
      children: [],
      color: parentNode.color,
    };
    
    setNodes(prevNodes => {
      const updatedNodes = [...prevNodes, newNode];
      return updatedNodes.map(node =>
        node.id === selectedNodeId
          ? { ...node, children: [...node.children, newNode.id] }
          : node
      );
    });
    setNewChildText("");
  };

  const startDragging = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (mapRef.current) {
      const rect = mapRef.current.getBoundingClientRect();
      const node = nodes.find(n => n.id === id);
      if (node) {
        setOffset({
          x: e.clientX - rect.left - node.x,
          y: e.clientY - rect.top - node.y
        });
      }
    }
    setDraggingNodeId(id);
  };

  const getConnectionPoints = (parent: MindMapNode, child: MindMapNode) => {
    const angle = Math.atan2(child.y - parent.y, child.x - parent.x);
    const parentRadius = 60;
    const childRadius = 60;

    return {
      x1: parent.x + parentRadius * Math.cos(angle),
      y1: parent.y + parentRadius * Math.sin(angle),
      x2: child.x - childRadius * Math.cos(angle),
      y2: child.y - childRadius * Math.sin(angle),
    };
  };

  const renderNode = (node: MindMapNode) => (
    <div key={node.id}>
      {node.parentId && (
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {(() => {
            const parent = nodes.find(n => n.id === node.parentId);
            if (!parent) return null;
            const { x1, y1, x2, y2 } = getConnectionPoints(parent, node);
            return (
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={COLORS[COLORS.findIndex(c => c.bg === node.color.split(' ')[0])].line}
                strokeWidth="2"
              />
            );
          })()}
        </svg>
      )}
      
      <div
        className={`absolute p-3 rounded-lg shadow-md border min-w-[120px] text-center cursor-move
                    ${node.parentId ? node.color : 'bg-black text-white border-gray-600'}`}
        style={{
          top: `${node.y}px`,
          left: `${node.x}px`,
          transform: "translate(-50%, -50%)"
        }}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedNodeId(node.id);
        }}
        onMouseDown={(e) => startDragging(e, node.id)}
      >
        <span className="font-medium">{node.text}</span>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-5xl font-bold mb-4">Mind Mapping</h1>
      
      <div className="mb-8 max-w-2xl text-center">
        <p className="text-xl mb-2">
          Mind mapping is a visual thinking tool that helps structure information and better analyze, comprehend, and generate new ideas.
        </p>
        <p className="text-lg">
          Create multiple central ideas and connect related concepts. Drag nodes to rearrange your mind map.
        </p>
      </div>
      
      <div 
        ref={mapRef}
        className="w-full h-[calc(100vh-400px)] min-h-[600px] border-2 border-gray-300 rounded-lg relative bg-white overflow-auto"
        onClick={() => setSelectedNodeId(null)}
      >
        {nodes.map(renderNode)}
      </div>
      
      <div className="mt-6 flex gap-2">
        <input
          type="text"
          value={newNodeText}
          onChange={(e) => setNewNodeText(e.target.value)}
          placeholder="Enter new central idea"
          className="border border-gray-300 p-2 rounded-lg"
          onKeyDown={(e) => {
            if (e.key === "Enter") addCentralIdea();
          }}
        />
        <button
          onClick={addCentralIdea}
          className="bg-blue-500 text-white p-2 rounded-lg"
        >
          Add Central Idea
        </button>
      </div>

      {selectedNodeId && (
        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={newChildText}
            onChange={(e) => setNewChildText(e.target.value)}
            placeholder="Enter new branch"
            className="border border-gray-300 p-2 rounded-lg"
            onKeyDown={(e) => {
              if (e.key === "Enter") addChildNode();
            }}
          />
          <button
            onClick={addChildNode}
            className="bg-green-500 text-white p-2 rounded-lg"
          >
            Add Branch
          </button>
        </div>
      )}
      
      <div className="mt-8">
        <Link href="/study-techniques" className="text-blue-500 hover:underline">
          Back to Study Techniques
        </Link>
      </div>
    </div>
  );
}

