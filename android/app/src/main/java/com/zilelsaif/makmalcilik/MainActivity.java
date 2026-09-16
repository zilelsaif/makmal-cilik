package com.zilelsaif.makmalcilik;

import android.os.Bundle;
import android.graphics.Color;
import androidx.activity.EdgeToEdge;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        // Match the launch theme while the first local HTML frame is loading.
        if (getBridge() != null) getBridge().getWebView().setBackgroundColor(Color.rgb(234, 246, 255));
    }
}
