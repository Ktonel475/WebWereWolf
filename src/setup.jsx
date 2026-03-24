import { useState } from 'react';

const SetupScreen = ({ onStart }) => {
  const [playerCount, setPlayerCount] = useState(6);
  const [roles, setRoles] = useState({ seer: true, doctor: true, hunter: false });

  const handleSubmit = (e) => {
    e.preventDefault();
    onStart(Number(playerCount), roles);
  };

  return (
    <div className="container">
      <h2>🐺 Game Setup</h2>
      <form onSubmit={handleSubmit}>
        <label>Players: {playerCount}</label>
        <input
          type="range" min="5" max="12"
          value={playerCount}
          onChange={(e) => setPlayerCount(e.target.value)}
        />

        <div className="role-list">
          {Object.keys(roles).map(role => (
            <label key={role} style={{ display: 'block', margin: '10px 0' }}>
              <input
                type="checkbox"
                checked={roles[role]}
                onChange={() => setRoles({ ...roles, [role]: !roles[role] })}
              /> {role.toUpperCase()}
            </label>
          ))}
        </div>
        <button type="submit" className="btn-primary">Start Game</button>
      </form>
    </div>
  );
};

export default SetupScreen;
