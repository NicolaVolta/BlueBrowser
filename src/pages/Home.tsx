import React, { useRef, useState } from 'react';
import { View } from 'react-native';
import { TapGestureHandler } from 'react-native-gesture-handler';
import PasswordDialog from '../components/PasswordDialog';
import WebViewComponent from '../components/WebViewComponent';

export default function Home() {
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const tenTapsRef=useRef(null);

    return (
        <TapGestureHandler ref={tenTapsRef} numberOfTaps={10} onEnded={() => setShowDialog(true)}>
            <View style={{width:'100%', height:'100%'}}>
                <WebViewComponent/>
                <PasswordDialog show={showDialog} onDialogClose={setShowDialog}/>
            </View>
        </TapGestureHandler>
    )
}