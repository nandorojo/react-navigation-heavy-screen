import React, { ComponentPropsWithoutRef, ComponentType } from 'react'
import { Transition, Transitioning } from 'react-native-reanimated'
import { useAfterInteractions } from './use-after-interactions'

interface Props {
  transition?: ComponentPropsWithoutRef<typeof Transitioning.View>['transition']
  children: React.ReactNode
  style?: ComponentPropsWithoutRef<typeof Transitioning.View>['style']
  placeHolder?: ComponentType
}

const OptimizedHeavyScreen = ({
  transition = (
    <Transition.Together>
      <Transition.Change interpolation="easeInOut" />
      <Transition.In type="fade" />
    </Transition.Together>
  ),
  style,
  children,
  placeHolder: Placeholder,
}: Props) => {
  const { transitionRef, areInteractionsComplete } = useAfterInteractions()
  return (
    <Transitioning.View
      transition={transition}
      style={style}
      ref={transitionRef}
    >
      {areInteractionsComplete ? (
        children
      ) : !!Placeholder ? (
        <Placeholder />
      ) : null}
    </Transitioning.View>
  )
}

export default OptimizedHeavyScreen
