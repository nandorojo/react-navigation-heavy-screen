import React, { ComponentPropsWithoutRef, ComponentType } from 'react'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { useAfterInteractions } from './use-after-interactions'

interface Props extends ComponentPropsWithoutRef<typeof Animated.View> {
  children?: React.ReactNode,
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
