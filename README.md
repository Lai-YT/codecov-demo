[![codecov](https://codecov.io/gh/Lai-YT/codecov-demo/branch/main/graph/badge.svg?token=Q9JKCAL39Z)](https://codecov.io/gh/Lai-YT/codecov-demo)

# codecov-demo: calculator

A server-side calculator. The calculator calls an API to process any calculations and returns back the computed result.

This repository begins from the [codecov tutorial](https://docs.codecov.com/docs/codecov-tutorial) to practice the features and functionalities of Codecov, but is now refactored a little bit more to make it look nicer and to have higher test coverage.

## How to start?

The calculator is built using Python3 (*[Flask](https://flask.palletsprojects.com/en/2.2.x/)*) on the backend and JavaScript (*[Express.js](https://expressjs.com/)*) on the frontend.

### backend

*The following commands should be executed in the `api/` directory.*

1. Install packages. You are recommended to use a [Python virtual environment](https://docs.python.org/3/tutorial/venv.html)

```
pip install -r requirements.txt
```

2. Start the calculation service. It will be listening at port 5000 on the localhost.

```
flask run
```

### frontend

*The following commands should be executed in the `web/` directory.*

1. Install packages.

```
npm ci
```

2. Start the server.

```
node server.js
```

## How to test?

### backend

*The following commands should be executed in the `api/` directory.*

```
pytest --cov
```

### frontend

*The following commands should be executed in the `web/` directory.*

```
npm run test
```

## Contributions

Any forms of contributions are welcomed, please open an issue or pull request if you have any suggestions.
