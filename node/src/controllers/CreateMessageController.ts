import { Request, Response } from "express"
import { CreateMessageService } from "../services/CreateMessageService"
class CreateMessageController {
	async handle(req: Request, res: Response) {
		const { message } = req.body
		const { user_id } = req

		if (message.length <= 130) {
			const service = new CreateMessageService()

			const result = await service.execute(message, user_id)

			return res.json(result)
		} else {
			return res
				.status(206)
				.json("Mensagem muito longa. (máximo: 130 caracteres)")
		}
	}
}

export { CreateMessageController }
