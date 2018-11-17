import React, {Component} from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Side from '../../components/Navigation/Side/Side';


import classes from './Layout.css';

class Layout extends Component{
    state = {
        showSide:false
    }
    sideClosedHandler = () => {
    this.setState({showSide:false})
}
    toggleHandler = () => {
        this.setState((prevState) => {
        return {showSide: !prevState.showSide};
    })
}
    render(){
        return(
            <Auxiliary>
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    toggle={this.toggleHandler}/>
                <Side
                    isAuth={this.props.isAuthenticated}
                    closed={this.sideClosedHandler}
                    open={this.state.showSide}/>
                <main className={classes.Content}>
             {this.props.children}
            </main>
        </Auxiliary>
        )
    }
}

const mapStateToProps = state => {
    return{
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);