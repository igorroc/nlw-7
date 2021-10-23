import { Router } from "express"
import { AuthenticateUserController } from "./controllers/AuthenticateUserController"
import { CreateMessageController } from "./controllers/CreateMessageController"
import { GetLastMessagesController } from "./controllers/GetLastMessagesController"
import { ProfileUserController } from "./controllers/ProfileUserController"
import { EnsureAuthenticated } from "./middleware/EnsureAuthenticated"

const router = Router()

router.post("/authenticate", new AuthenticateUserController().handle)

router.post(
	"/messages",
	EnsureAuthenticated,
	new CreateMessageController().handle
)

router.get("/messages/last/:qtd", new GetLastMessagesController().handle)

router.get("/profile", EnsureAuthenticated, new ProfileUserController().handle)
export { router }
