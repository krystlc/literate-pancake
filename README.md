# ToDo App (Vue 3)

This document provides instructions on how to set up the development environment and build the application.

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (https://nodejs.org)
- Yarn (https://yarnpkg.com)

### Installation

1. Clone this repository to your local machine.
2. In the project directory, run the following command to install the dependencies:

```
yarn
```

## Development

To start the development server, run the following command:

```
yarn dev
```

This will launch the application in development mode. Open your browser and navigate to http://localhost:5173 to view the application.

## Building the Application

To build the compiled application, run the following command:

```
yarn build
```

This will create an optimized production-ready build in the dist directory.

## _Actual_ TODOs

Please find below a list of pending tasks:

1. Rubik Font: Check whether the Rubik font is intended to be implemented as referenced in the Figma design or if it's an oversight.

2. Codegen: Utilize code generation to auto-generate interfaces for objects coming from the backend. This will improve type safety and maintainability.

3. API Composable: Investigate and refactor shared untested code. Consider exploring third-party packages or abstracting common functionality to improve code quality and maintainability.

## Contributing

Contributions are welcome! If you find any issues or want to suggest improvements, please open an issue or create a pull request.

## License

This project is licensed under the MIT License.
