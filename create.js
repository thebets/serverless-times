import uuid from 'uuid';
import AWS from 'aws-sdk';
import * as dynamoDbLib from './libs/dynamodb-lib';
import { success, failure } from './libs/response-lib';

AWS.config.update({
    region: 'us-west-2'
});

export async function main (event, context){
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.tableName,
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            noteId: uuid.v1(),
            content: data.content,
            attachment: data.attachment,
            createdAt: Date.now()
        }
    };

    try{
        await dynamoDbLib.call('put', params);
        return success(params.Item);
    } catch (e){
        return failure({status: false});
    }
}