import { randomId } from "../../../utilities";

export const CREATE_ALERT = "CREATE_ALERT";
export const CLOSE_ALERT = "CLOSE_ALERT";

export const createAlertAction = ({ title, message }) => {
  const id = randomId("alert");
  return {
    type: CREATE_ALERT,
    payload: {
      id,
      title,
      message,
    },
  };
};

export const closeAlertAction = ({ id }) => {
  return {
    type: CLOSE_ALERT,
    payload: {
      id,
    },
  };
};
