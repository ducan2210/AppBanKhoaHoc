import { StyleSheet } from 'react-native'


const styles = StyleSheet.create({
    container:{
        flex:100,
        marginTop:50,
    },
    header:{
        flex:7,
        alignContent:'center',
        flexDirection:'row',
        justifyContent: 'space-between',

        paddingHorizontal:10,
        paddingVertical:10,
    },
    body:{
        flex:93,
        paddingHorizontal: 15,
        paddingTop: 20,
    },

    iconShop:{
        justifyContent:'center',
    },
    title:{
        justifyContent:'center'
    },
    settingUserBox:{
        marginBottom: 10,

    },
    settingUserButton:{
        backgroundColor: '#fbfdfe'
    },
    userProfile:{
        alignItems:'center',
        marginBottom: 20
    },
    userImage:{
        width: 170,
        height: 170,
        marginBottom: 20
    }
})

export default styles