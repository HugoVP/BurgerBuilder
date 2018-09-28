import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Auth.css'
import { auth, setAuthRedirectPath } from '../../store/actions';
import { checkValidity } from '../../shared/utility';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignup: true,
  }

  inputChagedHandler = (event, controlName) => {
    const { controls } = this.state;
    const { value } = event.target;
    
    const updatedControls = {
      ...controls,
      [controlName]: {
        ...controls[controlName],
        value,
        valid: checkValidity(value, controls[controlName].validation),
        touched: true,
      },
    };

    this.setState({controls: updatedControls});
  }

  submitHandler = (event) => {
    event.preventDefault();
    const {email, password} = this.state.controls;
    this.props.onAuth(email.value, password.value, this.state.isSignup);
  }

  switchAuthModeHandler = () => {
    this.setState((prevState) => ({
      isSignup: !prevState.isSignup,
    }));
  }

  componentDidMount () {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onSetAuthRedirectPath();
    }
  }  

  render () {
    if (this.props.isAuthenticated) {
      return <Redirect to={this.props.authRedirectPath} />;
    }

    if (this.props.loading) {
      return <Spinner />;
    }

    const { controls } = this.state;

    const formInputElements = Object.keys(controls)
      .map((key) => {
        const control = controls[key];
        
        return (
          <Input
            key={key}
            elementType={control.elementType}
            elementConfig={control.elementConfig}
            value={control.value}
            shouldValidate={'validation' in control}
            invalid={!control.valid}
            touched={control.touched}
            changed={event => this.inputChagedHandler(event, key)}
          />
        )
      });

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }
    
    return (
      <div className={classes.Auth}>
        <form onSubmit={this.submitHandler}>
          {errorMessage}
          {formInputElements}
          
          <Button
            btnType="Success"
            clicked={() => {}}
            disabled={false}
          >
            {this.state.isSignup ? 'SIGNUP' : 'SIGNIN'}
          </Button>
        </form>

        <Button
          btnType="Danger"
          clicked={this.switchAuthModeHandler}
        >
          SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
        </Button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onAuth: (email, password, isSignup) => {
      dispatch(auth(email, password, isSignup));
    },
    onSetAuthRedirectPath: () => {
      dispatch(setAuthRedirectPath('/'));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)