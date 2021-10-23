import prismaClient from "../prisma"

class GetLastMessagesService {
	async execute(quantity: number) {
		const messages = await prismaClient.message.findMany({
			take: quantity,
			orderBy: {
				created_at: "desc",
			},
			include: {
				user: true,
			},
		})

		return messages
	}
}

export { GetLastMessagesService }
