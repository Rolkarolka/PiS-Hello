import React, {useDebugValue, useEffect, useState} from 'react';
import { View, StyleSheet, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import GoogleSignInButton from '../../components/GoogleSignInButton';
import { useNavigation } from '@react-navigation/core';
import Card from '../../components/Card';
import OverscreenModal from '../../components/OverscreenModal';
import LoadingScreenModal from '../../components/LoadingScreenModal';
import backgroundImage from '../../assets/purple-bg.jpg';
import purple from '../../assets/gradient.png';
import { useDispatch, useSelector } from 'react-redux';
import { logInAsync } from 'expo-google-app-auth';
import * as authActions from '../../actions/auth';

export default function SignInScreen() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [failureModalVisible, setFailureModalVisible] = useState(false);
    const [waitingForResponse, setWaitingForResponse] = useState(false);

    const token = useSelector((state) => state.auth.token);
    const loginResponse = useSelector((state) => state.auth.loginResponseTimestamp);

    const dispatch = useDispatch();
    const navigation = useNavigation();

    useEffect(() => {
        setWaitingForResponse(false);
        if (loginResponse == null)
            return;
        if (token != null)
            navigation.navigate('HomeScreen');
        else
            setFailureModalVisible(true);
    }, [loginResponse]);

    const onSignInPressed = async () => {
        setWaitingForResponse(true);
        dispatch(authActions.signIn(username, password));
    }

    const onRegisterPressed = () => {
        navigation.navigate('Register');
    }

    return (
        <View style={styles.screenView}>
            <StatusBar translucent backgroundColor='transparent' />
            <View style={{...StyleSheet.absoluteFillObject, backgroundColor: '#7967F0'}}>
                {/* <Image 
                    resizeMode='stretch'
                    source={purple}
                    blurRadius={100}
                /> */}
            </View>
            
            <Card style={styles.mainCard}>
                <Image
                    source={backgroundImage}
                    style={StyleSheet.absoluteFillObject}
                    blurRadius={10}
                />
                <View style={styles.formRow}>
                    <Text style={styles.text}>Login</Text>
                    <Card style={styles.inputCard}>
                        <TextInput
                            value={username}
                            onChangeText={setUsername}
                            placeholder='Wprowadź nazwę użytkownika...'
                            style={styles.input}
                        />
                    </Card>
                </View>
                <View style={styles.formRow}>
                    <Text style={styles.text}>Hasło</Text>
                    <Card style={styles.inputCard}>
                        <TextInput
                            value={password}
                            onChangeText={setPassword}
                            placeholder='Wprowadź hasło...'
                            style={styles.input}
                            secureTextEntry={true}
                        />
                    </Card>
                </View>
                <View style={{flexDirection: 'row', marginVertical: 15,}}>
                    <View style={{flex: 1}} />
                    <GoogleSignInButton>Sign in with Google</GoogleSignInButton>
                    <View style={{flex: 1}} />
                    <TouchableOpacity style={styles.signInButton} onPress={onSignInPressed} >
                        <Text style={styles.signInText }>Zaloguj</Text>
                    </TouchableOpacity>
                    <View style={{flex: 1}} />
                </View>
            </Card>

            <TouchableOpacity style={{margin: 10}} onPress={onRegisterPressed}>
                <Text style={{color: 'white'}}>Nie masz konta? Zarejestruj się</Text>
            </TouchableOpacity>
            <LoadingScreenModal amIVisible={waitingForResponse} />
            <OverscreenModal
                title={"Logowanie nie powiodło się"}
                message={"Serwer odrzucił próbę logowania. Sprawdź, czy wprowadzone hasło na pewno jest prawidłowe."}
                buttonType={'back'}
                buttonColor={'#9932CC'}
                onClick={ () => setFailureModalVisible(false) }
                amIVisible={failureModalVisible}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screenView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 25,
    },
    mainCard: {
        width: '100%',
        overflow: 'hidden',
        padding: 15,
        alignItems: 'center',
        borderRadius: 30,
        marginVertical: 20,
        elevation: 10,
    },
    formRow: {
        height: 90,
        width: '100%',
        alignItems: 'stretch',
        justifyContent: 'center',
        marginVertical: 10,
    },
    text: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center',
    },
    inputCard: {
        flex: 1,
        paddingHorizontal: 5,
        marginHorizontal: 10,
        marginVertical: 10,
    },
    input: {
        fontFamily: 'open-sans',
        flex: 1,
        textAlign: 'center',
    },
    signInButton: {
        margin: 0,
        height: 40,
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#4285F4',
    },
    signInText: {
        fontFamily: 'open-sans',
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
    }

});