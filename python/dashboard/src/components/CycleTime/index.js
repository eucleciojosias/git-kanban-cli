import React, { Component } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import AxisLabel from '../../utils/labels';

class CycleTime extends Component {
  state = {
    data: [
      {date: "02/06", hours: 24},
      {date: "09/06", hours: 15},
      {date: "16/06", hours: 21},
      {date: "23/06", hours: 12},
    ]
  }

  render() {
    const { data } = this.state;
    return (
      <LineChart
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
        <YAxis label={<AxisLabel axisType="yAxis" x={25} y={115} width={0} height={0}>HOURS</AxisLabel>}/>
        <Tooltip />
        <Line type="linear" dataKey="hours" stroke="#8884d8" />
      </LineChart>
    );
  }
}


export default CycleTime;
