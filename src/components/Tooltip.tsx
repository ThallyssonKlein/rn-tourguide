import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import { Button } from './Button'
import styles from './style'
import { IStep, Labels } from '../types'

export interface TooltipProps {
  isFirstStep?: boolean
  isLastStep?: boolean
  currentStep: IStep
  labels?: Labels
  handleNext?(): void
  handlePrev?(): void
  handleStop?(): void
}

export const Tooltip = ({
  isFirstStep,
  isLastStep,
  handleNext,
  handlePrev,
  handleStop,
  currentStep,
  labels,
}: TooltipProps) => (
  <View
    style={{
      borderRadius: 16,
      paddingTop: 24,
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 16,
      width: '80%',
      backgroundColor: '#ffffffef',
    }}
  >
    <View style={styles.tooltipContainer}>
      <Text testID='stepDescription' style={styles.tooltipText}>
        {currentStep && currentStep.text}
      </Text>
    </View>
    <View style={[styles.bottomBar]}>
      {!isLastStep ? (
        <TouchableOpacity onPress={handleStop}>
          <Button>{(currentStep.order === -1 ? 'Finish' : labels?.skip) || 'Skip'}</Button>
        </TouchableOpacity>
      ) : null}
      {(!isFirstStep && currentStep.order !== 3 && currentStep.order !== 0) ? (
        <TouchableOpacity onPress={handlePrev}>
          <Button>{labels?.previous || 'Previous'}</Button>
        </TouchableOpacity>
      ) : null}
      {(!isLastStep && currentStep.order !== -1)? (
        <TouchableOpacity onPress={(currentStep.order !== 0) ? handleNext : handleStop}>
          <Button>{(currentStep.order !== 0) ? (labels?.next || 'Next') : (labels?.finish || 'Finish')}</Button>
        </TouchableOpacity>
      ) :
        ((currentStep.order !== -1) ? 
        <TouchableOpacity onPress={handleStop}>
          <Button>{labels?.finish || 'Finish'}</Button>
        </TouchableOpacity> : <View/>)
      }
    </View>
  </View>
)
