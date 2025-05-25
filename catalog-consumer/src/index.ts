import { PrismaCategoryRepository } from "./repository/prismaCategoryRepository";
import BucketService from "./services/bucketService";
import CatalogService from "./services/catalogService";
import { SQSClient } from "@aws-sdk/client-sqs";
import { Consumer } from "sqs-consumer";
import "dotenv/config"

const repository = new PrismaCategoryRepository()
const bucketService = new BucketService()
const catalogService = new CatalogService(repository, bucketService)

const handler = async (message: any) => {
    try {
        const { Body } = message
        const { owner } = JSON.parse(Body)
        console.log("Emitindo catalogo: ", owner)
        await catalogService.emit(owner)
        return 'success'
    } catch (error) {
        console.log(error)
        throw error
    }
}

const queueURL = process.env.QUEUE_URL as string
const app = Consumer.create({
    queueUrl: queueURL,
    handleMessage: async (message) =>  {
        handler(message) 
    },
    sqs: new SQSClient({
        region: "us-east-1",
        credentials: {
            accessKeyId: "test",
            secretAccessKey: "test"
        }
    })
})

app.on("error", (error) => {
    console.log(error.message)
})

app.on("processing_error", (error) => {
    console.log(error.message)
})

app.on("message_processed", (message) => {
    console.log("Mensagem consumida com sucesso:", message)
})

app.start()