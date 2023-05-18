# ⚡️ Speed up heavy React Native screens

Optimize heavy screens in **React Native** to prevent lags with React Navigation's stack.

This isn't actually specific to React Navigation, but I find myself using it there often.

Especially useful for screens that set up listeners, make network requests, etc.

## Usage

🥳 New component-based API! Use this if you only want to optimize certain content on your screen.

```jsx
import React from 'react'
import { OptimizedHeavyScreen } from 'react-navigation-heavy-screen'

const Screen = () => (
  <>
    <NonExpensiveComponentHere />
    <OptimizedHeavyScreen>
      <MyHeavyComponentHere />
    </OptimizedHeavyScreen>
  </>
)
```

You can also use the normal export usage. Use this if you want to optimize your whole screen.

```js
import { optimizeHeavyScreen } from 'react-navigation-heavy-screen'

const Screen = () => ...

export default optimizeHeavyScreen(Screen, OptionalPlaceHolderScreen)
```

Or you can require your heavy screen inline:

```js
import { optimizeHeavyScreen } from 'react-navigation-heavy-screen'

export default optimizeHeavyScreen(
  require('path/to/HeavyScreen'),
  OptionalPlaceHolderScreen
)
```

_Thanks to [@Sebastien Lorber](https://twitter.com/sebastienlorber/status/1250113509880401933) for this recommendation ^_

## Installation

```sh
yarn add react-navigation-heavy-screen
```

Install peer dependencies:

```sh
expo install react-native-reanimated
```

## What does it do?

Delay rendering a component until interactions are complete, using `InteractionManager`. Then it fades in your screen.

---

## `<OptimizedHeavyScreen />`

### Props

- `placeholder` (optional) Non-heavy React component that renders in the meantime.
- Extends `Animated.View` props [docs](https://software-mansion.github.io/react-native-reanimated). So you can pass any props you need to customize the animation. eg: `{ entering: { FadeIn } }`

```js
import React from 'react'
import { OptimizedHeavyScreen } from 'react-navigation-heavy-screen'

const Screen () => (
  <OptimizedHeavyScreen>
    <YourHeavyComponent />
  </OptimizedHeavyScreen>
)

export default Screen
```

## `optimizeHeavyScreen(Screen, Placeholder, options)`

```js
import { optimizeHeavyScreen } from 'react-navigation-heavy-screen'

export default optimizeHeavyScreen(Screen, OptionalPlaceHolderScreen, {
  // default values
  disableHoistStatics: false,
})
```

### Arguments

- `Screen` **required** Any React component whose render should be delayed until interactions are complete.
- `Placeholder` (optional) Non-heavy React component that renders in the meantime.
- `options` (optional) Dictionary with the following options:
  - `disableHoistStatics`: (optional) If `true`, the `Screen`'s statics (like `navigationOptions`, etc.) will not be passed on. Default: `false`.
  - Extends `Animated.View` props [docs](https://software-mansion.github.io/react-native-reanimated). So you can pass any props you need to customize the animation. eg: `{ entering: { FadeIn } }`

## License

MIT
