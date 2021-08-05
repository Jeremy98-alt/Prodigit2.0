import csv

reader1 = csv.reader(open("accounts.csv", "r"))
csv1 = list(reader1)

reader2 = csv.reader(open("courses_dates_times.csv", "r"))
csv2 = list(reader2)

merged = [a+b for (a,b) in zip(csv1, csv2)]

writer3 = csv.writer(open("reservations.csv", "w", newline=''))
for row in merged:
    writer3.writerow(row)


