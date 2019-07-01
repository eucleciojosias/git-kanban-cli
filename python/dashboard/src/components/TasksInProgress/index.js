import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import moment from 'moment';
import {
  Wrapper, Container, Top, Center, Bottom, Label, Stage,
} from './styles';

class InProgress extends Component {
  state = {
    data: [
      {
        branch: '10290',
        tag: '10332',
        title: 'Criar widgets no dashboard',
        started: 1561951966327,
        labels: ['Category: Frontend', 'Priority: High', 'Type: Improvement'],
        avatar: 'https://avatars1.githubusercontent.com/u/24439382?v=4',
        stage: 'Review',
      },
      {
        branch: '10292',
        tag: '10334',
        title: 'Criar widgets no dashboard',
        started: 1561986895962,
        labels: ['Category: Devops', 'Priority: High', 'Type: Improvement'],
        avatar: 'https://avatars1.githubusercontent.com/u/24439382?v=4',
        stage: 'Testing',
      },
      {
        branch: '10298',
        tag: '10339',
        title: 'Criar widgets no dashboard',
        started: 1561951966327,
        labels: ['Category: Frontend', 'Priority: High', 'Type: Improvement'],
        avatar: 'https://avatars1.githubusercontent.com/u/24439382?v=4',
        stage: 'In Progress',
      },
      {
        branch: '10302',
        tag: '10342',
        title: 'Criar widgets no dashboard',
        started: 1561951966327,
        labels: ['Category: Backend', 'Priority: High', 'Type: Improvement'],
        avatar: 'https://avatars1.githubusercontent.com/u/24439382?v=4',
        stage: 'Review',
      },
    ],
    totalTasks: 7,
  }

  formatLabel = (category) => {
    if (category.slice(category.indexOf(' ')).length === 1) {
      return category.slice(category.indexOf(''));
    }
    return category.slice(category.indexOf(' ')).trim();
  };

  render() {
    const { data, totalTasks } = this.state;
    return (
      <Wrapper>
        <span>
          <p>{totalTasks}</p>
        </span>
        {data.map(info => (
          <Container key={info.tag}>
            <div className="header">
              <Icon name="code branch" size="small" />
              <strong>{info.branch}</strong>
            </div>
            <Top>
              <strong>#{info.tag}</strong>
              <p>{info.title}</p>
            </Top>
            <Center>
              <div>
                <Icon name="clock outline" />
                <span>
                  {moment(info.started).fromNow(true)}
                </span>
              </div>
              <img src={info.avatar} alt="avatar" />
            </Center>
            <Bottom type="Frontend">
              {info.labels.map(label => (
                <Label key={label} type={this.formatLabel(label)}>
                  <p>{label}</p>
                </Label>
              ))}
              <Stage type={this.formatLabel(info.stage)}>
                <p>{info.stage}</p>
              </Stage>
            </Bottom>
          </Container>
        ))}
      </Wrapper>
    );
  }
}


export default InProgress;
