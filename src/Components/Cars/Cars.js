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
    this.getCars({});
  }

  getCars() {
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
        if (Object.keys(this.state.selected).length === 0 && this.state.selected.constructor === Object) {
          this.setState(() => ({filter: this.filter()}));
        }
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

  filter() {
    let manufacturer = [];
    let year = [];
    let model = [];
    let color = [];

    this.state.cars.forEach(function (obj) {
      let i = manufacturer.findIndex(x => x === obj.manufacturer);
      let j = year.findIndex(x => x === obj.year);
      let k = model.findIndex(x => x === obj.model);
      let l = color.findIndex(x => x === obj.color);

      if (i <= -1) {
        manufacturer.push(obj.manufacturer);
      }

      if (j <= -1) {
        year.push(obj.year);
      }

      if (k <= -1) {
        model.push(obj.model);
      }

      if (l <= -1) {
        color.push(obj.color);
      }
    });

    return {manufacturer: manufacturer.sort(), year: year.sort((a, b) => a - b), model: model.sort(), color: color.sort()};
  }

  handleChange = name => event => {
    this.state.selected[name] = event.target.value;
    this.getCars();
  };

  clearFilters() {
    this.setState(this.baseState);
    this.state.selected = {};
    this.getCars();
    this.render();
  }

  render() {

    return (this.state.cars.length && this.state.filter ?
      <Fragment>
        <form className={'Filters'}>
          <FormControl className={'Filter'}>
            <InputLabel disableAnimation shrink htmlFor="manufacturer-native-simple">Manufacturer</InputLabel>
            <Select native onChange={this.handleChange('manufacturer')}
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
            <Select native onChange={this.handleChange('model')}
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
            <Select native onChange={this.handleChange('year')}
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
            <Select native onChange={this.handleChange('color')}
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
            <Button onClick={() => { this.clearFilters() }} color={'primary'} variant={'contained'}>Clear</Button>
          </FormControl>
        </form>
        <div className='Cars'>
          {this.renderCars()}
        </div>
      </Fragment>
      : <div> No data </div>);
  }
}

export default Cars;
