import React, { Component } from 'react'

class AddContact extends Component {

  static defaultProps = {
    name: 'Engin Öztürk',
    email: 'engin.ozturk@mail.com',
    phone: '123 456 78 90'
  }

  onSubmit = (e) => {
    e.preventDefault();

    const contact = {
      name: this.nameInput.value,
      email: this.emailInput.value,
      phone: this.phoneInput.value,
    }

    console.log("contact: ", contact);
  }

  render() {

    const { name, email, phone } = this.props;

    return (
      <div className="card mb-3">
        <div className="card-header">Add Contact</div>
        <div className="card-body">
          <form onSubmit={ this.onSubmit }>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                name="name" 
                className="form-control form-control-lg" 
                placeholder="Enter Name..." 
                defaultValue={ name } 
                ref={ c => this.nameInput = c } 
                //onChange={ e =>  this.setState({ [e.target.name]: e.target.value }) }
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                name="email" 
                className="form-control form-control-lg" 
                placeholder="Enter Email..." 
                defaultValue={ email } 
                ref={ c => this.emailInput = c } 
                //onChange={ e =>  this.setState({ [e.target.name]: e.target.value }) }
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Name</label>
              <input 
                type="phone" 
                name="phone" 
                className="form-control form-control-lg" 
                placeholder="Enter Phone..." 
                defaultValue={ phone } 
                ref={ c => this.phoneInput = c } 
                //onChange={ e =>  this.setState({ [e.target.name]: e.target.value }) }
              />
            </div>

            <input type="submit" value="Add Contact" className="btn btn-light btn-block" />
          </form>
        </div>
      </div>
    )
  }
}

export default AddContact;
