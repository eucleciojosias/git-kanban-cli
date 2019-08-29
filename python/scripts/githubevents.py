#!/usr/bin/env python3.6

import requests
import json
import sys
import os
from functools import reduce
import datetime

class GithubEvents(object):
    config = {}
    issuesEvents = []

    def __init__(self, config):
        self.config = config

    def __getIssueEvents(self, url):
        headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.starfox-preview+json',
            'Authorization': 'token {0}'.format(self.config['github']['api_token'])
        }
        payload = {}
        response = requests.get(url, params=payload, headers=headers)

        return response.json()

    def __calcTimeInColumns(self, events):
        moveCardEvents = list(filter(
            lambda event: 'moved_columns_in_project' == event['event'] or 'added_to_project' == event['event'],
            events
        ))

        cyclesTimes = []
        for event in moveCardEvents:
            if 'previous_column_name' not in event['project_card']:
                continue

            startCol = event['project_card']['previous_column_name']
            startEvent = next(iter(list(filter(
                lambda event: event['project_card']['column_name'] == startCol,
                moveCardEvents
            ))))

            lastColTime = datetime.datetime.strptime(startEvent['created_at'], '%Y-%m-%dT%H:%M:%SZ')
            moveTimeToThisCol = datetime.datetime.strptime(event['created_at'], '%Y-%m-%dT%H:%M:%SZ')

            duration = moveTimeToThisCol - lastColTime
            element = {
                'column': startCol,
                'end_column': event['project_card']['column_name'],
                'duration': duration.total_seconds(),
            }

            colElement = list(filter(
                lambda cycle: startCol == cycle['column'],
                cyclesTimes
            ))
            if not colElement:
                cyclesTimes.append(element)
                continue

            element = next(iter(colElement))
            index = cyclesTimes.index(element)
            cyclesTimes[index] = element

        return cyclesTimes

    def getIssuesEvents(self, issues):
        eventsList = {}
        for issue in issues:
            events = self.__getIssueEvents(issue['events_url'])
            item = { issue['id']: events }
            eventsList.update(item)

        return eventsList

    def getCardsCyclesTimes(self, issues):
        cardsCyclesTimes = {}
        for issue in issues:
            events = self.issuesEvents[str(issue['id'])]
            issueCyclesTimes = self.__calcTimeInColumns(events)
            item = { issue['id']: issueCyclesTimes }
            cardsCyclesTimes.update(item)

        return cardsCyclesTimes
