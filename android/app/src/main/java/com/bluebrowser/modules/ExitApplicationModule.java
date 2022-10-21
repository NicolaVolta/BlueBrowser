package com.bluebrowser.modules;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class ExitApplicationModule extends ReactContextBaseJavaModule{
    private ReactApplicationContext m_ReactContext;

    public ExitApplicationModule(@Nullable ReactApplicationContext reactContext) {
        super(reactContext);
        this.m_ReactContext=reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "ExitApplicationModule";
    }

    @ReactMethod
    public void closeApplication(){
        m_ReactContext.getCurrentActivity().finishAndRemoveTask();
    }
}
