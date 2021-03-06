# DRYDraw
## Don't Repeat Yourself when making drawings!
[DRYDraw](https://github.com/ludocracy/duxml-front-end) allows you to create a template SVG file to represent many permutations of the same drawing.
You can embed logical expressions wrapped in @(...) into @if attributes and string content. An API [located here](https://github.com/ludocracy/duxml-rails-server/) evaluates the expressions and replaces parameters with given values. This templating engine does NOT throw errors for undefined parameters. It simply outputs them as @(...) expressions. The end result is the ability to make one drawing represent all permutations.

## Features
- Supports the following operations (try them out!):
  - Arithmetic:
    - @(a - b / 2 + 4 * a)
    - @(2**a - b)
  - Logic
    - @(a <= b)
    - @(a > b ? 3 : 5)
  - String
    - @(a == "a string")
- Displays output SVG
  - Conditional elements are indicated visually
  - Mouse over the image to conditions for elements
- Supports other common templating features like loops and instantiation

![app-screenshot](https://ludocracy.github.io/random-static-files/screenshots/DRYDrawScreenshot.png)

## Technologies used
- React.js
- Sinatra
- [ReDuxml](https://github.com/ludocracy/ReDuxml) - I wrote this a while ago and this app is a showcase for its features
- [React-Designer](https://github.com/ludocracy/react-designer) - My fork of an unmaintained [project by Fatih Erikli](https://github.com/fatiherikli/react-designer)
- SVGInline
- axios
- Firebase for front-end deployment
- Heroku for back-end deployment

## Future development
- Front-end
  - Visual editor has bug where state does not update for newly selected object
  - User authentication
  - Save history of SVG transforms to Firebase
  - Navigate through transform history
  - Let user define default parameter values
  - Better transitions for unneeded parts of interface
  - More built in examples
  - Allow SVGs of any size
  - Re-incorporate other SVG editing features from original React-Designer
  - Use basic regex parsing to ensure expression is valid
- Back-end
  - Back end is seeing a mysterious query param: {“captures”: []}
  - Support more string operations
  - Have HTML landing page for API users
  - Get CORS working for all use cases
  - Support enum parameters
