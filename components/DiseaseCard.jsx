import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

const DiseaseCard = ({ disease, confidence }) => {
  // Format confidence as percentage
  const confidencePercent = Math.round(confidence * 100);
  
  // Get disease-specific information
  const getDiseaseInfo = () => {
    switch (disease) {
      case 'Corn - Common Rust':
        return {
          symptoms: 'Small, reddish-brown pustules on both surfaces of corn leaves.',
          treatment: 'Apply fungicides, plant resistant varieties, and ensure good field ventilation.'
        };
      case 'Potato - Early Blight':
        return {
          symptoms: 'Dark brown spots with concentric rings, typically on older leaves first.',
          treatment: 'Rotate crops, apply fungicides, and ensure adequate plant spacing.'
        };
      case 'Tomato - Bacterial Spot':
        return {
          symptoms: 'Small, dark lesions on leaves, stems, and fruit that may have a yellow halo.',
          treatment: 'Apply copper-based bactericides, remove infected plants, and avoid overhead irrigation.'
        };
      default:
        return {
          symptoms: 'Unknown symptoms for this disease.',
          treatment: 'Consult with a plant pathologist for proper diagnosis and treatment.'
        };
    }
  };

  const diseaseInfo = getDiseaseInfo();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{disease}</Text>
      <View style={styles.confidenceContainer}>
        <Text style={styles.confidenceLabel}>Confidence:</Text>
        <Text style={styles.confidenceValue}>{confidencePercent}%</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Symptoms:</Text>
        <Text style={styles.sectionContent}>{diseaseInfo.symptoms}</Text>
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Treatment:</Text>
        <Text style={styles.sectionContent}>{diseaseInfo.treatment}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: Layout.borderRadius,
    padding: Layout.padding,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 8,
  },
  confidenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  confidenceLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginRight: 4,
  },
  confidenceValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.divider,
    marginVertical: 12,
  },
  infoSection: {
    marginVertical: 6,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  sectionContent: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});

export default DiseaseCard;