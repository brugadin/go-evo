# Go Evo

I've chosen to create a game based on Go (game) to explore clean architectures in Vue.js. This repo's focus is to create a fun game loop with a robust software architecture to allow changes as I iterate over what makes the game fun.

A game of Go can be played on a browser by two human players; in the successive iterations, I will add new rules and features to make this game unique.

### How To Play
See [Wikipedia - Basic Rules](https://en.wikipedia.org/wiki/Go_(game)#Basic_rules).

## High level tech components
- Using principles of SOLID, DRY and Clean Code
- Vuex for state management
- element-plus as base style
- Vue 3 composition API
- Linting rules (ESLINT AirBnB)
- Unit testing (Jest)
- Azure Static Web Apps for hosting

## Run the app locally
### Install the required packages
```
npm install 
```

### Start the app locally
```
npm run serve
```
### Run unit tests 
```
npm run test:unit
```

### Compiles and minifies for production
```
npm run build
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```
