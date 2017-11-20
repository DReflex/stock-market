import React from 'react';
import './home.css';
import Chart from './chart';
import Result from './result';
import { connect } from 'react-redux';
import { addQuery, addStock, resQ} from '../../actions/index';
import moment from 'moment'
import { subscribeStock } from './api';
import openSocket from 'socket.io-client';

const socket = openSocket();



class Home extends React.Component{

  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyPress);
    this.props.dispatch(resQ())
    fetch('/api/stock').then(res => res.json())
    .then(data => data.map(elem => this.props.dispatch(addStock(elem))))

  }
  componentWillUnmount() {
      document.removeEventListener("keydown", this.handleKeyPress);
  }
  constructor(){
    super();
    this.handleKeyPress =this.handleKeyPress.bind(this);
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    subscribeStock((err, data) => this.props.dispatch(addStock(data)))

  }


  handleChange = (e) =>{
    let query = e.target.value
    query = query.toUpperCase()
    this.props.dispatch(addQuery(query))
  }
  handleKeyPress = (e) => {
      if(e.keyCode === 13){
        this.handleSubmit()
      }
  }
  handleSubmit = () =>{
  // start and end date edit in redux
  const startDate = moment().subtract(1, 'year').format('YYYY-MM-DD');
  const endDate = moment().format('YYYY-MM-DD');
  let query = this.props.query.query
  const apiKey = "pmywy79eDU9iNd2huMDk"
  const url = `https://www.quandl.com/api/v3/datasets/WIKI/${query}.json?api_key=${apiKey}&start_date=${startDate}&end_date=${endDate}&collapse=weekly&order=asc`
  fetch(url).then(res => res.json())
  .then((db) => {
    if(!db.quandl_error){
      let name = db.dataset.name.split("Inc")[0];
      let desc = db.dataset.name;
      let data = db.dataset.data.map(elem => [Date.parse(elem[0]), elem[1]])
      let id = db.dataset.id;
      let stock = {
        name,
        desc,
        data,
        id
      }
      this.props.dispatch(resQ())
      fetch('/api/stock', {
        method: 'POST',
        mode: 'CORS',
        body: JSON.stringify({
          name,
          desc,
          data,
          id
        }),
        headers: {
            'Content-Type': 'application/json'
        }
      })
      socket.emit('add', stock)

      return this.props.dispatch(addStock(stock))

    }else{
      this.props.dispatch(resQ())

      return null;

    }



  })
  }
  render(){
    return(
      <div>
        <div className="title-bar">
          <h1>Stock the market</h1>
        </div>
        <div className="chart">
            <Chart />
          <div className="search">
            <input onChange={(e)=>this.handleChange(e)} placeholder="add company" type="text" name="market" value={this.props.query.query} />
            <button onClick={this.handleSubmit} className="btn btn-info" type="button" name="button">Add</button>
          </div>
          <Result />
        </div>
      </div>
    )
  }
}
const store = (store) =>{
  return {
    query: store.query,
    stock: store.stock
  }
}

Home = connect(store)(Home)
export default Home
