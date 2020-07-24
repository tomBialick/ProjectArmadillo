import React, {Component} from 'react';
import './Menu.css';
import Host from './Host.js'
import RoomList from './RoomList.js'

class Menu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuChoice: ""
    }

    this.handleLogout = this.handleLogout.bind(this);
    this.joinOrHost = this.joinOrHost.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
    this.handleHost = this.handleHost.bind(this);
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.logout();
  }

  handleGoBack() {
    this.setState({menuChoice: ""})
  }

  handleHost(event) {
    event.preventDefault();
    let data = JSON.stringify({name: this.props.username})
    fetch( this.props.hosturl + '/room', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: data
    }).then(response => {
      if (response.status < 400) {
        this.setState({menuChoice: "Host"})
      }
      else {
        response.text().then(responseText => {
          alert(responseText)
        })
      }
    }).catch(error => {
      console.log("ERROR: " + error);
      alert("An error occurred. Please contact the admin(s) if this persists")
    })
  }

  handleJoin(event) {
    event.preventDefault();
    this.setState({menuChoice: "Join"})
  }

  joinOrHost() {
    if (this.state.menuChoice === "Host") {
      return (
        <Host hosturl={this.props.hosturl} username={this.props.username} goBack={this.handleGoBack} />
      )
    }
    else if (this.state.menuChoice === "Join") {
      return (
        <RoomList hosturl={this.props.hosturl} username={this.props.username} goBack={this.handleGoBack} />
      )
    }
    else {
      return (
        <div id="menu_content">
          <button onClick={(e) => this.handleJoin(e)}>Join a Room</button>
          <div className="spacer">
          </div>
          <button onClick={(e) => this.handleHost(e)}>Create a Room</button>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="Menu">
      <button id="logout_button" onClick={(e) => this.handleLogout(e)}>Logout</button>
      <div className="spacer">
      </div>
      {this.joinOrHost()}
      </div>
    );
  }
}

export default Menu;
