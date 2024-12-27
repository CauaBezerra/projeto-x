import React, { Component } from "react";
import { Text, View, StyleSheet, Alert, TouchableOpacity, TextInput, Image} from 'react-native';
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from '@react-navigation/native';
import firebase from "firebase";

const background = require("../assets/bg.png");

var numAlunos = "";

function ExtrairDados(){
  var item1 = [];
  for(var i1 = 0; i1 < 10 ; i1++){
    var email1 = firebase.database().ref("usuarios/professores/Prof" + i1 +"/email/");
    email1.on('value', (snapshot) => {
    const data = snapshot.val();
    item1[i1] = data;
    });
  }
  emailProf = item1;

  var item2 = [];
  for(var i2 = 0; i2 < 10 ; i2++){
    var email2 = firebase.database().ref("usuarios/alunos/aluno" + i2 +"/email/");
    email2.on('value', (snapshot) => {
    const data = snapshot.val();
    item2[i2] = data;
    });
  }
  emailAluno = item2;

  var numAlunos2 = firebase.database().ref("usuarios/alunos/numeroAlunos/");
  numAlunos2.on('value', (snapshot) => {
  const data = snapshot.val();
  numAlunos = data + 1;
  });
}

function FazerCadastro (email, senha, nome, turma, navigation){
  var teste = [];
  for(var i1 = 0; i1 < 31 ; i1++){
    var nomeTeste = firebase.database().ref("turmas/" + turma +"/aluno" + i1 +"/nome/");
    nomeTeste.on('value', (snapshot) => {
    var data = snapshot.val();
    teste[i1] = data;
    });
  }

  var ok = false;
  if(nome == null){
     Alert.alert("O nome não foi inserido");
  }
  else if(email == null){
    Alert.alert("O email não foi inserido");
  }else if(senha == null){
    Alert.alert("A senha não foi inserida");
  }else{
    for(var i2 = 0; i2 < 31 ; i2++){
      if(teste[i2] == nome){
        firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then(() => {
          AdicionarConta(email, nome, turma, navigation);
        })
        .catch((error) => {
          Alert.alert("O email ou senha não foram inseridos devidamente ou o email já esta sendo utilizado");
        });
        ok = true;
      }
    } 
    if(ok !== true){
      Alert.alert("O nome não esta cadastrado na turma selecionada");
    }
  }
}

function AdicionarConta(email, nome, turma, navigation){
  var dados = {
    email: email,
    nome: nome,
    turma: turma,
    num: numAlunos
  };
  firebase.database().ref("usuarios/alunos/aluno" + numAlunos)
  .set(dados).then(() => {
    navigation.navigate("Login");
  }).catch((error) => {
    Alert.alert("erro");
  });
  var dados2 = numAlunos;
  var updates = {};
  updates["usuarios/alunos/numeroAlunos"] = dados2;
  return firebase.database().ref().update(updates);
}

function Cadastro(){
  const navigation = useNavigation();
  ExtrairDados();
  var {email1, senha1, nome1} = "";
  var turma1 = "1AM";

  return(
    <View style={styles.fundo}>
      <Image source={background} style={styles.bg}>
      </Image>
      <Text style={styles.titulo}>
        Cadastro
      </Text>
      <Text style={styles.texto}>
        nome completo:
      </Text>
      <TextInput style={styles.caixaTexto}
        onChangeText={nome => nome1 = nome}
        placeholder={"Insira seu nome"}
        placeholderTextColor={"#777777"}/>
      <Text style={styles.texto}>
        email:
      </Text>
      <TextInput style={styles.caixaTexto}
        onChangeText={email => email1 = email}
        placeholder={"Insira seu email"}
        placeholderTextColor={"#777777"}/>
      <Text style={styles.texto}>
        senha:
      </Text>
      <TextInput style={styles.caixaTexto}
        onChangeText={senha => senha1 = senha}
        placeholder={"Insira sua senha"}
        placeholderTextColor={"#777777"}
        secureTextEntry
      />
      <Text style={styles.texto}>
        turma:
      </Text>
      <DropDownPicker
        items={[
          { label: "1AM", value: "1AM" },
          { label: "1BM", value: "1BM" },
          { label: "2AM", value: "2AM" },
          { label: "2BM", value: "2BM" }
        ]}
        defaultValue={turma1}
        containerStyle={styles.turma}
        style={{ backgroundColor: "transparent" }}
        itemStyle={{justifyContent: "flex-start"}}
        dropDownStyle={{ backgroundColor: "#FFFFFF"}}
        arrowSize={25}
        labelStyle={{ color : "black", fontSize: 20}}
        onChangeItem={item => turma1 = item.value}
      />
      <TouchableOpacity style={styles.butao}
        onPress={() => FazerCadastro(email1, senha1, nome1, turma1, navigation)}>
        <Text style={[styles.textoButao, styles.posicaoTxtBut, {textShadowOffset: {width: 2,height: 2,}}]}>Confirmar</Text>
        <Text style={[styles.textoButao, styles.posicaoTxtBut, {textShadowOffset: {width: -2,height: 2,}}]}>Confirmar</Text>
        <Text style={[styles.textoButao, styles.posicaoTxtBut, {textShadowOffset: {width: 2,height: -2,}}]}>Confirmar</Text>
        <Text style={[styles.textoButao, styles.posicaoTxtBut, {textShadowOffset: {width: -2,height: -2,}}]}>Confirmar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.butao2}
        onPress={() => navigation.navigate("Login")}>
        <Text style={{fontSize: 20, color: "#33BBFF"}}>Login</Text>
      </TouchableOpacity>
    </View>  
  );
} export default Cadastro;

const styles = StyleSheet.create({
  bg: {
    height: "100%",
    width: "100%",
    position: "absolute",
    opacity: 0.1
  },
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
    marginTop: 30,
    marginLeft: 50,
    fontSize: 20,
  },
  caixaTexto: {
    marginTop: 5,
    height: 40,
    width: 300,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    color: "black",
    alignSelf: "center"
  },
  butao: {
    marginTop: 40,
    alignSelf: "center",
    height: 60,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#63FF83",
    borderRadius: 12
  },
  butao2: {
    marginLeft: 40,
    marginTop: 15,
    height: 30,
    width: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  textoButao: {
    fontSize: 30,
    fontWeight: "bold",
    color: '#FFFFFF',
    textShadowColor: '#000000',
    textShadowRadius: 1,
  }, 
  posicaoTxtBut: {
    position: 'absolute',
    top: "center",
    left: "center",
    right: "center",
    bottom: "center",
  },
  turma: {
    height: 50,
    width: 110,
    borderRadius: 10,
    marginTop: 5,
    marginLeft: 40,
    borderWidth: 1
  }
});
