import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../components/Header';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <Header title="About This App" showBackButton />
      
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>Plant Disease Detector</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>How It Works</Text>
            <Text style={styles.sectionText}>
              This app uses machine learning to detect diseases in plants. Currently, it can identify:
            </Text>
            <View style={styles.list}>
              <Text style={styles.listItem}>• Corn - Common Rust</Text>
              <Text style={styles.listItem}>• Potato - Early Blight</Text>
              <Text style={styles.listItem}>• Tomato - Bacterial Spot</Text>
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Usage</Text>
            <Text style={styles.sectionText}>
              Take a picture of a plant leaf using the app's camera or upload an existing image. The app will analyze the image and provide information about any detected diseases.
            </Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Technical Details</Text>
            <Text style={styles.sectionText}>
              This app is built with React Native and Expo, with a Flask backend serving a trained machine learning model. The model is trained to recognize specific plant diseases based on visual patterns in leaf images.
            </Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Privacy</Text>
            <Text style={styles.sectionText}>
              Your images are processed locally and on your device's connection to the local API. No images or personal data are stored permanently or sent to external servers.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  contentContainer: {
    padding: Layout.padding,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius,
    padding: Layout.padding,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  version: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  list: {
    marginTop: 8,
    marginLeft: 8,
  },
  listItem: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
});