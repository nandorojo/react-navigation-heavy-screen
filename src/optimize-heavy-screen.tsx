import React, { ComponentType, ComponentPropsWithoutRef } from 'react'
import { Transition, Transitioning } from 'react-native-reanimated'
// @ts-ignore
import hoistNonReactStatics from 'hoist-non-react-statics'
import { useAfterInteractions } from './use-after-interactions'
import { StyleSheet } from 'react-native'

export function optimizeHeavyScreen<Props>(
	Component: ComponentType<Props>,
	Placeholder: ComponentType | null = null,
	options: {
		disableHoistStatics?: boolean
		transition?: ComponentPropsWithoutRef<
			typeof Transitioning.View
		>['transition']
	} = {}
) {
	const {
		disableHoistStatics = false,
		transition = (
			<Transition.Together>
				<Transition.Change interpolation="easeInOut" />
				<Transition.In type="fade" />
			</Transition.Together>
		),
	} = options
	const OptimizedHeavyScreen = (props: Props) => {
		const {
			transitionRef,
			areInteractionsComplete,
		} = useAfterInteractions()
		return (
			<Transitioning.View
				transition={transition}
				style={styles.container}
				ref={transitionRef}
			>
				{areInteractionsComplete ? (
					<Component {...props} />
				) : !!Placeholder ? (
					<Placeholder />
				) : null}
			</Transitioning.View>
		)
	}
	if (!disableHoistStatics) {
		// forward navigationOptions, and other statics
		hoistNonReactStatics(OptimizedHeavyScreen, Component)
	}
	return OptimizedHeavyScreen
}

const styles = StyleSheet.create({ container: { flex: 1 } })
