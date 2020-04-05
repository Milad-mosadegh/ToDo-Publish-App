import React, { Component } from 'react';
import ListItems from './components/ListItems';

import './App.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import 'bootstrap/dist/css/bootstrap.min.css'

library.add(faTrash, faHome)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: [],
      currentItem: {
        text: " ",
        key: ' '
      }
    }
  }

  handleInput = (e) => {
    this.setState({
      currentItem: {
        text: e.target.value,
        key: Date.now()
      }
    })
  }

  addItem = (e) => {
    e.preventDefault();

    const newItem = this.state.currentItem;
    console.log(newItem);
    if (newItem !== "") {
      const newItems = [...this.state.item, newItem];
      this.setState({
        item: newItems,
        currentItem: {
          text: "",
          key: ""
        }
      })
    }
  }

  deleteItem = (key) => {
    const filterItems = this.state.item.filter(item => item.key !== key)
    this.setState({ item: filterItems })
  }

  setUpdate = (text, key) => {
    const items = this.state.item;
    items.map(item => {
      if (item.key === key) {
        item.text = text;
      }
    })
    this.setState({ item: items })
  }


  render() {
    return (
      <div className="App shadow ">
        <h4 className="text-center p-2">ToDo List</h4>
        <header className="border-bottom">
          <form id="to-do-form" onSubmit={this.addItem} className="d-flex p-3 justify-content-center">
            <input name="input" type='text' className="form-control w-50 " placeholder="Enter Text" value={this.state.currentItem.text} onChange={this.handleInput} />
            <button type="submit" className="btn btn-danger ml-1">Add</button>
          </form>
        </header>
        <ListItems items={this.state.item} deleteItem={this.deleteItem} setUpdate={this.setUpdate} />
      </div>

    );
  }
}

export default App;
