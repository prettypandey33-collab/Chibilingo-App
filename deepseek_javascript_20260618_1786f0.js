import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AdBanner from '../components/AdBanner';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🇰🇷 KoreaKonnect</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Lesson')}>
        <Text style={styles.btnText}>📚 Start Lesson</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Dictionary')}>
        <Text style={styles.btnText}>📖 Dictionary</Text>
      </TouchableOpacity>
      {/* होम पर बैनर ऐड */}
      <View style={styles.adContainer}>
        <AdBanner placement="banner_320x50" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFB6C1', padding: 20, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 32, fontWeight: 'bold', color: '#1A2B4C', marginBottom: 40 },
  button: { backgroundColor: '#1A2B4C', padding: 15, borderRadius: 10, marginVertical: 10, width: '80%', alignItems: 'center' },
  btnText: { color: '#fff', fontSize: 18 },
  adContainer: { marginTop: 20, alignItems: 'center' }
});