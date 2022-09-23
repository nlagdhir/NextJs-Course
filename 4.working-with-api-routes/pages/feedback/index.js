import { Fragment, useState } from "react";
import { extractFeedback, buildFeedbackPath } from "../api/feedback";

const Feedback = (props) => {
  const [feedbackData, setFeedbackData] = useState();

  const loadFeedbackHandler = (id) => {
    fetch(`/api/${id}`).then((res) =>
      res.json().then((data) => {
        setFeedbackData(data.feedback);
      })
    );
  };

  return (
    <Fragment>
        {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.key}>
            {item.feedback}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

export default Feedback;

export const getStaticProps = async () => {
  const filepath = buildFeedbackPath();
  const data = extractFeedback(filepath);
  return {
    props: {
      feedbackItems: data,
    },
  };
};
