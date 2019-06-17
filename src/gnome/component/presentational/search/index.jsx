import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

function debounced(fn, delay) {
    let timerId;
    return function (...args) {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            fn(...args);
            timerId = null;
        }, delay);
    }
}

class Search extends React.PureComponent {
    constructor(props) {
      super(props);
      this.search = React.createRef();
      this.handleOnChange = debounced(this.handleOnChange.bind(this), 1000);
      this.handleCleaning = this.handleCleaning.bind(this);
    }

    handleOnChange() {
      this.props.handleSearch(this.search.current.value);
    }

    handleCleaning() {
      this.props.onCleaning();
      this.search.current.value = '';
      this.search.current.focus();
    }

    render() {
      return (
        <div className="search">
          <input
            autoComplete="off"
            onKeyPress={this.handleOnChange}
            type="text"
            ref={this.search}
            onChange={this.handleOnChange}
            placeholder="Gnomes..."
            name="search"
          />
          <button type="button" onClick={this.handleCleaning}>Clean</button>
        </div>
      );
    }
}

Search.defaultProps = {
  handleSearch: () => {},
  onCleaning: () => {},
};

Search.propTypes = {
  handleSearch: PropTypes.func,
  onCleaning: PropTypes.func,
};

export default Search;
