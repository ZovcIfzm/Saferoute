import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

class Input extends Component {
  //const { route, navigation } = props
  //const { item } = route.params
  //const { latitude, longitude, destination, mode_of_transit } = item
  constructor(props) {
    //constructor to set default state
    super(props);
    this.state = {      
      latitude: "",
      longitude: "",
      destination: "",
      mode_of_transit: "",
      loading: true,
      sessionID: '',
      dataSource: []
    };
  }
  render(){
    const { navigation } = this.props
    return (
     
    <View style={styles.container}>
        <TextInput
          style={styles.text}
          placeholder="Latitude"
          returnKeyType="next"
          onChangeText={latitude => this.setState({ latitude })}
        />
        <TextInput

          style={styles.text}
          placeholder="Longitude"
          returnKeyType="next"
          onChangeText={longitude => this.setState({ longitude })}
        />
        <TextInput

          style={styles.text}
          placeholder="Destination"
          returnKeyType="next"
          onChangeText={destination => this.setState({ destination })}
        />
        <TextInput

          style={styles.text}
          placeholder="Mode of Transit"
          returnKeyType="done"
          onChangeText={mode_of_transit => this.setState({ mode_of_transit })}
        />
        <Button
          style={styles.buttonText}
          title="Submit"
          onPress={() => this.fetchAndNavigate()}
        />
      </View>
    )
  }

  fetchAndNavigate(){
    this.onFetchLoginRecords();
  }

  onFetchLoginRecords() {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    //var raw = JSON.stringify({"lat":"41.785906","long":"-87.644919","destination":"59th Street & Princeton","mode_of_transit":"walk"});
    var raw = JSON.stringify({
      lat: this.state.latitude,
      long: this.state.longitude,
      destination: this.state.destination,
      mode_of_transit: this.state.mode_of_transit});

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    try {
      fetch(
        "https://hoohacks-saferoute.appspot.com/", requestOptions)
        .then(response => response.json())
        .then((responseJson) => {
          this.setState({
            loading: false,
            dataSource: responseJson,
            sessionID: responseJson.sessionId
          })
        });
        if (this.state.sessionID != 0) {
          alert("Data sent successfully!!!");
          this.props.navigation.navigate('Map', { item: this.state });
        }
        else{
          alert("Destination too far away. Please enter destination with 200 miles of current location.");
        }
    } catch (errors) {

      alert(errors);
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ebebeb'
  },
  text: {
    color: '#101010',
    fontSize: 24,
    fontWeight: 'bold'
  },
  buttonContainer: {
    backgroundColor: '#222',
    borderRadius: 5,
    padding: 10,
    margin: 20
  },
  buttonText: {
    fontSize: 20,
    color: '#fff'
  }
})



export default Input