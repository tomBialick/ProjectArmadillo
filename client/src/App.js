import React, {Component} from 'react';
import './App.css';
import Cookies from 'js-cookie'
import Login from './Login.js'
import Menu from './Menu.js'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hosturl: ("" + document.location.href).slice(0, -1),
      isLoggedIn: false,
      username: ""
    }
    this.checkLogin = this.checkLogin.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.appOrLogIn = this.appOrLogIn.bind(this);
  }

  componentDidMount() {
    this.checkLogin();
  }

  appOrLogIn() {
    if (this.state.isLoggedIn) {
      return <Menu hosturl={this.state.hosturl} username={this.state.username} logout={this.handleLogout} />
    }
    else {
      return (
        <div id="login_container">
          <div id="login_greeting">
            <h1>Project Armadillo</h1>
          </div>
          <div className="spacer">
          </div>
          <Login hosturl={this.state.hosturl} auth={this.handleLogin} />
        </div>
      )
    }
  }

  handleLogin(username, role) {
    this.setState({isLoggedIn: true, username: username, role: role})
  }

  checkLogin() {
    if (Cookies.get('user-token')) {
      fetch(this.state.hosturl + '/users/auth?token=' + Cookies.get('user-token'), {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response => {
        if (response.status < 400) {
          response.json().then(responseJson => {
            this.setState({isLoggedIn: true, username: responseJson.body.results.username, role: responseJson.body.results.role})
            return true
          })
        }
        else {
          return false
        }
      }).catch(error => {
        console.log("ERROR: " + error);
        alert("An error occurred. Please contact the admin(s) if this persists")
        return false
      })
    }
    else {
      return false
    }
  }

  handleLogout() {
    fetch(this.state.hosturl + '/users/auth', {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      if (response.status < 400) {
        response.text().then(responseText => {
          Cookies.remove('user-token')
          this.setState({isLoggedIn: false, username: "", role: ""})
        })
      }
      else {
        alert("Error while logging out. Contact admins if this persists")
      }
    }).catch(error => {
      console.log("ERROR: " + error);
      alert("An error occurred. Please contact the admin(s) if this persists")
    })
  }

  render() {
    return (
      <div className="App">
        {this.appOrLogIn()}
      </div>
    );
  }
}

export default App;
