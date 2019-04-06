import React ,{Component} from 'react';
import { View, Text, Image,StyleSheet,TextInput,TouchableOpacity,ListView,Keyboard,Dimensions} from 'react-native'
import { Card} from 'react-native-elements'

import {commentAdded,fetchComment,commentTextChanged,fetchUserData} from '../src/actions/movies_action';
import {LinearGradient,ImagePicker} from 'expo';
import _ from 'lodash';
import {connect} from 'react-redux';
import {data }from './img';
class MovieInfo extends Component{
    componentWillMount(){
      this.props.fetchUserData();
      const movieuid = this.props.navigation.state.params.movie.uid;
      this.props.fetchComment(movieuid);
      this.createDataSource(this.props)
      };
  
      componentWillReceiveProps(nextProps){
        this.createDataSource(nextProps);
      }
      async  componentDidMount(){
        this.props.navigation.setParams({ imageAdder: this.imageAdder });
      }
      createDataSource(props){
        const commentdata = _.map(props.comment,(val,uid)=>{
          return {...val,uid}
       });
        const ds = new ListView.DataSource({
          rowHasChanged:(r1,r2) => r1!=r2
        });
        this.dataSource = ds.cloneWithRows(commentdata);
      }
    imageAdder = async ()=>{
      let result = await ImagePicker.launchImageLibraryAsync({
              allowsEditing: true,
              aspect: [4, 3],
              base64:true
            });
            const movieuid = this.props.navigation.state.params.movie.uid;
            const username = this.props.user.name;
            const type = 'image';
            const text = result.base64;
           this.props.commentAdded({text,movieuid,username,type});
            //console.log(result);
            // if (!result.cancelled) {
               //this.uploadImage(result.base64, "profile_pic")

            //     .then(() => {
            //       Alert.alert("Image Succesfully changed");
            //     })
            //     .catch((error) => {
            //       Alert.alert(error);
            //     });
            // }
    }
     
      onChangeText = (text) => {
          this.props.commentTextChanged(text);
      }
      onSubmitEditing = ({ nativeEvent: { text } }) => {
        this.props.commentTextChanged(text);
        this.submit;
      };
    
      onSubmit = async(text) =>{
        Keyboard.dismiss();
          const movieuid = this.props.navigation.state.params.movie.uid;
          const username = this.props.user.name;
          const type = 'text';
         this.props.commentAdded({text,movieuid,username,type});
      }
      submit = () => {
        const { commentText } = this.props;
        if (commentText) {
          this.props.commentTextChanged('');
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
           headerRight: //<Button title='' onPress={()=>{const p = navigation.getParam('signoutuser');p()}} />
           <TouchableOpacity
           style={styles.button}
           onPress={()=>{const p = navigation.getParam('imageAdder');p()} }
         >
           {/* Apply inactive style if no input */}
           <Text style={styles.text}>Post Image</Text>
         </TouchableOpacity>

        };
      }
      renderRow = (comment) =>{
        if(comment.type==='image'){
        return(
          <View style={styles.ccontainer}>
          <View style={styles.avatarContainer}>
             <Image
              resizeMode='contain'
              style={styles.avatar}
              source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }}
            />
          </View>
          <View style={styles.contentContainer}>
           
              <Text style={[styles.text, styles.name]}>{comment.username}</Text>
              <Image
              resizeMode='cover'
              style={styles.avatar2}
              source = {{uri: `data:image/jpeg;base64,${comment.text}`}}
              />
           
            <Text style={[styles.text, styles.created]}>{comment.commentDate}</Text> 
           
          </View>
        </View>
        );
          }
         else if(comment.type==='text'){
          return(
            <View style={styles.ccontainer}>
            <View style={styles.avatarContainer}>
               <Image
                resizeMode='contain'
                style={styles.avatar}
                source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg' }}
              />
            </View>
            <View style={styles.contentContainer}>
              <Text>
                <Text style={[styles.text, styles.name]}>{comment.username}</Text>
                {' '}
                <Text style={styles.text}>{comment.text}</Text>
              </Text>
              <Text style={[styles.text, styles.created]}>{comment.commentDate}</Text>
            </View>
          </View>
          );
         } 
      }
    render(){
     
        return(
            <View style={styles.container}>  
            <View styles = {{flex:1}}>
              <Card
              title = {this.props.navigation.state.params.movie.name + "("+this.props.navigation.state.params.movie.year+")"}
               titleStyle={styles.titleStyle}
               image={require("../assets/movie.jpg")}>
               <Text>{this.props.navigation.state.params.movie.desc}</Text>
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
            <Text style={[styles.btext, !this.props.commentText ? styles.inactive : []]}>Post</Text>
          </TouchableOpacity>
        </View>
           </View>
           </View>
          
           <View style={styles.container}>
           <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
        />
      </View>
         
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
      fontSize:15,
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
      imagebutton: {
        height: 40,
        paddingHorizontal: 2,
        alignItems: 'center',
        justifyContent: 'center',
      },
      inactive: {
        color: '#CCC',
      },
      btext: {
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
        paddingTop: 2,
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
      avatar2: {
        borderWidth: 1,
        borderColor: '#EEE',
        borderRadius: 13,
        width: Dimensions.get('window').width-100,
        height: Dimensions.get('window').height-400,
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
    const { comment,commentText,user } = movie;
   return {comment,commentText,user};
 }
export default connect(mapStateToProps,{
fetchComment,commentTextChanged,commentAdded,fetchUserData
})(MovieInfo);