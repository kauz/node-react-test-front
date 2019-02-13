import React, {Component, Fragment} from 'react';
import './Cars.scss';
import axios from "axios";
import Car from "../Car/Car";
import {Select, FormControl, InputLabel, Button} from '@material-ui/core';

class Cars extends Component {
  constructor(props) {
    super(props);
    this.state = {cars: [], selected: {}};
    this.baseState = this.state;
  }

  componentDidMount() {
    this.fetchCars();
  }

  getCarsList() {
    let cars = this.baseState.cars;

    let selected = this.state.selected;

    for (let key in selected) {
      if (selected[key].length) {
        cars = cars.filter(car => car[key] === selected[key]);
      }
    }

    let filtered = this.getFilters(cars);
    this.setState(() => ({cars: cars}));
    this.setState(() => ({filter: filtered}));
  }

  fetchCars() {
    axios.get('http://localhost:3000/cars', {
      params: {
        country: this.state.selected.country || '',
        manufacturer: this.state.selected.manufacturer || '',
        model: this.state.selected.model || '',
        year: this.state.selected.year || '',
        color: this.state.selected.color || ''
      }
    }).then(res => {
      if (res.status === 200) {
        this.setState(() => ({cars: res.data}));
        this.baseState.cars = res.data;
        this.setState({filter: this.getFilters()});
      }
    }).catch(function (error) {
      console.error(error);
    });
  }

  renderCars() {
    return this.state.cars.map(function (car, i) {
      return <Car
        key={i}
        carId={car.id}
        carModel={car.model}
        year={car.year}
        picture={car.picture}
        manufacturer={car.manufacturer}
        country={car.country}
        color={car.color}
        hex={car.colorHex}/>;
    });
  }

  getFilters(cars) {
    let result = {
      manufacturer: [],
      year: [],
      model: [],
      color: []
    };

    let state = cars || this.state.cars;

    state.forEach(function (obj) {
      Object.keys(obj).forEach(key => {
        if (result[key]) {
          if (result[key].findIndex(x => x === obj[key]) <= -1) {
            result[key].push(obj[key]);
          }
        }
      });
    });

    Object.values(result).forEach(arr => {
      arr.sort();
    });

    return result;
  }

  handleChange = name => event => {
    this.state.selected[name] = event.target.value;
    this.getCarsList();
  };

  clearFilters() {
    this.state.selected = {color: "", model: "", manufacturer: "", year: ""};
    this.getCarsList();
  }

  render() {

    return (this.state.filter
      ? <Fragment>
        <form className={'Filters'}>
          <FormControl className={'Filter'}>
            <InputLabel disableAnimation shrink htmlFor="manufacturer-native-simple">Manufacturer</InputLabel>
            <Select native value={this.state.selected.manufacturer} onChange={this.handleChange('manufacturer')}
                    inputProps={{
                      name: 'manufacturer',
                      id: 'manufacturer-native-simple',
                    }}
            >
              <option value=""/>
              {this.state.filter.manufacturer.map((value, index) => {
                return <option key={index} value={value}>{value}</option>
              })}
            </Select>
          </FormControl>

          <FormControl className={'Filter'}>
            <InputLabel disableAnimation shrink htmlFor="model-native-simple">Model</InputLabel>
            <Select native value={this.state.selected.model} onChange={this.handleChange('model')}
                    inputProps={{
                      name: 'model',
                      id: 'model-native-simple',
                    }}
            >
              <option value=""/>
              {this.state.filter.model.map((value, index) => {
                return <option key={index} value={value}>{value}</option>
              })}
            </Select>
          </FormControl>

          <FormControl className={'Filter'}>
            <InputLabel disableAnimation shrink htmlFor="year-native-simple">Year</InputLabel>
            <Select native value={this.state.selected.year} onChange={this.handleChange('year')}
                    inputProps={{
                      name: 'year',
                      id: 'year-native-simple',
                    }}
            >
              <option value=""/>
              {this.state.filter.year.map((value, index) => {
                return <option key={index} value={value}>{value}</option>
              })}
            </Select>
          </FormControl>

          <FormControl className={'Filter'}>
            <InputLabel disableAnimation shrink htmlFor="color-native-simple">Color</InputLabel>
            <Select native value={this.state.selected.color} onChange={this.handleChange('color')}
                    inputProps={{
                      name: 'color',
                      id: 'color-native-simple',
                    }}
            >
              <option value=""/>
              {this.state.filter.color.map((value, index) => {
                return <option key={index} value={value}>{value}</option>
              })}
            </Select>
          </FormControl>

          <FormControl className={'Filter Filter-Button'}>
            <Button onClick={() => {
              this.clearFilters()
            }} color={'primary'} variant={'contained'}>Clear</Button>
          </FormControl>
        </form>
        {this.state.cars.length
          ? <div className='Cars'>{this.renderCars()}</div>
          : <div>No data</div>}
      </Fragment>
      : <div>Loading...</div>);
  }
}

export default Cars;
