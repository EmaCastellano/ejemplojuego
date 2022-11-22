import React, { useState} from "react";
import { View, Text, Button, TouchableWithoutFeedback, Keyboard, Alert, ScrollView } from 'react-native';
import { styles } from './styles';
import { Card, Input, NumberContainer } from "../../components";
import colors from "../../constants/colors";

const StartGame = ({onStartGame}) => {
    const [number, setNumber] = useState('');
    const [selectedNumber, setSelectedNumber] = useState(null);
    const [confirmed, setConfirmed] = useState(false);

    const onHandleChange = (value) => {
        setNumber(value.replace(/[^0-9]/g, ''));
    }

    const onHandleReset = () => {
        setNumber('');
        setConfirmed(false);
    }

    const onHandleConfirm = () => {
        const chosenNumber = parseInt(number, 10);
        if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Número inválido', 'El número tiene que estar entre 1 y 99', [{text: 'Okay', style: 'destructive', onPress: onHandleReset}]);
        } else {
            setConfirmed(true);
            setSelectedNumber(chosenNumber);
            setNumber('');
        }
    }

    const confirmedOutput = () => confirmed ? (
        <Card style={styles.confirmedContainer}>
            <Text style={styles.confirmedTitle}>Tú número seleccionado</Text>
            <NumberContainer number={selectedNumber} />
            <Button 
                title="Empieza el juego"
                onPress={() => onStartGame(selectedNumber)}
                color={colors.primary}
            />
        </Card>
    ) : null;

    return (
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
        }}>
            <ScrollView style={styles.containerScroll}>
                <View style={styles.container}>
                    <Text style={styles.title}>Empecemos!</Text>
                    <Card style={styles.inputContainer}>
                        <Text style={styles.label}>Seleccioná un número</Text>
                        <Input
                            style={styles.input}
                            placeholder="0" 
                            maxLength={2}
                            keyboardType="number-pad"
                            blurOnSubmit
                            autoCapitalize="none"
                            autoCorrect={false}
                            onChangeText={onHandleChange}
                            value={number}
                        />
                        <View style={styles.buttonContainer}>
                            <Button
                                title="Restablecer"
                                onPress={onHandleReset}
                                color={colors.secondary}
                            />
                            <Button 
                                title="Confirmar"
                                onPress={onHandleConfirm}
                                color={colors.primary}
                            />
                        </View>
                    </Card>
                    {confirmedOutput()}
                </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    )
}

export default StartGame;