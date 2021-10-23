import { Request, Response } from "express"
import { GetLastMessagesService } from "../services/GetLastMessagesService"

class GetLastMessagesController {
	async handle(req: Request, res: Response) {
		const service = new GetLastMessagesService()

		const result = await service.execute(Number(req.params.qtd))

		return res.json(result)
	}
}

export { GetLastMessagesController }
