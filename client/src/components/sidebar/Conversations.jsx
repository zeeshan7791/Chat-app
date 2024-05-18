import Conversation from "./Conversation";
import useGetConversations from "../../hooks/useGetConversations.js";
import { getRandomEmoji } from "../../utils/emojis.js";
const Conversations = () => {
	const { loading, conversations } = useGetConversations();
	console.log(conversations,'conversations')
	return (
		<>
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.length>0&&conversations.length!==undefined&&conversations.map((conversation, idx) => (
				<Conversation
					key={conversation._id}
					conversation={conversation}
					emoji={getRandomEmoji()}
					lastIdx={idx === conversations.length - 1}
				/>
			))}

			{loading ? <span className='loading loading-spinner mx-auto'></span> : null}
		</div>
		</>
	);
};
export default Conversations;