import React, { Component } from 'react'
import axios from '../../../axios-orders'

import classes from './ContactData.css'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/UI/Input/Input';

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
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Street'
        },
        value: '',
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your ZIP Code'
        },
        value: '',
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Country'
        },
        value: '',
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Email'
        },
        value: '',
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
        value: '',
      },
    },
    loading: false,
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
    };

    axios.post('/orders.json', order)
      .then((response) => {
        console.log(response);
        this.props.history.push('/');
        return response;
      })
      .catch((error) => {
        console.log(error);
        return error;
      })
      .finally(() => {
        this.setState({loading: false})
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

    if (!this.state.loading) {
      form = (
        <form>
          {
            formElementsArray.map(({id, config}) => (
              <Input
                key={id}
                elementType={config.elementType}
                elementConfig={config.elementConfig}
                value={config.value}
              />
            ))
          }
          
          <Button
            btnType="Success"
            clicked={this.orderHandler}
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

export default ContactData
