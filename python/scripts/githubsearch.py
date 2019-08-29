#!/usr/bin/env python3.6

import requests
import json
import sys
import os
from functools import reduce
import datetime

CYCLE_TIME_COLUMNS = ['To do', 'In progress', 'Review', 'Testing']

class GithubSearch(object):
    config = {}
    issues = {}
    weeks_date = {}
    githubEvents = None

    def __init__(self, config, until_date, githubEvents):
        self.config = config
        self.weeks_date = self.__getLastFourWeeksByDate(until_date)
        self.githubEvents = githubEvents

    def __githubRequest(self, endpoint, payload):
        uri = self.config['github']['api_uri'] + endpoint
        headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.symmetra-preview+json',
            'Authorization': 'token {0}'.format(self.config['github']['api_token'])
        }
        response = requests.get(uri, params=payload, headers=headers)
        return response

    def getIssuesFromMonth(self):
        payload = {
            'q': 'repo:{1} is:issue is:closed closed:>={0}'.format(
                self.weeks_date['last_week3'].strftime('%Y-%m-%d'),
                self.config['github']['repository_path']
            ),
            'per_page': 100
        }
        response = self.__githubRequest('search/issues', payload)

        return response.json()

    def __getLastFourWeeksByDate(self, until_date):
        n_of_days_til_sunday = (until_date.weekday() + 1) % 7
        this_week = until_date - datetime.timedelta(days=n_of_days_til_sunday)
        this_week = this_week.replace(hour=0, minute=0, second=0, microsecond=0)

        return {
            'this_week': this_week,
            'last_week1': this_week - datetime.timedelta(days=7),
            'last_week2': this_week - datetime.timedelta(days=14),
            'last_week3': this_week - datetime.timedelta(days=21)
        }

    def __getIssuesByLabel(self, filter_label, issues):
        filtered_items = list(filter(
            lambda item: filter_label in [label['name'] for label in item['labels']],
            issues
        ))

        return filtered_items

    def __getIssuesByAssignee(self, filter_assignee, issues):
        filtered_items = list(filter(
            lambda item: filter_assignee in [assignee['login'] for assignee in item['assignees']],
            issues
        ))

        pair_count = reduce(
            lambda count, n_assignees: count + (1 if n_assignees > 1 else 0),
            [len(item['assignees']) for item in filtered_items],
            0
        )

        return {
            'items': filtered_items,
            'pair_count': pair_count
        }

    def __filterIssuesByDate(self, issue, date):
        closed_date = issue['closed_at']
        closed_date = datetime.datetime.strptime(closed_date[:-10], '%Y-%m-%d')

        date_end = date + datetime.timedelta(days=6)
        return closed_date >= date and closed_date <= date_end

    def calcCycleTimeAvg(self, issues, cardsCyclesTimes):
        cycleTimeTotal = 0
        leadTimeTotal = 0
        cyclesByColumn = {}

        for issue in issues:
            issueCycles = cardsCyclesTimes[issue['id']]
            for cycle in issueCycles:
                if cycle['column'] not in cyclesByColumn:
                    cyclesByColumn[cycle['column']] = 0
                cyclesByColumn[cycle['column']] += cycle['duration']

                if cycle['column'] in CYCLE_TIME_COLUMNS:
                    cycleTimeTotal += cycle['duration']

                leadTimeTotal += cycle['duration']

        cyclesByColumnAvg = []
        for column, duration in cyclesByColumn.items():
            cyclesByColumnAvg.append({
                'column': column,
                'duration': duration / len(issues)
            })

        return {
            'cycle_time_total_avg': cycleTimeTotal / len(issues),
            'lead_time_total_avg': leadTimeTotal / len(issues),
            'cycle_by_column_avg': cyclesByColumnAvg
        }

    def getResultByWeek(self, since_date):
        filtered_issues = list(filter(
            lambda issue: self.__filterIssuesByDate(issue, since_date),
            self.issues['items']
        ))

        cyclesTimesAvg = {}
        if filtered_issues:
            cardsCyclesTimes = self.githubEvents.getCardsCyclesTimes(filtered_issues)
            cyclesTimesAvg = self.calcCycleTimeAvg(filtered_issues, cardsCyclesTimes)

        result = {
            'week_date': since_date.strftime('%Y-%m-%d'),
            'total_tasks': len(filtered_issues),
            'collaborators': [],
            'labels': []
        }

        data_result = {**result, **cyclesTimesAvg}

        for assignee in self.config['collaborators']:
            name = assignee['name']
            if 'company' in assignee.keys():
                company = ' ({0})'.format(assignee['company'])
                name = name + company

            response = self.__getIssuesByAssignee(assignee['username'], filtered_issues)

            data_result['collaborators'].append({
                'name': name,
                'tasks_count': len(response['items']),
                'pair_count': response['pair_count']
            })

        for label in self.config['labels']:
            items = self.__getIssuesByLabel(label, filtered_issues)
            data_result['labels'].append({
                'label': label,
                'tasks_count': len(items)
            })


        return data_result
