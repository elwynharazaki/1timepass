import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button, FormInput } from 'react-native-elements';
import axios from 'axios';

import Card from './../components/Card';
import CardSection from './../components/CardSection';

const ROOT_URL = 'https://us-central1-timepass-ed7e0.cloudfunctions.net';

class RequestOTP extends Component {
   static navigationOptions = () => {
      return {
         title: 'TODO LIST'
      };
   }

   state = { phone: '' };

   async requestCode() {
      try {
         await axios.post(`${ROOT_URL}/requestOtp`, { phone: this.state.phone });
         this.props.navigation.navigate('verify');
      } catch (error) {
         alert(error);
      }
   }

   render() {
      return (
         <View>
            <Card>
               <CardSection>
                  <View style={{ flex: 1 }}>
                     <FormInput
                        placeholder= 'ENTER YOUR PHONE NUMBER'
                        value={this.state.phone}
                        keyboardType='numeric'
                        onChangeText={phone => this.setState({ phone: phone })}
                     />
                  </View>
               </CardSection>

               <CardSection>
                  <View style={{ alignItems: 'center', flex: 1 }}>
                     <Button
                        title='REQUEST CODE'
                        icon={{ name: 'smartphone' }}
                        color='#FFFFFF'
                        backgroundColor='rgba(0, 122, 255, 1)'
                        onPress={this.requestCode.bind(this)}
                     />
                  </View>
               </CardSection>
            </Card>
      </View>            
      )
   }
}

export default RequestOTP;
