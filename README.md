# <img src="https://github.com/victorgaard/playground/assets/13384559/bdeefd10-bdcf-49bf-b4c0-d282035f3bb6" />

Playground is a design system documentation tool for React components. My motivation to build it is purely educational and aimed towards making a lighter alternative to Storybook. It is also a great opportunity to hone my design & engineering skills. 

🛠️ Built with React, Typescript, TanStack Router, and Tailwind. All baked with Vite. <br />
👉 [Live demo](https://playground.victorsantos.work/) hosted at Netlify.<br /> <br />
[![Netlify Status](https://api.netlify.com/api/v1/badges/e2567937-271f-4ca2-bdcd-64f341b01b9e/deploy-status)](https://app.netlify.com/sites/glittery-tarsier-f22d47/deploys)

----

## How Playground works
Playground relies on playground extension files to do its magic. For every `.playground.ts|tsx` file, a new entry will be added to the routes when the server runs and/or in the build process. You will notice that a small script `generateRoutes` runs before each of these two. This is important to generate the components navigation menu. 

## Getting started
Running the project is quite simple:

- Clone this project
- Install the dependencies `npm i`
- Run the server with `npm run dev`

## Creating playground files
Let's create a playground file:

- Create a file for your component with the `.playground.ts|tsx` extension
- Assuming you have a Button component, create a `Button.playground.tsx` file
- Export a props const and use the `generateProps` helper 
- If you use Typescript, pass your component type to `generateProps` to have out of the box type safety

```typescript
import { generateProps } from "@/utils/generateProps";

export const props = generateProps<ButtonProps>({
  Component: Button,
  defaultProps: {
    // this is where the Button required props will be defined
    children: "👉 click me",
    variant: "primary",
    size: "md"
  },
});
```

- Now run `npm run routes` or `npm run dev` to propagate your playground file to the routes
  
You probably (🤞) see your component in the navigation menu now, right? <br />
Feel free to refer to the examples inside the folder `./src/components/ui`.

## Enhancing the playground
You just added your first component to the playground and you visualize it there. Hoorray! 🎉 <br />
But let's not stop there. There are more you can enhance your component playground. You can define variant props, as well as examples.

- Variant props are a way to provide shortcuts in the playground UI, i.e.: a Button can have two sizes, like 'sm' and 'md'. If you pass an array of `['sm', 'md']` to the variant props, they will be offered in the props sidebar as radio buttons.
- Examples are a way to provide component presets, i.e.: you can create a small destructive button by defining these props as an example.
- Let's jump to another example:

```typescript
export const props = generateProps<ButtonProps>({
  Component: Button,
  defaultProps: {
    children: "👉 click me",
    variant: "primary",
    size: "md"
  },
  variantProps: {
    // these will appear as radio buttons in the playground UI
    variant: ["primary", "secondary", "tertiary", "ghost", "destructive"],
    size: ["sm", "md"]
  },
  examples: {
    // these will appear as top navigation presets, on the side of the Default option
    destructive: {
      children: "👀 uh-oh danger zone",
      size: "sm"
      variant: "destructive",
    },
  },
});
```

This code will output this playground UI for your button:

|Default:|Destructive example:
----------|----------
|<img width="1265" alt="image" src="https://github.com/victorgaard/playground/assets/13384559/3394f517-dd24-47f3-a6aa-25f15402efdd">|<img width="1265" alt="image" src="https://github.com/victorgaard/playground/assets/13384559/e3b38965-723c-451b-857c-ab65eae7a1a9">


Did you notice the radio buttons for the variant props, as well as the new items in the navigation for the examples? You have the power! Harness it and go beyond! 🤘


## Current limitations
Playground tracks props changes via URL Params. It works well and offers shareable URLs that match a given component state, but the main limitation of this approach is that JSX passed as props or as children is very tricky to parse back to React code. Right now any JSX passed as URL Params will be just transformed to text. 

An interim workaround for this issue is having all JSX props or children set in the `defaultProps` and not changing them in the `examples`. Let's say your Button renders an icon and a text as children. You can add it on `defaultProps`, and since the children are not changed afterward in the `examples`, it will preserve the JSX as children and work as intended.

```typescript
export const props = generateProps<ButtonProps>({
  Component: Button,
  defaultProps: {
    children: <><BoltIcon /> click me</>,
    variant: "primary",
    size: "md",
  },
  variantProps: {
    variant: ["primary", "secondary", "tertiary", "ghost", "destructive"],
  },
  examples: {
    secondary: {
      variant: "secondary",
    },
  },
});
```

## Contribute
All contributions must be written in English. Feel free to open an issue or submit PRs. 
For PRS, please do so on the `develop` branch. 

Commit messages should follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), like:

- fix: ...
- feat: ...
- chore: ...
- test: ...
- refactor: ...

Playground follows the [Contributor Covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct/) code of conduct to foster an open, welcoming, diverse, inclusive, and healthy community.

## License
MIT License

Copyright (c) 2025 Victor F. Santos

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
