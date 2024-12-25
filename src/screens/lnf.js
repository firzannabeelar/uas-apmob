import React, { Component, useEffect, useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList } from 'react-native';

  const App = () => {
    const [listData, setlistData] = useState([]);
    const [npm, setNPM] = useState("");
    const [nama, setNama] = useState("");
    const [programstudi, setProgramstudi] = useState("");
    const [isEdit, setIsEdit] = useState("");
    const [id, setId] = useState(null);


    const namaFitur = 'Pegawai';
    

    useEffect(() => {
      fetch("http://192.168.0.191/api_rn/api.php")
      .then((response) => response.json())
      .then((json) => {
        console.log("Hasil yang didapat: " + JSON.stringify(json.data.result));
        setlistData(json.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
      }, []);
    
    const simpan = async () => {
      if (!nama) {
        alert("Nama harus diisi");
        return;
      }
      if (!npm) {
        alert("ID Pegawai Harus Diisi");
        return;
      }
      if (!programstudi) {
        alert("Divisi Harus Diisi");
        return;
      }
      fetch("http://192.168.0.191/api_rn/api.php?op=create", {
        method: "POST",
        
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        
        body: "nama=" + nama + "&npm=" + npm + "&program_studi=" + programstudi,
      })
        .then((response) => response.json())
        .then((json) => {
          console.log("Hasil yang didapat: " + json.data.result);
          alert("Data berhasil ditambahkan");
          setNama("");
          setNPM("");
          setProgramstudi("");
          setIsEdit("");
          fetch("http://192.168.0.191/api_rn/api.php")
            .then((response) => response.json())
            .then((json) => {
              console.log(
                "Hasil yang didapat: " + JSON.stringify(json.data.result)
              );
              setlistData(json.data.result);
            });
          });
        };

    const update = async () => {
      fetch("http://192.168.0.191/api_rn/api.php?op=update&id=" + id, {
        method: "POST",
        
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        
        body: "nama=" + nama + "&npm=" + npm + "&program_studi=" + programstudi,
      })
          
        .then((response) => response.json())
        .then((json) => {
          console.log("Hasil yang didapat: " + json.data.result);
          alert("Data berhasil diupdate");
          // navigation.replace("MainPage");
          setNama("");
          setNPM("");
          setProgramstudi("");
          setIsEdit("");
          fetch("http://192.168.0.191/api_rn/api.php")
            .then((response) => response.json())
            .then((json) => {
              console.log(
                "Hasil yang didapat: " + JSON.stringify(json.data.result)
              );
              setlistData(json.data.result);
            });
        });
      };

    const handle = async () => {
      if (!isEdit) {
        simpan();
      } else {
        update();
      }
    };

    const klikedit = async (id) => {
      fetch("http://192.168.0.191/api_rn/api.php?op=detail&id=" + id)
      .then((response) => response.json())
      .then((json) => {
        console.log("Hasil yang didapat: " + JSON.stringify(json.data.result));
        setNama(json.data.result[0].nama);
        setNPM(json.data.result[0].npm);
        setProgramstudi(json.data.result[0].program_studi);
        setId(json.data.result[0].id);
        setIsEdit(1);
      })
      .catch((error) => {
      console.log(error);
      });
    };

    const klikdelete = async (id) => {
      fetch("http://192.168.0.191/api_rn/api.php?op=delete&id=" + id)
      .then((response) => response.json())
      .then((json) => {
        console.log("Hasil yang didapat: " + json.data.result);
        alert("Data berhasil didelete");
        fetch("http://192.168.0.191/api_rn/api.php")
          .then((response) => response.json())
          .then((json) => {
            console.log(
              "Hasil yang didapat: " + JSON.stringify(json.data.result)
            );
            setlistData(json.data.result);
          });
        });
    };

    return(
      <View style={style.container}>
         <View style={style.header}>
                <Text style={style.headerTitle}>{namaFitur}</Text>
              </View>
        <View style={style.viewData}>
          <FlatList
            data={listData}
            renderItem={({ item }) => (
              <View style={style.viewList}>
                <Text style={style.textListNama}>
                  {item.npm}-{item.nama}-{item.program_studi}
                </Text>
                <Text
                  style={style.textListEdit}
                  onPress={() => klikedit(item.id)}
                >
                  Edit
                </Text>
                <Text
                  style={style.textListDelete}
                  onPress={() => klikdelete(item.id)}
                >
                  Delete
                </Text>
              </View>
            )}
          />
        </View>
       
      <View style={style.viewForm}>
        <TextInput
          style={style.textInput}
          placeholder="Masukkan ID Pegawai"
          value={npm}
          onChangeText={(npm) => setNPM(npm)}
        >  
        </TextInput>
        <TextInput
          style={style.textInput}
          placeholder="Masukkan Nama"
          value={nama}
          onChangeText={(nama) => setNama(nama)}
        >
        </TextInput>
        <TextInput
          style={style.textInput}
          placeholder="Masukkan Branch Office"
          value={programstudi}
          onChangeText={(programstudi) => setProgramstudi(programstudi)}
        ></TextInput>
        <Button title={isEdit ? "Update Data" : "Masukkan Data"} onPress={handle} />
      </View>
    </View>

    )
  }

  const style = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#f5f5f5',
    },
    viewWrapper:{
      flex:1
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
    viewForm:{
      flex:2,
      padding:10
    },
    viewData:{
      flex:4
    },
    textInput:{
      padding:10,
      fontSize:15,
      borderRadius:15,
      borderWidth:1,
      borderColor:'#CCCCCC',
      marginBottom:10,
      backgroundColor:'#dedede'
    },
    viewList:{
      flexDirection:'row',
      padding:5,
      borderBottomWidth:1,
      borderBottomColor:'#dedede'
    },
    textListNama:{
      flex:3,
      fontSize:20,
      fontWeight:'bold'
    },
    textListEdit:{
      color:'blue',
      marginRight:20
    },
    textListDelete:{
      color:'red'
    },
  });

export default App;
