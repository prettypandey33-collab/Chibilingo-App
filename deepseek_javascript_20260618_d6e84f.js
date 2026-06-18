import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, SafeAreaView } from 'react-native';
import { words } from '../data/words.json';
import AdBanner from '../components/AdBanner';

export default function DictionaryScreen() {
  const [query, setQuery] = useState('');
  
  const filtered = words.filter(w => 
    w.korean.includes(query) || 
    w.english.toLowerCase().includes(query.toLowerCase()) || 
    w.hindi.includes(query)
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>📖 Dictionary</Text>
      <TextInput 
        style={styles.searchBar} 
        placeholder="Search (English, Hindi, Korean)" 
        value={query} 
        onChangeText={setQuery}
      />
      
      <FlatList
        data={filtered}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.korean}>{item.korean} ({item.romanized})</Text>
            <Text style={styles.trans}>🇬🇧 {item.english}</Text>
            <Text style={styles.trans}>🇮🇳 {item.hindi}</Text>
          </View>
        )}
        ListFooterComponent={
          <View style={styles.footerAd}>
            <AdBanner placement="banner_728x90" />
            <AdBanner placement="direct_script" />
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFB6C1', padding: 15 },
  header: { fontSize: 28, fontWeight: 'bold', color: '#1A2B4C', textAlign: 'center', marginBottom: 15 },
  searchBar: { backgroundColor: '#fff', padding: 12, borderRadius: 10, marginBottom: 15, fontSize: 16 },
  item: { backgroundColor: '#fff', padding: 15, marginVertical: 5, borderRadius: 8 },
  korean: { fontSize: 20, fontWeight: 'bold', color: '#1A2B4C' },
  trans: { fontSize: 16, color: '#333', marginTop: 4 },
  footerAd: { marginTop: 20, paddingBottom: 20, alignItems: 'center' }
});