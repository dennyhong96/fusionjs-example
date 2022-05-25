import { CLOSE_ALERT, CREATE_ALERT } from "./actions";

export const initialAlertState = {
  alerts: [],
};

export const alertReducer = (state = initialAlertState, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_ALERT: {
      return {
        ...state,
        alerts: [...state.alerts, payload],
      };
    }
    case CLOSE_ALERT: {
      return {
        ...state,
        alerts: state.alerts.filter((a) => a.id != payload.id),
      };
    }
    default: {
      return state;
    }
  }
};
