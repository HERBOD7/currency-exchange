<p align="center">
  <img src="https://iili.io/DqDx6J.png" />
</p>

# Currency Exchange

The Currency Exchange web application, converts currencies and stores conversion history.

## Table of Contents

- [Installation](#installation)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [API Reference](#api-reference)
- [Features](#features)
- [Optimizations](#optimizations)

## Installation

Run the command to install all dependencies:

```bash
yarn install
```

and run the below command to start the project on development mode:

```bash
yarn start
```

You can run the docker command on your machine if you have Docker installed:

```bash
docker-compose up
```

Open [http://localhost:3000](http://localhost:3000) to view it in a browser.

- The page will reload if you make edits.
- You will also see any lint errors in the console.

## Tech Stack

**Client:** React, Sass, React Sparkline

## Contributing

#### structure:

It has `Modular` structure (dividing a program's functions into independent parts) that allows it to:

- easy to follow and read code
- easy to debug and there are fewer places where bugs appear
- easy to refactor
- easy to manage and maintain
- etc ...
  Each module includes its own components, routes, styles, and pages that are used in the module pages.
  As a project layout, all pages render into the `DefaultLayout`.
  The main components directory contains shared components that can be used throughout the project.

#### style:

The project used BEM methodology to organize and understand styles easier for specific styles and used Atomic methodology to break down shared styles into pieces.

#### git:

Feature Branch Workflow used to avoid breaking code in main branch and make possible to create pull request and discus about changes. regarding commit messages, I used the [commit linter](https://commitlint.js.org/#/) to help clarify them.

## API Reference

The API documentation is available on [exchangerate](https://exchangerate.host/#/docs), but the following APIs are used in the project:

#### Get conversion rate

```http
  GET /convert
```

| Parameter | Type     | Description                                 |
| :-------- | :------- | :------------------------------------------ |
| `from`    | `string` | **Required**. currency like to convert from |
| `to`      | `string` | **Required**. currecnt like to convert to   |
| `amount`  | `number` | **Optional**. the amount to be convert      |

#### Get conversion history

```http
  GET /timeseries
```

| Parameter    | Type     | Description                                               |
| :----------- | :------- | :-------------------------------------------------------- |
| `start_date` | `string` | **Required**. the start date of your preferred timeframe. |
| `end_date`   | `string` | **Required**. the end date of your preferred timeframe.   |
| `base`       | `string` | **Optional**. base currency.                              |
| `symbols`    | `string` | **Optional**. currencies list to limit output currency.   |

## Features

- Cryptocurrencies changes rate in 24
- Cryptocurrencies Trading view chart
- Light/dark mode toggle
- Autocomplete currencies input
- Toast error

## Optimizations

- Mobile view
- Form validation
- Create inputs and buttons components
