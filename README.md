# Setup Amazon MSK (kafka) as an event source for Lambda 

## [Click here to watch the Lecture.](https://youtu.be/RGGLBEDUuMc)

This is a repository for code shown in the lectures. It contains code for Lambda function, EC2 IAM Policy and Lambda policy.

### Prerequisites:
- [AWS Account](https://aws.amazon.com/resources/create-account/)

### Commands:

- Install java on client machine.
   ```
    sudo yum -y install java-11
   ```


- Download Apache Kafka.
  ```
   wget https://archive.apache.org/dist/kafka/{YOUR MSK VERSION}/kafka_2.13-{YOUR MSK VERSION}.tgz
  ```


- Run the following command in the directory where you downloaded the TAR file in the previous step.
  ```
  tar -xzf kafka_2.13-{YOUR MSK VERSION}.tgz
  ```


- Go to the kafka_2.13-{YOUR MSK VERSION}/libs directory, then run the following command to download the Amazon MSK IAM JAR file.
  ```
  wget https://github.com/aws/aws-msk-iam-auth/releases/download/v1.1.1/aws-msk-iam-auth-1.1.1-all.jar
  ```


- Go to the kafka_2.13-{YOUR MSK VERSION}/bin directory. Copy the following property settings and paste them into a new file. Name the file client.properties and save it.
    ```
    security.protocol=SASL_SSL
    sasl.mechanism=AWS_MSK_IAM
    sasl.jaas.config=software.amazon.msk.auth.iam.IAMLoginModule required;
    sasl.client.callback.handler.class=software.amazon.msk.auth.iam.IAMClientCallbackHandler
    ```

- To get the broker list, run following command:
  ```
  aws kafka get-bootstrap-brokers --cluster-arn CLUSTER_ARN
  ```

 
- Create the Topic, run the following command, replacing BootstrapServerString with one of the broker endpoints that you obtained in the previous step.
  ```
  <path-to-your-kafka-installation>/bin/kafka-topics.sh --create --bootstrap-server BootstrapServerString --command-config client.properties --replication-factor 2 --partitions 1 --topic MSKTutorialTopic
  ```

 
- Producer Command:
  ```
  /home/ec2-user/kafka_2.13-3.5.1/bin/kafka-console-producer.sh --broker-list BROKER_LIST --producer.config client.properties --topic MSKTutorialTopic
  ```

 
- Consumer Command:
  ```
  /home/ec2-user/kafka_2.13-3.5.1/bin/kafka-console-consumer.sh --bootstrap-server BROKER_LIST --consumer.config client.properties --topic MSKTutorialTopic --from-beginning
  ```


- Execution role for Lambda function : `AWSLambdaMSKExecutionrole`

### Reference documents:
- [Kafka event example](https://docs.aws.amazon.com/lambda/latest/dg/with-msk.html)
- [Client machine steps](https://docs.aws.amazon.com/msk/latest/developerguide/create-client-machine.html)
