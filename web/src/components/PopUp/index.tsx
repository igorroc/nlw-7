import styles from "./styles.module.scss"

type PopUpProps = {
	text: string
	statusClass: string
}

export function PopUp(props: PopUpProps) {
	if (!props) return <span></span>

	return (
		<div className={[styles.popUp, styles[props.statusClass]].join(" ")}>
			{props.text}
		</div>
	)
}
