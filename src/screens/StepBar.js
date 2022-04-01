import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import StepIndicator from 'react-native-step-indicator';

const thirdIndicatorStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#4285F4',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#4285F4',
  stepStrokeUnFinishedColor: '#dedede',
  separatorFinishedColor: '#4285F4',
  separatorUnFinishedColor: '#dedede',
  stepIndicatorFinishedColor: '#4285F4',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 0,
  currentStepIndicatorLabelFontSize: 0,
  stepIndicatorLabelCurrentColor: 'transparent',
  stepIndicatorLabelFinishedColor: 'transparent',
  stepIndicatorLabelUnFinishedColor: 'transparent',
  labelColor: '#999999',
  labelSize: 15,
  currentStepLabelColor: '#4285F4',
};

export default function StepBar(props) {  
  return (
    <View style={styles.container}>
      <View style={styles.stepIndicator}>
        <StepIndicator
          stepCount={4}
          customStyles={thirdIndicatorStyles}
          currentPosition={props.step}
          labels={['Vị trí', 'Thông tin', 'Hình ảnh', 'Xác nhận']}
        />
      </View>
    </View>
  );
}
  
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      paddingHorizontal: 10,
    },
    stepIndicator: {
      // marginTop: 10,
      // marginBottom: 15
    },
  });