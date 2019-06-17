import React from 'react';
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom';
import './style.scss';

const Card = ({id, thumbnail, name, age}) => (
  <NavLink to={`/details/${id}`} className="card" >
      { thumbnail && <img src={thumbnail} alt={name} />}
      <div className="card__info">
          <div className="card__title">{name}</div>
          <div className="card__age">Age: {age}</div>
      </div>
  </NavLink>
);

Card.defaultProps = {
    thumbnail: null
};

Card.propTypes = {
    id: PropTypes.number.isRequired,
    thumbnail: PropTypes.string,
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired
};

export default Card;
