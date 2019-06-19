import React, { Component } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

class Collaborators extends Component {

  toPercent = (decimal, fixed = 0) => (
    `${((decimal / this.props.total) * 100).toFixed(fixed)}%`
  )

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
        <XAxis dataKey="name" />
        <YAxis tickFormatter={this.toPercent} />
        <Tooltip />
        <Legend />
        <Bar dataKey="total" label fill="#8884d8" />
        <Bar dataKey="pair" label fill="#82ca9d" />
      </BarChart>
    );
  }
}


export default Collaborators;
