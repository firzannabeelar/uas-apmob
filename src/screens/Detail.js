import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const App = () => {
  const [listPegawai, setListPegawai] = useState([]);
  const [listJobdesk, setListJobdesk] = useState([]);
  const [selectedPegawai, setSelectedPegawai] = useState(null);
  const [selectedJobdesk, setSelectedJobdesk] = useState(null);

  useEffect(() => {
    // Fetch list pegawai
    fetch("http://192.168.0.191/api_rn/api.php")
      .then((response) => response.json())
      .then((json) => {
        setListPegawai(json.data.result);
      })
      .catch((error) => {
        console.log(error);
      });

    // Fetch list jobdesk
    fetch("http://192.168.0.191/api_rn/api.php?op=list_jobdesk")
      .then((response) => response.json())
      .then((json) => {
        setListJobdesk(json.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const assignJobdesk = () => {
    if (!selectedPegawai || !selectedJobdesk) {
      alert("Harap pilih pegawai dan jobdesk.");
      return;
    }

    fetch("http://192.168.0.191/api_rn/api.php?op=assign_jobdesk", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `pegawai_id=${selectedPegawai}&jobdesk_id=${selectedJobdesk}`,
    })
      .then((response) => response.json())
      .then((json) => {
        alert("Jobdesk berhasil ditambahkan.");
        setSelectedPegawai(null);
        setSelectedJobdesk(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Atur Jobdesk Pegawai</Text>
      </View>

      <View style={styles.viewForm}>
        <Text style={styles.label}>Pilih Pegawai:</Text>
        <Picker
          selectedValue={selectedPegawai}
          onValueChange={(itemValue) => setSelectedPegawai(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Pilih Pegawai" value={null} />
          {listPegawai.map((pegawai) => (
            <Picker.Item
              key={pegawai.id}
              label={`${pegawai.nama} - ${pegawai.npm}`}
              value={pegawai.id}
            />
          ))}
        </Picker>

        <Text style={styles.label}>Pilih Jobdesk:</Text>
        <Picker
          selectedValue={selectedJobdesk}
          onValueChange={(itemValue) => setSelectedJobdesk(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Pilih Jobdesk" value={null} />
          {listJobdesk.map((jobdesk) => (
            <Picker.Item
              key={jobdesk.id}
              label={jobdesk.nama_jobdesk}
              value={jobdesk.id}
            />
          ))}
        </Picker>

        <Button title="Tambahkan Jobdesk" onPress={assignJobdesk} />
      </View>

      <View style={styles.viewData}>
        <Text style={styles.sectionTitle}>Daftar Pegawai</Text>
        <FlatList
          data={listPegawai}
          renderItem={({ item }) => (
            <View style={styles.viewList}>
              <Text style={styles.textListNama}>{item.npm} - {item.nama}, Branch Office: {item.program_studi}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  viewForm: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  picker: {
    height: 50,
    backgroundColor: '#dedede',
    borderRadius: 8,
    marginBottom: 15,
  },
  viewData: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  viewList: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#dedede',
  },
  textListNama: {
    fontSize: 16,
  },
});

export default App;
