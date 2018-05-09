import React, { Component } from 'react'
import axios from '../../../axios-orders'

import classes from './ContactData.css'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    addres: {
      street: '',
      postalCode: '',
    },
    loading: false,
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});

    const {
      ingredients,
      price,
    } = this.props;

    const order = {
      ingredients,
      price,
      customer: {
        name: 'HugoVP',
        address: {
          street: 'Test Street 123',
          zipCode: '09090',
          country: 'Mexico',
        },
        email: 'test@test.com',
        deliveryMethod: 'fastest',
      },
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
    const form = this.state.loading ? (
      <Spinner />
    ) : (
      <form>
        <input
          className={classes.Input}
          name="name"
          placeholder="Your Name"
        />
        
        <input
          className={classes.Input}
          name="email"
          placeholder="Your Email"
        />
        
        <input
          className={classes.Input}
          name="street"
          placeholder="Street"
        />
        
        <input
          className={classes.Input}
          name="postal"
          placeholder="Postal Code"
        />
        
        <Button
          btnType="Success"
          clicked={this.orderHandler}
        >
          ORDER
        </Button>
      </form>
    )

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    )
  }
}

export default ContactData
