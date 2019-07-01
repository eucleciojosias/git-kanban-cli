import React, { Component } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';

class Labels extends Component {
  toPercent = (decimal, fixed = 0) => (
    `${((decimal / this.props.total) * 100).toFixed(fixed)}%`
  )

  render() {
    const { data } = this.props;

    return (
      <BarChart
        layout="vertical"
        width={400}
        height={250}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" tickFormatter={this.toPercent} />
        <YAxis dataKey="name" type="category" width={70} />
        <Tooltip />
        <Bar dataKey="total" label fill="#8884d8" />
      </BarChart>
    );
  }
}

export default Labels;
