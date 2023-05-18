import React, { ComponentPropsWithoutRef, ComponentType } from 'react'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { useAfterInteractions } from './use-after-interactions'

interface Props extends ComponentPropsWithoutRef<typeof Transitioning.View> {
  placeHolder?: ComponentType
}

const OptimizedHeavyScreen = ({
  children,
  placeHolder: Placeholder,
  ...rest
}: Props) => {
  const { transitionRef, areInteractionsComplete } = useAfterInteractions()
  return (
    <Animated.View
      style={style}
      entering={FadeIn}
      exiting={FadeOut}
      {...rest}
      ref={transitionRef}
    >
      {areInteractionsComplete ? (
        children
      ) : !!Placeholder ? (
        <Placeholder />
      ) : null}
    </Animated.View>
  )
}

export { OptimizedHeavyScreen }
