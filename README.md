# Chat widget sample
Sample chat widget built with [LiveChat React chat UI kit](https://docs.livechatinc.com/react-chat-ui-kit/). In this widget, [BotEngine](https://www.botengine.ai/) handles the incoming chats. When the bot returns `LiveChat.transfer` action, the chat is transferred to a human agent together with the transcript of the initial conversation with
the bot.

The sample app uses [Visitor SDK](https://docs.livechatinc.com/visitor-sdk/) to communicate with LiveChat and [the API](https://docs.botengine.ai/api/introduction) to connect with BotEngine.

## Installation

Copy `.env` file as `.env.local` and fill required variables:

* REACT_APP_BOTENGINE_CLIENT_TOKEN - client token for [BotEngine](https://www.botengine.ai/) account
* REACT_APP_BOTENGINE_STORY_ID - id of choosen botengine story
* REACT_APP_LIVECHAT_LICENSE - [LiveChat](https://livechatinc.com) license number

