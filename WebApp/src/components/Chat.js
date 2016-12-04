import moment from "moment"
import React, {PropTypes} from "react"
import {connect} from "react-redux"
import ReplyBox from "./ReplyBox"

export class Chat extends React.Component {
    render () {
        return (
            <div style={rootStyle}>
                <ul style={ulStyle} ref="messages">
                    {this.props.messages.map(renderMessage)}
                </ul>

                {/* Exercise 2: Add a ReplyBox component */}
                <ReplyBox/>
            </div>
        )
    }

    componentDidUpdate (prevProps) {
        if (prevProps.messages.length === this.props.messages.length) {
            return
        }

        const element = this.refs.messages
        if (element) {
            element.scrollTop = element.scrollHeight
        }
    }
}

function renderMessage (message) {
    return (
        <li style={{wordBreak: "break-all"}} key={message.messageId}>

            {/* Exercise 3: Add message author */}
            {message.author.name +": "}
            <img src={message.author.picture} height="32" />
            {getMessageBody(message)}

            {"(" + getMessageDate(message) + ")"}
        </li>
    )
}

const ulStyle = {
    overflowY: "scroll",
    listStyle: "none"
    /* Exercise 4: Add your own styles */

}

const imageStyle = {
    maxWidth: "100px",
    maxHeight: "100px",
    objectFit: "contain"
}

const rootStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    height: "100%"
}

function getMessageDate (message) {
    return moment(message.timestampUtc).format("dddd, h:mm A")
}

function getMessageBody (message) {
    if (message.data) {
        return <img src={message.data} style={imageStyle} />
    } else {
        return( <span style={{color:"#8B008B"}}> {message.text} </span> )
    }
}

Chat.propTypes = {
    messages: PropTypes.array
}

function mapStateToProps (state) {
    return {
        messages: state.messages
    }
}

export default connect(
    mapStateToProps
)(Chat)
