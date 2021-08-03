import json
import boto3

dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('bookingseats')

def lambda_handler(event, context):
    bookingseats = table.scan()['Items']
    return(bookingseats)