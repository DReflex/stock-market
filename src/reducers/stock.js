const initState = [];

const stock = (state= initState, action) =>{
  switch(action.type){
    case "ADD_STOCK":
    if(!state.length){
      return[
        ...state,
        {
          name:action.name,
          desc: action.desc,
          id: action.id,
          data: action.data
        }
      ]
    }else{
      let index = state.findIndex(el => el.id === action.id);

    if(index === -1)
        return [...state,
          {
            name:action.name,
            desc: action.desc,
            id: action.id,
            data: action.data
          }
        ];
    return state;


      }
    case "DELETE":
    return state.filter(data => data.id !== action.id)

    case "RESET":
    return state = [];
    default:
    return state
  }
}
export default stock
