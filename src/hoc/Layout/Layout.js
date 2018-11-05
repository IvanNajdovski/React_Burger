import React, {Component} from 'react';
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
                <Toolbar toggle={this.toggleHandler}/>
                <Side closed={this.sideClosedHandler} open={this.state.showSide}/>
                <main className={classes.Content}>
             {this.props.children}
            </main>
        </Auxiliary>
        )
    }
}
export default Layout;