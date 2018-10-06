# UTEFA Website
Backend API and frontend client for our website. Here are instructions on how to init and run the project after pulling this repo.

## Table of Contents
- [Prerequisites](#prerequisites)
  - [Create an IAM User](#create-an-iam-user)
  - [Configure AWS Credentials Locally](#configure-aws-credentials-locally)
- [API](#API)
  - [Installing Dependencies](#installing-dependencies)
  - [Create DynamoDB Table](#create-dynamodb-table)
  - [Testing API](#testing-api)
  - [Deployment with Claudia](#deployment-with-claudia)
  - [Testing API Authorizations](#testing-api-authorizations)
- [Client](#client)
  - [Configure AWS Cognito](#congigure-cognito)
  - [Testing Client](#testing-client)

## Prerequisites
Since our app was built on AWS, an AWS account is needed for setting up the test environment.

To set up an AWS account, follow https://aws.amazon.com/. Free tier functionalities are sufficient for testing. AWS CLI (Command Line Interface) is also needed to configure AWS. [Install AWS CLI](https://aws.amazon.com/cli/).

We are using different functions on AWS, but all of them require admin permission for testing and access. Therefore we need to create an IAM user with admin policy and configure that on our local machine. For more information on IAM users, [click here](https://aws.amazon.com/iam/).

### Create an IAM User
Open your AWS Console, click on “Services” in the top navigation bar. Write IAM in the search box and click on the resulted IAM.

Type in some user name (for example, admin) and check **"Programmatic Access"**. Press next.

Click the *“Attach existing policies directly”* and then check *“Administrator Full Access”*. Proceed until last step.

On the last step, you will be able to see your **“Access Key Id”** and **“Secret Access Key Id”**. **Record and keep** them as you will NOT be able to retrive them further.

### Configure AWS Credentials Locally

[Guide](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html) can be found here.

**Tl;dr:** Install AWS CLI and type "aws configure" in your console. Type in your “Access Key Id” and “Secret Access Key Id” and you are good to go.

## API
Our API is written in Express (npm) and deployed to AWS lambda (serverless stack, pay per use, not computing time) and API gateway using Claudia (npm package). Data will be stored in AWS DynamoDB.

These instructions will help to set up local environment for testing and deploy our API on AWS Lambda with Claudia (using your test account).

### Installing Dependencies
Use npm to install all dependencies:
```
cd api
npm install
```
Delete claudia.json and lambda.js as these are generated on deployment by Claudia.

### Create DynamoDB Table
Since our API reads and writes from dynamoDB, we need to create a DynamoDB table for testing.

For how to create a testing DynamoDB table, follow [this](https://serverless-stack.com/chapters/create-a-dynamodb-table.html). For the simplicity of this test with current configurations, use **"notes"** as table name, **"userId"** as primary partition key, and **"noteId"** as primary sort key.

### Testing API
Our backend's root router is located in app.js. However, we have to export our express app as a module to deploy on AWS. As a work around, I imported our app module in app.local.js to set up our local server in port 3001 (avoiding conflict to our React client in port 3000).

To run our API locally, use node:
```
node app.local.js
```
This will set up a local server at http://localhost:3001. Console should print the following if our API is successfully compiled:
```
Server is listening on port 3001.
```
Any routes will be appended after http://localhost:3001. Please note that you will need to terminate the old node instance and run it again to reflect any saved changes.

### Deployment with Claudia
Deploying on Claudia can be as easy as [this](https://claudiajs.com/tutorials/serverless-express.html).

After deployment, the API will serve in the form of a Lambda function on AWS, and you will be able to access it from a Lambda url.

**Note:** Authorizations settings under "ANY" method has to be set to "AWS_IAM" to secure the API.

### Testing API Authorizations
After deployed on AWS API Gateway and set up the IAM authorizations, we can test our API using either POSTMAN or npm package [aws-api-gateway-cli-test](https://www.npmjs.com/package/aws-api-gateway-cli-test).

## Client
Our Client is written in React.js with identification support from AWS Cognito. The following instructions will help to set up a local testing environment.

### Installing Dependencies Again
Refer to [Installing Dependencies](#installing-dependencies)

### Configure Cognito
For setting up our test environment, several configurations will be needed. Below is a list of them with tutorials.

1. [Create a Cognito User Pool.](https://serverless-stack.com/chapters/create-a-cognito-user-pool.html)
2. [Create a test user](https://serverless-stack.com/chapters/create-a-cognito-test-user.html)
3. [Create a Cognito Identity Pool for accessing API](https://serverless-stack.com/chapters/create-a-cognito-identity-pool.html)
4. [Configure AWS Amplify](https://serverless-stack.com/chapters/configure-aws-amplify.html)

**Note:** this is a preliminary version of our client and identity pool has not been correctly set up, thus it is currently useless and none of the backend/database component is encrypted.

### Testing Client
To test our client, simply run:
```
npm start
```
http://localhost:3000 should pop up in the browser as a result. This page will automatically render after any editions on the React files.
