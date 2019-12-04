import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';
import AWS from 'aws-sdk';

AWS.config.update({
    region: 'us-west-2'
});

export async function main (event, context){
    const params = {
        TableName: process.env.tableName,
        Key: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: event.pathParameters.id
        }
    };

    try {
        const result = await dynamoDbLib.call('get', params);

        if (result.Item) {
            return success(result.Item);
        } else {
            return failure({status: false, error: 'Item not found'});
        }
    } catch (e) {
        return failure({status: false});
    }
}