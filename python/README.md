# Git Kanban Cli

## Script to get Github issue metrics

Duplicate de file `python/scripts/config/config.json.cnf` to `python/scripts/config/config.json` with your API token and repository, labels and collaborators that you want to get data

### Generating data

Execute the script to generate data from all issues closed until the date given as param

*P.S.: the current date is default, if no param is given*

```sh
$ python3 main.py 2019-01-31
```

### Generating data with mock
*P.S.: you must have a json files with mock data in your dir `mock/` with a sample of result of the following functions in `main.py`:*

- File: `mock/api_search_mock.json` with result of `githubSearch.getIssuesFromMonth()`
- File: `mock/issue_events_mock.json` with result of `githubEvents.getIssuesEvents(githubSearch.issues)`

```sh
$ python3 mock.py
```
