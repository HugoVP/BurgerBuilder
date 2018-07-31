import React, { Component } from 'react'
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'

import classes from './Auth.css'
import { auth } from '../../store/actions';

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

  checkValidity = (value, rules = {}) => {
    let isValid = true;

    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid
    }

    console.log(isValid);
    

    return isValid;
  }

  inputChagedHandler = (event, controlName) => {
    const { controls } = this.state;
    const { value } = event.target;
    
    const updatedControls = {
      ...controls,
      [controlName]: {
        ...controls[controlName],
        value,
        valid: this.checkValidity(value, controls[controlName].validation),
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

  render () {
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
    
    return (
      <div className={classes.Auth}>
        <form onSubmit={this.submitHandler}>
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

function mapDispatchToProps(dispatch) {
  return {
    onAuth: (email, password, isSignup) => {
      dispatch(auth(email, password, isSignup));
    },
  };
}

export default connect(null, mapDispatchToProps)(Auth)