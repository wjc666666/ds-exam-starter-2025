import { SNSHandler } from "aws-lambda";

export const handler: SNSHandler = async (event, context) => {
  try {
    console.log("Lambda Y received event: ", JSON.stringify(event));
    
    // Process each SNS record
    for (const record of event.Records) {
      // Parse the SNS message
      const message = JSON.parse(record.Sns.Message);
      console.log("Processing SNS message:", message);
      // Add your message processing logic here 
    }
  } catch (error: any) {
    console.error("Error processing SNS message:", error);
    throw error;
  }
};
