import React, { useState } from 'react';
import { categories } from './questions';
import GameBoard from './components/GameBoard';
import Scoreboard from './components/Scoreboard';
import TeamSetup from './components/TeamSetup';
import QuestionModal from './components/QuestionModal';
import './App.css';

function App() {
  const [teams, setTeams] = useState([]);
  const [activeTeam, setActiveTeam] = useState(0);
  const [showQuestion, setShowQuestion] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);

  const handleTeamsSubmit = (submittedTeams) => {
    setTeams(submittedTeams);
    setGameStarted(true);
  };

  const handleQuestionClick = (question) => {
    setShowQuestion(question);
  };

  const handleAnswer = (isCorrect, teamId = null) => {
    if (isCorrect && teamId !== null) {
      const updatedTeams = teams.map(team => 
        team.id === teamId 
          ? { ...team, score: team.score + showQuestion.value } 
          : team
      );
      setTeams(updatedTeams);
    } else {
      // При неправильном ответе просто передаем ход следующей команде
      setActiveTeam((activeTeam + 1) % teams.length);
    }

    setAnsweredQuestions([...answeredQuestions, showQuestion.id]);
    setShowQuestion(null);
  };


  return (
    <div className="app">
      <h1>Своя Игра</h1>
      
      {!gameStarted ? (
        <TeamSetup onTeamsSubmit={handleTeamsSubmit} />
      ) : (
        <>
          <Scoreboard teams={teams} activeTeam={activeTeam} />
          <GameBoard 
            categories={categories} 
            answeredQuestions={answeredQuestions}
            onQuestionClick={handleQuestionClick}
          />
          
          {showQuestion && (
            <QuestionModal
              question={showQuestion}
              teams={teams}
              onAnswer={handleAnswer}
              onClose={() => setShowQuestion(null)}
            />
          )}
        </>
      )}
    </div>
  );
}

export default App;