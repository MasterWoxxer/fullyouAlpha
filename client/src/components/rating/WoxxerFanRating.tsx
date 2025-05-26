import React, { useState } from "react";

interface FanProps {
  value: number;
  onChange: (value: number) => void;
  labelStart: string;
  labelEnd: string;
}

const Fan: React.FC<FanProps> = ({ value, onChange, labelStart, labelEnd }) => {
  const width = 320;
  const height = 48; // finger-friendly

  const handleClick = (e: React.MouseEvent<SVGRectElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = ((e.clientX - rect.left) / rect.width) * 100;
    onChange(Math.max(0, Math.min(100, Math.round(percent))));
  };

  return (
    <div style={{ display: "flex", alignItems: "center", width: width + 80 }}>
      <span style={{ marginRight: 12 }}>{labelStart}</span>
      <svg
        width={width}
        height={height}
        style={{ touchAction: "none", background: "#f0f0f0", borderRadius: 24, margin: 8, cursor: "pointer" }}
        onClick={handleClick}
      >
        <rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill="#e0e0e0"
          rx={24}
        />
        <circle
          cx={(value / 100) * width}
          cy={height / 2}
          r={16}
          fill="#4f46e5"
        />
      </svg>
      <span style={{ marginLeft: 12 }}>{labelEnd}</span>
    </div>
  );
};

export default function WoxxerFanRating() {
  const [fanValue, setFanValue] = useState(50);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minHeight: 300, justifyContent: "center" }}>
      <div style={{ fontWeight: "bold", marginBottom: 16 }}>How do you feel about your energy today?</div>
      <Fan
        value={fanValue}
        onChange={setFanValue}
        labelStart="Low"
        labelEnd="High"
      />
      <div style={{ marginTop: 16, color: "#666" }}>Selected value: {fanValue}</div>
    </div>
  );
}