import React from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';

const Professions = ({ professions, handleCheck }) => (
  <div className="filter-professions">
      <span className="h3">Filter by Professions</span>
      <div className="filter-professions__list">
        <div className="scroll">
          {
            professions.map(item => (
              <div className="filter-professions__list-item" key={shortid.generate()}>
                <input type="checkbox" id={item.name} name={item.name} checked={item.checked} onChange={event => handleCheck({name:item.name, checked: event.target.checked})} />
                <label htmlFor={item.name}>{ item.name }</label>
              </div>
            ))
          }
        </div>
      </div>
  </div>
);

Professions.defaultProps = {
  handleCheck: () => {},
  professions: [{}]
}

Professions.propTypes = {
  handleCheck: PropTypes.func,
  professions: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    checked: PropTypes.bool
  }))
}

export default Professions;
