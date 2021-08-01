import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('users')

def lambda_handler(event, context):
    print (event)
    email = event['email']
    password = event['password']

    users = table.scan()['Items']
    flg = 0
    for user in users:
       if(user['email'] == email): 
           flg = 1  
    if(flg == 0):
        table.put_item(
                Item={
                    'email':email,
                    'password':password,
                }
            )
        return 'added user successfully'
    else:
        return 'user registered'