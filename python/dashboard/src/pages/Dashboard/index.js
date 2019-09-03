import React, { Component } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import moment from 'moment';

import axios from 'axios';
import { Container, Title } from './styles';
import Labels from '../../components/Labels';
import Collaborators from '../../components/Collaborators';
import Throughput from '../../components/Throughput';
import CycleTime from '../../components/CycleTime';
import CycleTimeByStage from '../../components/CycleTimeByStage';
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

  stageCols = ['In progress', 'Review', 'Testing'];

  state = {
    metrics: [],
    collaboratorsData: [],
    throughputWeek: [],
    cycleTimeWeek: [],
    cardsSummary: [],
    cardsWip: [],
    cycleTimeAvgByStage: [],
    throughputMonth: 0,
    labelsData: [],
    currentBreakpoint: 'lg',
    compactType: 'vertical',
    mounted: false,
    layouts: {
      lg:
        [
          {
            w: 5, h: 9, x: 0, y: 0, i: 'tasks_wip',
          },
          {
            w: 3, h: 9, x: 5, y: 0, i: 'throughput',
          },
          {
            w: 4, h: 9, x: 8, y: 0, i: 'cycle_time',
          },
          {
            w: 4, h: 9, x: 0, y: 1, i: 'labels',
          },
          {
            w: 3, h: 12, x: 4, y: 1, i: 'tasks_summary',
          },
          {
            w: 5, h: 9, x: 7, y: 1, i: 'collaborators',
          },
          {
            w: 4, h: 6, x: 0, y: 2, i: 'by_stage',
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
    const metricsJson = await axios.get('http://agile.compufacil.com.br/metrics.json');
    const metrics = metricsJson.data;

    const cardsJson = await axios.get('http://agile.compufacil.com.br/cards_wip.json');
    const cardsWip = cardsJson.data;

    const summaryJson = await axios.get('http://agile.compufacil.com.br/cards_summary.json');
    const cardsSummary = summaryJson.data;

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

    let throughputWeek = [];
    let cycleTimeWeek = [];

    metrics.forEach((week) => {
      throughputWeek.push({
        date: moment(week.week_date).format('DD/MM'),
        total: week.total_tasks,
      });

      cycleTimeWeek.push({
        date: moment(week.week_date).format('DD/MM'),
        total: this.formatSecondsToHour(week.cycle_time_total_avg),
      });
    });

    const cycleTimeAvgByStage = metrics[1].cycle_by_column_avg.filter((item) => {
      return this.stageCols.includes(item.column)
    });

    const throughputMonth = throughputWeek.reduce((total, week) => total + week.total, 0);

    this.setState({
      totalTasks: currentWeek.total_tasks,
      collaboratorsData,
      labelsData,
      throughputWeek,
      throughputMonth,
      cycleTimeWeek,
      cardsSummary,
      cycleTimeAvgByStage,
      cardsWip
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
      cardsSummary,
      cycleTimeAvgByStage,
      cardsWip
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
          <div key="throughput" className="card">
            <div className="card-header">
              <h3>Throughput</h3>
            </div>
            <div className="card-body">
              <Throughput data={throughputWeek} />
            </div>
          </div>
          <div key="labels" className="card">
            <div className="card-header">
              <h3>Tasks by label</h3>
            </div>
            <div className="card-body">
              <Labels data={labelsData} total={totalTasks} />
            </div>
          </div>
          <div key="collaborators" className="card">
            <div className="card-header">
              <h3>Tasks by member</h3>
            </div>
            <div className="card-body">
              <Collaborators data={collaboratorsData} total={totalTasks} />
            </div>
          </div>
          <div
            key="cycle_time"
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
            key="by_stage"
            className="card"
          >
            <div className="card-header">
              <h3>Average time by stage (last week)</h3>
            </div>
            <div className="card-body" style={{ padding: 0 }}>
              <CycleTimeByStage data={cycleTimeAvgByStage} />
            </div>
          </div>
          <div
            key="tasks_wip"
            className="card"
          >
            <div className="card-header">
              <h3>Tasks In Progress</h3>
            </div>
            <div className="card-body" style={{ overflowY: 'scroll', height: '85%' }}>
              <TasksInProgress data={cardsWip} />
            </div>
          </div>
          <div
            key="tasks_summary"
            className="card"
          >
            <div className="card-header">
              <h3>Tasks Summary</h3>
            </div>
            <div className="card-body" style={{ padding: 0 }}>
              <TasksSummary data={cardsSummary} />
            </div>
          </div>
        </ResponsiveGridLayout>
      </Container>
    );
  }
}

export default Dashboard;
