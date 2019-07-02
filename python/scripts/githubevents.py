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

    def getIssueEvents(self, url):
        headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.starfox-preview+json',
            'Authorization': 'token {0}'.format(self.config['github']['api_token'])
        }
        payload = {}
        response = requests.get(url, params=payload, headers=headers)

        return response.json()

    def cycleTimeInSec(self, events):
        move_card_events = list(filter(
            lambda event: 'moved_columns_in_project' == event['event'],
            events
        ))

        start_card = 'In progress'
        start_ev = list(filter(
            lambda event: start_card == event['project_card']['column_name'],
            move_card_events
        ))
        if not start_ev:
            start_card = 'Review'
            start_ev = list(filter(
                lambda event: start_card == event['project_card']['column_name'],
                move_card_events
            ))
        if not start_ev:
            start_card = 'Testing'
            start_ev = list(filter(
                lambda event: start_card == event['project_card']['column_name'],
                move_card_events
            ))

        start = datetime.datetime.now()
        done = datetime.datetime.now()

        for event in move_card_events:
            if event['project_card']['column_name'] == start_card:
                start = datetime.datetime.strptime(event['created_at'], '%Y-%m-%dT%H:%M:%SZ')
            elif event['project_card']['column_name'] == 'Done':
                done = datetime.datetime.strptime(event['created_at'], '%Y-%m-%dT%H:%M:%SZ')

        duration = done - start

        return duration.total_seconds()

    def getIssuesEvents(self, issues):
        eventsList = {}
        for issue in issues:
            events = self.getIssueEvents(issue['events_url'])
            item = {issue['id']: events }
            eventsList.update(item)

        return eventsList

    def getCycleTimeAvg(self, issues):
        if not issues:
            return 0

        cycleTimeTotal = 0
        eventsList = {}
        for issue in issues:
            events = self.issuesEvents[str(issue['id'])]

            issueCycleTime = self.cycleTimeInSec(events)
            cycleTimeTotal = cycleTimeTotal + issueCycleTime

        return cycleTimeTotal / len(issues)
