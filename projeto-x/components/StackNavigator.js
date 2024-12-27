import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import Turmas from "../screens/Turmas";
import PrimeiroAM from "../screens/1AM";
import PrimeiroBM from "../screens/1BM";
import SegundoAM from "../screens/2AM";
import SegundoBM from "../screens/2BM";
import Login from "../screens/Login";
import Aluno from "../screens/Aluno";
import Edit1AM from "../screens/1AMedit";
import Edit1BM from "../screens/1BMedit";
import Edit2AM from "../screens/2AMedit";
import Edit2BM from "../screens/2BMedit";
import Cadastro from "../screens/Register";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Turmas" component={Turmas} />
      <Stack.Screen name="1AM" component={PrimeiroAM} />
      <Stack.Screen name="1BM" component={PrimeiroBM} />
      <Stack.Screen name="2AM" component={SegundoAM} />
      <Stack.Screen name="2BM" component={SegundoBM} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Aluno" component={Aluno} />
      <Stack.Screen name="1AMedit" component={Edit1AM} />
      <Stack.Screen name="1BMedit" component={Edit1BM} />
      <Stack.Screen name="2AMedit" component={Edit2AM} />
      <Stack.Screen name="2BMedit" component={Edit2BM} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;