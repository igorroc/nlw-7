import { useEffect, useState } from "react"
import io from "socket.io-client"
import { api } from "../../services/api"

import styles from "./styles.module.scss"

import LogoDoWhile from "../../assets/LogoDoWhile-2021.svg"

type Message = {
	id: string
	text: string
	user: {
		name: string
		avatar_url: string
	}
}

const messagesQueue: Message[] = []

const socket = io("http://localhost:4000")

socket.on("new_message", (newMessage) => {
	messagesQueue.push(newMessage)
})

export function MessageList() {
	const [messages, setMessages] = useState<Message[]>([])
	const [isTransitioning, setIsTransitioning] = useState(true)

	useEffect(() => {
		setInterval(() => {
			if (messagesQueue.length > 0) {
				setIsTransitioning(true)

				setTimeout(() => {
					setMessages((prevState) => [
						messagesQueue[0],
						prevState[0],
						prevState[1],
					])
					messagesQueue.shift()

					setTimeout(() => {
						setIsTransitioning(false)
					}, 100)
				}, 1000)
			}
		}, 3000)
	}, [])

	useEffect(() => {
		api.get<Message[]>("messages/last/3").then((res) => {
			setMessages(res.data)
		})
		setTimeout(() => {
			setIsTransitioning(false)
		}, 2000 / 3)
	}, [])

	return (
		<div className={styles.messageListWrapper}>
			<img src={LogoDoWhile} alt="DoWhile" />

			<ul className={styles.messageList}>
				{messages.map((m) => {
					const regex = /\B#\w+/
					let tag = m.text.match(regex)
					let spans = getHighlightedText(m.text, tag)

					return (
						<li
							key={m.id}
							className={[
								styles.message,
								isTransitioning ? styles.transitioning : "",
							].join(" ")}
						>
							<p className={styles.messageContent}>{spans}</p>
							<div className={styles.messageUser}>
								<div className={styles.userImage}>
									<img
										src={m.user.avatar_url}
										alt={m.user.name}
									/>
								</div>
								<span>{m.user.name}</span>
							</div>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

function getHighlightedText(text: string, highlight: any) {
	// Split on highlight term and include term into parts, ignore case
	const parts = text.split(new RegExp(`(${highlight})`, "gi"))
	return (
		<span>
			{" "}
			{parts.map((part, i) => (
				<span
					key={i}
					className={
						String(part).toLowerCase() ===
						String(highlight).toLowerCase()
							? styles.tag
							: ""
					}
				>
					{part}
				</span>
			))}{" "}
		</span>
	)
}
