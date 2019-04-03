import React ,{Component} from 'react';
import { View, Text, Image,StyleSheet,TextInput,TouchableOpacity,AsyncStorage } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';
import {commentAdded,fetchComment,commentTextChanged} from '../src/actions/movies_action';
import {LinearGradient} from 'expo';
import firebase from 'firebase';
import {connect} from 'react-redux';
class MovieInfo extends Component{
    componentWillMount(){
        //console.log("-------------------------------")
        const movieuid = this.props.navigation.state.params.movie.uid;
      this.props.fetchComment(movieuid);
      this.createDataSource(this.props.comment)
      };
  
      componentWillReceiveProps(nextProps){
        //console.log("**********************")
        this.createDataSource(nextProps);
        //console.log(nextProps);
      }
  
      createDataSource(props){
       
       console.log(props.comment);
      }
    
     
      onChangeText = (text) => {
          this.props.commentTextChanged(text);
      }
      onSubmitEditing = ({ nativeEvent: { text } }) => {
        this.props.commentTextChanged(text);
        this.submit;
      };
    
      onSubmit = async(text) =>{
          const movieuid = this.props.navigation.state.params.movie.uid;
         this.props.commentAdded({text,movieuid});
      }
      submit = () => {
        const { commentText } = this.props;
        if (commentText) {
          this.props.commentTextChanged({commentText:undefined});
          this.onSubmit(commentText);
        } else {
          alert('Please enter your comment first');
        }
      };
    static navigationOptions = ({navigation,state }) => {
        
        return{
         headerTitle:'Movie',
         headerStyle: {height: 40},
         headerBackground: (
             <LinearGradient
               colors={['#5ED2A0', '#339CB1']}
               style={{ flex: 1 }}
               start={[0, 0]}
               end={[1, 0]}
             />
           ),
             //headerRight: <Button title='Log Out ' onPress={()=>{const p = navigation.getParam('signoutuser');p()}} />
        };
      }
    render(){
        return(
            <View style={styles.container}>  
            <View styles = {{flex:1}}>
              <Card
              title = {this.props.navigation.state.params.movie.name + "("+this.props.navigation.state.params.movie.year+")"}
               titleStyle={styles.titleStyle}
               image={require('../assets/mgmap.png')}>
             </Card>
             <View>
             <View style={styles.cmt_container}>
          <TextInput
            placeholder="Add a comment..."
            style={styles.input}
            value={this.props.commentText}
            onChangeText={this.onChangeText} // handle input changes
            onSubmitEditing={this.onSubmitEditing} // handle submit event
          />
          {/* Post button */}
          <TouchableOpacity
            style={styles.button}
            onPress={this.submit}
          >
            {/* Apply inactive style if no input */}
            <Text style={[styles.text, !this.props.commentText ? styles.inactive : []]}>Post</Text>
          </TouchableOpacity>
        </View>
           </View>
           </View>
          
           {/* <View style={styles.container}>
        <ScrollView>
          {comments.map((comment, index) => <Comment comment={comment} key={index} />)}
        </ScrollView>
      </View> */}
           {/* <View style={styles.ccontainer}>
        <View style={styles.avatarContainer}>
          {avatar && <Image
            resizeMode='contain'
            style={styles.avatar}
            source={{ uri: avatar }}
          />}
        </View>
        <View style={styles.contentContainer}>
          <Text>
            <Text style={[styles.text, styles.name]}>rajat</Text>
            {' '}
            <Text style={styles.text}>{}</Text>
          </Text>
          <Text style={[styles.text, styles.created]}>6july</Text>
        </View>
      </View> */}
         </View>
       
        );
    }
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
    backgroundColor: '#fff',
    },
    viewStyle: {
      justifyContent: 'center',
      flex: 1,
      backgroundColor:'white',
      //marginTop: Platform.OS == 'ios'? 30 : 0
    },
    textStyle: {
      padding: 10,
    },
    titleStyle:{
      fontSize:20,
      fontWeight: 'bold',
    },
    cmt_container: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#EEE',
        alignItems: 'center',
        paddingLeft: 15,
      },
      input: {
        flex: 1,
        height: 40,
        fontSize: 15,
      },
      button: {
        height: 40,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
      },
      inactive: {
        color: '#CCC',
      },
      text: {
        color: '#3F51B5',
        fontWeight: 'bold',
       
        textAlign: 'center',
        fontSize: 15,
      },
      ccontainer: {
        flexDirection: 'row',
      },
      avatarContainer: {
        alignItems: 'center',
        marginLeft: 5,
        paddingTop: 10,
        width: 40,
      },
      contentContainer: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: '#EEE',
        padding: 5,
      },
      avatar: {
        borderWidth: 1,
        borderColor: '#EEE',
        borderRadius: 13,
        width: 26,
        height: 26,
      },
      text: {
        color: '#000',
       
        fontSize: 15,
      },
      name: {
        fontWeight: 'bold',
      },
      created: {
        color: '#BBB',
      },
  });
  const mapStateToProps = ({movie}) =>{
    const { comment,commentText } = movie;
   return {comment,commentText};
 }
export default connect(mapStateToProps,{
fetchComment,commentTextChanged,commentAdded
})(MovieInfo);