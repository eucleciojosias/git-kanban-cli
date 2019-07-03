#!/usr/bin/env python3.6

import json
import sys
import os
import datetime
from githubsearch import GithubSearch
from githubevents import GithubEvents
import tempfile

CURRENT_ROOT = os.path.abspath(os.path.dirname(__file__))
TMP_ISSUES_EVENTS_FILE = os.path.join(tempfile.gettempdir(), 'issue-events.json')

def pretty_json(response_json):
    return json.dumps(response_json, sort_keys=True, indent=4)

def load_issues_events():
    with open(TMP_ISSUES_EVENTS_FILE, "r") as read_file:
        issues_events = json.load(read_file)

    return issues_events

def main():
    file_path = os.path.join(CURRENT_ROOT, 'config', 'config.json')
    with open(file_path, "r") as read_file:
        config = json.load(read_file)

    until_date = datetime.datetime.now()
    if len(sys.argv) > 1:
        until_date = datetime_object = datetime.datetime.strptime(sys.argv[1], '%Y-%m-%d')

    githubEvents = GithubEvents(config)
    githubSearch = GithubSearch(config, until_date, githubEvents)

    githubSearch.issues = githubSearch.getIssuesFromMonth()

    issuesEvents = githubEvents.getIssuesEvents(githubSearch.issues['items'])
    issuesEventsContent = str(pretty_json(issuesEvents))

    file = open(TMP_ISSUES_EVENTS_FILE, 'w+')
    file.write(issuesEventsContent)
    file.flush()
    file.close()

    githubEvents.issuesEvents = load_issues_events()

    result = []
    for week_date in githubSearch.weeks_date.values():
        result.append(githubSearch.getResultByWeek(week_date))

    print(pretty_json(result))


if __name__ == "__main__":
    main()
