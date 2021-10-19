import { Router } from "express"
import { AuthenticateUserController } from "./controllers/AuthenticateUserController"
import { CreateMessageController } from "./controllers/CreateMessageController"
import { EnsureAuthenticated } from "./middleware/EnsureAuthenticated"

const router = Router()

router.post("/authenticate", new AuthenticateUserController().handle)

router.post(
	"/messages",
	EnsureAuthenticated,
	new CreateMessageController().handle
)

export { router }
