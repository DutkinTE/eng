import React, { useState } from 'react';

const TeamSetup = ({ onTeamsSubmit }) => {
  const [teams, setTeams] = useState([
    { id: 1, name: '', score: 0 },
    { id: 2, name: '', score: 0 },
  ]);
  const [teamCount, setTeamCount] = useState(2);

  const handleNameChange = (id, value) => {
    setTeams(teams.map(team => 
      team.id === id ? { ...team, name: value } : team
    ));
  };

  const addTeam = () => {
    if (teamCount < 6) {
      const newId = Math.max(...teams.map(t => t.id)) + 1;
      setTeams([...teams, { id: newId, name: '', score: 0 }]);
      setTeamCount(teamCount + 1);
    }
  };

  const removeTeam = (id) => {
    if (teamCount > 2) {
      setTeams(teams.filter(team => team.id !== id));
      setTeamCount(teamCount - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Проверяем, что все имена заполнены
    if (teams.some(team => !team.name.trim())) {
      alert('Пожалуйста, введите названия для всех команд');
      return;
    }
    onTeamsSubmit(teams);
  };

  return (
    <div className="team-setup">
      <h2>Настройка команд</h2>
      <form onSubmit={handleSubmit}>
        {teams.map((team) => (
          <div key={team.id} className="team-input">
            <input
              type="text"
              value={team.name}
              onChange={(e) => handleNameChange(team.id, e.target.value)}
              placeholder={`Команда ${team.id}`}
              required
            />
            {teamCount > 2 && (
              <button 
                type="button" 
                onClick={() => removeTeam(team.id)}
                className="remove-team"
              >
                ×
              </button>
            )}
          </div>
        ))}
        
        <div className="setup-actions">
          {teamCount < 6 && (
            <button 
              type="button" 
              onClick={addTeam}
              className="add-team"
            >
              Добавить команду
            </button>
          )}
          <button type="submit" className="start-game">
            Начать игру
          </button>
        </div>
      </form>
    </div>
  );
};

export default TeamSetup;