import React, { Component } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import moment from 'moment';

import axios from 'axios';
import { Container, Title } from './styles';
import Labels from '../../components/Labels';
import Collaborators from '../../components/Collaborators';
import Throughput from '../../components/Throughput';
import CycleTime from '../../components/CycleTime';
import Stat from '../../components/Stat';
import TasksInProgress from '../../components/TasksInProgress';
import TasksSummary from '../../components/TasksSummary';


const ResponsiveGridLayout = WidthProvider(Responsive);

class Dashboard extends Component {
  static defaultProps = {
    className: 'layout',
    rowHeight: 30,
    onLayoutChange() {},
    cols: {
      lg: 12, md: 8, sm: 8, xs: 4, xxs: 2,
    },
  };

  state = {
    metrics: [],
    collaboratorsData: [],
    throughputWeek: [],
    cycleTimeWeek: [],
    throughputMonth: 0,
    labelsData: [],
    currentBreakpoint: 'lg',
    compactType: 'vertical',
    mounted: false,
    layouts: {
      lg:
        [
          {
            w: 5, h: 9, x: 0, y: 0, i: '1',
          },
          {
            w: 3, h: 9, x: 5, y: 0, i: '2',
          },
          {
            w: 4, h: 9, x: 8, y: 0, i: '3',
          },
          {
            w: 4, h: 9, x: 0, y: 1, i: '4',
          },
          {
            w: 3, h: 9, x: 4, y: 1, i: '5',
          },
          {
            w: 5, h: 9, x: 7, y: 1, i: '6',
          },
          {
            w: 4, h: 6, x: 0, y: 2, i: '7',
          },
        ],
    },
  };

  componentDidMount() {
    this.setState({ mounted: true });
    setTimeout(() => {
      this.updateChart();
    }, 600);
  }

  onBreakpointChange = (breakpoint) => {
    this.setState({
      currentBreakpoint: breakpoint,
    });
  };

  onLayoutChange = (layout, layouts) => {
    const { onLayoutChange } = this.props;
    onLayoutChange(layout, layouts);
  };

  updateChart = async () => {
    const response = await axios.get('http://agile.compufacil.com.br/metrics.json');
    const metrics = response.data;
    const currentWeek = metrics[0];

    const collaboratorsData = [];
    currentWeek.collaborators.forEach((collaborator) => {
      if (collaborator.tasks_count > 0) {
        collaboratorsData.push({
          name: collaborator.name.substr(0, 12),
          total: collaborator.tasks_count,
          pair: collaborator.pair_count,
        });
      }
    });

    const labelsData = [];
    currentWeek.labels.forEach((labels) => {
      if (labels.tasks_count > 0) {
        labelsData.push({
          name: labels.label,
          total: labels.tasks_count,
        });
      }
    });

    metrics.sort((a, b) => moment(a.week_date) - moment(b.week_date));

    const throughputWeek = [];
    metrics.forEach((week) => {
      throughputWeek.push({
        date: moment(week.week_date).format('DD/MM'),
        total: week.total_tasks,
      });
    });

    const cycleTimeWeek = [];
    metrics.forEach((week) => {
      cycleTimeWeek.push({
        date: moment(week.week_date).format('DD/MM'),
        total: this.formatSecondsToHour(week.cycle_time_avg),
      });
    });

    const throughputMonth = throughputWeek.reduce((total, week) => total + week.total, 0);

    this.setState({
      totalTasks: currentWeek.total_tasks, collaboratorsData, labelsData, throughputWeek, throughputMonth, cycleTimeWeek,
    });
  }

  formatSecondsToHour = seconds => moment.duration(seconds, 'seconds').asHours().toFixed();

  render() {
    const {
      currentBreakpoint,
      layouts,
      mounted,
      compactType,
      totalTasks,
      collaboratorsData,
      labelsData,
      throughputWeek,
      cycleTimeWeek,
    } = this.state;

    return (
      <Container>
        <Title>
          <strong>Tasks this week: {totalTasks}</strong>
        </Title>
        <ResponsiveGridLayout
          className="layout"
          {...this.props}
          layouts={layouts}
          onBreakpointChange={this.onBreakpointChange}
          onLayoutChange={this.onLayoutChange}
          measureBeforeMount={false}
          useCSSTransforms={mounted}
          compactType={compactType}
          preventCollision={!compactType}
        >
          <div key="2" className="card">
            <div className="card-header">
              <h3>Throughput</h3>
            </div>
            <div className="card-body">
              <Throughput data={throughputWeek} />
            </div>
          </div>
          <div key="4" className="card">
            <div className="card-header">
              <h3>Tasks by label</h3>
            </div>
            <div className="card-body">
              <Labels data={labelsData} total={totalTasks} />
            </div>
          </div>
          <div key="6" className="card">
            <div className="card-header">
              <h3>Tasks by member</h3>
            </div>
            <div className="card-body">
              <Collaborators data={collaboratorsData} total={totalTasks} />
            </div>
          </div>
          <div
            key="3"
            className="card"
          >
            <div className="card-header">
              <h3>Cycle Time</h3>
            </div>
            <div className="card-body">
              <CycleTime data={cycleTimeWeek} breakpoint={currentBreakpoint} />
            </div>
          </div>
          <div
            key="7"
            className="card"
          >
            <div className="card-header">
              <h3>By Status</h3>
            </div>
            <div className="card-body" style={{ padding: 0 }}>
              <Stat />
            </div>
          </div>
          <div
            key="1"
            className="card"
          >
            <div className="card-header">
              <h3>Tasks In Progress</h3>
            </div>
            <div className="card-body" style={{ overflowY: 'scroll', height: '85%' }}>
              <TasksInProgress />
            </div>
          </div>
          <div
            key="5"
            className="card"
          >
            <div className="card-header">
              <h3>Tasks Summary</h3>
            </div>
            <div className="card-body" style={{ padding: 0 }}>
              <TasksSummary />
            </div>
          </div>
        </ResponsiveGridLayout>
      </Container>
    );
  }
}

export default Dashboard;
