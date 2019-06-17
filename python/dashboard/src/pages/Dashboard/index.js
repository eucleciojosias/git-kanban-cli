import React, { Component, Fragment } from 'react';
import { Progress } from 'semantic-ui-react'
import metrics from '../../data/metrics.json';

import { Container, Content, Charts } from './styles';
import SideBar from '../../components/SideBar';
import Collaborators from '../../components/Collaborators';
import Categories from '../../components/Categories';

class Dashboard extends Component {
  state = {
    githubMetrics: {},
    dataCollaborators: {},
    dataCategories: {},
    totalTasks: '',
    colors: [
      '195, 41, 41',
      '32, 123, 32',
      '229, 99, 51',
      '244, 210, 29',
      '139, 69, 19',
      '131, 150, 99',
      '142, 95, 86',
      '0, 0, 205',
      '153, 50, 204',
      '225, 198, 53'
      ]
  }

  componentDidMount() {
    this.setState({ githubMetrics: metrics }, () => {
      setTimeout(() => {
        this.updateChart();
      }, 600)
    })
  }

  updateChart = async () => {
    const tasksArray = await this.state.githubMetrics['collaborators'].map((collaborator, index) => {
      let arrayValues = [0,0,0,0,0,0,0];
      arrayValues[index] = collaborator.tasks_count;
      return {
        label: `${collaborator.name} - tasks` ,
        backgroundColor: 'rgb(58, 61, 186, 0.4)',
        borderColor: 'rgba(58, 61, 186,1)',
        hoverBackgroundColor: 'rgba(58, 61, 186,0.6)',
        hoverBorderColor: 'rgba(58, 61, 186,1)',
        data: arrayValues,
        stack: 1
      }
    })
    const pairArray = await this.state.githubMetrics['collaborators'].map((collaborator,index) => {
      let arrayValues = [0,0,0,0,0,0,0];
      arrayValues[index] = collaborator.pair_count;
      return {
        label: `${collaborator.name} - pair`,
        backgroundColor: 'rgb(32, 123, 32, 0.4)',
        borderColor: 'rgba(32, 123, 32,1)',
        hoverBackgroundColor: 'rgba(32, 123, 32,0.6)',
        hoverBorderColor: 'rgba(32, 123, 32,1)',
        data: arrayValues,
        stack: 2
      }
    })

    const arrayCollaborators = this.arrayInterpolation(tasksArray, pairArray)

    const dataResultCollaborators = {
      labels: ['Euclecio', 'Harold', 'Vitor', 'Filipe', 'Ismael', 'Anderson', 'Felipe F.'],
      datasets: arrayCollaborators,
    }

    this.setState({ dataCollaborators: dataResultCollaborators })

    const { colors } = this.state;
    const categoriesArray = await this.state.githubMetrics['labels'].map((label, index) => {
      let arrayValues = [0,0,0,0,0,0,0,0,0,0];
      arrayValues[index] = label.tasks_count;
      return {
        label: label.label,
        backgroundColor: `rgb(${colors[index]}, 0.4)`,
        borderColor: `rgb(${colors[index]})`,
        hoverBackgroundColor: `rgb(${colors[index]}, 0.6)`,
        hoverBorderColor: `rgb(${colors[index]})`,
        data: arrayValues
      }
    })

    const dataResultCategories = {
      labels: ['Backend', 'DevOps', 'Frontend', 'Mobile', 'UX', 'Reseller Demand', 'Bug', 'Improvement', 'Maintenance', 'New feature'],
      datasets: categoriesArray,
    }
    this.setState({ dataCategories: dataResultCategories})
    this.setState({ totalTasks: this.state.githubMetrics['total_tasks'], percent: this.state.githubMetrics['percent'] })
  }

  arrayInterpolation = (data, data1) => {
    var limit = data.length < data1.length ? data1.length : data.length;
    var arrayInterpolated = [];

    for(var i = 0; i < limit; i++) {
      if(data.length > 0) arrayInterpolated.push(data.shift());
      if(data1.length > 0) arrayInterpolated.push(data1.shift());
    }

    return arrayInterpolated;
  }

  render() {
    const {dataCollaborators, dataCategories, totalTasks, percent } = this.state;
    return (
      <Fragment>
        <Container>
          <SideBar />
          <Content>
            <h1>Total tasks: {totalTasks}</h1>
            <Charts>
              <Collaborators data={dataCollaborators}/>
              <Categories data={dataCategories}/>
            </Charts>
            <div style={{ paddingLeft: 80, paddingRight: 80 }}>
              <Progress percent={percent} indicating progress size="large" />
            </div>
          </Content>
        </Container>
      </Fragment>
    )
  }
}

export default Dashboard;


