import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import firebase from 'firebase';
import Expo from 'expo';

import config from './secret/firebaseconfig';
import RequestOTP from './src/screens/RequestOTP';
import VerifyOTP from './src/screens/VerifyOTP';
import ToDo from './src/screens/ToDo';

class App extends Component {
	componentDidMount() {
		firebase.initializeApp(config);
	}

	render() {
		const MainNavigator = StackNavigator({
			request: { screen: RequestOTP },
			verify: { screen: VerifyOTP },
			todo: { screen: ToDo }
		});

		return (
			<View style={{ flex: 1, paddingTop: Expo.Constants.statusBarHeight }}>
				<MainNavigator />
			</View>
		);
	}
}

export default App;
