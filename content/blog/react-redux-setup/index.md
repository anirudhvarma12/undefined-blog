---
title: 'Dev Diary: My React, Redux & React Router Setup.'
date: '2017-08-23'
---

_Note: This post is not meant to be about the inner workings of React, Redux or
React-Router. This is a post detailing my experiences & understanding in
creating an app using all 3 libraries, the problems I faced while doing it & how
I got around them._

Some background info on me, professionally I am a backend developer who
primarily works with Java. I have worked with [Apache
Wicket](https://wicket.apache.org/) for a long time. For those who don’t know
Wicket is a web framework for Java with components at its center. So when I
wanted to learn a JavaScript frontend library/framework, I chose React as it was
similar to Wicket in terms of creating components and composing them to create
views while being lightweight enough that it was easy to learn in isolation.

## V1: Just React

To start learning React, I made [Snooplay](http://snooplay.surge.sh/): A media
player for Reddit. The first version of Snooplay was very simple, it just used
React, no routing & no state management. You can checkout the code for v1
[here](https://github.com/anirudhvarma12/snooplay/tree/v1).

## V2: React meets Router & Redux

In order to extend my knowledge to Redux, Middlewares & React Router, I decided
to extend Snooplay with the following goals —

- The state for the entire app should be stored & managed via
  [Redux](http://redux.js.org/).
- The user should be able to change subreddits by altering the URL. eg:
  snooplay/r/movies. Routing to be handled by
  [React-Router.](https://github.com/ReactTraining/react-router)
- Create the boiler plate using
  [create-react-app](https://github.com/facebookincubator/create-react-app)
- All styling should be done via SASS/SCSS and compilation of the same has to be
  done via Webpack.

Now that we know, what our goals are, lets get started. Here is some information
on important packages —

- React: v15.6.1
- Redux: v3.7.2
- React-Redux: v5.0.6 (Package that helps connect react components with redux
  stores)
- React-Router: v4.1.2
- Redux-thunk: v2.2.0

You can checkout the full [package.json file
here](https://github.com/anirudhvarma12/snooplay/blob/master/package.json).

### Step 1: Create the app boiler plate.

We will create the structure of the app by using Facebook’s create-react-app
(CRA) tool. After your install CRA, go to your terminal and type the following
command —

    create-react-app <app_name>

create-react-app is a utility that creates a pre-configured project with Webpack
& Babel and other tools. This was made to get over the configuration issues that
people usually face while wiring up different tools together.

This process can take some time, once it finishes you can `cd` into the
directory and type `npm start` This would open your browser and you should be
able to see the React App.

The entry point for the app is `index.js` which then renders the `<App />`
component from `app.js` .

### Step 2: Installing the libraries

Now we need to install our essential libraries i.e. React-Router & Redux.

    npm install --save redux react-router

Both React-Router & Redux are very modular libraries. For example, React-Router
can also be used in React-Native projects, whereas Redux has no direct
connection with React. To make it easy to use these libraries we will install 2
more libs.

- react-router-dom: Contains react components to be used in web projects.
- react-redux: Helps connect our components with redux, thus making it easy to
  read & change state from React components.

      npm install --save react-router-dom react-redux

### Step 3: SCSS Integration

This step was very tricky, with many resources on the web. Some worked with
Webpack 1 & not with Webpack 2 while some refused to work at all.

    npm install --save-dev css-loader extract-text-webpack-plugin node-sass sass-loader

Before we update our webpack configs, we need to *eject *our project. Eject
basically means that we will now take care of the webpack & other config instead
of just working with what create-react-app gives us. To eject the project just
run the following command —

    npm run eject

After this process is completed, you will find a config folder which would
contain 2 webpack files, one is _webpack.config.dev.js _& other is
*webpack.config.prod.js. *As you might have guessed, the dev file your
devlopment profile (used when you do `npm start` ) and the prod file is your
production profile that performs optimizations before creating a deployment
bundle (run `npm run build` )

Now in our `webpack.config.dev.js` we will configure the
`extract-text-webpack-plugin` to handle the scss files.

**3.1) Get the extract — text plugin in the file.**

    const ExtractTextPlugin = require('extract-text-webpack-plugin');

Also declare the CSS file name -

    const cssFilename = 'static/css/[name].[contenthash:8].css';

**3.2) Configure rules**

In the `module.exports` object, find the `module` property. In the `rules` array
you need to find the following section —

    // "oneOf" will traverse all following loaders until one will                               // match the requirements. When no loader matches it will fall                               // back to the "file" loader at the end of the loader list.                               oneOf: [
    ....
    ]

Here add the config to process `scss` files using appropriate loaders.

    {
    test: /\.scss$/,
    use: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])                                 },

_Note: Several examples on the internet use the loaders syntax, but that is
deprecated._

Also, you should comment out the `css` loader that is pre-configured in the
file.

### Step 4: Redux & Redux-Thunk

Before going forward here, I would like to mention 2 resources that helped me
greatly in understanding Redux & Thunks.

1.  Stephen Grider’s Modern React with Redux course on Udemy. Check it out here —
    [https://www.udemy.com/react-redux/](https://www.udemy.com/react-redux/)
1.  Matt Stow’s Dummy’s Guide to Redux & Thunk. Check it out here-
    [https://medium.com/@stowball/a-dummys-guide-to-redux-and-thunk-in-react-d8904a7005d3](https://medium.com/@stowball/a-dummys-guide-to-redux-and-thunk-in-react-d8904a7005d3)

An introduction to the various terms you are going to see moving forward in
reference to Redux.

- **State: **State refers to the data of the application that we store in Redux.
  Redux creates this one big JavaScript object to store all the state of the
  application. State can only be updated by Reducers.
- **Reducers: **Reducers are plain JavaScript functions that are responsible for
  updating the state of the application. Each reducer is responsible for updating
  one part of the application state.
- **Actions**: An action is basically an object that describes an event that would
  result in a change in state. Each action has `type` property which helps
  reducers in deciding if they have to respond to this action or not. Function
  that return actions are called action creators.
- **Redux-Thunk: **Action creators usually returns a plain JavaScript object.
  Redux-Thunk allows you to return functions instead of objects. These functions
  recieve `dispatch` & `getState` store functions which allow you to further call
  actions from inside the function. Example of such action creator —

<span class="figcaption_hack">Example of using Redux-Thunk</span>

### Step 5: Creating our store and using Redux.

I would like to outline the process that I used to create my store.

- Design the app state on paper or as a JavaScript object in any text editor.
- Create reducers for each property. At this step all reducers simply returned the
  state without any other process.
- Bind reducer & properties. This is how the state for Snooplay looks

  //As you can see, each property is assigned a reducer.
  const rootReducer = combineReducers({ currentPost: ReducerCurrentPost,  
   posts: ReducerFetchPosts,
  subs: ReducerFetchSubreddits,  
   currentSub: ReducerCurrentSubreddit, loaderVisible: ReducerLoadingState, notification: ReducerNotification, lastPostId: ReducerLastPost
  });

- To provide the state to the entire application, you need to wrap your components
  with `Provider` component provided by `react-redux` package.
- Now that we have linked our properties with our reducers, I would like to point
  out that in our reducer functions, _the _`state`_ property refers to the value
  of the property only and not the entire state_. For example, here is my
  ReducerCurrentPost-

      // here the state is the value of 'currentPost' property of the app // state and not the entire state.
      export default function currentPostReducer(state = null, action) {

      }

- **Actions & Action Creators. **As described earlier the action is simply a JS
  object with a type field. Any data that has to be sent to the reducer can be
  sent as the payload property of the action. Here is what the action creator to
  set the current post look like-

      //This is an action creator, returns an action with a type and //payload.
      export const setCurrentPost = (post) => {
          return {
              type: ACTION_CURRENT_POST,
              payload: post
          }
      }

When this action is dispatched (called) like `setCurrentPost(post)` redux sends
this action to all reducers. The the current post reducer can respond like-

    import { ACTION_CURRENT_POST } from './../Constants';

    export default function currentPostReducer(state = null, action) {
        switch (action.type) {
        //This reducer checks the current action type
        //Returns the post (payload)
        //This post is updated in the state
          case ACTION_CURRENT_POST: {
            return action.payload
          }
          default: {
            return state;
          }
        }
    }

Next, we want our components to update when the associated state is changed. So
lets say we have a component which displays the current post. When the reducer
updates the current post in the state, we want this component to re-render to
show the new post. This is where the `connect` method from the `react-redux`
library comes into play. It connects the react components with its associated
state.

_Note: In react world, components which work directly with the store are called
Container Components and components which work only on the given props
(irrespective of where the props are supplied from) are called Presentation
Components._

This is what my PostContainer component looks like. It is directly connected to
the store —

    import React, { Component } from 'react';
    import { connect } from 'react-redux';
    import { bindActionCreators } from 'redux';
    import { setCurrentPost } from './../../actions/';

    class PostContainer extends Component {
        render(){
           return(<h1>{this.props.post.title}</h1>)
       }
    }

    function mapStateToProps(state){
        return {
          post: state.currentPost
        }
    }

    function mapDispatchToProps(dispatch){
        return {
          actions:{
            closePlayer: bindActionCreators(setCurrentPost, dispatch)
          }
        }
    }

    export default connect(mapStateToProps, mapDispatchToProps)PostContainer);

So whats happening here?

Here we create a Component that has to render some details about the current
post of the application.

- `mapStateToProps` is responsible for taking the entire application state and
  then getting out the relevant pieces needed to render the current component.
  These pieces are then provided to the components as `props` <br> In the above
  example the `currentPost` property of the application state is accessed using
  the standard props mechanism.
- `mapDispatchToProps` is used to call actions from inside the component. In the
  above example, I use the `setCurrentPost`action to close the player. you can
  call the `setCurrentPost` action by calling
  `this.props.actions.closePlayer(null)` .
- In the end we use `connect`to wire all these together. Now whenever the
  `currentPost` property is updated in the state, `PostContainer` will be updated
  to reflect this change.

_Note: if you are wondering why to use mapDispatchToProps — Read_ [this
StackOverflow answer](https://stackoverflow.com/a/41782298/1563269)

After this you can setup React-Router. There are many great examples/guides on
how to do this. Just note that do not follow a react-router v3 guide if you are
working with v4 as v4 is a complete re-write.

React Router setup was a breeze, one thing that bugged me was navigating to
paths programmatically. To do this in v4, I have used the `withRouter` Component
from `react-router-dom` package. This is what it looks like —

    import React, { Component } from 'react';
    import { withRouter } from 'react-router-dom'

    class SubmitLink extends Component {

        handleClick = () => {
          if (this.props.onClick()) {
            this.props.history.push(this.props.navigateTo());
          }
        }

        render() {
          return (
           <a onClick={this.handleClick} className="button">   {this.props.label}</a>)
          }
        }
    }

    const NavigableSubmitLink = withRouter(SubmitLink);

    export default NavigableSubmitLink;

This component first calls the `onClick` property, if that function returns
true, then it calls the `navigateTo` function which returns the new path that it
has to go to after computation. Using `withRouter` gives us access to updated
`match`, `location`, and `history` props.

Ending Notes —

- **The real documentation is in the issues:** In the Java world, we have Java
  Docs & where they don’t help StackOverflow steps in. But in the JS world, most
  problems I ran into were solved somewhere in GitHub issues. _So if you run into
  problems, don’t skip the GitHub issues._
- In the Udemy course linked above, they use **react-promise** middleware, but
  here I use **react-thunk** middleware even for Ajax calls. That’s just a
  personal preference because I prefer less magic in my code :)

That’s the end of this article, I have tried to explain all the problems I faced
and how I overcome them. If you want to more detailed explanations of React,
Redux & Redux-Thunk, look at the resources I have linked above.
