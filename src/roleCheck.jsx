import { useState } from 'react';

const RoleReveal = ({ playerRoles, onFinished }) => {
  const [index, setIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);

  const handleNext = () => {
    if (index < playerRoles.length - 1) {
      setIndex(index + 1);
      setIsRevealed(false);
    } else {
      onFinished();
    }
  };

  return (
    <div className="container text-center">
      <h3>Player {index + 1} of {playerRoles.length}</h3>

      {!isRevealed ? (
        <div className="pass-screen">
          <p>Hand the device to <strong>Player {index + 1}</strong></p>
          <button onClick={() => setIsRevealed(true)} className="btn-view">View My Role</button>
        </div>
      ) : (
        <div className="reveal-screen">
          <p>Your secret identity is:</p>
          <h1 className={playerRoles[index] === 'Werewolf' ? 'red' : 'blue'}>
            {playerRoles[index]}
          </h1>
          <button onClick={handleNext} className="btn-ok">OK, I've got it</button>
        </div>
      )}
    </div>
  );
};

export default RoleReveal;
