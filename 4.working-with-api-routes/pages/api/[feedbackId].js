import { buildFeedbackPath, extractFeedback } from "./feedback";

const handler = (req, res) => {
  const feedbackId = req.query.feedbackId;
  const filepath = buildFeedbackPath();
  const feedbackData = extractFeedback(filepath);
  const selectedFeedback = feedbackData.find(
    (feedback) => feedback.id === feedbackId
  );

  res.status(200).json({
    feedback: selectedFeedback,
  });
};

export default handler;
