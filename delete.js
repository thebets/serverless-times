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
        await dynamoDbLib.call('delete', params);
        return success({status: true});
    } catch (e) {
        return failure({status: false});
    }
}