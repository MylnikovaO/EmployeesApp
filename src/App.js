import './App.css';
import { Component } from 'react';
import AppFilter from './components/AppFilter/AppFilter';
import AppInfo from './components/AppInfo/AppInfo';
import EmployeesAddForm from './components/EmployeesAddForm/EmployeesAddForm';
import EmployeesList from './components/EmployeesList/EmployeesList';
import SearchPanel from './components/SearchPanel/SearchPanel';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { name: 'Ivan', salary: 800, id: 1, increase: true, rise: true },
        { name: 'Sergay', salary: 3000, id: 2, increase: false, rise: false },
        { name: 'Olga', salary: 1800, id: 3, increase: false, rise: false }
      ],
      term: '',
      filter: 'all'
    }
    this.maxId = 4;
  }
  deleteItem = (id) => {
    this.setState(({ data }) => {
      return {
        data: data.filter(item => item.id !== id)
      }
    })
  }
  addItem = (name, salary) => {
    const newItem = {
      name,
      salary,
      id: this.maxId++
    }
    this.setState(({ data }) => {
      const newArr = [...data, newItem];
      return {
        data: newArr
      }
    }
    )
  }
  onToggleProp = (id, prop) => {
    this.setState(({ data }) => ({
      data: data.map(item => {
        if (item.id === id) {
          return { ...item, [prop]: !item[prop] }
        }
        return item
      })
    }))
  }
  searchEmp = (items, term) => {
    if (term.length === 0) {
      return items
    }
    return items.filter(item => {
      return item.name.indexOf(term) > - 1
    })
  }
  onUpdateSearch = (term) => {
    this.setState({ term })
  }
  filterPost = (items, filter) => {
    switch (filter) {
      case 'rise':
        return items.filter(item => item.rise);
      case 'moreThen1000':
        return items.filter(item => item.salary > 1000);
      default:
        return items
    }
  }
  onFilterSelect = (filter) => {
    this.setState({ filter })
  }
  render() {
    const { data, term, filter } = this.state;
    const employees = this.state.data.length;
    const increased = this.state.data.filter(item => item.increase).length;
    const visibleData = this.filterPost(this.searchEmp(data, term), filter)
    return (
      <div className='app'>
        <AppInfo employees={employees} increased={increased} />
        <div className='search-panel'>
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <AppFilter filter={filter} onFilterSelect={this.onFilterSelect} />
        </div>
        <EmployeesList data={visibleData}
          onDelete={this.deleteItem}
          onToggleProp={this.onToggleProp}
        />
        <EmployeesAddForm onAdd={this.addItem} />
      </div>
    );
  }
}

export default App;
