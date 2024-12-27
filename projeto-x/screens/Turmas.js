import React, { Component } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from "react-native-vector-icons/Ionicons";

const background = require("../assets/bg.png");

function Turmas(){
  const navigation = useNavigation();
  const texto1 = "1AM";
  const texto2 = "1BM";
  const texto3 = "2AM";
  const texto4 = "2BM";

  return (
    <View style={styles.fundo}>
      <Image source={background} style={styles.bg}>
      </Image>
      <Text style={styles.titulo}>
        Selecione a turma
      </Text>
      <View style={styles.fundo2}>
        <TouchableOpacity style={styles.butao}
          onPress={()=> navigation.navigate("1AM")}>
          <Text style={[styles.textoButao, styles.posicaoTxtBut, {textShadowOffset: {width: 2,height: 2,}}]}>{texto1}</Text>
          <Text style={[styles.textoButao, styles.posicaoTxtBut, {textShadowOffset: {width: -2,height: 2,}}]}>{texto1}</Text>
          <Text style={[styles.textoButao, styles.posicaoTxtBut, {textShadowOffset: {width: 2,height: -2,}}]}>{texto1}</Text>
          <Text style={[styles.textoButao, styles.posicaoTxtBut, {textShadowOffset: {width: -2,height: -2,}}]}>{texto1}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.butao2}
          onPress={()=> navigation.navigate("1AMedit")}>
          <Ionicons
            name={"pencil"}
            size={40}
            color={"#000000"}/>
        </TouchableOpacity>
      </View>
      <View style={styles.fundo2}>
        <TouchableOpacity style={styles.butao}
          onPress={()=> navigation.navigate("1BM")}>
          <Text style={[styles.textoButao, styles.posicaoTxtBut, {textShadowOffset: {width: 2,height: 2,}}]}>{texto2}</Text>
          <Text style={[styles.textoButao, styles.posicaoTxtBut, {textShadowOffset: {width: -2,height: 2,}}]}>{texto2}</Text>
          <Text style={[styles.textoButao, styles.posicaoTxtBut, {textShadowOffset: {width: 2,height: -2,}}]}>{texto2}</Text>
          <Text style={[styles.textoButao, styles.posicaoTxtBut, {textShadowOffset: {width: -2,height: -2,}}]}>{texto2}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.butao2}
          onPress={()=> navigation.navigate("1BMedit")}>
          <Ionicons
            name={"pencil"}
            size={40}
            color={"#000000"}/>
        </TouchableOpacity>
      </View>
      <View style={styles.fundo2}>
        <TouchableOpacity style={styles.butao}
          onPress={()=> navigation.navigate("2AM")}>
          <Text style={[styles.textoButao, styles.posicaoTxtBut, {textShadowOffset: {width: 2,height: 2,}}]}>{texto3}</Text>
          <Text style={[styles.textoButao, styles.posicaoTxtBut, {textShadowOffset: {width: -2,height: 2,}}]}>{texto3}</Text>
          <Text style={[styles.textoButao, styles.posicaoTxtBut, {textShadowOffset: {width: 2,height: -2,}}]}>{texto3}</Text>
          <Text style={[styles.textoButao, styles.posicaoTxtBut, {textShadowOffset: {width: -2,height: -2,}}]}>{texto3}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.butao2}
          onPress={()=> navigation.navigate("2AMedit")}>
          <Ionicons
            name={"pencil"}
            size={40}
            color={"#000000"}/>
        </TouchableOpacity>
      </View>
      <View style={styles.fundo2}>
        <TouchableOpacity style={styles.butao}
          onPress={()=> navigation.navigate("2BM")}>
          <Text style={[styles.textoButao, styles.posicaoTxtBut, {textShadowOffset: {width: 2,height: 2,}}]}>{texto4}</Text>
          <Text style={[styles.textoButao, styles.posicaoTxtBut, {textShadowOffset: {width: -2,height: 2,}}]}>{texto4}</Text>
          <Text style={[styles.textoButao, styles.posicaoTxtBut, {textShadowOffset: {width: 2,height: -2,}}]}>{texto4}</Text>
          <Text style={[styles.textoButao, styles.posicaoTxtBut, {textShadowOffset: {width: -2,height: -2,}}]}>{texto4}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.butao2}
          onPress={()=> navigation.navigate("2BMedit")}>
          <Ionicons
            name={"pencil"}
            size={40}
            color={"#000000"}/>
        </TouchableOpacity>
      </View>
    </View>
  );
} export default Turmas;

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
  fundo2: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  titulo: { 
    marginTop: 70,
    marginBottom: 30,
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "#FF4400"
  },
  butao: {
    marginTop: 10,
    height: 75,
    width: 225,
    opacity: 0.6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#93B6FF",
    borderRadius: 12
  },
  butao2: {
    marginTop: 10,
    marginLeft: 5,
    height: 75,
    width: 75,
    opacity: 0.6,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#93B6FF",
    borderRadius: 12
  },
  textoButao: {
    fontSize: 30,
    fontWeight: "bold",
    color: '#FF0000',
    textShadowColor: 'white',
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
