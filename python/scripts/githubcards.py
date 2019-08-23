#!/usr/bin/env python3.6

import os
import sys
import json
import requests

class GithubCards(object):
    config = {}
    project_cards = {}

    def __init__(self, config):
        self.config = config

    def getCardsWorkInProgress(self, issues):
        cards_content = []

        for column, cards in self.project_cards.items():
            if (column in ['To do', 'Done']):
                continue

            for card in cards:
                issue_number = card['content_url'].split('/', 7)[-1]
                issue_data = list(filter(
                    lambda issue: int(issue_number) == int(issue['number']),
                    issues['items']
                ))
                content = issue_data[0] if len(issue_data) > 0 else None

                if content == None:
                    content = self.__githubRequest(
                        card['content_url'],
                        'application/vnd.github.symmetra-preview+json'
                    ).json()

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

        cards = {}
        for column in project_columns:
            if (column['name'] not in self.config['columns']):
                continue

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

        response = requests.get(url, params={}, headers=headers)

        return response
