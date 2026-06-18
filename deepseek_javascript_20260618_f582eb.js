import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { words } from '../data/words.json';
import AdBanner from '../components/AdBanner';

export default function LessonScreen({ navigation }) {
  const [index, setIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [correctCount, setCorrectCount] = useState(0);
  const [showAd, setShowAd] = useState(false);

  useEffect(() => {
    if (index < words.length) {
      generateOptions();
    } else {
      Alert.alert("🎉 Complete!", "You finished all words!");
      navigation.goBack();
    }
  }, [index]);

  const generateOptions = () => {
    const current = words[index];
    const wrongs = words.filter(w => w.id !== current.id).sort(() => 0.5 - Math.random()).slice(0, 3);
    const opts = [current.english, ...wrongs.map(w => w.english)].sort(() => 0.5 - Math.random());
    setOptions(opts);
  };

  const handleAnswer = (selected) => {
    const correct = words[index].english;
    if (selected === correct) {
      setCorrectCount(prev => {
        const newCount = prev + 1;
        // हर 3 सही जवाब पर ऐड दिखाओ
        if (newCount % 3 === 0) {
          setShowAd(true);
          setTimeout(() => setShowAd(false), 4000); // 4 सेकंड बाद हटाओ
        }
        return newCount;
      });
      Alert.alert("✅ Correct!");
    } else {
      Alert.alert("❌ Wrong", `Correct answer: ${correct}`);
    }
    setIndex(prev => prev + 1);
  };

  if (index >= words.length) return null;

  const currentWord = words[index];

  return (
    <View style={styles.container}>
      <Text style={styles.korean}>{currentWord.korean}</Text>
      <Text style={styles.romanized}>{currentWord.romanized}</Text>
      <Text style={styles.hint}>Choose the correct English translation:</Text>
      
      <View style={styles.options}>
        {options.map((opt, idx) => (
          <TouchableOpacity key={idx} style={styles.option} onPress={() => handleAnswer(opt)}>
            <Text style={styles.optText}>{opt}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ऐड दिखाने के लिए जगह */}
      {showAd && (
        <View style={styles.adContainer}>
          <AdBanner placement="banner_468x60" />
        </View>
      )}
      
      {/* नीचे एक और बैनर */}
      <View style={styles.footerAd}>
        <AdBanner placement="banner_300x250" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, alignItems: 'center' },
  korean: { fontSize: 48, fontWeight: 'bold', color: '#1A2B4C', marginTop: 30 },
  romanized: { fontSize: 22, color: '#888', marginBottom: 20 },
  hint: { fontSize: 16, color: '#555', marginBottom: 20 },
  options: { width: '100%', marginVertical: 20 },
  option: { backgroundColor: '#f0f0f0', padding: 15, marginVertical: 8, borderRadius: 8, alignItems: 'center' },
  optText: { fontSize: 18 },
  adContainer: { marginVertical: 20, height: 70 },
  footerAd: { marginTop: 20, height: 260, alignItems: 'center' }
});