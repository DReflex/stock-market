import React from 'react';
import { connect } from 'react-redux';
import { Del} from '../../actions/index';
import { subscibeDelete } from './api';
import openSocket from 'socket.io-client';
import './home.css';

const socket = openSocket('http://localhost:4000');

class Result extends React.Component{
  constructor(){
    super();
    this.handleDelete = this.handleDelete.bind(this)
    subscibeDelete((err, id) => this.props.dispatch(Del(id)))

  }
  handleDelete = (id) =>{
    fetch(`/api/stock/${id}`, {
      method:"DELETE"
    })
    socket.emit('delete', id)
    this.props.dispatch(Del(id))
  }
  render(){
    let stock = this.props.stock
    return(
      <div className="result-container">
        {stock.length ? stock.map((data, i) => {
          return (
            <div key={i} className="results">
            <h3>{data.name} <span onClick={()=>this.handleDelete(data.id)}><i className="fa fa-times-circle-o" aria-hidden="true"></i></span></h3>
            <p>{data.desc}</p>
          </div>)
        })
        :null
      }

      </div>

    )
  }
}
const store = (store) =>{
  return {
    stock: store.stock
  }
}

Result = connect(store)(Result)
export default Result;
