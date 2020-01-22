export default function(state, action) {
  switch (action.type) {
    case "setToken": {
      return action.data;
    }
    default:
      return state;
  }
}