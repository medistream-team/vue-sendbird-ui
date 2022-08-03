import SendBird from "sendbird";

let instance = null;

class SendbirdAction {
  constructor() {
    if (instance) {
      return instance;
    }
    this.sb = new SendBird({ appId: "10A7853D-BD45-4355-8BB7-30711F09A48B" });
    this.channel = null;
    this.previousMessageQuery = null;

    instance = this;
  }
  //"sendbird_group_channel_79112783_af5d5b502f8b4defe3303a2c75705cd6068d87ed"
  //"sendbird_group_channel_79129877_dd9423fd98ccc7580dd06677341d4dff6c70862c"
  async init(userId, nickname, channel) {
    let error = null;
    try {
      await this.connect(userId, nickname, channel);
      this.channel = await this.getChannel(channel);
      await this.join();
      this.previousMessageQuery = this.channel.createPreviousMessageListQuery();

      this.previousMessageQuery.reverse = false;
    } catch (e) {
      error = e;
    }
    return error;
  }
  create() {
    const params = new this.sb.GroupChannelParams();
    params.isPublic = true;
    params.name = "test-public-channel-2";

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

  getMessageList(loadMessage) {
    return new Promise((resolve, reject) => {
      if (
        this.previousMessageQuery.hasMore &&
        !this.previousMessageQuery.isLoading
      ) {
        const params = new this.sb.MessageListParams();
        //scroll을 내릴 때 마다 증가시킨다?
        //날짜 단위로 가져오기? 연구 해보자 new Date를 하나씩 빼면서?
        //하루 기준으로 해서 그 다음날의 timestamp를 계속 갖고오기.
        // 그러면 getMessageList를 scroll 했을 때 y좌표가 어느정도까지 내려왔을 때 호출 할까?

        params.prevResultSize = loadMessage;
        this.channel.getMessagesByTimestamp(
          Date.now(),
          params,
          (messages, error) => {
            console.log(messages);
            const response = {
              hasMoreMessage: this.previousMessageQuery.hasMore,
              itemList: messages,
            };
            error ? reject(error) : resolve(response);
          }
        );
      } else {
        resolve([]);
      }
    });
  }

  static getInstance() {
    return new SendbirdAction();
  }
}

export { SendbirdAction };
