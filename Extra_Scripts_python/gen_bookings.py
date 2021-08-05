import random
import csv

courses = ['Advanced Machine Learning',
          'Neural Networks',
          'Internet Of Things',
          'Cloud Computing',
          'Digital Epidemiology',
          'Bioinformatics',
          'Statistical Learning',
          'Quantitative Models',
          'Fundamental Of Data Science',
          'Geoinformatics']

dates = ['Fri Aug 06 2021',
        'Sat Aug 07 2021']

inTimes = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00',
          '14:00', '15:00', '16:00', '17:00', '18:00', '19:00']

outTimes = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00',
            '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']

def getReservation(courses, dates, inTimes, outTimes):
    course = random.choice(courses)
    date = random.choice(dates)

    inTime = random.choice(inTimes)
    valid_outTimes = [outTime for outTime in outTimes if int(outTime[:2]) > int(inTime[:2])]
    outTime = random.choice(valid_outTimes)

    return [course, date, inTime, outTime]

with open('courses_dates_times.csv','w') as f:
    writer=csv.writer(f, delimiter=',', lineterminator='\n')
    
    writer.writerow(('course', 'date', 'inTime', 'outTime'))
    for _ in range(10000):
        reservation = getReservation(courses, dates, inTimes, outTimes)
        writer.writerow(reservation)