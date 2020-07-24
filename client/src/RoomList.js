import React, {Component} from 'react';
import Room from './Room.js'

class RoomList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rooms: [],
      mode: "list",
      roomChoice: ""
    }
    this.handleGoBack = this.handleGoBack.bind(this);
    this.displayRoomList = this.displayRoomList.bind(this);
    this.handleRoomChosen = this.handleRoomChosen.bind(this);
    this.listOrRoom = this.listOrRoom.bind(this);
  }

  componentDidMount() {
    fetch(this.props.hosturl + '/rooms', {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      if (response.status < 400) {
        response.json().then(responseJson => {
          this.setState({rooms: JSON.parse(responseJson.body)})
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

  handleRoomChosen(event) {
    event.preventDefault();
    let tokens = event.target.id.split('_')
    let roomChosen = tokens[0]
    this.setState({mode: "room", roomChoice: roomChosen})
  }

  displayRoomList() {
    if (this.state.rooms.length > 0) {
      return this.state.rooms.map((name, i) => {
        return <button class="room_list_buttons" id={`${name}_room_list_button_${i}`} onClick={(e) => this.handleRoomChosen(e)}>{name}</button>
      })
    }
    else {
      return <p>No Active Rooms Found</p>
    }
  }

  listOrRoom() {
    if (this.state.mode === "list") {
      return (
        <div>
          <button onClick={(e) => this.handleGoBack(e)}>Go Back</button>
          <p>Room List</p>
          {this.displayRoomList()}
        </div>
      )
    }
    else {
      return (
        <Room hosturl={this.props.hosturl} username={this.props.username} goBack={this.props.goBack} roomName={this.state.roomChoice} />
      )
    }
  }

  handleGoBack(event) {
    event.preventDefault();
    this.props.goBack();
  }

  render() {
    return (
      <div className="RoomList">
        {this.listOrRoom()}
      </div>
    )
  }
}
export default RoomList;
