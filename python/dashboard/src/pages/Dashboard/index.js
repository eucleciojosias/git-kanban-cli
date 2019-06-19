import React, { Component } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import moment from 'moment';

import { Container, Title } from './styles';
import Labels from '../../components/Labels';
import Collaborators from '../../components/Collaborators';
import Throughput from '../../components/Throughput';

import axios from 'axios';

const ResponsiveGridLayout = WidthProvider(Responsive);

const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };
const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };

class Dashboard extends Component {
  state = {
    metrics: [],
    collaboratorsData: [],
    throughputWeek: [],
    throughputMonth: 0,
    labelsData: [],
    layouts: {},
  }

  componentDidMount() {
    setTimeout(() => {
      this.updateChart()
    }, 600)
  }

  updateChart = async () => {
    const response = await axios.get('http://agile.compufacil.com.br/metrics.json')
    const metrics = response.data
    const currentWeek = metrics[0]

    let collaboratorsData  = []
    currentWeek.collaborators.forEach(collaborator => {
      if (collaborator.tasks_count > 0) {
        collaboratorsData.push({
          name: collaborator.name.substr(0, 12),
          total: collaborator.tasks_count,
          pair: collaborator.pair_count
        })
      }
    });

    let labelsData = []
    currentWeek.labels.forEach(labels => {
      if (labels.tasks_count > 0) {
        labelsData.push({
          name: labels.label,
          total: labels.tasks_count,
        })
      }
    });

    metrics.sort(function(a, b) {
      return moment(a.week_date) - moment(b.week_date)
    });

    let throughputWeek = []
    metrics.forEach(week => {
      throughputWeek.push({
        date: moment(week.week_date).format('DD/MM'),
        total: week.total_tasks
      })
    });

    let throughputMonth = throughputWeek.reduce(function(total, week) {
      return total + week.total
    }, 0)

    this.setState({ totalTasks: currentWeek.total_tasks, collaboratorsData, labelsData, throughputWeek, throughputMonth })
  }

  render() {
    return (
      <Container>
        <Title>
          <strong>Tasks this week: {this.state.totalTasks}</strong>
        </Title>
        <ResponsiveGridLayout
          layouts={this.state.layouts}
          breakpoints={breakpoints}
          draggableHandle='.card-header'
          rowHeight={350}
          cols={cols}
          margin={[25, 25]}
        >
          <div key="1" className="card" data-grid={{x: 0, y: 0, w: 4, h: 1}}>
              <div className="card-header">
                <h3>Tasks by member</h3>
              </div>
              <div className="card-body">
                <Collaborators data={this.state.collaboratorsData} total={this.state.totalTasks}/>
              </div>
          </div>
          <div key="2" className="card" data-grid={{x: 4, y: 0, w: 4, h: 1}}>
            <div className="card-header">
              <h3>Tasks by label</h3>
            </div>
            <div className="card-body">
              <Labels data={this.state.labelsData} total={this.state.totalTasks}/>
            </div>
          </div>
          <div key="3" className="card" data-grid={{x: 8, y: 0, w: 4, h: 1}}>
            <div className="card-header">
              <h3>Throughput</h3>
            </div>
            <div className="card-body">
              <Throughput data={this.state.throughputWeek} />
            </div>
          </div>
        </ResponsiveGridLayout>
      </Container>
    )
  }
}

export default Dashboard;
