import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({name: 'configuration'})
export class Configuration {
    @PrimaryColumn()
    configurationId : string

    @Column()
    confivurationValue : string

    constructor(configurationId : string, confivurationValue : string){
        this.configurationId=configurationId;
        this.confivurationValue=confivurationValue;
    }
}