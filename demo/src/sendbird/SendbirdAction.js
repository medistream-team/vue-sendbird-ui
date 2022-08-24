import SendBird from 'sendbird';

let instance = null;

class SendbirdAction {
  constructor() {
    console.log('new sendbirdAction');
    if (instance) {
      return instance;
    }
    this.sb = new SendBird({ appId: '10A7853D-BD45-4355-8BB7-30711F09A48B' });
    this.channel = null;
    this.previousMessageQuery = null;
    this.searchMessageQueryparams = null;
    this.params = null;
    this.user = null;

    instance = this;
  }
  //"sendbird_group_channel_79112783_af5d5b502f8b4defe3303a2c75705cd6068d87ed"
  //"sendbird_group_channel_79129877_dd9423fd98ccc7580dd06677341d4dff6c70862c"
  async init(userId, nickname, channel) {
    console.log('init');
    let error = null;
    try {
      this.user = await this.connect(userId, nickname);
      this.channel = await this.getChannel(channel);
      await this.join();
      this.params = new this.sb.MessageListParams();
      this.previousMessageQuery = this.channel.createPreviousMessageListQuery();

      // this.searchMessagyQuery = new this.sb.searchMessagyQuery();
      // console.log('params:', this.searchMessagyQuery);
    } catch (e) {
      error = e;
    }
    return error;
  }
  create() {
    const params = new this.sb.GroupChannelParams();
    params.isPublic = true;
    params.name = 'test-public-channel-2';

    return new Promise((resolve, reject) => {
      this.sb.GroupChannel.createChannel(params, (user, error) => {
        console.log(user);
        error ? reject(error) : resolve(user);
      });
    });
  }

  connect(userId, nickname) {
    return new Promise((resolve, reject) => {
      this.sb.connect(userId, (user, connectError) => {
        if (connectError) {
          reject(connectError);
        } else {
          this.sb.updateCurrentUserInfo(nickname, null, function (user, error) {
            error ? reject(error) : resolve(user);
          });
        }
      });
    });
  }

  getChannel(channelUrl, isOpenChannel = false) {
    return new Promise((resolve, reject) => {
      if (isOpenChannel) {
        return this.sb.OpenChannel.getChannel(
          channelUrl,
          (groupChannel, error) => {
            error ? reject(error) : resolve(groupChannel);
          }
        );
      } else {
        return this.sb.GroupChannel.getChannel(
          channelUrl,
          (groupChannel, error) => {
            error ? reject(error) : resolve(groupChannel);
          }
        );
      }
    });
  }

  join() {
    return new Promise((resolve, reject) => {
      this.channel.join((response, error) => {
        error ? reject(error) : resolve(response);
      });
    });
  }

  sendUserMessage(message) {
    return new Promise((resolve, reject) => {
      this.channel.sendUserMessage(message, (userMessage, error) => {
        error ? reject(error) : resolve(userMessage);
      });
    });
  }

  sendFileMessage(file) {
    //const fileMessageParams = new this.sb.FileMessageParams();
    //fileMessageParams.file = file;
    return new Promise((resolve, reject) => {
      this.channel.sendFileMessage(file, (userFile, error) => {
        error ? reject(error) : resolve(userFile);
      });
    });
  }

  getMessageList(loadMessage, direction) {
    return new Promise((resolve, reject) => {
      console.log('pre params : ', this.previousMessageQuery);
      if (
        this.previousMessageQuery.hasMore &&
        !this.previousMessageQuery.isLoading
      ) {
        this.previousMessageQuery.load(
          loadMessage,
          direction,
          function (messageArray) {
            console.log('load test :', messageArray);
            if (messageArray !== null) {
              resolve(messageArray);
            } else {
              reject();
            }
          }
        );
        // this.previousMessageQuery.load(
        //   loadMessage,
        //   true,
        //   (messageList, error) => {
        //     const response = messageList;
        //     error ? reject(error) : resolve(response);
        //   }
        // );

        // this.channel.getMessagesByTimestamp(
        //   Date.now(),
        //   this.params,
        //   (messages, error) => {
        //     const response = messages;
        //     this.params = new this.sb.MessageListParams();
        //     error ? reject(error) : resolve(response);
        //   }
        // );
      } else {
        resolve([]);
      }
    });
  }

  search(keyword) {
    return new Promise((resolve, reject) => {
      if (keyword != null) {
        this.searchMessageQueryparams = this.sb.createMessageSearchQuery();
        console.log('search: ', this.searchMessageQueryparams);
        // this.searchMessageQueryparams.channelUrl = this.channel;
        this.searchMessageQueryparams.keyword = keyword;
        console.log('vv : ', keyword);

        resolve(this.searchMessageQueryparams.next());
      }

      reject();
    });
  }
  static getInstance() {
    return new SendbirdAction();
  }
}

export { SendbirdAction };
