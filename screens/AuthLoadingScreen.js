import React from 'react';
import {
    View,
    StatusBar,
    StyleSheet,
    AsyncStorage,
    ActivityIndicator
} from 'react-native';

export class AuthLoadingScreen extends React.Component {
    componentDidMount() {
        this.bootstrapAsync();
    }

    async bootstrapAsync() {
        const accessToken = await AsyncStorage.getItem('accessToken');
        this.props.navigation.navigate(accessToken ? 'AppNavigator' : 'AuthNavigator');
    };

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});