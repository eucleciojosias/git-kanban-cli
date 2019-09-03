#!/usr/bin/env python3.6

import json
import sys
import os
import datetime
from githubsearch import GithubSearch
from githubevents import GithubEvents
from githubcards import GithubCards
import tempfile

CURRENT_ROOT = os.path.abspath(os.path.dirname(__file__))
TMP_ISSUES_EVENTS_FILE = os.path.join(tempfile.gettempdir(), 'issue-events.json')
TMP_METRIC_FILE = os.path.join(tempfile.gettempdir(), 'metrics.json')
TMP_CARDS_SUMMARY_FILE = os.path.join(tempfile.gettempdir(), 'cards_summary.json')
TMP_WIP_CARDS_FILE = os.path.join(tempfile.gettempdir(), 'cards_wip.json')

def pretty_json(response_json):
    return json.dumps(response_json, sort_keys=True, indent=4)

def load_issues_events():
    with open(TMP_ISSUES_EVENTS_FILE, 'r') as read_file:
        issues_events = json.load(read_file)

    return issues_events

def write_metrics_to_file(file_name, data):
    file = open(file_name, 'w+')
    file.write(data)
    file.flush()
    file.close()

def main():
    file_path = os.path.join(CURRENT_ROOT, 'config', 'config.json')
    with open(file_path, 'r') as read_file:
        config = json.load(read_file)

    until_date = datetime.datetime.now()
    if len(sys.argv) > 1:
        until_date = datetime_object = datetime.datetime.strptime(sys.argv[1], '%Y-%m-%d')

    githubEvents = GithubEvents(config)

    githubCards = GithubCards(config, githubEvents)
    githubCards.loadProjectCards()

    githubSearch = GithubSearch(config, until_date, githubEvents)

    githubSearch.issues = githubSearch.getIssuesFromMonth()

    issuesEvents = githubEvents.getIssuesEvents(githubSearch.issues['items'])
    issuesEventsContent = str(pretty_json(issuesEvents))
    write_metrics_to_file(TMP_ISSUES_EVENTS_FILE, issuesEventsContent)

    githubEvents.issuesEvents = load_issues_events()

    result = []
    for week_date in githubSearch.weeks_date.values():
        result.append(githubSearch.getResultByWeek(week_date))

    write_metrics_to_file(TMP_METRIC_FILE, str(pretty_json(result)))

    result = []
    result = githubCards.getSummaryMetric()
    write_metrics_to_file(TMP_CARDS_SUMMARY_FILE, str(pretty_json(result)))

    result = []
    result = githubCards.getCardsWorkInProgress(githubSearch.issues)
    write_metrics_to_file(TMP_WIP_CARDS_FILE, str(pretty_json(result)))


if __name__ == "__main__":
    main()
