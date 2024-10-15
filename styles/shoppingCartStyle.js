import { StyleSheet } from 'react-native'


const styles = StyleSheet.create({
    container: {
        flex: 100,

    },
    header: {
        flex: 7,
        alignContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 10,

    },
    body: {
        flex: 93,
        paddingHorizontal: 15,
        marginTop: 10
    },
    boxSearch: {
        flex: 6.5,
        borderWidth: 1,
        flexDirection: 'row',

        borderColor: 'grey',


    },
    iconShop: {
        flex: 0.5,
        justifyContent: 'center',
        marginLeft: 10
    },
    textSearch: {
        marginLeft: 10
    },
    item: {
        flex: 100,
        height: 140,
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    itemImage: {
        flex: 40,
    },
    rate: {
        flexDirection: 'row',
        alignContent: 'center',
    },
    infGv: {
        flexDirection: 'row',
        marginBottom: 5
    },
    itemContent: {
        flex: 60,
        paddingLeft: 10,
       
        position: 'relative',

    },
    price: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center'
    },
    tongTien:
    {
        flexDirection: 'row',
        alignSelf: 'flex-end'
    },
    headerItem:
    {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }

})

export default styles