import { Input } from '@rneui/base';
import { Dialog } from '@rneui/themed';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Utils } from '../utils/Utils';
import { useNavigate } from 'react-router-native';
import { UNLOCK_PASSWORD_CONFIGURATION_ID } from '../constants';
import { useDatabaseContext } from '../context/DatabaseContextProvider';

interface PasswordDialogProps{
    show : boolean
    onDialogClose : (open : boolean) => void
}

export default function PasswordDialog({ show, onDialogClose } : PasswordDialogProps) {
    const {configurations, getConfiguration} = useDatabaseContext();
    const [configPassword, setConfigPassword] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showError, setShowError] = useState<boolean>(false);
    const navigator = useNavigate();

    useEffect(() => {
        let configuration = getConfiguration(UNLOCK_PASSWORD_CONFIGURATION_ID);

        if(Utils.isNullOrUndefined(configuration)) return;

        setConfigPassword(configuration.confivurationValue);

    },[configurations]);

    const handleConfirmation = () : void => {
        if(password.toLowerCase()!==configPassword.toLowerCase()) return setShowError(true);
        
        setShowError(false);
        navigator("settings");
    }

    return (
        <Dialog isVisible={show}>
            <Dialog.Title title="Inserisci la password"/>
            {/*@ts-ignore*/}
            <Input placeholder='Password' 
                onChangeText={(value) => setPassword(value)}
                errorMessage={showError ? "Password errata" : ""}
                secureTextEntry={true}/>

            <Dialog.Actions>
                <Dialog.Button title="Conferma" onPress={() => handleConfirmation()}/>
                <Dialog.Button title="Annulla" onPress={() => onDialogClose(false)}/>
            </Dialog.Actions>
        </Dialog>
    )
}
