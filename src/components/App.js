import React from 'react'
import {
	TitleBar,
	TextInput,
	MessageList,
	Message,
	MessageText,
	AgentBar,
	AgentBarTitle,
	MessageGroup,
	MessageButtons,
	MessageButton,
	MessageTitle,
	MessageMedia,
	TextComposer,
	Row,
	Fill,
	Fit,
	IconButton,
	SendButton,
	EmojiIcon,
	CloseIcon,
} from '@livechat/ui-kit'

const getAvatarForUser = (userId, users) => {
	const foundUser = users[userId]
	if (foundUser && foundUser.avatarUrl) {
		return foundUser.avatarUrl
	}
	return null
}

const App = ({
	events,
	onMessageSend,
	users,
	ownId,
	currentAgent,
	minimizeChatWidget,
	maximizeChatWidget,
	sendMessage,
}) => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				height: '100%',
			}}
		>
			<TitleBar
				rightIcons={[
					<IconButton key="close" onClick={minimizeChatWidget}>
						<CloseIcon />
					</IconButton>,
				]}
				title="Welcome to LiveChat"
			/>
			{currentAgent && (
				<AgentBar agentAvatar={currentAgent.avatarUrl}>
					<AgentBarTitle subtitle="Support hero" title={currentAgent.name} />
				</AgentBar>
			)}
			<div
				style={{
					flexGrow: 1,
					minHeight: 0,
					height: '100%',
				}}
			>
				<MessageList active containScrollInSubtree>
					{events.map((messageGroup, index) => (
						<MessageGroup key={index} onlyFirstWithMeta>
							{messageGroup.map(message => (
								<Message
									avatarUrl={getAvatarForUser(message.authorId, users)}
									date={message.parsedDate}
									isOwn={message.authorId === ownId || message.own === true}
									key={message.id}
								>
									{message.title && <MessageTitle title={message.title} />}
									{message.text && <MessageText>{message.text}</MessageText>}
									{message.imageUrl && (
										<MessageMedia>
											<img src={message.imageUrl} />
										</MessageMedia>
									)}
									{message.buttons &&
										message.buttons.length !== 0 && (
											<MessageButtons>
												{message.buttons.map((button, buttonIndex) => (
													<MessageButton
														key={buttonIndex}
														label={button.title}
														onClick={() => {
															sendMessage(button.postback)
														}}
													/>
												))}
											</MessageButtons>
										)}
								</Message>
							))}
						</MessageGroup>
					))}
				</MessageList>
			</div>
			<TextComposer onSend={onMessageSend}>
				<Row align="center">
					<Fill>
						<TextInput />
					</Fill>
					<Fit>
						<SendButton />
					</Fit>
				</Row>
			</TextComposer>
			<div
				style={{
					textAlign: 'center',
					fontSize: '.6em',
					padding: '.4em',
					background: '#fff',
					color: '#888',
				}}
			>
				{'Powered by LiveChat'}
			</div>
		</div>
	)
}

export default App
