import json
import boto3
from datetime import date
import random
import string

today = date.today()
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('reservations')
courseInfo = dynamodb.Table('bookingseats')

def get_random_string(length):
    # choose from all lowercase letter
    letters = string.ascii_lowercase
    result_str = ''.join(random.choice(letters) for _ in range(length))
    return result_str

def lambda_handler(event, context):
    print (event)
    if(len(event.keys()) == 1):
        email = event['email']
    
        reservations = table.scan()['Items']
        flg = 0
        reservationsForOneUser = []
        for oneBook in reservations:
           if(oneBook['email'] == email): 
               flg = 1
               reservationsForOneUser.append(oneBook)  
        if(flg == 1):
            return reservationsForOneUser
        else:
            return 'user doesn\'t book anything'   
    elif(len(event.keys()) == 2):
        codeReservation = event['codeReservation']
        course = event['course']

        # get item
        response = courseInfo.get_item(Key={'course': course})
        item = response['Item']
        # update
        item['seatsAvailable'] = item['seatsAvailable'] + 1
        # put (idempotent)
        courseInfo.put_item(Item=item) # update the table booking seats

        # remove row in reservations
        table.delete_item(
            Key={
                'codReservation': codeReservation
            }
        )
    else:
        cInfo = courseInfo.scan()['Items']
        for cour in cInfo:
           if(cour['course'] == event['course']): 
               # get item
               response = courseInfo.get_item(Key={'course': cour['course']})
               item = response['Item']
               # update
               item['seatsAvailable'] = cour['seatsAvailable']-1
               # put (idempotent)
               courseInfo.put_item(Item=item) # update the table booking seats
               table.put_item(
                    Item={
                        'codReservation': get_random_string(5),
                        'email':event['email'],
                        'course':event['course'],
                        'room': cour['room'],
                        'building': cour['building'],
                        'date': event['date'],
                        'time': event['inTime'] + " - " + event['outTime'],
                    }
               )
        return 'added reservation'