
const stateInit = {
  query: String
}
const query = (state = stateInit, action) => {
  switch (action.type) {
      case "QUERY":
      return{
        ...state,
        query:action.query
      }
      case "RES_Q":
      return state = {
        query: ""
      }
      default:
      return state
  }


}

export default query
