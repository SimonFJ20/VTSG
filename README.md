# VTSG
My attempt at creating a simple-to-use 2d game engine to make 2d games to run in a browser.

## Introduction
My goal with this game engine is to accomplish something that most other cant. It is to be able create 2d games at all sizes. Tools like Unity are can create much bigger and and better games, but it takes 2-3 months to learn. MIT Scratch on the other hand takes 1 minute to learn, but is so simple it is hard to create proper projects with it without working against it.
My goal with VTSG is a game engine that is simple enough to take a few hours to learn, but is powerfull enough to be able to create whatever the user wants to create.

I acknoledge the competition. P5js for example is a great tool to create games in JavaScript for browers, but P5js is mostly about drawing and simplifying. VTSG hopes to handle all things with a component based design. Maybe someday will VTSG use P5js, idk.

## Instructions
### To Develop a Project
1. If not already, install NodeJS, so you can use `npm` in a Console. (If installed but not working, add it to PATH, google it)
2. Clone repository to a known location
3. Open a Console/Terminal/CMD and navigate to the root folder at the location. (folder with `package.json`)
4. Type `npm run dev` and keep the Console open
5. Open File Explorer and navigate to the root folder, then the `dist` folder
6. Open `index.html` with a web browser like Chrome, FireFox, Safari, Opera or Edge. I do **NOT** recommend Internet Explorer as some JavaScript is unsupported.
7. To open Developer Tools. On Chrome, FireFox, Opera and Edge press `Ctrl + Shift + I` or `F12`, or `Fn + F12` depending on your keyboard configuration. (`F12` doesn't work on Opera). On Safari press `Option + ⌘ + J`.
8. Start creating with help of the Guide and Reference! (Guide and Reference not yet created, sorry)

### To Run/Export a Project
1. Open File Explorer and navigate to the root folder at the location. (folder with `package.json`)
2. The `dist` folder is all that is needed to run the project.
3. To run simply open `index.html` in the `dist` folder in a browser, manually or by linking to it on a website.
4. **Optional:** run `npm run build` in the root folder to make sure everything is compiled to the newest version.

## Contributers
Maintainer|GitHub|Role|Email|LinkedIn
----------|------|-----|-------|-----
Simon From Jakobsen|[SimonFJ20](http://github.com/SimonFJ20)|Creater, Maintainer|simonfromjakobsen@gmail.com|[LinkedIn](https://www.linkedin.com/in/simon-from-jakobsen-95b3a81ba/)

## Todo
- [x] Initialize repository.
- [ ] Rewrite code from [SimonFJ20/JSGameEngine](https://github.com/SimonFJ20/JSGameEngine) with commenting and ES6 moduling.
- [ ] ↳ Rewrite `engine/keyInput.ts` and `engine/mouseInput.ts` to `vtsg/input.ts`.

## Who can contribute?
I want every one who wants, to be able to contribute. I will not stand in the way for anyone who wants to help, but keep in mind I am new to maintaining, so please cut me some slack.
If you have any questions, contact me
