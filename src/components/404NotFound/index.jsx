import React, { Component } from "react";

//Redux//
import { connect } from "react-redux";

//Actions//
import { defaultActions } from '../../redux/default';


class NotFound extends Component{
  
    componentDidMount() {
        const { _setPageName } = this.props;
        _setPageName("");
      }


    render(){
        return(
            <div className="container text-center font-weight-bold d-flex justify-content-center mt-5">
                <h1>404 Not Found</h1>
            </div>
        )
    }
}

const mapStateToProps = ({ default: system }) => {
    return {};
  },


  mapActionsToProps = {
    _setPageName: defaultActions.changeNamePage,
  };

export default connect(mapStateToProps, mapActionsToProps)(NotFound);
