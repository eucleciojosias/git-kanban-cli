import React, { Component } from 'react';
import { Wrapper, Container } from './styles';

class stat extends Component {
  state = {
    data: [
      {stage: "In progress", hours: 24, minutes: 30 },
      {stage: "Review", hours: 15, minutes: 15},
      {stage: "Testing", hours: 21, minutes: 28},
    ]
  }

  render() {
    const { data } = this.state;
    return (
      <Wrapper>
        {data.map(stat => (
          <Container key={stat.stage}>
            <h3>
              Stage: {stat.stage}
            </h3>
            <div>
              <span>{ stat.hours }</span>
              <p>h</p>
              <span>{ stat.minutes }</span>
              <p>m</p>
            </div>
          </Container>
        ))}
      </Wrapper>
    );
  }
}


export default stat;
