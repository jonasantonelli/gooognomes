import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { fetchList, fetchSearchByName, fetchByFilter, clearSearch, clearFilter } from '../../../action';

import Loading from '../../../../__core__/components/loading/index.jsx';
import Search from '../../presentational/search/index.jsx';
import Content from '../../presentational/content/index.jsx';

class ListContainer extends React.Component {
  componentDidMount() {
    this.props.fetchList();
  }

  render() {

    const {
      isFetching,
      list,
      minAge,
      maxAge,
      range,
      professions
    } = this.props;

    if(isFetching) {
      return <Loading />;
    }

    return (
      <div className="gnome">
        <Search handleSearch={this.props.fetchSearchByName} onCleaning={this.props.clearSearch} />
        <Content
          minAge={minAge}
          maxAge={maxAge}
          range={range}
          professions={professions}
          list={list}
          handleFilter={this.props.fetchByFilter}
          handleClearFilter={this.props.clearFilter}
        />
      </div>
    );
  }
}

export function mapStateToProps(state) {

  const gnomeList = state.gnome.search.length ? state.gnome.search : state.gnome.list;

  const gnomes = gnomeList.map((item) => {
    return {
      ...item,
      thumbnail: item.thumbnail && item.thumbnail.replace(/http/g, 'https')
    }
  });

  return {
    list: gnomes,
    isFetching: state.gnome.isFetching,
    minAge: state.gnome.filter.minAge,
    maxAge: state.gnome.filter.maxAge,
    range: state.gnome.filter.range,
    professions: state.gnome.filter.professions
  }
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({
     fetchList,
     fetchSearchByName,
     fetchByFilter,
     clearSearch,
     clearFilter
   }, dispatch);
 }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListContainer));
