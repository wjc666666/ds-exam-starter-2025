import { SNSHandler } from "aws-lambda";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

const sqs = new SQSClient({ region: process.env.REGION });

export const handler: SNSHandler = async (event, context) => {
  try {
    console.log("Lambda Y received event: ", JSON.stringify(event));
    
    // Process each SNS record
    for (const record of event.Records) {
      // Parse the SNS message
      const message = JSON.parse(record.Sns.Message);
      console.log("Processing SNS message:", message);

      // Check if email property missing
      if (!message.email) {
        console.log("Message missing email property, forwarding to Queue B");
        
        // Forward the message to Queue B
        const command = new SendMessageCommand({
          QueueUrl: process.env.QUEUE_B_URL,
          MessageBody: JSON.stringify(message),
        });

        await sqs.send(command);
        console.log("Message successfully forwarded to Queue B");
      } else {
        console.log("Message has email property, processing normally");
      }
    }
  } catch (error: any) {
    console.error("Error processing SNS message:", error);
    throw error;
  }
};
