import React from 'react';
import InputRange from 'react-input-range';
import PropTypes from 'prop-types';

import 'react-input-range/lib/css/index.css';

class Age extends React.PureComponent {
  constructor(props){
    super(props);

    this.state = {
      range: this.props.range
    }
  }

  render() {

    const { minAge, maxAge } = this.props;

    return (
      <div className="filter-age">
        <span className="h3">Filter by Age</span>
        <div className="filter-age__range">
          <InputRange
            draggableTrack
            maxValue={maxAge}
            minValue={minAge}
            onChange={value => this.setState({range: value})}
            onChangeComplete={value => this.props.handleChange(value)}
            value={this.state.range}
          />
        </div>
      </div>
    )
  }
}

Age.defaultProps = {
  handleChange: () => {},
  minAge: 0,
  maxAge: 100,
  range: {
    min: 0,
    max: 100
  }
}

Age.propTypes = {
  handleChange: PropTypes.func,
  maxAge: PropTypes.number,
  minAge: PropTypes.number,
  range: PropTypes.shape({
    min: PropTypes.number,
    max: PropTypes.number
  })
}

export default Age;
