import React, {Component} from 'react';
import './Login.css';
import Cookies from 'js-cookie'

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: ""
    }
    this.handleSignIn = this.handleSignIn.bind(this);
    this.usernameChange = this.usernameChange.bind(this);
  }

  handleSignIn(event) {
    event.preventDefault();
    let user = this.state.username
    let data = {
      "username": user
    };
    let data_json = JSON.stringify(data)

    fetch( this.props.hosturl + '/users/auth', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: data_json
    }).then(response => {
      if (response.status < 400) {
        response.json().then((responseJson) => {
          //Currently indefinite cookie
          Cookies.set('user-token', responseJson.body.results.username)
          this.props.auth(responseJson.body.results.username, responseJson.body.results.role)
        })
      }
      else {
        response.text().then(responseText => {
          alert(responseText)
        }).catch(error => {
          alert("An error occurred. Please let the admin(s) know if this persists")
          console.log("ERROR: " + error)
        })
      }
    }).catch(error => {
      alert("An error occurred. Please let the admin(s) know if this persists")
      console.log("ERROR: " + error)
    })
  }

  usernameChange(event) {
    if (event.target.value) {
      this.setState({username: event.target.value})
    }
  }

  render() {
    return (
      <div id="login_area">
        <div id="login_creds_area">
          <label className="login_area_text">Username:</label><input type="text" onChange={this.usernameChange}/>
        </div>
        <br />
        <button onClick={(e) => this.handleSignIn(e)}>Login</button>
      </div>
    )
  }

}
export default Login;
