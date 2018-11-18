import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: "Mail Address"
                },
                value: "",
                validation:{
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: "Password"
                },
                value: "",
                validation:{
                    required: true,
                    minLenght: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup:true
    }
    componentDidMount(){
        if(!this.props.building && this.props.authRedirect !== '/'){
            this.props.onSetAuthRedirectPath();
        }
    }

    checkValidation(value, rules){
        let isValid = true;

        if(rules.required){
            isValid = value.trim() !== "" && isValid;
        }
        if(rules.minLenght){
            isValid = value.length >= rules.minLenght && isValid;
        }
        if(rules.maxLenght){
            isValid = value.length <= rules.maxLenght && isValid;
        }
        if(rules.isEmail){
            const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = pattern.test(value) && isValid
        }
        return isValid;
    }
    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
        ...this.state.controls,
        [controlName]:{
            ...this.state.controls[controlName],
            value: event.target.value,
            valid: this.checkValidation(event.target.value, this.state.controls[controlName].validation),
            touched: true
        }
    };
        this.setState({controls: updatedControls});
}
    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
}
    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
}

    render (){
        const formElementsArray = [];
        for(let item in this.state.controls){
            formElementsArray.push({
                id: item,
                config: this.state.controls[item]
            });
        }
        let form = formElementsArray.map(item => (
            <Input
                key={item.id}
                elementType={item.config.elementType}
                elementConfig={item.config.elementConfig}
                value={item.config.value}
                shouldValidate={item.config.validation}
                touched={item.config.touched}
                isvalid={!item.config.valid}
                changed={(event) => this.inputChangedHandler(event, item.id)}/>
        ));
            if(this.props.loading) {
                form = <Spinner />
            }
            let errorMessage = null;
            if(this.props.error){

                errorMessage = <p>{this.props.error.message}</p>
            }
            let authRedirect = null;
            if(this.props.isAuth){
                authRedirect = <Redirect to={this.props.authRedirectPath} />

            }

        return(
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType='Success'>Submit</Button>
                </form>
                <Button
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">Switch To {this.state.isSignup ? "SIGNIN" : "SIGNUP"}</Button>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);