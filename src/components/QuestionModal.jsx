import React, { useState } from 'react';

const QuestionModal = ({ 
  question, 
  teams, 
  onAnswer, 
  onClose 
}) => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [answerRevealed, setAnswerRevealed] = useState(false);

  const handleTeamSelect = (teamId) => {
    setSelectedTeam(teamId);
  };

  const handleRevealAnswer = () => {
    setAnswerRevealed(true);
  };

  const handleCorrectAnswer = () => {
    if (!selectedTeam) {
      alert('Пожалуйста, выберите команду для начисления баллов');
      return;
    }
    onAnswer(true, selectedTeam);
    onClose();
  };

  const handleIncorrectAnswer = () => {
    onAnswer(false);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{question.text}</h2>
        <p>Стоимость: {question.value} очков</p>
        
        {answerRevealed ? (
          <>
            <div className="answer-section">
              <h3>Правильный ответ:</h3>
              <p className="correct-answer">{question.answer}</p>
            </div>

            <div className="team-selection">
              <h3>Выберите команду для начисления баллов:</h3>
              <div className="team-options">
                {teams.map(team => (
                  <label key={team.id} className="team-option">
                    <input
                      type="radio"
                      name="selectedTeam"
                      checked={selectedTeam === team.id}
                      onChange={() => handleTeamSelect(team.id)}
                    />
                    {team.name}
                  </label>
                ))}
              </div>
            </div>

            <div className="modal-actions">
              <button onClick={handleCorrectAnswer} className="correct-btn">
                Начислить баллы
              </button>
              <button onClick={handleIncorrectAnswer} className="incorrect-btn">
                Никому не начислять
              </button>
            </div>
          </>
        ) : (
          <div className="pre-answer-actions">
            <button onClick={handleRevealAnswer} className="reveal-btn">
              Показать ответ
            </button>
            <button onClick={onClose} className="close-btn">
              Закрыть вопрос
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionModal;