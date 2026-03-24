import { useState } from 'react';

const NightPhase = ({ playerRoles, onRecord, gameLog, onRestart }) => {
  const [viewedPlayerIndex, setViewedPlayerIndex] = useState(null);
  const [recordEntry, setRecordEntry] = useState({ player: '', action: '' });

  const handleRecord = (e) => {
    e.preventDefault();
    if (!recordEntry.player || !recordEntry.action) return;

    onRecord({
      id: Date.now(),
      ...recordEntry,
      timestamp: new Date().toLocaleTimeString()
    });
    setRecordEntry({ player: '', action: '' }); // Reset form
  };

  return (
    <div className="container" style={{ color: '#eee', padding: '20px' }}>
      <h2 style={{ color: '#9b59b6' }}>🌙 Night Phase (Host View)</h2>

      {/* 1. Seer/Identity Check Section */}
      <section style={{ marginBottom: '30px', border: '1px solid #444', padding: '15px' }}>
        <h3>🔮 Seer Inquiry</h3>
        <p>Select a player to reveal their role to the Seer:</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {playerRoles.map((role, i) => (
            <button key={i} onClick={() => setViewedPlayerIndex(i)}>
              Player {i + 1}
            </button>
          ))}
        </div>
        {viewedPlayerIndex !== null && (
          <div style={{ marginTop: '10px', padding: '10px', background: '#333' }}>
            Result: <strong>Player {viewedPlayerIndex + 1} is a {playerRoles[viewedPlayerIndex]}</strong>
            <button onClick={() => setViewedPlayerIndex(null)} style={{ marginLeft: '10px' }}>Close</button>
          </div>
        )}
      </section>

      {/* 2. Host Record Form */}
      <section style={{ marginBottom: '30px', border: '1px solid #444', padding: '15px' }}>
        <h3>📝 Record Events</h3>
        <form onSubmit={handleRecord} style={{ display: 'flex', gap: '10px' }}>
          <input
            placeholder="Who? (e.g. Player 3)"
            value={recordEntry.player}
            onChange={(e) => setRecordEntry({ ...recordEntry, player: e.target.value })}
          />
          <select
            value={recordEntry.action}
            onChange={(e) => setRecordEntry({ ...recordEntry, action: e.target.value })}
          >
            <option value="">Select Action</option>
            <option value="Died (Werewolf)">Died (Werewolf)</option>
            <option value="Died (Hunter)">Died (Hunter)</option>
            <option value="Saved (Doctor)">Saved (Doctor)</option>
            <option value="Used Potion">Used Potion</option>
          </select>
          <button type="submit">Add Log</button>
        </form>
      </section>

      {/* 3. Event Log Display */}
      <section>
        <h3>📜 Game Log</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {gameLog.length === 0 && <li>No events recorded yet.</li>}
          {gameLog.map(log => (
            <li key={log.id} style={{ borderBottom: '1px solid #222', padding: '5px 0' }}>
              [{log.timestamp}] <strong>{log.player}</strong>: {log.action}
            </li>
          ))}
        </ul>
      </section>

      <button onClick={onRestart} style={{ marginTop: '40px', background: '#e74c3c' }}>End Game / Reset</button>
    </div>
  );
};

export default NightPhase;
