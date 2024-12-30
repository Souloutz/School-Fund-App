> [!NOTE]
> This repository serves to preserve our group project for Introduction of Software Engineering at RIT.

# U-Fund: School Supplies

An online charity E-store system built in Java 17=> and Angular 17.

## Team

- Howard Kong
- Austin Kunkel
- Ethan Ricker
- Christopher Brooks

## Prerequisites

- Java 17 (Make sure to have correct JAVA_HOME setup in your environment)
- Maven
- Angular 17
- SHA512 npm package. Install with `npm install --save sha512-crypt-ts`

## How to Run

1. Clone the repository and navigate to the root directory.
2. `cd` into `./ufund-api`
3. Execute `mvn compile exec:java`. This will start the REST API backend.
4. Open another terminal window. `cd` into `./ufund-ui/angular-ufund-ui/`
5. Execute `ng serve --open`. This will start the Angular frontend.
6. Open `http://localhost:4200/home` in your browser (if not already opened)

## Known Bugs/Disclaimers
(It may be the case that your implementation is not perfect.)

> [!WARNING]
> UI/UX has not been properly designed and implemented

## How to Test

The Maven build script provides hooks for run unit tests and generate code coverage reports in HTML.

To run tests on all tiers together do this:

1. Execute `mvn clean test jacoco:report`
2. Open in your browser the file at `PROJECT_API_HOME/target/site/jacoco/index.html`

To run tests on a single tier do this:

1. Execute `mvn clean test-compile surefire:test@tier jacoco:report@tier` where `tier` is one of `controller`, `model`, `persistence`
2. Open in your browser the file at `PROJECT_API_HOME/target/site/jacoco/{controller, model, persistence}/index.html`

To run tests on all the tiers in isolation do this:

1. Execute `mvn exec:exec@tests-and-coverage`
2. To view the Controller tier tests open in your browser the file at `PROJECT_API_HOME/target/site/jacoco/model/index.html`
3. To view the Model tier tests open in your browser the file at `PROJECT_API_HOME/target/site/jacoco/model/index.html`
4. To view the Persistence tier tests open in your browser the file at `PROJECT_API_HOME/target/site/jacoco/model/index.html`

*(Consider using `mvn clean verify` to attest you have reached the target threshold for coverage)
  
  
## How to generate the Design documentation PDF

1. Access the `PROJECT_DOCS_HOME/` directory
2. Execute `mvn exec:exec@docs`
3. The generated PDF will be in `PROJECT_DOCS_HOME/` directory

## License

MIT License

See LICENSE for details.