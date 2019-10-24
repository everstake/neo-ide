import React from "react";
import * as actions from '../actions/index'
import { connect } from 'react-redux';

class ddd extends React.Component {
    componentDidMount(){
        this.props.addLog('Gagagu', 'logger panel')
        setTimeout(() => {

        }, 1000)
    }
    render(){
        return (<div>{"Hallo"}</div>)
    }
}

const mapStateToProps = state => ({
    logs: state.logs
});

const mapDispatchToProps = dispatch =>({
    addLog: (a, b)=>dispatch(actions.addLog(a, b))
});

export default connect(mapStateToProps, mapDispatchToProps)(ddd);