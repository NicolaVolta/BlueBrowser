import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import SystemNavigationBar from 'react-native-system-navigation-bar';
import { NativeRouter, Routes, Route } from 'react-router-native';
import DatabaseContextProvider from './src/context/DatabaseContextProvider';
import Home from './src/pages/Home';
import Settings from './src/pages/Settings';


//Be careful we don't want refresh inside here so no State
export default function App (){
    useEffect(() => {
        SystemNavigationBar.stickyImmersive();
    }, [])

    return (
        <NativeRouter>
            <GestureHandlerRootView  style={{ flex: 1 }}>
                <DatabaseContextProvider>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="settings" element={<Settings/>}/>
                    </Routes>
                </DatabaseContextProvider>
            </GestureHandlerRootView>
        </NativeRouter>
    );
};