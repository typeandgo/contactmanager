import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Consumer } from '../../context';

class Contact extends Component {
  state = {
    showContactInfo: false
  };

  onDeleteClick = async (id, dispatch) => {
    try {

      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
    
      dispatch({type: 'DELETE_CONTACT', payload: id});

    } catch (e) {

      dispatch({type: 'DELETE_CONTACT', payload: id});
    }
  }

  render() {
    const { id, name, email, phone } = this.props.contact;
    const { showContactInfo } = this.state;

    return (
      <Consumer>
        {value => {

          const { dispatch } = value;
          const sortIconClass = showContactInfo ? 'fa fa-angle-up' : 'fa fa-angle-down';

          return (
            <div className="card card-body mb-3">
              <h4>{ name } { ' ' } 
                <i className={ sortIconClass } onClick={() => this.setState({ showContactInfo: !this.state.showContactInfo })} style={{ cursor: 'pointer' }} />
                <i className="fa fa-times" onClick={ () => this.onDeleteClick(id, dispatch) } style={{ cursor: 'pointer', float: 'right', color: 'red' }} />
                <Link to={`/contact/edit/${id}`} style={{ float: 'right' }}>
                  <i className="fa fa-pencil-alt" style={{ cursor: 'pointer', float: 'right', color: 'black', marginRight: '1rem', marginTop: '3px', fontSize: '1.1rem' }} />
                </Link>     
              </h4>
              { showContactInfo ? (
                  <ul className="list-group">
                    <li className="list-group-item">Email: { email }</li>
                    <li className="list-group-item">Phone: { phone }</li>
                  </ul>
                ) : null
              }        
            </div>
          )
        }}
      </Consumer>
    )
  }
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired
}

export default Contact;
