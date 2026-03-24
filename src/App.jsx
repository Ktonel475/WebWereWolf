import { useState } from 'react';
import SetupScreen from './setup';
import RoleReveal from './roleCheck';
import NightPhase from './NightPhase'

function App() {
  const [screen, setScreen] = useState('setup'); // 'setup' | 'reveal' | 'night'
  const [playerRoles, setPlayerRoles] = useState([]);
  const [gameLog, setGamelog] = useState([]);
  const handleStartGame = (count, selectedRoles) => {
    // 1. Create the deck
    let deck = [];
    Object.keys(selectedRoles).forEach(role => {
      if (selectedRoles[role]) deck.push(role);
    });

    // 2. Add Werewolves (roughly 1 per 3 players)
    const wolfCount = Math.max(1, Math.floor(count / 3));
    for (let i = 0; i < wolfCount; i++) deck.push('Werewolf');

    // 3. Fill the rest with Villagers
    while (deck.length < count) deck.push('Villager');

    // 4. Shuffle and move to next screen
    setPlayerRoles(deck.sort(() => Math.random() - 0.5));
    setScreen('reveal');
  };

  return (
    <main className="app-wrapper">
      {screen === 'setup' && (
        <SetupScreen onStart={handleStartGame} />
      )}

      {screen === 'reveal' && (
        <RoleReveal
          playerRoles={playerRoles}
          onFinished={() => setScreen('night')}
        />
      )}
      {screen === 'night' && (
        <NightPhase
          playerRoles={playerRoles}
          onRecord={(entry) => setGamelog([...gameLog, entry])}
          gameLog={gameLog}
          onRestart={() => setScreen('setup')} // Added the '=' here
        /> // Also ensure the component tag is closed
      )}
    </main>
  );
}

export default App;
