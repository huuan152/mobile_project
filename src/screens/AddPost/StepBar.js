import React from 'react';
import { StyleSheet, View } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import BUTTON_COLORS from '../../Constants/Utilities/index';

const thirdIndicatorStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize: 30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: BUTTON_COLORS.colorPicked,
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: BUTTON_COLORS.colorPicked,
  stepStrokeUnFinishedColor: '#dedede',
  separatorFinishedColor: BUTTON_COLORS.colorPicked,
  separatorUnFinishedColor: '#dedede',
  stepIndicatorFinishedColor: BUTTON_COLORS.colorPicked,
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 0,
  currentStepIndicatorLabelFontSize: 0,
  stepIndicatorLabelCurrentColor: 'transparent',
  stepIndicatorLabelFinishedColor: 'transparent',
  stepIndicatorLabelUnFinishedColor: 'transparent',
  labelColor: '#999999',
  labelSize: 15,
  currentStepLabelColor: BUTTON_COLORS.colorPicked,
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
      paddingTop: 15,
    },
    stepIndicator: {
      // marginTop: 10,
      // marginBottom: 15
    },
  });