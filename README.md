# Prodigit2.0
We decide to create for our Cloud Computing's project Prodigit 2.0, totally on cloud using AWS @ Sapienza University of Rome
## Introduction
Nowadays, if you are a student at 'Sapienza University of Rome' and you want to attend in presence lectures or have a study session, you have to book your seat in advance through an online portal. Since there are more than 100k enrolled students, the portal needs to handle some heavy traffic with many students trying to book their seat at the same time, without experiencing any interruptions or failures. Our project will deal with the development, deployment and testing of a cloud application for this purpose. Obviously the goal is not to realize a fully implemented version of the original one, but just a demo.
## The implementation
We decided to use the AWS Cloud Platform  (which we're already familiar with thanks to the AWS lab) for our project.
## Components
In this subchapter we describe the last requirement that we want to satisfy in order to submit our project proposal. The project is composed by: 
- A **design** part
- An **implementation** part
- A **technically sound and detailed test/validation** part 
## Design Part
We will create a website, built with: Bootstrap, js, css, html5 and all that is needed to create a responsive website.
Using this site you will be able to book a seat, choose the exact day and time, check all of your bookings to edit or delete them.

<img width="706" alt="primos" src="https://user-images.githubusercontent.com/69036405/127034111-5a5d1125-94bf-493c-91a2-d39541d211b9.png">

As we can see int he image above, we are planning to realize one of these two strategies, we will choose according to their neatness. So the idea is to use either **Amazon CloudFront** or **Amazon EC2** to host the front end of the website. All the features will be implemented as microservices. Our features are linked to **Database instances**, we will choose between **Amazon Aurora**  or **Amazon DynamoDB**.  Users will interact with the site, using all of the available features. We can obtain stats from the interactions that will be done. Everything is created inside AWS. 
## Implementation Part
The implementation will consist in utilizing different AWS resources, such as: **Amazon S3 Bucket**, **Amazon CloudFront**, **AWS Lambda**, **Amazon Databases**, **Amazon CloudWatch**, etc...
We will upload the front end of the website on the **S3 Bucket**, and it will be hosted in one of the two instances mentioned in the previous subsection. After that, we will create a certain number of **Lamda Funcitons**, one for each feature (this is the microservices part). Data will be stored in the database.
The reason of using **AWS Lambda**, is to create a fully scalable web application, we want to separate all services that the app requires, so it can be scaled on demand.  Actually, the goal is to have the following services available in our application:
*First time registration service - Query for finding the building - Query for finding lectures - Query for choosing the day and hour - Query to reserve the seat - Edit user reservations service*
## Technical sound and detailed test/validation [To Be Implemented...]

![secondos](https://user-images.githubusercontent.com/69036405/127035166-1d54a9c8-5a2f-42e3-aa49-b69393d11d4b.png)

As depicted in the image above, our microservices will be stressed out and analyzed using **Amazon CloudWatch**. The idea is to control the delays caused by multiple and simultaneous virtual user actions (thousands of users) and monitor everything using the built-in function of CloudWatch.
After that, the intention is to represent CloudWatch logs, and we have other two ways in mind, to obtain that. First idea, is to use **Amazon ElasticSearch Sevice** for indexing and \textbf{Kibana} for the effective representation. In the other case, we will use the combination of **AWS Glue**, **AWS Athena** and **AWS QuickSight**.

