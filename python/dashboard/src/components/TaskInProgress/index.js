import React, { Component } from 'react';
import { Wrapper, Container, Top, Center, Bottom } from './styles';

class InProgress extends Component {
  state = {
    data: [
      {
        tag: '10332',
        title: 'Criar widgets no dashboard',
        started: new Date(),
        labels: ['Category: Frontend', 'Priority: High', 'Type: Improvement'],
        avatar: 'https://avatars1.githubusercontent.com/u/24439382?v=4' },
      {stage: "Review", hours: 15, minutes: 15},
      {stage: "Testing", hours: 21, minutes: 28},
    ]
  }

  render() {
    const { data } = this.state;
    return (
      <Wrapper>
        {data.map(info => (
          <Container>
            <Top>
              <strong>#{info.tag}</strong>
              <p>{info.title}</p>
            </Top>
            <Center>

            </Center>
            <Bottom>

            </Bottom>
          </Container>
        ))}
      </Wrapper>
    );
  }
}


export default InProgress;
