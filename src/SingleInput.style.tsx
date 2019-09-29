import { StyleSheet } from 'react-native';

export const UnderlinedStyles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'transparent',
        width: 30,
        alignSelf: 'center',
        margin: 5,
    },
    inputStyle: {
        color: 'grey',
        fontSize: 20,
        fontWeight: 'bold',
        width: 30,
        textAlign: 'center',
        alignSelf: 'center',
    },
    inputContainerStyle: {
        borderBottomWidth: 2,
        borderBottomColor: '#b4bbbf',
        width: 30,
        alignSelf: 'center',
    },
    disabledInputStyle: {
        color: '#b4bbbf',
        fontWeight: 'bold',
    },
});

export const OutlinedStyles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'transparent',
        width: 30,
        alignSelf: 'center',
        margin: 5,
    },
    inputStyle: {
        color: 'grey',
        fontSize: 20,
        fontWeight: 'bold',
        width: 30,
        textAlign: 'center',
        alignSelf: 'center',
    },
    inputContainerStyle: {
        borderWidth: 2,
        borderColor: '#b4bbbf',
        borderRadius: 10,
        width: 30,
        alignSelf: 'center',
    },
    disabledInputStyle: {
        color: '#b4bbbf',
        fontWeight: 'bold',
    },
});

export const ContainedStyles = StyleSheet.create({
    containerStyle: {
        width: 30,
        alignSelf: 'center',
        margin: 5,
    },
    inputStyle: {
        color: 'grey',
        fontSize: 20,
        fontWeight: 'bold',
        width: 30,
        textAlign: 'center',
        alignSelf: 'center',
    },
    inputContainerStyle: {
        backgroundColor: '#d9dcde',
        borderBottomWidth: 0,
        borderRadius: 10,
        width: 30,
        alignSelf: 'center',
    },
    disabledInputStyle: {
        color: '#b4bbbf',
        fontWeight: 'bold',
    },
});