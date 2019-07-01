import React, { Component } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import AxisLabel from '../../utils/labels';

class CycleTime extends Component {
  state = {
    breakpoints: {
      xxs: 350,
      xs: 450,
      sm: 350,
      md: 350,
      lg: 350,
    },
  }

  render() {
    const { data, breakpoint } = this.props;
    const { breakpoints } = this.state;
    return (
      <LineChart
        ref={reference => this.chart = reference}
        width={breakpoint && breakpoints[breakpoint]}
        height={250}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          label={(
            <AxisLabel axisType="xAxis" x={breakpoint === 'xs' ? 250 : 200} y={225} width={0} height={0}>{{
              content: 'WEEK',
              props: { fontSize: 10, fontWeight: 'bold' },
            }}
            </AxisLabel>
          )}
        />
        <YAxis
          label={(
            <AxisLabel axisType="yAxis" x={25} y={115} width={0} height={0}>{{
              content: 'HOURS',
              props: { fontSize: 10, fontWeight: 'bold' },
            }}
            </AxisLabel>
          )}
        />
        <Tooltip />
        <Line type="linear" dataKey="total" stroke="#8884d8" />
      </LineChart>
    );
  }
}

export default CycleTime;
