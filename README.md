# ⚡️ Speed up heavy React Native screens

Optimize heavy screens in **React Native** to prevent lags with React Navigation's stack.

This isn't actually specific to React Navigation, but I find myself using it there often.

Especially useful for screens that set up listeners, make network requests, etc.

## Usage

```js
import { optimizeHeavyScreen } from 'react-navigation-heavy-screen'

const Screen = () => ...

export default optimizeHeavyScreen(Screen, OptionalPlaceHolderScreen)
```

Or you can require your heavy screen inline:

```js
import { optimizeHeavyScreen } from 'react-navigation-heavy-screen'

export default optimizeHeavyScreen(require('path/to/HeavyScreen'), OptionalPlaceHolderScreen)
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

## `optimizeHeavyScreen(Screen, Placeholder, options)`

```js
import { optimizeHeavyScreen } from 'react-navigation-heavy-screen'

export default optimizeHeavyScreen(Screen, OptionalPlaceHolderScreen, {
  // default values
  disableHoistStatics: false,
  transition: (
    <Transition.Together>
      <Transition.Change interpolation="easeInOut" />
      <Transition.In type="fade" />
    </Transition.Together>
  ),
})
```

### Arguments

- `Screen` **required** Any React component whose render should be delayed until interactions are complete.
- `Placeholder` (optional) Non-heavy React component that renders in the meantime.
- `options` (optional) Dictionary with the following options:
  - `disableHoistStatics`: (optional) If `true`, the `Screen`'s statics (like `navigationOptions`, etc.) will not be passed on. Default: `false`.
  - `transition`: (optional) custom transition prop for Reanimated's `Transitioning.View` component. See `react-native-reanimated` [docs](https://software-mansion.github.io/react-native-reanimated/transitions.html) and Transition [examples](https://github.com/software-mansion/react-native-reanimated/tree/master/Example/src/transitions).

## License

MIT
