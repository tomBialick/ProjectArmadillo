import React, {Component} from 'react';
import socketIOClient from 'socket.io-client';
import "./Host.css"
// var ss = require('socket.io-stream');
const { endpoint } = "http://ec2-18-224-93-114.us-east-2.compute.amazonaws.com/"
const socket = socketIOClient(endpoint);

class Host extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      message: ""
    }
    this.handleGoBack = this.handleGoBack.bind(this);
    this.handleOldChat = this.handleOldChat.bind(this);
    this.handleNewChat = this.handleNewChat.bind(this);
  }
  componentDidMount() {
    socket.emit('create', this.props.username)

    socket.on('updatechat', (username, data) => {
      this.setState(state => ({messages: [[state.message], ...state.messages]}))
      this.setState(state => ({message: {username: username, message: data}}))
    })

    // if (navigator.mediaDevices.getUserMedia) {
    //   // var answersFrom = {}
    //   var video = document.getElementById("selfVideo")
    //   navigator.mediaDevices.getUserMedia({ video: true })
    //   .then(function (stream) {
    //     video.srcObject = stream;
        // const recorder = new MediaStreamRecorder(videoStream);
        // // var stream = ss.createStream();
        // console.log("Stream " + videoStream);
        // console.log("Recorder " + recorder);
        // // socket.emit('hostVideo', videoStream);
        // const _stream = ss.createStream();
        // ss(socket).emit("hostVideo", videoStream);
        // videoStream.pipe(_stream);
        // function error (err) {
        //   console.log(err);
        // }
        // var peerConnection = window.RTCPeerConnection
        // var sessionDescription = window.RTCSessionDescription
        // var pc = new peerConnection({iceServers: [{ url: 'stun:stun.services.mozilla.com', username: 'myUser', credential: 'myCreds'}]})
        // stream.getTracks().forEach(function(track) {
        //   pc.addTrack(track, stream);
        // });
        // function createOffer() {
        //   pc.createOffer( (offer) => {
        //     pc.setLocalDescription(new sessionDescription(offer), () => {
        //       socket.emit('makeOffer', {
        //         offer: offer
        //       })
        //     }, error)
        //   }, error)
        // }
        // socket.on('answerMade', (data) => {
        //   pc.setRemoteDescription(new sessionDescription(data.answer), () => {
        //     if (!answersFrom[data.socket]) {
        //       createOffer(data.socket)
        //       answersFrom[data.socket] = true
        //     }
        //   }, error)
        // })
        //
        // createOffer();

      // }).catch(function (error) {
      //   console.log(error);
      // });
    // }
  }

  componentWillUnmount() {
    fetch(this.props.hosturl + '/room', {
      method: 'DELETE',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => {
      if (response.status >= 400) {
        alert("Error while logging out. Contact admins if this persists")
      }
    }).catch(error => {
      console.log("ERROR: " + error);
      alert("An error occurred. Please contact the admin(s) if this persists")
    })
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

  handleGoBack(event) {
    event.preventDefault();
    this.props.goBack();
  }

// <video autoplay="true" id="selfVideo"></video>
  render() {
    return (
      <div className="Host">
        <button onClick={(e) => this.handleGoBack(e)}>Go Back</button>
        <div id="whereHostFeedWouldGo"></div>
        <div id = "chat-log-area">
          <div id = "new-chat-log-area">
            {this.handleNewChat()}
          </div>
          <div id = "old-chat-log-area">
            {this.handleOldChat()}
          </div>
        </div>
      </div>
    )
  }
}
export default Host;
