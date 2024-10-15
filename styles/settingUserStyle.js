import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    top:{
        flex: 10,
        alignItems:'center',
        justifyContent:'center',
      
    },
    userImage:{
        width: 100,
        height: 100,
      
    },
    Button:
    {

        backgroundColor: '#10a1ce',
        
        alignItems:'center',
        justifyContent:'center'
    },
    settingImage:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'

    },
    txtLogin:{
        color:'#ffffff',
        fontSize: 15,
        paddingVertical:10,
        paddingHorizontal: 10
    },
    input:{
        borderRadius:5,
        backgroundColor:'#ededed',
        paddingHorizontal:10,
        paddingVertical: 5,
    },
    center:{
        flex:80,
        marginTop:15
    },
    bottom:{
       flex:10,

      marginTop:50
    },
    questSetting:{
      
        flexDirection: 'row',
       justifyContent: 'space-between'
        

    },
    container:{
        flex:100,
       marginTop: 20,
        marginHorizontal:30,
    }
})

export default styles