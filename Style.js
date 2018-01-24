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
    headerScenario:{
    flex : 1,
    flexDirection:"row",
    justifyContent: "space-between",
    backgroundColor:"#FFFFFF",
        borderBottomWidth:1,
    },
    bodyScenario:{
    flex : 6,
    backgroundColor:"#FFFFFF",
    },
    infoScenario:{
        flex : 2,
        flexDirection: "row",
        backgroundColor:"#FFFFFF"
    },
    footerScenario:{
    flex : 1,
        flexDirection : "row",
        backgroundColor:"#FFFFFF",
        justifyContent:"space-between"
    },
    containerScenario:{
        flexDirection: 'column',
        flex:1,
    },

    indiceSteps:{
        flex : 1,
        backgroundColor:"#959691",
        justifyContent : "center",
        alignItems:"center"
    },
    nomSteps:{
        flex:3,
        flexDirection:"row",
        justifyContent:'center',
        alignItems:"center"
    },
    resultSteps:{
        flex:1,
        justifyContent : "center",
        alignItems:"center"
    },
    titreInfo:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        borderWidth:1,
        borderColor:"black"
    },
    contenuInfo:{
        flex:3,
        borderWidth:1,
        borderColor:"black",
        justifyContent:"center"
    },
    buttonView:{
        flex:1,
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
    }


})