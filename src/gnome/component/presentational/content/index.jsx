import React from 'react';
import PropTypes from 'prop-types'

import Filter from '../../../../__core__/components/filter/index.jsx';
import List from '../../presentational/list/index.jsx';

import './style.scss';

const Content = ({ minAge, maxAge, range, professions, list, handleFilter, handleClearFilter }) => (
  <div className="gnome__content">
    <div className="gnome__filter">
      <Filter
        minAge={minAge}
        maxAge={maxAge}
        range={range}
        professions={professions}
        handleFilter={handleFilter}
        handleClearFilter={handleClearFilter}
      />
    </div>
    <div className="gnome__list">
      <List data={list} />
    </div>
  </div>
);

Content.defaultProps = {
  handleFilter: () => {},
  handleClearFilter: () => {},
  professions: [],
  minAge: 0,
  maxAge: 100,
  range: {
    min: 0,
    max: 100
  }
};

Content.propTypes = {
  handleFilter: PropTypes.func,
  handleClearFilter: PropTypes.func,
  professions: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    checked: PropTypes.bool
  })),
  maxAge: PropTypes.number,
  minAge: PropTypes.number,
  range: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number
  })
};

export default Content;
