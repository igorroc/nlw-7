import { serverHttp } from "./app"

serverHttp.listen(4000, () =>
	console.log(`🚀 Server is running on http://localhost:4000`)
)
