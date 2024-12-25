import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CreditsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SIKERJA</Text>
      <Text style={styles.subtitle}>Aplikasi Managerial Jobdesk Pegawai</Text>
      
      <View style={styles.teamSection}>
        <Text style={styles.teamHeader}>Kelompok 2</Text>
        
        <View style={styles.membersList}>
          <View style={styles.memberItem}>
            <Text style={styles.memberName}>Galang Rizqian Falah</Text>
            <Text style={styles.memberNim}>22081010148</Text>
          </View>
          
          <View style={styles.memberItem}>
            <Text style={styles.memberName}>Firzannabeel Aqila Rafid</Text>
            <Text style={styles.memberNim}>22081010285</Text>
          </View>
          
          <View style={styles.memberItem}>
            <Text style={styles.memberName}>Darell Harin Pramudita Wibisono</Text>
            <Text style={styles.memberNim}>22081010338</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>Kembali ke Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  teamSection: {
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 30,
  },
  teamHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  membersList: {
    width: '100%',
  },
  memberItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  memberNim: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreditsScreen;