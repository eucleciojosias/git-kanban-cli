#!/usr/bin/env python3.6

import requests
import json
import sys
import os
from functools import reduce

CURRENT_ROOT = os.path.abspath(os.path.dirname(__file__))

class GithubSearch(object):
    api_uri = 'https://api.github.com/search/'
    config = {}
    all_issues = {}

    def __init__(self, config, since_date):
        self.config = config
        self.all_issues = self.getIssuesFromDate(since_date)

    def githubRequest(self, endpoint, payload):
        uri = self.api_uri + endpoint
        headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/vnd.github.symmetra-preview+json',
            'Authorization': 'token {0}'.format(self.config['api_token'])
        }
        response = requests.get(uri, params=payload, headers=headers)
        return response

    def getIssuesFromDate(self, since_date):
        payload = {
            'q': 'repo:{1} is:issue is:closed closed:>={0}'.format(since_date, self.config['repository_path'])
        }
        response = self.githubRequest('issues', payload)

        return response.json()

    def getIssuesMock(self, since_date):
        file_path = os.path.join(CURRENT_ROOT, 'test', 'api_request_mock.json')
        with open(file_path, "r") as read_file:
            response = json.load(read_file)

        return response

    def getIssuesByLabel(self, filter_label):
        filtered_items = list(filter(
            lambda item: filter_label in [label['name'] for label in item['labels']],
            self.all_issues['items']
        ))

        return filtered_items

    def pretty_json(self, response_json):
        return json.dumps(response_json, sort_keys=True, indent=4)

    def getIssuesByAssignee(self, filter_assignee):
        filtered_items = list(filter(
            lambda item: filter_assignee in [assignee['login'] for assignee in item['assignees']],
            self.all_issues['items']
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


def main():
    file_path = os.path.join(CURRENT_ROOT, 'config', 'config.json')
    with open(file_path, "r") as read_file:
        config = json.load(read_file)

    since_date=sys.argv[1]
    githubSearch = GithubSearch(config['github'], since_date)

    data_result = {
        'total_tasks': githubSearch.all_issues['total_count'],
        'collaborators': [],
        'labels': []
    }

    for assignee in config['collaborators']:
        name = assignee['name']
        if 'company' in assignee.keys():
            company = ' ({0})'.format(assignee['company'])
            name = name + company

        response = githubSearch.getIssuesByAssignee(assignee['username'])

        data_result['collaborators'].append({
            'name': name,
            'tasks_count': len(response['items']),
            'pair_count': response['pair_count']
        })


    for label in config['labels']:
        items = githubSearch.getIssuesByLabel(label)
        data_result['labels'].append({
            'label': label,
            'tasks_count': len(items)
        })

    print(githubSearch.pretty_json(data_result))

if __name__ == "__main__":
    main()
