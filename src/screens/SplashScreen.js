import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  const [animating, setAnimating] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      navigation.replace('login');
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>SIKERJA</Text>
      <Text style={styles.text}>Aplikasi Informasi Managerial Pegawai</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textHeader: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    fontWeight: 'regular',
  },
});

export default SplashScreen;
