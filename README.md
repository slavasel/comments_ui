# Comments application

Simple UI to list posts and do some actions with comments.

  - Javascript: ES6+
  - Frameworks: React, Redux
  - Styles: SASS, JSS
  - All together: Magic!

# Installation and start!
  > npm install
  
  > npm start (back)
  > npm run webpack (front)
  
# Summary
- Left side is a posts block with ability to filter by a creator name.
The post body is styled with a capitalized colored first letter to add some designed element.
User (creator) names are retrieved from another endpoint and merged with main data by user id.
There is ability to select a post by clicking on it. Right part of the screen will be loading just after,
and the comments related to the post will be displayed.
- Comments part is the main one. It contains of the post we just selected to have an original text body.
It also has a comment form element to add a new comment; tags - to filter by one or more tags; list of comments; tags pie chart.
- Comment form. That's possible to type '@' symbol in order to get list of available names inside of this post. Also you can
type and custom name. In the list of comments it will be displayed as italic bold text. To select the suggestion you can either click
on it or select using the arrow buttons. Same logic is for the hashtags: '#'.
Once you a add tag or username to the comment, it's format will be changes to ```[to=<user>]```, or ```[tag=<tag>]```.
This format will be parsed in the comments list to display it natively.
- Comments list can be filtered by one or more tags, presented in the comments of selected post. By selecting couple of them
filtering logic is to have both in one comment.
- Pie chart is placed just below the comments. It represents 3 most popular tags on the page. The chart colors are randomly assigned each
component rerender.

# Detailed technologies stack
- Webpack 4, babel 7;
- Javascript ES6, Node.js with express;
- SASS and JSS for styling, also I included bootstrap styles;
- React, Redux - in some places I have used an old approach with classes, in other - hooks for both react and redux things;
- Axios for api requests;
- Fontawesome icons (used only for loader);
- Redux thunk middleware to be able to have async actions;
- React minimal pie chart for the tags chart.

# Project structure
- actions, reducers - Redux folders;
- helpers - some deep logic functions, need to be used in different places of the app;
- scss - basic styles and bootstrap including;
- containers - entering point of the application and the screen;
- components - smaller pieces of the layouts;
- server folder for express server only.