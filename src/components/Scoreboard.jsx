import React from 'react';

const Scoreboard = ({ teams, activeTeam }) => {
  return (
    <div className="scoreboard">
      <h2>Счет</h2>
      <div className="teams">
        {teams.map((team, index) => (
          <div 
            key={team.id} 
            className={`team`}
          >
            <h3>{team.name}</h3>
            <p>{team.score} очков</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scoreboard;