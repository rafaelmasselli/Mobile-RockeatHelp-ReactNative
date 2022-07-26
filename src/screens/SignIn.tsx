import { useState } from "react";
import { Heading, VStack, Icon, useTheme } from "native-base";

import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";

import { Input } from "../components/Input";
import { Button } from "../components/Button";

import { Envelope, Key } from "phosphor-react-native";
import Logo from "./../assets/logo_primary.svg";

export function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { colors } = useTheme();
  function handleLogin() {
    setIsLoading(true);
    if (!email || !password) {
      setIsLoading(false);
      return Alert.alert("Entrar", "Informe e-mail e senha");
    }
    auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        console.log(err);
        setIsLoading(false);

        if (
          err.code == "auth/invalid-email" ||
          err.code == "auth/wrong-password"
        ) {
          return Alert.alert("Entrar", "E-mail ou senha invalido!");
        }

        if (err.code == "auth/user-not-found") {
          return Alert.alert("Entrar", "Usuário nao cadastrado");
        }

        return Alert.alert('Entrar', 'Nao foi possível acessar')
      });
  }
  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <Logo />
      <Heading color="gray.100" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta
      </Heading>

      <Input
        placeholder="E-mail"
        mb={4}
        InputLeftElement={
          <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
        }
        onChangeText={setEmail}
      />
      <Input
        mb={8}
        placeholder="Senha"
        InputLeftElement={<Icon as={<Key color={colors.gray[300]} />} ml={4} />}
        secureTextEntry
        onChangeText={setPassword}
      />

      <Button
        title="Entrar"
        w="full"
        onPress={handleLogin}
        isLoading={isLoading}
      />
    </VStack>
  );
}
