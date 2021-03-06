## Setup

To run the project simply run the following with Docker.
```bash
docker-compose up -d --build web
open http://localhost/
```

Or, you can run things locally.
```bash
docker-compose up -d --build graphql
pushd web; npm install . && npm start; popd
```

To run the graphql server locally.
```bash
pushd graphql; npm install . && npm start; popd
```

## Tests

```bash
pushd graphql; npm install . && npm run test; popd
pushd web; npm run test -- --watchAll=false; popd
```