import React from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {connect} from "react-redux";

import { fetchDetails } from '../../../action';
import Loading from '../../../../__core__/components/loading/index.jsx';
import Detail from '../../presentational/detail/index.jsx';

class Details extends React.Component {
  componentDidMount() {
    this.props.fetchDetails(this.props.id);
  }

  render() {
    const { details, isFetching } = this.props;

    if(isFetching || !details.name) {
      return <Loading />
    }

    return (
      <Detail data={details} />
    )
  }
}

export const mapStateToProps = (state, props) => {
    return {
      isFetching: state.gnome.isFetching,
      isError: state.gnome.isError,
      details: state.gnome.details,
      id: (props && props.match) ? props.match.params.id : 0
    }
};


function mapDispatchToProps(dispatch) {
   return bindActionCreators({
     fetchDetails
   }, dispatch);
 }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Details));
