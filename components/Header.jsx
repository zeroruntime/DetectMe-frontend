import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

const Header = ({ title, showBackButton = false }) => {
  const router = useRouter();

  return (
    <View style={styles.header}>
      {showBackButton && (
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
    paddingHorizontal: Layout.padding,
    backgroundColor: Colors.primary,
  },
  title: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    padding: 8,
    width: 40,
  },
  backButtonText: {
    color: Colors.white,
    fontSize: 20,
  },
  placeholder: {
    width: 40,
  },
});

export default Header;