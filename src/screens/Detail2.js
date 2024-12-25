import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity } from 'react-native';

const MonitorJobdesk = () => {
  const [assignedJobdesks, setAssignedJobdesks] = useState([]);

  useEffect(() => {
    fetchAssignedJobdesks();
  }, []);

  const fetchAssignedJobdesks = () => {
    fetch('http://192.168.0.191/api_rn/api.php?op=monitor_jobdesk')
      .then((response) => response.json())
      .then((json) => {
        setAssignedJobdesks(json.data.result);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const deleteJobdesk = (id) => {
    fetch(`http://192.168.0.191/api_rn/api.php?op=delete_assigned_jobdesk&id=${id}`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((json) => {
        alert(json.data.result);
        fetchAssignedJobdesks();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const markComplete = (id) => {
    fetch(`http://192.168.0.191/api_rn/api.php?op=complete_jobdesk&id=${id}`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((json) => {
        alert(json.data.result);
        fetchAssignedJobdesks();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Monitor Jobdesk</Text>
      <FlatList
        data={assignedJobdesks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.jobdeskItem}>
            <Text style={styles.text}>
              {item.nama_pegawai} - {item.jobdesk} ({item.status === '1' ? 'Selesai' : 'Belum Selesai'})
            </Text>
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.completeButton}
                onPress={() => markComplete(item.id)}
                disabled={item.status === '1'}
              >
                <Text style={styles.buttonText}>Selesai</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteJobdesk(item.id)}
              >
                <Text style={styles.buttonText}>Hapus</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#007bff',
  },
  jobdeskItem: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  completeButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MonitorJobdesk;
