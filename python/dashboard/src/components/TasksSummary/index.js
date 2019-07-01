import React, { Component, Fragment } from 'react';
import { Icon } from 'semantic-ui-react';
import { Wrapper, Container, Divider } from './styles';

class stat extends Component {
  state = {
    data: [
      { stage: 'To Do', icon: 'clipboard list', total: 248 },
      { stage: 'In Progress', icon: 'sync alternate', total: 7 },
      { stage: 'Review', icon: 'redo alternate', total: 12 },
      { stage: 'Testing', icon: 'file alternate outline', total: 4 },
      { stage: 'Late', icon: 'clock outline', total: 0 },
      { stage: 'Done', icon: 'check', total: 2304 },
    ],
  }

  render() {
    const { data } = this.state;
    return (
      <Wrapper>
        {data.map(stat => (
          <Fragment>
            <Container key={stat.stage}>
              <div>
                <Icon name={stat.icon} size="large" color="#747B84" />
                <h4>
                  {stat.stage}
                </h4>
              </div>
              <div>
                <span>{ stat.total }</span>
              </div>
            </Container>
            <Divider />
          </Fragment>
        ))}
      </Wrapper>
    );
  }
}

export default stat;
