import React, { Component, Fragment } from 'react';
import { Wrapper, Container, Divider } from './styles';

class TasksSummary extends Component {

  render() {
    const { data } = this.props;
    return (
      <Wrapper>
        {data.map((item, i) => (
          <Fragment key={ i }>
            <Container>
              <div>
                <h4>
                  { item.stage }
                </h4>
              </div>
              <div>
                <span>{ item.total }</span>
              </div>
            </Container>
            <Divider />
          </Fragment>
        ))}
      </Wrapper>
    );
  }
}

export default TasksSummary;
