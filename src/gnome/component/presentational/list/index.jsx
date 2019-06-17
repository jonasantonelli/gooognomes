import React from 'react';
import PropTypes from 'prop-types'
import shortid from 'shortid';
import Card from '../card/index.jsx';

import './style.scss';

const List = ({data}) => (
  <div className="list">
  {
    data.map(value => (
      <Card
        key={shortid.generate()}
        id={value.id}
        name={value.name}
        thumbnail={value.thumbnail}
        age={value.age}
      />
    ))
  }
  </div>
);

List.defaultProps = {
    data: []
};

List.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object)
};

export default List;
