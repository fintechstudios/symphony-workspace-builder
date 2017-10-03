# Symphony Workspace Builder
A simple dashboard to launch modularized apps into distinct Symphony modules.

## Rationale
FinTech Studios believes the future of app interoperability in modern workflows is rooted in the ability of apps to "widgetize", exposing component pieces for individual consumption. In order to make this easier for both developers to build upon and consumers use, we build our Symphony Workspace Builder. This makes it easy for developers to expose their widgets (and third party widgets) to end users in a way that makes it simple to build complex inter-app workspaces.

## Setup
`index.js` gives simple abstractions to the Symphony API to do some of the Symphony communication for you,
but usage requires a little configuration.

### Include the service in `controller.js`
1. Before registering your application, register the service. The default name of the service is
   APP_ID:wb, where APP_ID is the unique id of your application (this can be configured). 
   The following line will usually do the trick: `SYMPHONY.services.register(APP_ID + ':wb');`
2. Include the service name (APP_ID:wb) in the `servicesSent` array of your app registration
3. Make sure that you include `applications-nav` and `modules` in `servicesWanted`
   
Example app registration:
```js
SYMPHONY.application.register(APP_ID, ['modules', 'applications-nav'], [APP_ID + ':wb'])
  .then(...);
```
 
### Include the service in your `app.js`
```js
import SymphonyWorkspaceBuilder from 'symphony-workspace-builder';

const APP_ID = '';
let wb;

// Symphony API already loaded to page
SYMPHONY.remote.hello()
    .then(connectionData => {
        ...
        wb = new SymphonyWorkspaceBuilder(APP_ID, SYMPHONY, {
          title: 'Workspace Builder',
          url: 'URL_TO_YOUR_BUILDER',
          serviceName: undefined // optionally change the service name if you changed it in your controller 
        });
        return SYMPHONY.application.connect(
          APP_ID, 
          ['modules', 'applications-nav'], 
          [workspaceBuilder.serviceName]
        );
    })
    .then(() => wb.init());
```

## Usage
`workspace-builder.controller.js` and `template.js` are provided as example implementations in AngularJS.
The gist is to generate unique URLs (ideally gathered from some API endpoint) 
for each of your modularized components, and pass that to `workspaceBuilder.show({url, title})`. 
