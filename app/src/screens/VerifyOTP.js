import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button, FormInput } from 'react-native-elements';
import axios from 'axios';

import Card from './../components/Card';
import CardSection from './../components/CardSection';

const ROOT_URL = 'https://us-central1-timepass-ed7e0.cloudfunctions.net';

class VerifyOTP extends Component {
   static navigationOptions = () => {
      return {
         title: ''
      };
   }

   state = { phone: '', code: '' };

   async verifyCode() {
      try {
         await axios.post(`${ROOT_URL}/verifyOtp`, {
            phone: this.state.phone,
            code: this.state.code
         });
      } catch (err) {
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
                        placeholder= 'ENTER YOUR CODE'
                        value={this.state.phone}
                        keyboardType='numeric'
                        onChangeText={phone => this.setState({ phone })}
                     />
                  </View>
               </CardSection>

               <CardSection>
                  <View style={{ alignItems: 'center', flex: 1 }}>
                     <Button
                        title='VERIFY CODE'
                        icon={{ name: 'smartphone' }}
                        color='#FFFFFF'
                        backgroundColor='rgba(0, 122, 255, 1)'
                        onPress={this.verifyCode}
                     />
                  </View>
               </CardSection>
            </Card>
         </View>
      )
   }
}

export default VerifyOTP;
