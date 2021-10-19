import { Router } from "express"
import { AuthenticateUserController } from "./controllers/AuthenticateUserController"
import { CreateMessageController } from "./controllers/CreateMessageController"
import { GetLast3MessageController } from "./controllers/GetLast3MessagesController"
import { ProfileUserController } from "./controllers/ProfileUserController"
import { EnsureAuthenticated } from "./middleware/EnsureAuthenticated"

const router = Router()

router.post("/authenticate", new AuthenticateUserController().handle)

router.post(
	"/messages",
	EnsureAuthenticated,
	new CreateMessageController().handle
)

router.get("/messages/last3", new GetLast3MessageController().handle)

router.get("/profile", EnsureAuthenticated, new ProfileUserController().handle)
export { router }
