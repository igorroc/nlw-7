import { useContext, useState } from "react"
import { VscGithubInverted } from "react-icons/vsc"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

import { AuthContext } from "../../contexts/auth"
import styles from "./styles.module.scss"

import ImageBadgeText from "../../assets/badge-text.png"
import ImageBadgeRocket from "../../assets/badge-rocket.png"

export function LoginBox() {
	const { signInUrl } = useContext(AuthContext)
	const [isSigningIn, setIsSigningIn] = useState(false)

	function toggleIsSigningIn() {
		setIsSigningIn(true)
		console.log("TOGGLE")
	}
	return (
		<div className={styles.loginBoxWrapper}>
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

			<strong>Entre e compartilhe sua mensagem</strong>
			<a
				href={signInUrl}
				className={styles.signInWithGithub}
				onClick={toggleIsSigningIn}
			>
				{isSigningIn ? (
					<AiOutlineLoading3Quarters className={styles.loading} size="24" />
				) : (
					<>
						<VscGithubInverted size="24" />
						Entrar com o GitHub
					</>
				)}
			</a>
		</div>
	)
}
