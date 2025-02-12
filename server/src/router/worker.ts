import { convertStatusToType, getSubmission } from "@lib/judge0";

declare var self: Worker;

self.onmessage = async (event) => {
    try {
      const token = event.data.token;
      let status = "processing";
      let submission=await getSubmission(token);
  
      while (status === "processing" || status === "in_queue") {
        submission = await getSubmission(token);
        status = convertStatusToType(submission.status.description);
      }
      self.postMessage(submission);
    } catch (error) {
      self.postMessage({ error: "Failed to process submission" });
    }
  };