import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

const Button = ({ 
  title, 
  onPress, 
  style, 
  textStyle, 
  disabled = false, 
  loading = false,
  type = 'primary' // primary, secondary, outline
}) => {
  const getButtonStyle = () => {
    if (type === 'secondary') {
      return [styles.button, styles.secondaryButton, style];
    } else if (type === 'outline') {
      return [styles.button, styles.outlineButton, style];
    }
    return [styles.button, styles.primaryButton, style];
  };

  const getTextStyle = () => {
    if (type === 'secondary') {
      return [styles.text, styles.secondaryText, textStyle];
    } else if (type === 'outline') {
      return [styles.text, styles.outlineText, textStyle];
    }
    return [styles.text, styles.primaryText, textStyle];
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={type === 'primary' ? Colors.white : Colors.primary} />
      ) : (
        <Text style={[getTextStyle(), disabled && styles.disabledText]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: Layout.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  secondaryButton: {
    backgroundColor: Colors.accent,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  primaryText: {
    color: Colors.white,
  },
  secondaryText: {
    color: Colors.white,
  },
  outlineText: {
    color: Colors.primary,
  },
  disabledButton: {
    backgroundColor: Colors.divider,
    borderColor: Colors.divider,
  },
  disabledText: {
    color: Colors.textSecondary,
  },
});

export default Button;