City Saver Pass on the FIT Stack
--------------

## About

City Saver Pass is built on the FIT Stack:

> The author of The [Fit Stack](http://mvpin30.com) highly recommends
reading [ZAG](http://goo.gl/DPmCWa) and adding an onliness statement here.

> "What's the one thing that makes your brand both different and compelling?
What makes you the 'only'?  Complete a simple onliness statement.
Add detail by answering what, how, who, where, when, and why."
&ndash; Marty Neumeier

> (e.g. "The Fit Stack is the only boilerplate for Angular.js developers who want
a proven, quick, and easy way to build rapid MVPs in 0-30 days.")

The Fit Stack is:

1. Flybase (real-time database)
2. Interface (Angular.js)
3. Thin Servers (if needed)

The FIT Stack is a powerful, but lightweight Angular.js and Flybase driven stack for making quick and powerful MVP projects as part of the [MVPin30](http://mvpin30.com) project.

Using the power of Angular.js, and Flybase, we can quickly build MVPs of new ideas and host them anywhere, even on static web hosts such as Github Pages.

## How to run the code

1. Clone the repo: `$ git clone https://github.com/DataMcFly/city-saver-pass`
2. `$ cd city-saver-pass`
3. `$ npm install -g bower serve`
4. `$ bower install`
4. `$ cd app/`
5. `$ serve -p 4000`
5. View in browser at `http://localhost:4000`

## Before committing code:

1. `grunt appcache:app`
2. open up `manifest.appcache` to fix the index.html reference
3. `git commit -am "comment"`
4. `git push origin branch`