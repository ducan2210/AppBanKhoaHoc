import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    title:{
       color:'#8eaaf7',
       fontWeight:'bold',
       fontSize:35,

    },
    top:{
        flex: 30,
        alignItems:'center',
        justifyContent:'center',
        
    },
    center:{
        flex:40,
        marginTop:50
    },
    bottom:{
       flex:30,
       marginTop:50,

    },
    container:{
        flex:100,
       
        marginHorizontal:30,
        marginTop:50,
    },
    input:{
        borderRadius:5,
        backgroundColor:'#ededed',
        paddingHorizontal:10,
        paddingVertical: 5,
    },
    questLogin:
    {
        marginTop:10,
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems:'center',
      
    },
    Button:
    {
        backgroundColor: '#225aeb',
        borderRadius:8,
        marginHorizontal: 50,
        alignItems:'center',
        justifyContent:'center'
    },
    txtLogin:{
        color:'#ffffff',
        fontSize: 24,
        paddingVertical:10,
        paddingHorizontal: 10
    },
    usedAcc:
    {
        flexDirection:'row',
        marginTop:20,
        marginHorizontal: 50,
        alignItems:'center',
        justifyContent:'center'
    },
    login:{
        color:'#2c63ef',
        fontSize:24,
        fontWeight:'bold'
    },
    line:{
        flex:1,
        height:1,
        backgroundColor:'black',
        
    },
})
export default styles