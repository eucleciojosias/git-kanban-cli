#!/usr/bin/env python3.6

import json
import sys
import os
import datetime
from githubsearch import GithubSearch
from githubevents import GithubEvents
from githubcards import GithubCards

CURRENT_ROOT = os.path.abspath(os.path.dirname(__file__))

def pretty_json(response_json):
    return json.dumps(response_json, sort_keys=True, indent=4)

def getMockData(filename):
    file_path = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'mock', filename)
    with open(file_path, "r") as read_file:
        response = json.load(read_file)

    return response

def main():
    file_path = os.path.join(CURRENT_ROOT, 'config', 'config.json')
    with open(file_path, "r") as read_file:
        config = json.load(read_file)

    until_date = datetime.datetime.now()
    if len(sys.argv) > 1:
        until_date = datetime_object = datetime.datetime.strptime(sys.argv[1], '%Y-%m-%d')

    githubCards = GithubCards(config)
    githubEvents = GithubEvents(config)
    githubSearch = GithubSearch(config, until_date, githubEvents)

    githubSearch.issues = getMockData('api_search_mock.json')
    githubEvents.issuesEvents = getMockData('issue_events_mock.json')
    githubCards.project_cards = getMockData('project_cards.json')

    result = []
    for week_date in githubSearch.weeks_date.values():
        result.append(githubSearch.getResultByWeek(week_date))

    result.append({
        'cards_summary': githubCards.getSummaryMetric()
    })
    # print(pretty_json(result))
    print(pretty_json(githubCards.getCardsWorkInProgress(githubSearch.issues)))


if __name__ == "__main__":
    main()
