import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    SafeAreaView,
    ScrollView,
    RefreshControl,
} from 'react-native';

const clientId = 'hardcoded client id'
const businessId = 'hardcoded business id'

export class ClientStateScreen extends React.Component {
    state = {
        refreshing: false,
        currentProcessLoaded: false
    }

    async componentDidMount() {
        this.fetchCurrentProcess()
    }

    onRefresh() {
        this.setState({
            refreshing: true
        })

        this.fetchCurrentProcess()

        this.setState({
            refreshing: false
        })
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView
                    contentContainerStyle={{ flex: 1 }}
                    refreshControl={
                        <RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.onRefresh()} />
                    }
                >
                    <View style={styles.body}>
                        {this.state.currentProcessLoaded && <Text style={styles.text}>{this.currentAmmountOfStamps()} / {this.targetAmmountOfStamps()}</Text>}
                    </View>
                    <View style={styles.buttonsView}>
                        <View style={styles.buttonView}>
                            <Button title={'QR Code'} color='black' onPress={() => this.props.navigation.navigate('QRCodeScreen', { 'clientId': clientId })} />
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>

        );
    }

    currentAmmountOfStamps() {
        return this.state.currentProcessLoaded ? this.state.currentProcess.stamps.length : ''
    }

    targetAmmountOfStamps() {
        return this.state.currentProcessLoaded ? this.state.currentProcess.processPolicy.targetAmount : ''
    }

    async fetchCurrentProcess() {
        var response = await fetch('http://192.168.43.92:8080/client/' + clientId + '/business/' + businessId + '/current-process', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });

        if (response.status !== 200) {
            this.setState({
                currentProcessLoaded: false
            })
            return;
        }

        var currentProcess = await response.json();

        this.setState({
            currentProcessLoaded: true,
            currentProcess: currentProcess
        })
    };
}

const styles = StyleSheet.create({
    body: {
        flex: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 64,
        fontWeight: 'bold'
    },
    buttonsView: {
        flex: 1,
        alignItems: 'center'
    },
    buttonView: {
        flex: 1,
        width: "80%",
        margin: 10
    }
});