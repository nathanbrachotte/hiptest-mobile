/**
 * Created by nathanbrachotte on 14/11/17.
 */
import {StyleSheet} from 'react-native'


export default StyleSheet.create({
    title: {
        fontSize : 50,
        backgroundColor: '#282828',
        textAlign:'center',
        color: '#FFFFFF',
        marginBottom:5,
    },
    container: {
    },
    body:{
        backgroundColor: '#FFFFFF',
        flexDirection: 'column',
        justifyContent: 'space-around',

    },
    button:{
        backgroundColor:'#FD6963',
        borderWidth: 1,
        padding: 1,
        borderColor: '#FD6963',
        marginBottom:5,
    },
    buttonText:{
        textAlign:'center',
    },
    buttonMargin:{
        marginBottom:5,
    },
    inputText:{
        height: 40,
    },
    boutonWrapper:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    statusUndefined:{
        color : '#525350',
    },
    statusPassed:{
        color : '#3aff35',
    },
    statusFailed:{
        color : '#770d0d',
    },

})