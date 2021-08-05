import random
import string
import csv

def random_char(char_num):
       return ''.join(random.choice(string.ascii_letters) for _ in range(char_num))

def getCredentials():
    email = random_char(7)+"@gmail.com"
    password = random_char(7)
    return email, password

with open('accounts.csv','w') as f1:
    writer=csv.writer(f1, delimiter=',', lineterminator='\n')
    
    writer.writerow(('email', 'password'))
    for _ in range(10000):
        email, password = getCredentials()

        row = [email, password]
        writer.writerow(row)