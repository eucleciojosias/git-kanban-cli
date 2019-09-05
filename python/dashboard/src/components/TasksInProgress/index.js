import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react';
import moment from 'moment';
import {
  Wrapper, Container, Top, Center, Bottom, Label, Stage,
} from './styles';

class TasksInProgress extends Component {

  formatTime (started_date) {
    const now = moment()
    const startedDate = moment(started_date)

    if (now.diff(startedDate, "hours") > 48) {
      return {
        color: 'red',
        fontWeight: 'bold'
      }
    }

    return { color: 'black' }
  }

  render() {
    const { data } = this.props;
    data.sort((a, b) => moment(a.started_date) - moment(b.started_date))

    return (
      <Wrapper>
        <span>
          <p>{ data.length }</p>
        </span>
        {data.map((task, i) => (
          <Container key={ i }>
            <div className="header">
              <Icon name="code branch" size="small" />
              <strong>{ task.number }</strong>
            </div>
            <Top>
              <a href={ task.html_url } target="_blank" rel="noopener noreferrer">#{ task.number }</a>
              <p>{ task.title }</p>
            </Top>
            <Center>
              <div>
                <Icon name="clock outline" />
                <span style={this.formatTime(task.started_date)}>
                  { moment(task.started_date).fromNow() }
                </span>
              </div>
              <div>
                {task.assignees.map((assignee, aKey) => (
                  <img key={ aKey } src={ assignee.avatar_url } alt="avatar" />
                ))}
              </div>
            </Center>
            <Bottom type="Frontend">
              {task.labels.map((label, labelKey) => (
                <Label key={ labelKey } style={{ borderColor: '#'+label.color, color: '#'+label.color }} >
                  <p>{ label.name }</p>
                </Label>
              ))}
              <Stage>
                <p>{ task.current_column.name }</p>
              </Stage>
            </Bottom>
          </Container>
        ))}
      </Wrapper>
    );
  }
}


export default TasksInProgress;
