import { useContext, useState, FormEvent } from "react"
import { VscSignOut, VscGithubInverted } from "react-icons/vsc"
import { AuthContext } from "../../contexts/auth"
import { api } from "../../services/api"
import styles from "./styles.module.scss"

import ImageBadgeText from "../../assets/badge-text.png"
import ImageBadgeRocket from "../../assets/badge-rocket.png"

export function SendMessageForm() {
	const { user, logOut } = useContext(AuthContext)
	const [message, setMessage] = useState("")

	async function handleSendMessage(event: FormEvent) {
		event.preventDefault()

		if (!message.trim()) {
			return
		}

		await api.post("messages", { message })

		setMessage("")
	}

	return (
		<div className={styles.sendMessageFormWrapper}>
			<button onClick={logOut} className={styles.signOutButton}>
				<VscSignOut size="32" />
			</button>

			<div className={styles.rocketBadge}>
				<img className={styles.badgeRotate} src={ImageBadgeText} alt="Stamp RocketSeat" />
				<img className={styles.badgeFixed} src={ImageBadgeRocket} alt="Stamp RocketSeat" />
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
				<button type="submit">Enviar mensagem</button>
			</form>
		</div>
	)
}
