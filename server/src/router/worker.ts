import { convertStatusToType, getSubmission } from "@lib/judge0";

declare var self: Worker;

async function pullWithBackoff(token: string, delay: number) {
  if (delay === 0) {
    return { error: "Submission took too long to process" };
  }
  const submission = await getSubmission(token);
  const status = convertStatusToType(submission.status.description);
  if (status !== "processing" && status !== "in_queue") {
    console.log(`Submission ${token} is status ${status}`);
    return submission;
  }
  console.log(`Submission ${token} is status ${status} is Delay ${delay}`);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return pullWithBackoff(token, delay - 1);
}

self.onmessage = async (event) => {
    try {
      const {token,delay} = event.data;
      
      const submission = await pullWithBackoff(token, delay);

      self.postMessage(submission);
    } catch (error) {
      console.log(error);
      self.postMessage({ error: "Failed to process submission" });
    }
  };