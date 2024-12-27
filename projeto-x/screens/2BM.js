import React, { Component } from "react";
import { Text, View, ScrollView, StyleSheet, TouchableOpacity, TextInput, FlatList, Image, RefreshControl} from 'react-native';
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
    var nome = firebase.database().ref("turmas/2BM/aluno" + i1 +"/nome/");
    nome.on('value', (snapshot) => {
    var data = snapshot.val();
    item1[i1] = data;
    });
  }

  var item2 = [];
  for(var i2 = 0; i2 < 31 ; i2++){
    var qntx = firebase.database().ref("turmas/2BM/aluno" + i2 +"/qnt_de_x/");
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
  var xNotaDb2 = firebase.database().ref("/turmas/2BM/XpraNota/");
  xNotaDb2.on('value', (snapshot) => {
  var data = snapshot.val();
  item3 = data;
  });
  xNotaDb = item3;  
}

function AtualizarDados1(){
  var dados = xNota;
  var updates = {};
  updates['/turmas/2BM/XpraNota/'] = dados;
  return firebase.database().ref().update(updates);
}

function AtualizarDados2(numero, novoX){
  var dados = novoX[numero];
  var updates = {};
  updates["/turmas/2BM/aluno" + numero + "/qnt_de_x/"] = dados;
  return firebase.database().ref().update(updates);
}

function Renderizar({item}){
  var vazio = false;
  item.nome == "" ? vazio = true : vazio = false;

  return(
    <View>
      <Text style={ vazio ? styles.invisivel : styles.aluno}>
        {item.nome}: {item.qntx}X
      </Text>
      <View style={styles.fundo2}>
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
    </View>
  );
}

function Reset(navigation){
  navigation.navigate("2BM");
}

keyExtractor = (item, index) => index.toString();

function SegundoBM(){
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
      <View style={styles.fundo4}>
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
      <View style={styles.fundo3}>
        <Text style={styles.aluno2}>
          X necessário para nota: {xNotaDb}X
        </Text>
        <TextInput style={styles.caixaTexto2}
          onChangeText={txt => xNota = txt}
          placeholder={"NovoX"}
          placeholderTextColor={"#007799"}/>
        <TouchableOpacity style={styles.butao2}
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
      </ScrollView>
    </View>
  );
} export default SegundoBM;

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
    marginBottom: 5,
    marginTop: 10,
    marginLeft: 10,
    fontSize: 20
  },
  aluno2: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 20
  },
  caixaTexto: {
    marginBottom: 20,
    marginLeft: 10,
    height: 40,
    width: 60,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    color: "black"
  },
  caixaTexto2: {
    marginTop: 10,
    marginLeft: 10,
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
    marginBottom: 20,
    marginLeft: 10,
    height: 40,
    width: 40,
    backgroundColor: "#00FF00",
    borderRadius: 10
  },butao2: {
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
