import { PutObjectAclCommandOutput, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export default class BucketService {
    private client = new S3Client({
        endpoint: "http://s3.localhost.localstack.cloud:4566",
        region: "us-east-1",
        credentials: {
            accessKeyId: "test",
            secretAccessKey: "test",
        }
    })

    async uploadArchive(data: any, bucket: string, objectKey: string): Promise<PutObjectAclCommandOutput> {
        const input = {
            Body: JSON.stringify(data),
            Bucket: bucket,
            Key: objectKey,
            ContentType: "application/json"
        }

        try {
            const command = new PutObjectCommand(input)
            const response = await this.client.send(command)
            console.log("Arquivo enviado para o bucket")
            return response
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}