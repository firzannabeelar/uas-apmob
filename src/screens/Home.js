import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Selamat Datang</Text>
        <Text style={styles.headerSubtitle}>Manager</Text>
      </View>
      
      {/* Main Content */}
      <TouchableOpacity onPress={() => navigation.navigate('lnf')}
        style={styles.playlist}>
        <Image
          source={require('./pegawai.jpg')} 
          style={styles.image}
        />
        <Text style={styles.text}>Pegawai</Text>
        <Text style={styles.bawah}>Tampilkan Seluruh Pegawai</Text>
      </TouchableOpacity>
    
      <TouchableOpacity onPress={() => navigation.navigate('Detail1')}
        style={styles.playlist}>
        <Image
          source={require('./jobdesk.jpg')} 
          style={styles.image}
        />
        <Text style={styles.text}>Jobdesk</Text>
        <Text style={styles.bawah}>Atur Jobdesk Pegawai</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Detail2')}
        style={styles.playlist}>
        <Image
          source={require('./monitor.jpg')} 
          style={styles.image}
        />
        <Text style={styles.text}>Monitor Jobdesk</Text>
        <Text style={styles.bawah}>Memonitoring Jobdesk Pegawai</Text>
      </TouchableOpacity>
      
       {/* Container Tombol */}
       <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Credit')}>
          <Text style={styles.buttonText}>Credit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.buttonOut} onPress={() => navigation.navigate('login')}>
          <Text style={styles.buttonText}>LogOut</Text>
        </TouchableOpacity>
      </View> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#007bff',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#fff',
    marginTop: 5,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  bawah: {
    fontSize: 16,
    marginTop: 5,
    color: '#666',
  },
  image: {
    width: 350,
    height: 100,
    borderRadius: 20,
    marginVertical: 15,
  },
  playlist: {
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    backgroundColor: '#007bff',
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonOut: {
    flex: 1,
    backgroundColor: '#FF0000',
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Home;
