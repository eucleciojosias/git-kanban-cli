import React, { Component } from 'react';
import metrics from '../../data/metrics.json';
import { Responsive, WidthProvider } from 'react-grid-layout';
import moment from 'moment';

import { Container, Title } from './styles';
import Labels from '../../components/Labels';
import Collaborators from '../../components/Collaborators';
import LastWeek from '../../components/LastWeek';

const ResponsiveGridLayout = WidthProvider(Responsive);

const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };
const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };

class Dashboard extends Component {
  state = {
    metricsGithub: [],
    collaboratorsData: [],
    LastWeekData: [
      {name: "semana 1", total: "22"},
      {name: "semana 1", total: "26"},
      {name: "semana 1", total: "20"},
      {name: "semana 1", total: "15"}
    ],
    totalWeek: 83,
    labelsData: [],
    layouts: {},
  }

  componentDidMount() {
    setTimeout(() => {
      this.updateChart();
    }, 600)
  }

  updateChart = async () => {
    const chartData  = []

    metrics.collaborators.forEach(collaborator => {
      if (collaborator.tasks_count > 0) {
        const collaboratorFormatted = {
          name: collaborator.name.substr(0, 12),
          total: collaborator.tasks_count,
          pair: collaborator.pair_count
        }
        chartData.push(collaboratorFormatted)
      }
    });

    const labelsData = []

    metrics.labels.forEach(labels => {
      if (labels.tasks_count > 0) {
        const labelsFormatted = {
          name: labels.label,
          total: labels.tasks_count,
        }
        labelsData.push(labelsFormatted)
      }
    });
    this.setState({ collaboratorsData: chartData, labelsData, totalTasks: metrics.total_tasks })
  }

  getDate = () => {
    return moment().format('DD/MM/YYYY');
  }

  render() {
    const { collaboratorsData, labelsData, totalTasks, LastWeekData, totalWeek } = this.state;
    return (
      <Container>
        <Title>
          <span>{this.getDate()}</span>
          <span>Total tasks: {totalTasks}</span>
        </Title>
        <ResponsiveGridLayout
          layouts={this.state.layouts}
          breakpoints={breakpoints}
          draggableHandle='.card-header'
          rowHeight={400}
          cols={cols}
          margin={[25, 25]}
        >
          <div key="1" className="card" data-grid={{x: 0, y: 0, w: 6, h: 1}}>
              <div className="card-header">
                <h1>Colaboradores</h1>
              </div>
              <div className="card-body">
                <Collaborators data={collaboratorsData} total={totalTasks}/>
              </div>
          </div>
          <div key="2" className="card" data-grid={{x: 6, y: 0, w: 6, h: 1}}>
            <div className="card-header">
              <h1>Labels</h1>
            </div>
            <div className="card-body">
              <Labels data={labelsData} total={totalTasks}/>
            </div>
          </div>
          <div key="3" className="card" data-grid={{x: 6, y: 0, w: 6, h: 1}}>
            <div className="card-header">
              <h1>Últimas 4 semanas</h1>
            </div>
            <div className="card-body">
              <LastWeek data={LastWeekData} total={totalWeek}/>
            </div>
          </div>
        </ResponsiveGridLayout>
      </Container>
    )
  }
}

export default Dashboard;
