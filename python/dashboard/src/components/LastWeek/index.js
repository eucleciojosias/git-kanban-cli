import React, { Component } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

class LastWeek extends Component {

  toPercent = (decimal, fixed = 0) => (
    `${((decimal / this.props.total) * 100).toFixed(fixed)}%`
  )

  render() {
    const { data } = this.props;
    return (
      <BarChart
        ref={reference => this.chart = reference}
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={this.toPercent} />
        <Tooltip />
        <Bar dataKey="total" label fill="#8884d8" barSize={30}/>
      </BarChart>
    );
  }
}


export default LastWeek;
