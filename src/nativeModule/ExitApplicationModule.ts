import { NativeModules } from "react-native"
const { ExitApplicationModule } = NativeModules;

export interface ExitApplicationInterface{
    closeApplication : () => void
}

export default ExitApplicationModule as ExitApplicationInterface;