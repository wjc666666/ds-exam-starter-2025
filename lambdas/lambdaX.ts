import { SQSHandler } from "aws-lambda";

export const handler: SQSHandler = async (event, context) => {
  try {
    console.log("Lambda X received event: ", JSON.stringify(event));
    
    // Process each message from the SQS queue
    for (const record of event.Records) {
      // The message body will be the SNS message
      const message = JSON.parse(record.body);
      console.log("Processing message:", message);
      
      // If the message came from SNS, it will have a Message property
      if (message.Message) {
        const snsMessage = JSON.parse(message.Message);
        console.log("SNS message content:", snsMessage);
        // Add your message processing logic here
      }
    }
  } catch (error: any) {
    console.error("Error processing messages:", error);
    throw error;
  }
};
