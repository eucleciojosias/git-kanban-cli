#!/usr/bin/env python3.6

import os
import sys
import json
import requests

class GithubCards(object):
    config = {}
    cards_by_column = {}

    def __init__(self, config):
        self.config = config
        self.cards_by_column = self.__getCardsByColunm()

    def getCardsWorkInProgress(self):
        card_content = []

        for column, cards in self.cards_by_column.items():
            if (column in ['To do', 'Done']):
                continue

            for card in cards:
                content = self.__githubRequest(
                    card['content_url'],
                    'application/vnd.github.symmetra-preview+json'
                ).json()
                card_content.append(content)

        return card_content

    def getSummaryMetric(self):
        summary = []

        for column, cards in self.cards_by_column.items():
            summary.append({'stage' : column, 'total': len(cards)})

        return summary

    def __getCardsByColunm(self):
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

        return cards

    def __githubRequest(self, url, accept):
        headers = {
            'Content-Type': 'application/json',
            'Accept': accept,
            'Authorization': 'token {0}'.format(self.config['github']['api_token'])
        }

        response = requests.get(url, params={}, headers=headers)

        return response
