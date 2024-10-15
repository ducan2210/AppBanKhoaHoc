import { StyleSheet } from 'react-native'


const styles = StyleSheet.create({
    container:{
        flex:100,
    },
    header:{
        flex:7,
        alignContent:'center',
        flexDirection:'row',
        justifyContent: 'center',
        alignItems:'center',
        paddingHorizontal:10,
        paddingVertical:10,
    },
    body:{
        flex:93,
        paddingHorizontal: 15,
        paddingTop: 20,
    },
    danhMuc: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    
    userImage:{
        width: 170,
        height: 170,
       
        borderRadius: 100
    },
    item:{
        flex: 100,
        height: 140,
        marginBottom:15,
        flexDirection:'row',
        justifyContent: 'space-between',
        marginTop: 10
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
        
    }
})

export default styles