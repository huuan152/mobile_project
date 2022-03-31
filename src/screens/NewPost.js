import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import Location from './Location';
import Info from './Info';
import Confirm from './Confirm';
import Images from './Images';

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

export default function NewPost() {
    const [currentPage, setCurrentPage] = useState(0);
  
    const onStepPress = (position) => {
      setCurrentPage(position);
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.stepIndicator}>
          <StepIndicator
            stepCount={4}
            customStyles={thirdIndicatorStyles}
            currentPosition={currentPage}
            onPress={onStepPress}
            labels={['Vị trí', 'Thông tin', 'Hình ảnh', 'Xác nhận']}
          />
        </View>
        <Images/>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
    },
    stepIndicator: {
      marginTop: 50,
      marginBottom: 15
    },
  });