import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from "firebase";

var emailDb = [];
var {nome, turma, qntx, xNota} = "";

function ExtrairDados(email){
  var item1 = [];
  for(var i1 = 0; i1 < 10 ; i1++){
    var email1 = firebase.database().ref("usuarios/alunos/aluno" + i1 +"/email/");
    email1.on('value', (snapshot) => {
    const data = snapshot.val();
    item1[i1] = data;
    });
  }
  emailDb = item1;

  var {item2, item3} = "";
  for(var i2 = 0; i2 < 10 ; i2++){
    if(email == emailDb[i2]){
      var nomeDb = firebase.database().ref("usuarios/alunos/aluno" + i2 +"/nome/");
      nomeDb.on('value', (snapshot) => {
      const data = snapshot.val();
      item2 = data;
      });
      var turmaDb = firebase.database().ref("usuarios/alunos/aluno" + i2 +"/turma/");
      turmaDb.on('value', (snapshot) => {
      const data = snapshot.val();
      item3 = data;
      });
    }
  }
  nome = item2;
  turma = item3;

  var item4 = [];
  var item5 = "";
  for(var i3 = 0; i3 < 10; i3++){
    var nomeDb2 = firebase.database().ref("turmas/" + turma +"/aluno" + i3 + "/nome/");
    nomeDb2.on('value', (snapshot) => {
    const data = snapshot.val();
    item4[i3] = data;
    });
    if(item4[i3] == nome){
      var qntxDb = firebase.database().ref("turmas/" + turma + "/aluno" + i3 + "/qnt_de_x/");
      qntxDb.on('value', (snapshot) => {
      const data = snapshot.val();
      item5 = data;
      });
    }
  }
  qntx = item5;

  item6 = "";
  var xNotaDb = firebase.database().ref("turmas/" + turma + "/XpraNota/");
  xNotaDb.on('value', (snapshot) => {
  const data = snapshot.val();
  item6 = data;
  });
  xNota = item6;

}

function Aluno({ route }){
  const email = route.params?.email;
  ExtrairDados(email);

  return(
    <View style={styles.fundo}>
      <Text style={styles.titulo}>
        Contagem de X
      </Text>
      <Text style={styles.texto}>
      {nome}
      </Text>
      <Text style={styles.texto}>
      Você tem {qntx}X
      </Text>
      <Text style={styles.texto}>
      Você precisa de:
      </Text>
      <Text style={styles.texto2}>
      {xNota}X
      </Text>
    </View>
  );
} export default Aluno;

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  titulo: {
    marginTop: 70,
    fontSize: 45,
    fontWeight: 'bold',
    color: "#FF4400",
    alignSelf: "center"
  },
  texto: {
    marginTop: 50,
    fontSize: 35,
    fontWeight: 'bold',
    color: "#FFCC00",
    alignSelf: "center"
  },
  texto2: {
    marginTop: 10,
    fontSize: 35,
    fontWeight: 'bold',
    color: "#FFCC00",
    alignSelf: "center"
  }
});
