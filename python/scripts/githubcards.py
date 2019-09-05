#!/usr/bin/env python3.6

import os
import sys
import json
import requests

class GithubCards(object):
    config = {}
    project_cols = {}
    project_cards = {}
    githubEvents = None

    def __init__(self, config, githubEvents):
        self.config = config
        self.githubEvents = githubEvents

    def getCardsWorkInProgress(self, issues):
        cards_content = []

        for column, cards in self.project_cards.items():
            if (column not in self.config['sprint_columns'] or column in ['To do', 'Done']):
                continue

            for card in cards:
                issue_number = card['content_url'].split('/', 7)[-1]
                issue_data = list(filter(
                    lambda issue: int(issue_number) == int(issue['number']),
                    issues['items']
                ))
                content = next(iter(issue_data)) if len(issue_data) > 0 else None

                if content == None:
                    content = self.__githubRequest(
                        card['content_url'],
                        'application/vnd.github.symmetra-preview+json'
                    ).json()

                col_id = card['column_url'].split('/', 5)[-1]
                currentColumn = next(iter(list(filter(
                    lambda column: int(col_id) == int(column['id']),
                    self.project_cols
                ))))
                content['current_column'] = currentColumn
                startedDate = self.githubEvents.getDateStart(content['events_url'])
                if startedDate is not None:
                    content['started_date'] = startedDate

                cards_content.append(content)

        return cards_content

    def getSummaryMetric(self):
        summary = []

        for column, cards in self.project_cards.items():
            summary.append({'stage' : column, 'total': len(cards)})

        return summary

    def loadProjectCards(self):
        selected_project_for_metrics = self.__githubRequest(
            '{0}repos/{1}/projects'.format(
                self.config['github']['api_uri'],
                self.config['github']['repository_path']
            ),
            'application/vnd.github.inertia-preview+json'
        ).json()

        selected_project = selected_project_for_metrics[0]
        project_columns = self.__githubRequest(
            selected_project['columns_url'],
            'application/vnd.github.inertia-preview+json'
        ).json()
        self.project_cols = project_columns

        cards = {}
        for column in project_columns:
            cards_by_column = self.__githubRequest(
                column['cards_url'],
                'application/vnd.github.inertia-preview+json'
            ).json()
            cards[column['name']] = cards_by_column

        self.project_cards = cards

    def __githubRequest(self, url, accept):
        headers = {
            'Content-Type': 'application/json',
            'Accept': accept,
            'Authorization': 'token {0}'.format(self.config['github']['api_token'])
        }

        payload = {'per_page': 100}
        response = requests.get(url, params=payload, headers=headers)

        return response
