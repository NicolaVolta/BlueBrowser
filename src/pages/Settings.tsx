import { Input, Button, Text } from '@rneui/themed';
import React from 'react'
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Configuration } from '../db/entities/Configuration';
import { Utils } from '../utils/Utils';
import ExitApplicationModule from '../nativeModule/ExitApplicationModule';
import { useNavigate } from 'react-router-native';
import { useDatabaseContext } from '../context/DatabaseContextProvider';

export default function Settings() {
    const {configurations, setConfiguration} = useDatabaseContext();
    const [settings, setSettings] = useState<Array<Configuration>>([]);
    const navigator = useNavigate();

    useEffect(() => {
        setSettings(configurations);
    }, [configurations]);

    const handleChanges = (configurationId : string, value : string) : void => {
        if(Utils.isNullOrUndefined(settings)) return;

        setSettings((oldValue) => {
            oldValue.forEach(el => {
                if(el.configurationId!==configurationId) return;

                el.confivurationValue=value;
            });

            return oldValue;
        });
    }

    const handleSave = () : void => {
        settings.forEach(el => {
            setConfiguration(el.configurationId, el.confivurationValue);
        });

        goBack();
    }

    const goBack = () : void => {
        navigator("/");
    }

    const handleExit = () : void => {
        ExitApplicationModule.closeApplication();
    }

    if(Utils.isNullOrUndefined(settings)) return <Text h2>Caricamento in corso...</Text>

    return (
        <View style={{height:'100%', width:'100%', backgroundColor:'#fff'}}>
            <View style={{display:'flex', flexDirection:'column', padding:20}}>
                {settings.map((el : Configuration, index) => (
                    <Input key={index} 
                        defaultValue={el.confivurationValue} 
                        label={el.configurationId}
                        onChangeText={(value) => handleChanges(el.configurationId, value)}/>
                ))}
            </View>
            <View style={{width:'100%', padding:20}}>
                <Button buttonStyle={{padding:5}} onPress={() => goBack()}>Annulla</Button>
                <Button buttonStyle={{padding:5}} onPress={() => handleSave()}>Salva</Button>
                <Button buttonStyle={{padding:5}} color="error" onPress={() => handleExit()}>Esci</Button>
            </View>
        </View>
    )
}
