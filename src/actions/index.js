
export const addQuery = (query) =>{
    return{
    type: 'QUERY',
    query
  }
  }

export const addStock =(data)=>{
  return {
    type: 'ADD_STOCK',
    name: data.name,
    desc: data.desc,
    id: data.id,
    data:data.data
  }
}
export const reset = () =>{
  return{
    type:"RESET"
  }
}
export const Del = (id) => {
  return {
    type:"DELETE",
    id
  }
}
export const resQ = () =>{
  return {
    type: "RES_Q"
  }
}
