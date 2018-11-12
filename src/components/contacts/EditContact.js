import React, { Component } from 'react';
import axios from 'axios';
import { Consumer } from '../../context';
import TextInputGroup from '../layout/TextInputGroup';


class EditContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  }

  async componentDidMount () {
    const { id } = this.props.match.params;
    const res = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    const contact = res.data;

    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
    });
  }

  onSubmit = async (dispatch, e) => {
    e.preventDefault();

    const { name, email, phone } = this.state;

    // Check for errors

    if (name === '') {
      this.setState({
        errors: {
          ...this.state.errors,
          name: 'Name is required'
        }
      });

      return;
    }

    if (email === '') {
      this.setState({
        errors: {
          ...this.state.errors,
          email: 'Email is required'
        }
      });

      return;
    }

    if (phone === '') {
      this.setState({
        errors: {
          ...this.state.errors,
          phone: 'Phone is required'
        }
      });

      return;
    }

    const updateContact = {
      name,
      email,
      phone
    };
    const { id } = this.props.match.params;
    const res = await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, updateContact);

    dispatch({ type: 'UPDATE_CONTACT', payload: res.data });
    this.clearInputs();
    this.props.history.push('/');
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  clearInputs = () => {
    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    })
  }

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      <Consumer>
        {value => {
          const { dispatch } = value;

          return (
            <div className="card mb-3">
              <div className="card-header">Edit Contact</div>
              <div className="card-body">
                <form onSubmit={ (e) => this.onSubmit(dispatch, e) }>
                  
                  <TextInputGroup
                    label="Name"
                    name="name" 
                    className="form-control form-control-lg" 
                    placeholder="Enter Name..." 
                    value={ name } 
                    onChange={ this.onChange }
                    error={ errors.name }
                  />

                  <TextInputGroup
                    label="Email"
                    type="email" 
                    name="email" 
                    className="form-control form-control-lg" 
                    placeholder="Enter Email..." 
                    value={ email } 
                    onChange={ this.onChange }
                    error={ errors.email }
                  />

                  <TextInputGroup
                    label="Phone"
                    type="phone" 
                    name="phone" 
                    className="form-control form-control-lg" 
                    placeholder="Enter Phone..." 
                    value={ phone } 
                    onChange={ this.onChange }
                    error={ errors.phone }
                  />

                  <input type="submit" value="Update Contact" className="btn btn-light btn-block" />
                </form>
              </div>
            </div>
          )
        }}

      </Consumer>
    )
  }
}

export default EditContact;

/**
 * TODO: Input validasyon blur'da kontrol edilecek.
 */
