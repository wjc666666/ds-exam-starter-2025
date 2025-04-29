import { Handler } from "aws-lambda";

export const handler: Handler = async (event, context) => {
  try {
    console.log("Event: ", JSON.stringify(event));

  } catch (error: any) {
    throw new Error(JSON.stringify(error));
  }
};
