import React, { Component } from "react";
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, TextInput, FlatList, Image, RefreshControl} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from "firebase";
import Ionicons from "react-native-vector-icons/Ionicons";

const background = require("../assets/bg.png");

var {novoNome, lista} = [];
    
function Nadas(){
  var nada = [];
  for(var i3 = 0; i3 < 31; i3++){
    nada[i3] = "";
  }
  novoNome = nada;
}
 
function ExtrairDados(){
  var item1 = [];
  for(var i1 = 0; i1 < 31 ; i1++){
    var nome = firebase.database().ref("turmas/2BM/aluno" + i1 +"/nome/");
    nome.on('value', (snapshot) => {
    var data = snapshot.val();
    item1[i1] = data;
    });
  }

  var lista2 = [];
  for(var i2 = 1; i2 < 31 ; i2++){
    lista2[i2-1] = {nome: item1[i2], num:i2};
  }
  lista = lista2;
}

function AtualizarDados(numero, novoNome){
  var dados = novoNome[numero];
  var updates = {};
  updates["/turmas/2BM/aluno" + numero + "/nome/"] = dados;
  return firebase.database().ref().update(updates);
}

function Renderizar({item}){
  return(
    <View style={styles.fundo2}>
      <Text style={styles.aluno}>
        {item.num}) {item.nome}:
      </Text>
      <View style={styles.fundo4}>
        <TextInput style={styles.caixaTexto}
          onChangeText={txt => novoNome[item.num] = txt}
          placeholder={"Novo Nome"}
          placeholderTextColor={"#007799"}/>
        <TouchableOpacity style={styles.butao}
          onPress={() => AtualizarDados(item.num, novoNome)}>
          <Ionicons
            name={"checkmark-outline"}
            size={40}
            color={"#FFFFFF"}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Reset(navigation){
  navigation.navigate("2BMedit");
}

keyExtractor = (item, index) => index.toString();

function Edit2BM(){
  Nadas();
  ExtrairDados();
  const navigation = useNavigation();
  var refreshing = false;
  const onRefresh = React.useCallback(() => {
    Reset(navigation);
    refreshing = true;
    setTimeout(() => {
      refreshing = false;
    }, 2000);
  }, []);

  return (
    <View style={styles.fundo}>
      <Image source={background} style={styles.bg}>
      </Image>
      <ScrollView 
        refreshControl = {<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={styles.fundo3}>
        <TouchableOpacity style={styles.butaoVoltar, styles.posicaoBut}
          onPress={()=> navigation.navigate("Turmas")}>
          <Ionicons
            name={"arrow-back"}
            size={40}
            color={"#FF0000"}/>
        </TouchableOpacity>
        <Text style={styles.titulo}>
          2BM
        </Text>
      </View>
      <FlatList
        data={lista}
        renderItem={Renderizar}
        keyExtractor={keyExtractor}
      />
      </ScrollView>
    </View>
  );
} export default Edit2BM;

const styles = StyleSheet.create({
  bg: {
    height: "100%",
    width: "100%",
    position: "absolute",
    opacity: 0.1
  },
  fundo: {
    flex: 1,
  },
  titulo: {
    marginTop: 70,
    marginBottom: 10,
    fontSize: 40,
    fontWeight: 'bold',
    color: "#FF4400",
  },
  aluno: {
    marginTop: 5,
    padding: 10,
    fontSize: 20
  },
  caixaTexto: {
    height: 40,
    width: 260,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    color: "black"
  },
  fundo2: {
     marginBottom: 10,
     marginTop: 10,
     marginLeft: 10
  },
  fundo3: {
    flexDirection: "row",
    justifyContent: "center"
  },
  fundo4: {
    flexDirection: "row",
    alignItems: "center"
  },
  butao: {
    marginLeft: 10,
    height: 40,
    width: 40,
    backgroundColor: "#00FF00",
    borderRadius: 10
  },
  butaoVoltar: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    position: "absolute"
  },
  posicaoBut: {
    position: 'absolute',
    top: 75,
    left: 10,
    right: 0,
    bottom: 0,
  },
});
