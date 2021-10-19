import { Request, Response } from "express"
import { CreateMessageService } from "../services/CreateMessageService"
import { GetLast3MessageService } from "../services/GetLast3MessagesService"
class GetLast3MessageController {
	async handle(req: Request, res: Response){
		const service = new GetLast3MessageService()

        const result = await service.execute()

        return res.json(result)
	}
}

export { GetLast3MessageController }
