import React from 'react';
import '../../style/Card.css';

const Card = ({ rank, suit }) => {
  const cardImage = `/images/${rank}_of_${suit}.svg`;

  const cardStyle = {
    backgroundImage: `url(${cardImage})`,
  };

  return (
    <div className="card" style={cardStyle}></div>
  );
};

export default Card;
