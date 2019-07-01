import React, { Component } from 'react';
import { Wrapper, Container } from './styles';

class stat extends Component {
  state = {
    data: [
      { stage: 'In progress', hours: 24, minutes: 30 },
      { stage: 'Review', hours: 15, minutes: 15 },
      { stage: 'Testing', hours: 21, minutes: 28 },
    ],
  }

  render() {
    const { data } = this.state;
    return (
      <Wrapper>
        {data.map(stat => (
          <Container key={stat.stage}>
            <h4>
              Stage: {stat.stage}
            </h4>
            <div>
              <span>{ stat.hours }
                <p>h</p>
              </span>
              <span>{ stat.minutes }
                <p>m</p>
              </span>
            </div>
          </Container>
        ))}
      </Wrapper>
    );
  }
}


export default stat;
