import { APIGatewayProxyHandler } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { Table } from 'sst/node/table';
import { v4 as uuidv4 } from 'uuid';

const dynamoDb = new DynamoDB.DocumentClient();

declare module 'sst/node/table' {
  export interface TableResources {
    Feedback: {
      tableName: string;
    };
  }
}

export const main: APIGatewayProxyHandler = async (event) => {
  const input = JSON.parse(event.body);

  const putParams = {
    TableName: Table.Feedback.tableName,
    Key: {
      id: uuidv4(),
    },
    UpdateExpression: 'SET body = :input',
    ExpressionAttributeValues: {
      // Increase the count
      ':input': JSON.stringify(input),
    },
  };

  await dynamoDb.update(putParams).promise();

  return {
    statusCode: 200,
  };
};
