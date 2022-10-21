import React from 'react'
import { useState, useEffect, createContext, useContext } from 'react';
import { DataSource } from 'typeorm';
import { UNLOCK_PASSWORD_CONFIGURATION_ID, URL_CONFIGURATION_ID } from '../constants';
import { Configuration } from '../db/entities/Configuration';
import { DbInit1666195198432 } from '../db/migrations/DbInit1666195198432';
import { Utils } from '../utils/Utils';

const DatabaseContext=createContext<DatabaseContextValueI>({});

export function useDatabaseContext(){
    return useContext(DatabaseContext); 
}

interface DatabaseContextValueI{
    configurations? : Configuration[]
    getConfiguration? : (configurationId : string) => Configuration
    setConfiguration? : (configurationId : string, newValue : string) => void
}

export default function DatabaseContextProvider({children} : any) {
    const [connection, setConnection] = useState<DataSource>(null);
    const [configurations, setConfigurations] = useState<Configuration[]>(null);

    useEffect(() => {
        let connection = new DataSource({
            type: 'react-native',
            database: 'browserConfig',
            location: 'default',
            logging: ['error', 'query', 'schema'],
            entities: [Configuration],
            synchronize: false,
            migrationsRun: true,
            migrations:[DbInit1666195198432]
        });
        
        connection.initialize()
        .then(async (res : DataSource) => {
            let configurationRepository=connection.getRepository(Configuration);

            configurationRepository.count()
            .then(async (res : number) => {
                if(res!==0) return;
    
                await configurationRepository.save(new Configuration(UNLOCK_PASSWORD_CONFIGURATION_ID, "cr52401"));
                await configurationRepository.save(new Configuration(URL_CONFIGURATION_ID, "https://demo.onlog.it:8442/OnLogGui"));
            })
            .then(() => {
                setConnection(res);

                configurationRepository.find()
                    .then((res) => {
                        console.log(res);
                        setConfigurations(res)
                    });
            });

            return res;
        });
    }, []);

    const getConfiguration = (configurationId : string) => {
        if(Utils.isNullOrUndefined(configurations)) return;

        return configurations.filter(el => el.configurationId===configurationId)[0];
    }

    const setConfiguration = (configurationId : string, newValue : string) => {
        let configurationRepository=connection.getRepository(Configuration);

        configurationRepository.save(new Configuration(configurationId, newValue))
            .then((newEl) => {
                setConfigurations((oldValue) => {
                    oldValue.forEach(oldEl => {
                        if(oldEl.configurationId!==newEl.configurationId) return;
        
                        oldEl.confivurationValue=newEl.confivurationValue;
                    });
        
                    return oldValue;
                });
            })
    }

    return (
        <DatabaseContext.Provider value={{configurations, getConfiguration, setConfiguration}}>
          {children}
        </DatabaseContext.Provider>
    )
}
