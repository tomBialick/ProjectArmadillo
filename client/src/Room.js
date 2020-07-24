import React, {Component} from 'react';
import socketIOClient from 'socket.io-client';
import "./Room.css"
const { endpoint } = "localhost:3000"
const socket = socketIOClient(endpoint);
// var ss = require('socket.io-stream');

class Room extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      message: {},
      chat: ""
    }
    this.handleGoBack = this.handleGoBack.bind(this);
    this.chatChange = this.chatChange.bind(this);
    this.sendChat = this.sendChat.bind(this);
    this.handleOldChat = this.handleOldChat.bind(this);
    this.handleNewChat = this.handleNewChat.bind(this);
  }
  componentDidMount() {
    socket.emit('addUser', this.props.roomName)

    socket.on('updatechat', (username, data) => {
      this.setState(state => ({messages: [[state.message], ...state.messages]}))
      this.setState(state => ({message: {username: username, message: data}}))
    })
    // var video = document.getElementById("hostVideo")
    // socket.on('hostStream', (stream) => {
    //   console.log("grabbed stream?");
    //   video.srcObject = stream
    // })
    // ss(socket).on('hostVideo', function (stream, data) {
    //   stream.pipe(video.srcObject)
    // })
    // function error (err) {
    //   console.log(err);
    // }
    // var peerConnection = window.RTCPeerConnection
    // var sessionDescription = window.RTCSessionDescription
    // var pc = new peerConnection({iceServers: [{ url: 'stun:stun.services.mozilla.com', username: 'myUser', credential: 'myCreds'}]})
    // var offerData, player = new Audio();
    // socket.on('offerMade', (data) => {
    //   offerData = data
    // })
    // listen();
    // player.play();
    //
    // function listen() {
    //   pc.setRemoteDescription(new sessionDescription(offerData.offer), () => {
    //     pc.createAnswer((answer) => {
    //       pc.setLocalDescription(new sessionDescription(answer), () => {
    //         socket.emit('makeAnswer', {
    //           answer: answer,
    //           to: offerData.socket
    //         })
    //       }, error)
    //     }, error)
    //   }, error)
    // }
    // pc.onaddtrack = function(obj) {
    //   console.log('addtrack');
    //   player.src = window.URL.createObjectURL(obj.stream)
    // }


  }

  chatChange(event) {
    if (event.target.value) {
      this.setState({chat: event.target.value})
    }
  }
  sendChat(event) {
    event.preventDefault();
    socket.emit('sendChat', this.state.chat, this.props.username)
    this.setState({chat: ""})
    document.getElementById("chatbox").value = ""
  }

  handleGoBack(event) {
    event.preventDefault();
    this.props.goBack();
  }

  handleOldChat() {
    return (
      this.state.messages.map((messageData, i) => {
        return messageData.map(dataItem => {
          if (dataItem && dataItem.message) {
            return (
              <React.Fragment key={i}>
                <div style={{border: '2px solid blue'}}>
                  <h4>{dataItem.username}</h4>
                  <p>{dataItem.message}</p>
                </div>
              </React.Fragment>
            )
          }
          else {
            return
          }
        })
      })
    )
  }

  handleNewChat() {
    if (this.state.message) {
      return (
        <div style={{border: '2px solid red'}}>
          <h4>{this.state.message.username}</h4>
          <p>{this.state.message.message}</p>
        </div>
      )
    }
  }

  // <video autoplay="true" id="hostVideo"></video>
  render() {
    return (
      <div className="Room">
        <button onClick={(e) => this.handleGoBack(e)}>Go Back</button>
        <div id="whereLiveFeedWouldGo"></div>
        <div id = "chat-log-area">
          <div id = "new-chat-log-area">
            {this.handleNewChat()}
          </div>
          <div id = "old-chat-log-area">
            {this.handleOldChat()}
          </div>
        </div>
        <form id="chat-form">
          <label>Chat:
            <input id="chatbox" type="text" onChange={this.chatChange} />
          </label>
          <button onClick={(e) => this.sendChat(e)}>Send</button>
        </form>
      </div>
    )
  }
}
export default Room;
