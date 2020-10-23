## Setup

To run the project simply run the following.
```bash
docker-compose up -d --build web
open http://localhost/
```

Or, you can run things locally.
```bash
docker-compose up -d --build graphql
pushd web; npm start; popd
```

To run the graphql server locally.
```bash
pushd graphql; npm start; popd
```

## Tests

```bash
pushd graphql; npm run test; popd
pushd web; npm run test -- --watchAll=false; popd
```