import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput, FlatList, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from "firebase";
import Ionicons from "react-native-vector-icons/Ionicons";

const background = require("../assets/bg.png");

var {novoX, lista} = [];
var  {xNota, xNotaDb} = "";
    
function Nadas(){
  var nada = [];
  for(var i4 = 0; i4 < 31; i4++){
    nada[i4] = "0";
  }
  novoX = nada;
}
 
function ExtrairDados(){
  var item1 = [];
  for(var i1 = 0; i1 < 31 ; i1++){
    var nome = firebase.database().ref("turmas/2AM/aluno" + i1 +"/nome/");
    nome.on('value', (snapshot) => {
    var data = snapshot.val();
    item1[i1] = data;
    });
  }

  var item2 = [];
  for(var i2 = 0; i2 < 31 ; i2++){
    var qntx = firebase.database().ref("turmas/2AM/aluno" + i2 +"/qnt_de_x/");
    qntx.on('value', (snapshot) => {
    var data = snapshot.val();
    item2[i2] = data;
    });
  }

  var lista2 = [];
  for(var i3 = 1; i3 < 31 ; i3++){
    lista2[i3-1] = {nome: item1[i3], qntx: item2[i3], num:i3};
  }
  lista = lista2;

  var item3 = "";
  var xNotaDb2 = firebase.database().ref("/turmas/2AM/XpraNota/");
  xNotaDb2.on('value', (snapshot) => {
  var data = snapshot.val();
  item3 = data;
  });
  xNotaDb = item3;  
}

function AtualizarDados1(){
  var dados = xNota;
  var updates = {};
  updates['/turmas/2AM/XpraNota/'] = dados;
  return firebase.database().ref().update(updates);
}

function AtualizarDados2(numero, novoX){
  var dados = novoX[numero];
  var updates = {};
  updates["/turmas/2AM/aluno" + numero + "/qnt_de_x/"] = dados;
  return firebase.database().ref().update(updates);
}

function Renderizar({item}){
  var vazio = false;
  item.nome == "" ? vazio = true : vazio = false;

  return(
    <View style={styles.fundo2}>
      <Text style={ vazio ? styles.invisivel : styles.aluno}>
        {item.nome}: {item.qntx}X
      </Text>
      <TextInput style={vazio ? styles.invisivel : styles.caixaTexto}
        onChangeText={txt => novoX[item.num] = txt}
        placeholder={"NovoX"}
        placeholderTextColor={"#007799"}/>
      <TouchableOpacity style={vazio ? styles.invisivel : styles.butao}
        onPress={() => AtualizarDados2(item.num, novoX)}>
        <Ionicons
          name={"checkmark-outline"}
          size={40}
          color={"#FFFFFF"}/>
      </TouchableOpacity>
    </View>
  );
}

keyExtractor = (item, index) => index.toString();

function SegundoAM(){
  ExtrairDados();
  Nadas();
  const navigation = useNavigation();

  return (
    <View style={styles.fundo}>
      <Image source={background} style={styles.bg}>
      </Image>
      <View style={styles.fundo4}>
        <TouchableOpacity style={styles.butaoVoltar, styles.posicaoBut}
          onPress={()=> navigation.navigate("Turmas")}>
          <Ionicons
            name={"arrow-back"}
            size={40}
            color={"#FF0000"}/>
        </TouchableOpacity>
        <Text style={styles.titulo}>
          2AM
        </Text>
      </View>
      <View style={styles.fundo3}>
        <Text style={styles.aluno}>
          X necessário para nota: {xNotaDb}X
        </Text>
        <TextInput style={styles.caixaTexto}
          onChangeText={txt => xNota = txt}
          placeholder={"NovoX"}
          placeholderTextColor={"#007799"}/>
        <TouchableOpacity style={styles.butao}
          onPress={() => AtualizarDados1()}>
          <Ionicons
            name={"checkmark-outline"}
            size={40}
            color={"#FFFFFF"}/>
        </TouchableOpacity>
      </View>
      <FlatList
        data={lista}
        renderItem={Renderizar}
        keyExtractor={keyExtractor}
      />
    </View>
  );
} export default SegundoAM;

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
    marginTop: 10,
    height: 40,
    width: 60,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    color: "black"
  },
  fundo2: {
    flexDirection: "row",
    alignItems: "center"
  },
  fundo3: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 15
  },
  fundo4: {
    flexDirection: "row",
    justifyContent: "center"
  },
  butao: {
    marginTop: 10,
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
  invisivel: {
    opacity: 0
  }
});
