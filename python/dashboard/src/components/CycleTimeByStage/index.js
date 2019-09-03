import React, { Component } from 'react';
import { Wrapper, Container } from './styles';
import Moment from 'moment';

class CycleTimeByStage extends Component {
  render() {
    const { data } = this.props;
    return (
      <Wrapper>
        {data.map((item, i) => (
          <Container key={ i }>
            <h4>
              Stage: { item.column }
            </h4>
            <div>
              <span>{ Moment(Moment.duration(Math.round(item.duration), 'seconds')._data).format("DD") }
                <p>d</p>
              </span>
              <span>{ Moment(Moment.duration(Math.round(item.duration), 'seconds')._data).format("HH:mm") }
                <p>h</p>
              </span>
              <span>{ Moment(Moment.duration(Math.round(item.duration), 'seconds')._data).format("mm") }
                <p>m</p>
              </span>
            </div>
          </Container>
        ))}
      </Wrapper>
    );
  }
}

export default CycleTimeByStage;
