import { SendMessageCommand, SQSClient } from "@aws-sdk/client-sqs";

export interface MessagingService {
	sendMessage(destination: any, body: any): Promise<void>;
}

export default class SqsService implements MessagingService {
	private client = new SQSClient({
		region: "us-east-1",
		credentials: {
			accessKeyId: "test",
			secretAccessKey: "test",
		},
	});

	async sendMessage(queueUrl: string, body: any) {
		const input = {
			QueueUrl: queueUrl,
			MessageBody: JSON.stringify(body),
		};

		const command = new SendMessageCommand(input);
		try {
			await this.client.send(command);
		} catch (error) {
			console.log(error);
		}
	}
}
