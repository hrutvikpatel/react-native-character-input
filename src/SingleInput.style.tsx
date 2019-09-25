import { StyleSheet } from 'react-native';

export const UnderlinedStyles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'transparent',
        paddingBottom: 10,
        width: 30,
        alignSelf: 'center',
    },
    inputStyle: {
        color: 'grey',
        fontSize: 20,
        fontWeight: 'bold',
        width: 24,
        textAlign: 'center',
        alignSelf: 'center',
    },
    inputContainerStyle: {
        borderBottomWidth: 2,
        borderBottomColor: 'grey',
        width: 24,
        alignSelf: 'center',
    },
    disabledInputStyle: {
        color: 'grey',
        fontWeight: 'bold',
    },
    hide: { 
        borderBottomWidth: 0,
        paddingTop: 1,
        paddingBottom: 1
    },
});

export const OutlinedStyles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'transparent',
        paddingBottom: 10,
        width: 30,
        alignSelf: 'center',
    },
    inputStyle: {
        color: 'grey',
        fontSize: 20,
        fontWeight: 'bold',
        width: 24,
        textAlign: 'center',
        alignSelf: 'center',
    },
    inputContainerStyle: {
        borderWidth: 2,
        borderColor: 'grey',
        borderRadius: 10,
        width: 24,
        alignSelf: 'center',
    },
    disabledInputStyle: {
        color: 'grey',
        fontWeight: 'bold',
    },
    hide: { 
        borderWidth: 0,
        paddingTop: 2,
        paddingBottom: 2
    },
});

export const ContainedStyles = StyleSheet.create({
    containerStyle: {
        backgroundColor: 'black',
        paddingBottom: 10,
        width: 30,
        alignSelf: 'center',
    },
    inputStyle: {
        color: 'grey',
        fontSize: 20,
        fontWeight: 'bold',
        width: 24,
        textAlign: 'center',
        alignSelf: 'center',
    },
    inputContainerStyle: {
        borderRadius: 10,
        width: 24,
        alignSelf: 'center',
    },
    disabledInputStyle: {
        color: 'grey',
        fontWeight: 'bold',
    },
    hide: {
        backgroundColor: 'transparent',
    },
});