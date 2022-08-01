import SendBird from 'sendbird'

class SendBirdEvent {
  constructor() {
    this.sb = SendBird.getInstance()
    this.handler = new this.sb.ChannelHandler()
    this.channelHandlerKey = 'channel-handler-key'
  }

  onMessageReceived(executeFunc) {
    this.handler.onMessageReceived = (channel, message) => {
      executeFunc(message)
    }
    this.sb.addChannelHandler(this.channelHandlerKey, this.handler)
  }

  remove() {
    this.sb.removeChannelHandler(this.channelHandlerKey)
  }
}

export { SendBirdEvent }
