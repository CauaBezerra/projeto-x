import React, { Component } from "react";
import { Text, View, StyleSheet, Alert, TouchableOpacity, TextInput, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from "firebase";

const background = require("../assets/bg.png");

var {emailProf, emailAluno} = [];

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
}

function FazerLogin (email, senha, navigation){
  firebase.auth().signInWithEmailAndPassword(email, senha)
  .then(() => {
  for(var i3 = 0; i3 < 10 ; i3++){
    if(email == emailProf[i3]){ navigation.navigate("Turmas");}}
  for(var i4 = 0; i4 < 10 ; i4++){
    if(email == emailAluno[i4]){ navigation.navigate("Aluno", {email:email});}}
  })
  .catch((error) => {
    Alert.alert(error.message);
  });
}

function Login(){
  const navigation = useNavigation();
  ExtrairDados();
  var {email1, senha1} = " ";

  return(
    <View style={styles.fundo}>
      <Image source={background} style={styles.bg}>
      </Image>
      <Text style={styles.titulo}>
        Login
      </Text>
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
        onChangeText={senha => senha1 =senha}
        placeholder={"Insira sua senha"}
        placeholderTextColor={"#777777"}
        secureTextEntry
      />
      <TouchableOpacity style={styles.butao}
        onPress={() => FazerLogin(email1, senha1, navigation)}>
        <Text style={[styles.textoButao, styles.posicaoTxtBut, {textShadowOffset: {width: 2,height: 2,}}]}>Confirmar</Text>
        <Text style={[styles.textoButao, styles.posicaoTxtBut, {textShadowOffset: {width: -2,height: 2,}}]}>Confirmar</Text>
        <Text style={[styles.textoButao, styles.posicaoTxtBut, {textShadowOffset: {width: 2,height: -2,}}]}>Confirmar</Text>
        <Text style={[styles.textoButao, styles.posicaoTxtBut, {textShadowOffset: {width: -2,height: -2,}}]}>Confirmar</Text>
      </TouchableOpacity>
    </View>  
  );
} export default Login;

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
    marginTop: 40,
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
    marginTop: 50,
    alignSelf: "center",
    height: 60,
    width: 300,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#63FF83",
    borderRadius: 12
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
});
