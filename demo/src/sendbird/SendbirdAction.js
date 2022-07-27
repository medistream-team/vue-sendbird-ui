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

  async init() {
    let error = null;
    try {
      await this.connect("admin", "김인태");
      this.channel = await this.getChannel(
        "sendbird_group_channel_79112783_af5d5b502f8b4defe3303a2c75705cd6068d87ed"
      );
      await this.join();
      this.previousMessageQuery = this.channel.createPreviousMessageListQuery();

      // console.log(this.channel.members[0].nickname); 닉네임 불러오기

      // this.previousMessageQuery.limit = 20;
      this.previousMessageQuery.reverse = true;
    } catch (e) {
      error = e;
    }
    return error;
  }

  create() {
    const params = new this.sb.GroupChannelParams();
    params.isPublic = true;
    params.name = "test-public-channel";
    params.isDistinct = true;

    return new Promise((resolve, reject) => {
      this.sb.GroupChannel.createChannel(params, (user, error) => {
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

  getMessageList() {
    return new Promise((resolve, reject) => {
      if (
        this.previousMessageQuery.hasMore &&
        !this.previousMessageQuery.isLoading
      ) {
        //로드되는 메세지 조절 parameter에 loadCount 넣고 아래에 getMessageList호출 될 때 ...
        this.previousMessageQuery.load(10, (messageList, error) => {
          const response = {
            hasMoreMessage: this.previousMessageQuery.hasMore,
            itemList: messageList,
          };
          error ? reject(error) : resolve(response);
          //response {hasMoreMessage: true, itemList: Array(10)}
        });
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
