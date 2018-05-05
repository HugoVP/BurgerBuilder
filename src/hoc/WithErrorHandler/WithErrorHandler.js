import React, { Component } from 'react';
import Aux from "../Aux/Aux";
import Modal from '../../components/UI/Modal/Modal';

function withErrorHandler(WrappedComponent, axios) {
  return class extends Component {
    state = {
      error: null
    };

    errorConfirmedHandler = () => {
      this.setState({error: null});
    };

    componentDidMount() {
      this.requestInteceptor = axios.interceptors.request.use((requestConfig) => {
        this.setState({error: null})
        return requestConfig;
      });

      this.responseInterceptor = axios.interceptors.response.use(
        response => response,
        error => this.setState({error})
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInteceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }

    render() {
      const errorMessage = this.state.error ?
        this.state.error.message : 'Something went wrong!';
      
      return (
        <Aux>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}
          >
            {errorMessage}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }    
  };
}

export default withErrorHandler;