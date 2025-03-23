import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';

const LoadingOverlay = ({ message = 'Loading...' }) => {
  return (
    <View style={styles.container}>
      <View style={styles.loadingBox}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  loadingBox: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    width: '80%',
    maxWidth: 300,
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
});

export default LoadingOverlay;