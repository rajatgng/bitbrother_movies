
import {Card ,Button,Icon,ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
 import React,{Component} from 'react';
 import {signoutUser} from '../src/actions/auth_action'
 import { Text, View, StyleSheet,ListView,ScrollView ,AsyncStorage} from 'react-native';
 import {LinearGradient} from 'expo';
 import _ from 'lodash';
 import {fetchMovies,fetchComment,likesAdded} from '../src/actions/movies_action';


  class HomeScreen extends Component{ 

    componentWillMount(){
    this.props.fetchMovies();
    this.createDataSource(this.props.movies)
    };

    componentWillReceiveProps(nextProps){
     
      this.createDataSource(nextProps);
     
    }

    createDataSource(props){
      const moviesdata = _.map(props.movies,(val,uid)=>{
        return {...val,uid}
     });
     moviesdata.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)); 
   
      const ds = new ListView.DataSource({
        rowHasChanged:(r1,r2) => r1!=r2
      });
      this.dataSource = ds.cloneWithRows(moviesdata)
    }
   static navigationOptions = ({navigation,state }) => {
     return{
      headerTitle:"Let's Ride",
      headerStyle: {height: 40},
      headerBackground: (
          <LinearGradient
            colors={['#5ED2A0', '#339CB1']}
            style={{ flex: 1 }}
            start={[0, 0]}
            end={[1, 0]}
          />
        ),
          headerRight: <Button title='Log Out ' onPress={()=>{const p = navigation.getParam('signoutuser');p()}} />
     };
   }
    signout_User = ()=>{
      this.props.signoutUser();
      this.props.navigation.navigate('Auth');
    }
    async  componentDidMount(){
      // const login_token = await AsyncStorage.getItem('login_token');  
      // console.log("in Homescreen"); 
      // console.log(login_token);
       this.props.navigation.setParams({ signoutuser: this.signout_User });
 }
   btnAction =  (movie) =>{
   
    this.props.navigation.navigate('MovieInfo',{movie:movie});
   }
   likeAction = (movie) =>{
     this.props.likesAdded(movie.uid);
    var arr = _.values(movie.likes);
   }
  async matchUser(key){
    let token = await AsyncStorage.getItem('login_token')
     
      if(key===token){
       return true;
      }
      return false;
   }
   renderRow =   (movie) =>{
     
    var arr = _.values(movie.likes);
    let hashMap = {}
    for(var employee of arr){
      if(employee.likeduser in hashMap ){
      hashMap[employee.likeduser] = hashMap[employee.likeduser] + 1;  
      }else{
       hashMap[employee.likeduser] = 1;
      }
    }
    
   
    let outputArray = []
    let isCompleted=false
    Object.keys(hashMap).forEach(key => {  
      isCompleted=this.matchUser(key);
      outputArray.push({
        key,
        count: hashMap[key]
      })
    })
    //console.log(outputArray.length)

     return (<View style={styles.container}>  
        <View>
          <Card
           title={`${movie.name}(${movie.year})`}
           titleStyle={styles.titleStyle}
           image={require('../assets/mgmap.png')}>
           <View style = {{flexDirection:'row',justifyContent:'space-between',alignItems: 'flex-start',}}>

           <Text style={{marginBottom: 10,fontSize:20}}>
            {movie.genre}
           </Text>
           <View style = {{flexDirection:'row'}}>
           <Icon
              name="thumbs-up"
              color={isCompleted ? '#DE5347' : '#ccc'}
              type='font-awesome'
              size={25}
              onPress={() => {this.likeAction(movie)}}
            />
            <Text style={{fontSize:20,marginLeft:2,paddingTop:2}}>{outputArray.length}</Text>
           </View>
          
           </View>
           <Button
             onPress = {()=>{this.btnAction(movie)}}
             icon={<Icon name='code' color='#ffffff' />}
             backgroundColor='#03A9F4'
             buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
             title='See Details' 
             />
         </Card>
       </View>
     </View>);
   }
    render(){
      return(
    
        <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
        />
      );
  }
 }
 const styles = StyleSheet.create({
   container:{
     flex: 1,
   backgroundColor: '#fff',
   marginBottom:5
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
   }
   
 });
 
 const mapStateToProps = ({movie}) =>{
    const { movies } = movie;
    // const moviesdata = _.map(movies,(val,uid)=>{
    //   return {...val,uid}
    // });
   return {movies};
 }
 export default connect(mapStateToProps, {
   signoutUser,fetchMovies,fetchComment,likesAdded
 })(HomeScreen);