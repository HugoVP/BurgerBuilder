import React, { Component } from 'react'
import { connect } from 'react-redux'

import axios from '../../../axios-orders'

import classes from './ContactData.css'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'

import { purchaseBurger } from '../../../store/actions'

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required: true,
        },
        isValid: false,
        touched: false,
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Street'
        },
        value: '',
        validation: {
          required: true,
        },
        isValid: false,
        touched: false,
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your ZIP Code'
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        isValid: false,
        touched: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country'
        },
        value: '',
        validation: {
          required: true,
        },
        isValid: false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required: true,
        },
        isValid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {
              value: 'fastest',
              displayValue: 'Fastest',
            },
            {
              value: 'cheapest',
              displayValue: 'Cheapest',
            },
          ],
        },
        value: 'fastest',
        isValid: true,
      },
    },
    formIsValid: false,
  }

  orderHandler = (event) => {
    event.preventDefault();
    
    const { orderForm } = this.state;
    const formData = {};

    for (let formElementId in orderForm) {
      formData[formElementId] = orderForm[formElementId].value;
    }

    const orderData = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      formData,
    };    

    this.props.onPurchaseBurger(orderData, this.props.token)
  }

  checkValidity(value, rules = {}) {
    /* Return 'false' if value is empty,  */
    if (rules.required && value.trim() === '') {
      return false;
    }

    /* Return 'false' if value's length is lower than minLength */ 
    if (rules.minLength && value.length < rules.minLength) {
      return false;
    }

    /* Return 'false' if value's length is grater than maxLength */
    if (rules.maxLength && value.length > rules.maxLength) {
      return false;
    }

    return true;
  }

  inputChagedHandler = (event, inputId) => {
    const updatedOrderForm = {
      ...this.state.orderForm,
    };

    const updatedFormElement = {
      ...updatedOrderForm[inputId],
    };

    updatedFormElement.value = event.target.value;
    const { value, validation } = updatedFormElement;
    updatedFormElement.isValid = this.checkValidity(value, validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputId] = updatedFormElement;
    
    let formIsValid = true;

    /* Check validity for the complete form */ 
    for (let inputId in updatedOrderForm) {
      if (!updatedOrderForm[inputId].isValid) {
        formIsValid = false;
        break;
      }
    }
    
    this.setState({
      orderForm: updatedOrderForm,
      formIsValid,
    });
  }

  render () {
    const { orderForm } = this.state;

    const formElementsArray = Object.keys(orderForm)
      .map((key) => ({
        id: key,
        config: orderForm[key],
      }));

    let form = <Spinner />;

    if (!this.props.loading) {
      form = (
        <form>
          {
            formElementsArray.map(({id, config}) => (
              <Input
                key={id}
                elementType={config.elementType}
                elementConfig={config.elementConfig}
                value={config.value}
                shouldValidate={'validation' in config}
                invalid={!config.isValid}
                touched={config.touched}
                changed={event => this.inputChagedHandler(event, id)}
              />
            ))
          }
          
          <Button
            btnType="Success"
            clicked={this.orderHandler}
            disabled={!this.state.formIsValid}
          >
            ORDER
          </Button>
        </form>
      );
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    )
  }
}

function mapStateToProps({burgerBuilder, orders, auth}) {
  return {
    ingredients: burgerBuilder.ingredients,
    totalPrice: burgerBuilder.totalPrice,
    loading: orders.loading,
    token: auth.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onPurchaseBurger: (orderData, token) => {
      dispatch(purchaseBurger(orderData, token));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(ContactData, axios)
)
