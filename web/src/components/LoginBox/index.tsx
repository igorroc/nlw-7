import { useContext } from "react"
import { VscGithubInverted } from "react-icons/vsc"
import { AuthContext } from "../../contexts/auth"
import styles from "./styles.module.scss"

import ImageBadgeText from "../../assets/badge-text.png"
import ImageBadgeRocket from "../../assets/badge-rocket.png"

export function LoginBox() {
	const { signInUrl } = useContext(AuthContext)

	return (
		<div className={styles.loginBoxWrapper}>
			<div className={styles.rocketBadge}>
				<img className={styles.badgeRotate} src={ImageBadgeText} alt="Stamp RocketSeat" />
				<img className={styles.badgeFixed} src={ImageBadgeRocket} alt="Stamp RocketSeat" />
			</div>

			<strong>Entre e compartilhe sua mensagem</strong>
			<a href={signInUrl} className={styles.signInWithGithub}>
				<VscGithubInverted size="24" />
				Entrar com o GitHub
			</a>
		</div>
	)
}
