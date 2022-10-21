import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { URL_CONFIGURATION_ID } from '../constants';
import WebView from 'react-native-webview';
import { Button, Skeleton, Text, } from '@rneui/themed';
import LinearGradient from 'react-native-linear-gradient';
import { View } from 'react-native';
import { useRef } from 'react';
import { useDatabaseContext } from '../context/DatabaseContextProvider';
import { Utils } from '../utils/Utils';

export default function WebViewComponent() {
    const {configurations, getConfiguration} = useDatabaseContext();
    const [url, setUrl] = useState<string>();
    const webViewRef = useRef<WebView>();

    useEffect(() => {
        let configuration = getConfiguration(URL_CONFIGURATION_ID);

        if(Utils.isNullOrUndefined(configuration)) return;

        setUrl(configuration.confivurationValue);

    }, [configurations]);

    const getLoadingPage = () => {
        return (
            <View>
                <Skeleton
                    LinearGradientComponent={LinearGradient}
                    animation="wave"
                    style={{width:'100%', height:'100%', position:'relative'}}
                />
                <View style={{width:'50%', height:'100%', position:'absolute', justifyContent:'center', alignSelf:'center'}}>
                    <Text h3 style={{color:"#6c757d"}}>Caricamento in corso...</Text>
                </View>
            </View>
        )
    }

    const getErrorPage = () => {
        return (
            <View style={{ height:'100%', position:'absolute', justifyContent:'center', alignSelf:'center'}}>
                <View>
                    <Text h3 style={{color:"#6c757d"}}>Errore nel caricamento...</Text>
                        <Button onPress={() => retryConnection()}>Ricarica</Button>
                </View>
            </View>
        );
    }

    const retryConnection = () => {
        webViewRef.current.reload();
    }

    return (
        <WebView 
            style={{width:'100%', height:'100%'}}
            source={{ uri: url }}
            renderLoading={() => getLoadingPage()}
            renderError={() => getErrorPage()}
            startInLoadingState
            ref={webViewRef}/>
        
    )
}
