import { useContext, useState, FormEvent } from "react"
import { VscSignOut, VscGithubInverted } from "react-icons/vsc"
import { AuthContext } from "../../contexts/auth"
import { api } from "../../services/api"
import styles from "./styles.module.scss"
import { PopUp } from "../PopUp"

import ImageBadgeText from "../../assets/badge-text.png"
import ImageBadgeRocket from "../../assets/badge-rocket.png"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

export function SendMessageForm() {
	const { user, logOut } = useContext(AuthContext)
	const [message, setMessage] = useState("")
	const [messageSent, setMessageSent] = useState(false)
	const [isSendingMessage, setIsSendingMessage] = useState(false)
	const [errorSent, setErrorSent] = useState(false)

	let PopUpOptions = {
		status: 0,
		"200": {
			text: "Mensagem enviada com sucesso!",
			color: "#73D673",
			delay: 2000,
		},
		"206": {
			text: "Mensagem muito longa. (máximo: 130 caracteres)",
			color: "#D42537",
			delay: 4000,
		},
		default: {
			text: "Ocorreu um erro ao enviar sua mensagem.",
			color: "#D42537",
			delay: 4000,
		},
	}

	async function handleSendMessage(event: FormEvent) {
		event.preventDefault()

		if (!message.trim()) {
			return
		}
		setIsSendingMessage(true)

		const resposta = await api.post("messages", { message })
		setIsSendingMessage(false)

		const statusCode = resposta.status

		console.log(statusCode)
		PopUpOptions.status = statusCode

		if (statusCode == 200) {
			setMessage("")

			setMessageSent(false)
			setMessageSent(true)
			setErrorSent(false)
		} else if (statusCode == 206) {
			console.log("erro")
			setErrorSent(false)
			setErrorSent(true)
			setMessageSent(false)
		} else {
		}

		setIsSendingMessage(false)
	}

	return (
		<>
			<div className={styles.sideBackground}></div>
			{messageSent || errorSent ? (
				<PopUp
					text={
						messageSent
							? PopUpOptions[200].text
							: PopUpOptions[206].text
					}
					statusClass={messageSent ? "accept" : "error"}
				/>
			) : null}
			<div className={styles.sendMessageFormWrapper}>
				<button onClick={logOut} className={styles.signOutButton}>
					<VscSignOut size="32" />
				</button>

				<div className={styles.rocketBadge}>
					<img
						className={styles.badgeRotate}
						src={ImageBadgeText}
						alt="Stamp RocketSeat"
					/>
					<img
						className={styles.badgeFixed}
						src={ImageBadgeRocket}
						alt="Stamp RocketSeat"
					/>
				</div>

				<header className={styles.userInformation}>
					<div className={styles.userImage}>
						<img src={user?.avatar_url} alt={user?.name} />
					</div>
					<strong className={styles.userName}>{user?.name}</strong>
					<a
						href={`https://github.com/${user?.login}`}
						target="_blank"
						className={styles.userGithub}
					>
						<VscGithubInverted size="16" />
						{user?.login}
					</a>
				</header>

				<form
					onSubmit={handleSendMessage}
					className={styles.sendMessageForm}
				>
					<label htmlFor="message">Mensagem</label>
					<textarea
						name="message"
						onChange={(ev) => setMessage(ev.target.value)}
						value={message}
						id="message"
						placeholder="Qual sua expectativa para o evento?"
					></textarea>
					<button type="submit">
						{isSendingMessage ? (
							<AiOutlineLoading3Quarters
								className={styles.loading}
								size="24"
							/>
						) : (
							"Enviar mensagem"
						)}
					</button>
				</form>
			</div>
		</>
	)
}
