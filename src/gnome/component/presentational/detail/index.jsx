import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from "react-router-dom";
import './style.scss';

const Detail = ({data}) => {
  if(!data) {
      return null;
  }

  const thumbnail = data.thumbnail
      ? <img src={data.thumbnail} alt={data.name} />
      : null;

  return (
    <div className="detail">
      <NavLink to={'/list'} className="close">
        <svg width="40" height="40" viewBox="0 0 24 24">
          <path fill="#ffffff" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
      </NavLink>
      <div className="detail__thumbnail">
        { thumbnail }
      </div>
      <div className="detail__info">
        <div className="detail__name">{ data.name}</div>
        <div className="detail__age">Age: { data.age }</div>
        <div className="detail__hair">Hair Color: { data.hair_color }</div>
        <div className="detail__weight">Weight: { data.weight }</div>
        <div className="detail__height">Height: { data.height }</div>
        <div className="detail__professions">Professions: { data.professions.join(', ') }</div>
        <div className="detail__friends">Friends: { data.friends.join(', ') }</div>
      </div>
    </div>
  )
}

Detail.defaultProps = {
  data: []
};

Detail.propTypes = {
  data: PropTypes.shape({
    age: PropTypes.number,
    friends: PropTypes.arrayOf(PropTypes.string),
    hair_color: PropTypes.string,
    height: PropTypes.number,
    id: PropTypes.number,
    name: PropTypes.string,
    professions: PropTypes.arrayOf(PropTypes.string),
    thumbnail: PropTypes.string,
    weight: PropTypes.number
  })
}

export default Detail;
