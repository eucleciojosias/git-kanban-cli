import React, { Component } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

class Throughput extends Component {

  render() {
    const { data } = this.props;
    return (
      <BarChart
        ref={reference => this.chart = reference}
        width={350}
        height={250}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="total" label fill="#8884d8" barSize={30}/>
      </BarChart>
    );
  }
}


export default Throughput;
