import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    container:{
        flex:100,
        marginTop: 10
    },
    header:{
        flex:7,
        justifyContent:'center',
        alignItems:'center',
        paddingHorizontal: 10,
        paddingRight:10
    },
    body:{
        flex:93,
        paddingHorizontal: 15,
        marginTop:10
        
    },
    item:{
        flex: 100,
        height: 140,
        marginBottom:15,
        flexDirection:'row',
        justifyContent: 'space-between'
    },
    itemContent:{
        flex: 60,
        paddingLeft: 10,
    },
    itemImage:{
        flex: 40,
    },
    rate:{
        flexDirection:'row',
        alignContent:'center',
    },
    price:{
        flexDirection:'row',
        
    },
    userImage:{
        height: 20,
        width: 20
    }

})

export default styles