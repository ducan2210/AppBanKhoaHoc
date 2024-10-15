import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    container: {
        flex: 100,
    },
    video: {
        marginTop: -34,
        width: '100%',
        height: 300,
    },
    body: {
        flex: 70,
        marginTop: 50
    },
    boxVideo:{
        flex: 30
    },
    boxInfor:{
        marginVertical: 20,
        paddingHorizontal: 20,
        flex: 10
    },
    boxContent:{
        flex: 60
    },
    content:{
        flex: 1,
       
    },
    rowContent:{
       
        marginBottom: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#DDDDDD',
        padding: 1,
        marginVertical: 5,
        borderRadius: 5,
        alignItems: 'center'
      },
})

export default styles