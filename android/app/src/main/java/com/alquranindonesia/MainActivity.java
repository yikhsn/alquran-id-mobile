package com.alquranindonesia;

import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen; // import for react-native-splashscreen
import android.os.Bundle; // import for react-native-splashscreen

public class MainActivity extends ReactActivity {

    // react-native-splash-screen
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);  // here
        super.onCreate(savedInstanceState);
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "AlQuranIndonesia";
    }
}
