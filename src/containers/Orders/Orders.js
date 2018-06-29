import React, { Component } from 'react'

import axios from '../../axios-orders'
import Order from '../../components/Order/Order'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  }
  
  componentDidMount() {
    this.setState({loading: true});
    
    axios.get('/orders.json')
      .then(({ data }) => {
        const orders = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        this.setState({orders});
      })
      .catch(err => console.log(err))
      .finally(() => {
        this.setState({loading: false})
      });
  }
  
  render() {
    return (
      <div>
        {
          this.state.orders.map((order) => (
            <Order
              key={order.id}
              ingredients={order.ingredients}
              price={order.price}
            />
          ))
        }
      </div>
    )
  }
}

export default withErrorHandler(Orders, axios)