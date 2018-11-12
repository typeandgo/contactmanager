import React, { Component, Fragment } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from './context';
import Header from './components/layout/Header';
import About from './components/pages/About';
import Contacts from './components/contacts/Contacts';
import AddContact from './components/contacts/AddContact';
import EditContact from './components/contacts/EditContact';
import NotFound from './components/pages/NotFound';

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <Fragment>
            <Header branding="Contact Manager" />
            <div className="container">
              <Switch>
                <Route exact path="/" component={ Contacts } />
                <Route path="/about" component={ About } />
                <Route path="/contact/add" component={ AddContact } />
                <Route path="/contact/edit/:id" component={ EditContact } />
                <Route component={ NotFound } />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
