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
        paddingTop: 20
    },
    boxSearch:{
        flex: 6.5,
        borderWidth:1,
        flexDirection: 'row',
        
        borderColor:'gray',
       
       
    },
    iconShop:{
        flex:0.5,
        justifyContent:'center',
        marginLeft: 10
    },
    textSearch:{
        marginLeft: 10
    },
    topSearchIteam:{
        borderRadius: 100,
        borderWidth:1,
        paddingHorizontal:10,
        paddingVertical: 10,
        marginRight: 10,
        marginVertical: 5
    },
    topSearchList:{
        flexDirection:'row',
        flexWrap: 'wrap',
    },
    danhMuc: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
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
        
    }

})

export default styles