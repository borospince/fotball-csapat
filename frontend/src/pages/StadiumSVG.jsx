function StadiumSVG({ sectors, selectedSector, onSelect }) {
  const getColor = (sector) => {
    if (sector.occupied) return "#e53935"; // piros
    if (selectedSector === sector.id) return "#4dabf7"; // kék
    return "#81c784"; // zöld
  };

  return (
    <svg viewBox="0 0 400 520" width="100%" height="520">
      {/* PÁLYA */}
      <rect x="90" y="120" width="220" height="280" rx="20" fill="#2e7d32" />

      {/* A SZEKCIÓ */}
      {["A1","A2","A3","A4","A5"].map((id, i) => {
        const s = sectors.find(sec => sec.id === id);
        return (
          <g key={id} onClick={() => !s.occupied && onSelect(id)}>
            <rect
              x={80 + i * 60}
              y={60}
              rx="12"
              width="55"
              height="40"
              fill={getColor(s)}
              cursor="pointer"
            />
            <text x={107 + i * 60} y={85} textAnchor="middle" fontSize="12" fontWeight="bold">
              {id}
            </text>
          </g>
        );
      })}

      {/* B SZEKCIÓ */}
      {["B1","B2","B3","B4","B5","B6","B7","B8","B9"].map((id, i) => {
        const s = sectors.find(sec => sec.id === id);
        return (
          <g key={id} onClick={() => !s.occupied && onSelect(id)}>
            <rect
              x={20}
              y={140 + i * 35}
              rx="12"
              width="55"
              height="30"
              fill={getColor(s)}
              cursor="pointer"
            />
            <text x="47" y={160 + i * 35} textAnchor="middle" fontSize="11" fontWeight="bold">
              {id}
            </text>
          </g>
        );
      })}

      {/* C SZEKCIÓ */}
      {["C1","C2","C3","C4","C5","C6","C7"].map((id, i) => {
        const s = sectors.find(sec => sec.id === id);
        return (
          <g key={id} onClick={() => !s.occupied && onSelect(id)}>
            <rect
              x={80 + i * 45}
              y={420}
              rx="12"
              width="40"
              height="35"
              fill={getColor(s)}
              cursor="pointer"
            />
            <text x={100 + i * 45} y={443} textAnchor="middle" fontSize="11" fontWeight="bold">
              {id}
            </text>
          </g>
        );
      })}

      {/* D SZEKCIÓ */}
      {["D1","D2","D3","D4","D5","D6","D7","D8"].map((id, i) => {
        const s = sectors.find(sec => sec.id === id);
        return (
          <g key={id} onClick={() => !s.occupied && onSelect(id)}>
            <rect
              x={325}
              y={140 + i * 35}
              rx="12"
              width="55"
              height="30"
              fill={getColor(s)}
              cursor="pointer"
            />
            <text x="352" y={160 + i * 35} textAnchor="middle" fontSize="11" fontWeight="bold">
              {id}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export default StadiumSVG;
