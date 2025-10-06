import React, { useState } from 'react'

const Home = () => {
  const [selectedMatch, setSelectedMatch] = useState(null);

  const group = {
    name: "C csoport",
    rows: [
      { pos: 1, team: "Ízelt Lábúak FC (HUN)", m: 6, w: 4, d: 1, l: 1, gf: 11, ga: 5, gd: 6, pts: 13 },
      { pos: 2, team: "Juventus (ITA)", m: 6, w: 3, d: 1, l: 2, gf: 9, ga: 7, gd: 2, pts: 10 },
      { pos: 3, team: "Ajax (NED)", m: 6, w: 2, d: 2, l: 2, gf: 8, ga: 9, gd: -1, pts: 8 },
      { pos: 4, team: "Galatasaray (TUR)", m: 6, w: 0, d: 2, l: 4, gf: 4, ga: 11, gd: -7, pts: 2 },
    ],
  };

  const knockout = {
    roundOf16: [
      { id: "r16-1", home: "Ízelt Lábúak FC", away: "Manchester City", agg: "3-2", legs: [{ leg: "H", score: "2-1", scorers: ["Szöcske Szabolcs", "Mandíbula"] }, { leg: "I", score: "1-1", scorers: ["Hangya Henrik"] }] },
    ],
    quarters: [
      { id: "qf-1", home: "Ízelt Lábúak FC", away: "Real Madrid", agg: "4-3", legs: [{ leg: "H", score: "2-0", scorers: ["Szöcske Szabolcs", "Szöcske Szabolcs"] }, { leg: "I", score: "2-3", scorers: ["Real gólok"] }] },
    ],
    semis: [
      { id: "sf-1", home: "Ízelt Lábúak FC", away: "Bayern München", agg: "2-2 (5-4 p)", legs: [{ leg: "H", score: "1-0", scorers: ["Mandíbula"] }, { leg: "I", score: "1-2", scorers: ["Bayern gólok"] }] },
    ],
    final: { id: "final-2026", home: "Ízelt Lábúak FC", away: "FC Barcelona", score: "2-0", scorers: [{ min: 77, player: "Szöcske Szabolcs", desc: "ollózó gól" }, { min: 89, player: "Hangya Henrik", desc: "záró gól" }], venue: "Wembley, London" },
  };

  return (
    <div className="p-6 max-w-5xl mx-auto font-sans">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Ízelt Lábúak FC — Bajnokok Ligája 2025/26</h1>
        <p className="text-sm text-gray-600 mt-1">Csoportkör győztes, majd bravúros kieséses menetelés egészen a Wembley-i döntőig.</p>
      </header>

      <section className="mb-8 bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-xl font-semibold mb-3">Csoport: {group.name}</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="text-sm text-gray-700">
                <th className="px-3 py-2">H.</th>
                <th className="px-3 py-2">Csapat</th>
                <th className="px-3 py-2">M</th>
                <th className="px-3 py-2">Gy</th>
                <th className="px-3 py-2">D</th>
                <th className="px-3 py-2">V</th>
                <th className="px-3 py-2">LG</th>
                <th className="px-3 py-2">KG</th>
                <th className="px-3 py-2">GK</th>
                <th className="px-3 py-2">Pont</th>
              </tr>
            </thead>
            <tbody>
              {group.rows.map((r) => (
                <tr key={r.pos} className={`border-t ${r.pos === 1 ? "bg-green-50" : ""}`}>
                  <td className="px-3 py-2 font-medium">{r.pos}.</td>
                  <td className="px-3 py-2">{r.team}</td>
                  <td className="px-3 py-2">{r.m}</td>
                  <td className="px-3 py-2">{r.w}</td>
                  <td className="px-3 py-2">{r.d}</td>
                  <td className="px-3 py-2">{r.l}</td>
                  <td className="px-3 py-2">{r.gf}</td>
                  <td className="px-3 py-2">{r.ga}</td>
                  <td className="px-3 py-2">{r.gd}</td>
                  <td className="px-3 py-2 font-semibold">{r.pts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <RoundCard title="Nyolcaddöntő" items={knockout.roundOf16} onClick={setSelectedMatch} />
        <RoundCard title="Negyeddöntő" items={knockout.quarters} onClick={setSelectedMatch} />
        <RoundCard title="Elődöntő" items={knockout.semis} onClick={setSelectedMatch} />
      </section>

      <section className="mb-8 bg-white rounded-xl shadow-sm p-4">
        <h2 className="text-xl font-semibold mb-3">Döntő — {knockout.final.venue}</h2>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold">{knockout.final.home} vs. {knockout.final.away}</h3>
            <p className="mt-1 text-sm text-gray-600">Végső eredmény: <span className="font-semibold">{knockout.final.score}</span></p>
            <ul className="mt-3 space-y-1 text-sm">
              {knockout.final.scorers.map((s, i) => (
                <li key={i}>— {s.min}': <span className="font-medium">{s.player}</span> ({s.desc})</li>
              ))}
            </ul>
          </div>

          <div className="bg-green-700 text-white rounded-lg px-4 py-2">
            <div className="text-sm"><strong>🏆 Győztes</strong></div>
            <div className="text-2xl font-bold">Ízelt Lábúak FC</div>
          </div>
        </div>
      </section>

      <footer className="text-sm text-gray-600 mt-6">Ez a komponens kitalált, bemutató célokra készült — ízletes, zöld-fekete dizájnnal.</footer>

      {selectedMatch && (
        <MatchModal match={selectedMatch} onClose={() => setSelectedMatch(null)} />
      )}
    </div>
  );
}

function RoundCard({ title, items, onClick }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h3 className="font-semibold mb-3">{title}</h3>
      <ul className="space-y-2 text-sm">
        {items.map((m) => (
          <li key={m.id} className="flex items-center justify-between border p-2 rounded-md">
            <div>
              <div className="font-medium">{m.home} — {m.away}</div>
              <div className="text-xs text-gray-500">Összesítés: {m.agg}</div>
            </div>
            <button className="text-green-700 text-sm font-semibold" onClick={() => onClick(m)}>Részletek</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MatchModal({ match, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-xl w-full p-6">
        <div className="flex items-start justify-between">
          <h4 className="text-lg font-bold">{match.home} — {match.away}</h4>
          <button className="text-gray-500" onClick={onClose}>✕</button>
        </div>
        <div className="mt-4 text-sm space-y-3">
          <div>Összesítés: <strong>{match.agg}</strong></div>
          {match.legs && match.legs.map((leg, idx) => (
            <div key={idx} className="border rounded p-3">
              <div className="text-sm font-medium">{leg.leg === 'H' ? 'Hazai' : 'Idegen'}: {leg.score}</div>
              {leg.scorers && <div className="text-xs text-gray-600 mt-1">Gólszerzők: {leg.scorers.join(', ')}</div>}
            </div>
          ))}
        </div>
        <div className="mt-6 text-right">
          <button className="px-4 py-2 bg-green-700 text-white rounded" onClick={onClose}>Bezár</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
