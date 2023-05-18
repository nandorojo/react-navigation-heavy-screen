import React, { ComponentType, ComponentPropsWithoutRef } from 'react'
import Animated from 'react-native-reanimated'
// @ts-ignore
import hoistNonReactStatics from 'hoist-non-react-statics'
import { useAfterInteractions } from './use-after-interactions'
import { StyleSheet } from 'react-native'

interface optimizeHeavyScreenOptions extends ComponentPropsWithoutRef<typeof Animated.View> {
  disableHoistStatics?: boolean
}

export function optimizeHeavyScreen<Props>(
	Component: ComponentType<Props>,
	Placeholder: ComponentType | null = null,
	options: optimizeHeavyScreenOptions = {}
) {
	const {
		disableHoistStatics = false,
    ...rest
	} = options
	const OptimizedHeavyScreen = (props: Props) => {
		const {
			transitionRef,
			areInteractionsComplete,
		} = useAfterInteractions()
		return (
			<Animated.View
        {...rest}
				style={styles.container}
				ref={transitionRef}
			>
				{areInteractionsComplete ? (
					<Component {...props} />
				) : !!Placeholder ? (
					<Placeholder />
				) : null}
			</Animated.View>
		)
	}
	if (!disableHoistStatics) {
		// forward navigationOptions, and other statics
		hoistNonReactStatics(OptimizedHeavyScreen, Component)
	}
	return OptimizedHeavyScreen
}

const styles = StyleSheet.create({ container: { flex: 1 } })
