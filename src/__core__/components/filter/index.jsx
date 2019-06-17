import React from 'react';
import PropTypes from 'prop-types';

import FilterAge from './age.jsx';
import FilterProfessions from './professions.jsx';

import './style.scss';

class Filter extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      range: this.props.range,
      professions: this.props.professions
    }

    this.handleChangeAge = this.handleChangeAge.bind(this);
    this.handleChangeProfession = this.handleChangeProfession.bind(this);
    this.handleClearFilter = this.handleClearFilter.bind(this);
  }

  handleChangeAge(value) {
    this.setState({
      range: value
    });
  }

  handleChangeProfession(value) {
    this.setState((state) => {
      return {
        professions: state.professions.map((item) => {
          if(value.name !== item.name) {
            return item;
          }
          return {
            name: item.name,
            checked: value.checked
          }
        })
      }
    });
  }

  handleClearFilter() {
    this.setState((prevState, props) => {
      return {
        range: {
          min: props.minAge,
          max: props.maxAge
        },
        professions: prevState.professions.map(profession => Object.assign(profession, {checked: false}))
      }
    });
    this.props.handleClearFilter(this.state);
  }

  render() {

    const { minAge, maxAge } = this.props;

    return (
      <div className="filter">
        <FilterAge
          handleChange={value => this.handleChangeAge(value)}
          minAge={minAge}
          maxAge={maxAge}
          range={this.state.range}
        />
        <FilterProfessions
          handleCheck={this.handleChangeProfession}
          professions={this.state.professions}
        />
        <button button="button" className="button button--primary" onClick={() => this.props.handleFilter(this.state)}>Apply filter</button>
        <button button="button" className="button button--default" onClick={this.handleClearFilter}>Clear filter</button>
      </div>
    );
  }
}

Filter.defaultProps = {
  handleFilter: () => {},
  handleClearFilter: () => {},
  professions: [],
  minAge: 0,
  maxAge: 100,
  range: {
    min: 0,
    max: 100
  }
}

Filter.propTypes = {
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
}

export default Filter;
