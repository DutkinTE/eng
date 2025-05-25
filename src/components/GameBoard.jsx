import React from 'react';

const GameBoard = ({ categories, answeredQuestions, onQuestionClick }) => {
  return (
    <div className="game-board">
      <table>
        <thead>
          <tr>
            {categories.map(category => (
              <th key={category.id}>{category.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[0, 1, 2, 3, 4].map(rowIndex => (
            <tr key={rowIndex}>
              {categories.map(category => {
                const question = category.questions[rowIndex];
                const isAnswered = answeredQuestions.includes(question.id);
                
                return (
                  <td key={question.id}>
                    <button 
                      onClick={() => !isAnswered && onQuestionClick(question)}
                      disabled={isAnswered}
                      className={isAnswered ? 'answered' : ''}
                    >
                      {isAnswered ? '' : question.value}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GameBoard;