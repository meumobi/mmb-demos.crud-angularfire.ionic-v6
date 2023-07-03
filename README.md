# mmb-demos.crud-angularfirestore-ionic6

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

## Getting started

### Prerequisites

[Download the installer](https://nodejs.org/) for Node.js 6 or greater.
Install both [Ionic].

```terminal
$ npm install ionic typescript @angular/cli -g
...

$ npm ls -g cordova ionic npm typescript @angular/cli --depth 0
/Users/victor.dias/.nvm/versions/node/v12.6.0/lib
├── @angular/cli@8.3.3
├── cordova@9.0.0
├── ionic@5.2.7
├── npm@6.9.0
└── typescript@3.6.2
```

### Usage

1. Run

- `git clone https://github.com/meumobi/mmb-demos.crud-angularfirestore-ionic4.git crud-angularfirestore-ionic4`.
- `cd crud-angularfirestore-ionic4`
- `npm install`

2.  Create a project at https://firebase.google.com/ and grab your web config:

![](https://firebasestorage.googleapis.com/v0/b/firestarter-96e46.appspot.com/o/project-config.PNG?alt=media&token=5eabb205-7ba2-4fc3-905f-e9547055e754)

3.  Add the config to your Angular environment

#### src/environments/

Update the `environment.prod.ts` and `environment.ts` files.

```typescript
export const environment = {
  production: false,
  firebase: {
    apiKey: 'APIKEY',
    authDomain: 'DEV-APP.firebaseapp.com',
    databaseURL: 'https://DEV-APP.firebaseio.com',
    projectId: 'DEV-APP',
    storageBucket: 'DEV-APP.appspot.com',
    messagingSenderId: '...',
    appId: '...',
  },
};
```

4. Run `ionic serve`
5. Profit. :tada:

## Inspirations

- [javebratt/task-manager](https://egghead.io/lessons/firebase-set-up-a-new-firebase-project-and-connect-it-to-your-angular-application)
- [jasonwatmore/angular-11-crud-example-with-reactive-forms](https://jasonwatmore.com/post/2020/12/15/angular-11-crud-example-with-reactive-forms)
- [webchris/Angular-6-CRUD-Example-Application/](https://wechris.github.io/tips-tutorials/angular/typescript/json/crud/webapp/angular6/2018/07/30/Angular-6-CRUD-Example-Application/)
- [c-sharpcorner/angular-crud-operations](https://www.c-sharpcorner.com/blogs/angular-crud-operations)
