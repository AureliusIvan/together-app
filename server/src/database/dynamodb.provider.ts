import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

export const dynamoDbProvider = {
  provide: 'DYNAMODB_CLIENT',
  useFactory: () => {
    const client = new DynamoDBClient({
      region: process.env.AWS_DEFAULT_REGION, // Replace with your AWS region
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    return DynamoDBDocumentClient.from(client);
  },
};
