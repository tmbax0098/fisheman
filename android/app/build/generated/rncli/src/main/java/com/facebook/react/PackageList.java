
package com.facebook.react;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainPackageConfig;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.ArrayList;

// @gregfrench/react-native-wheel-picker
import com.zyu.ReactNativeWheelPickerPackage;
// @react-native-community/async-storage
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
// @react-native-community/picker
import com.reactnativecommunity.picker.RNCPickerPackage;
// @react-native-community/toolbar-android
import com.reactnativecommunity.toolbarandroid.ReactToolbarPackage;
// react-native-fs
import com.rnfs.RNFSPackage;
// react-native-image-picker
import com.imagepicker.ImagePickerPackage;
// react-native-ssl-pinning
import com.toyberman.RNSslPinningPackage;
// react-native-text-input-mask
import com.RNTextInputMask.RNTextInputMaskPackage;
// react-native-vector-icons
import com.oblador.vectoricons.VectorIconsPackage;
// rn-fetch-blob
import com.RNFetchBlob.RNFetchBlobPackage;

public class PackageList {
  private Application application;
  private ReactNativeHost reactNativeHost;
  private MainPackageConfig mConfig;

  public PackageList(ReactNativeHost reactNativeHost) {
    this(reactNativeHost, null);
  }

  public PackageList(Application application) {
    this(application, null);
  }

  public PackageList(ReactNativeHost reactNativeHost, MainPackageConfig config) {
    this.reactNativeHost = reactNativeHost;
    mConfig = config;
  }

  public PackageList(Application application, MainPackageConfig config) {
    this.reactNativeHost = null;
    this.application = application;
    mConfig = config;
  }

  private ReactNativeHost getReactNativeHost() {
    return this.reactNativeHost;
  }

  private Resources getResources() {
    return this.getApplication().getResources();
  }

  private Application getApplication() {
    if (this.reactNativeHost == null) return this.application;
    return this.reactNativeHost.getApplication();
  }

  private Context getApplicationContext() {
    return this.getApplication().getApplicationContext();
  }

  public ArrayList<ReactPackage> getPackages() {
    return new ArrayList<>(Arrays.<ReactPackage>asList(
      new MainReactPackage(mConfig),
      new ReactNativeWheelPickerPackage(),
      new AsyncStoragePackage(),
      new RNCPickerPackage(),
      new ReactToolbarPackage(),
      new RNFSPackage(),
      new ImagePickerPackage(),
      new RNSslPinningPackage(),
      new RNTextInputMaskPackage(),
      new VectorIconsPackage(),
      new RNFetchBlobPackage()
    ));
  }
}
