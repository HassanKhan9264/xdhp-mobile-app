import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './app/helpers/navigationHelper';
import MainRoute from './app/routes/mainRoute';
import {StatusBar} from 'react-native';
import {AppColor} from './app/shared/appColors';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {getUser, getUserData, IsValidUser} from './app/helpers/localStorage';
import {MenuProvider} from 'react-native-popup-menu';
import TrackOrder from './app/screens/TrackOrder';
import Categories from './app/screens/Categories';
import CheckOutScreen from './app/screens/CheckOutScreen';
import MyCart from './app/screens/MyCart';
import ShippingAddress from './app/screens/ShippingAddress';
import ProdustScreen from './app/screens/ProdustScreen';
import SplashScreen from './app/screens/SplashScreen';
import {NativeBaseProvider, Box} from 'native-base';

function App(props) {
  const [isLoggedinCheck, setIsLoggedinCheck] = useState(false);
  const [route, setRoute] = useState('selection');
  useEffect(() => {
    checkInitial();
  }, []);

  const checkInitial = async () => {
    let user = await getUser();
    // console.log('user1235', user);
    if (user) setRoute('home');
    setIsLoggedinCheck(true);
  };

  if (!isLoggedinCheck) return <SplashScreen />;

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <StatusBar backgroundColor={AppColor.primary} />
        <NativeBaseProvider>
          <MenuProvider>
            <MainRoute route={route} />
          </MenuProvider>
        </NativeBaseProvider>
      </NavigationContainer>
    </SafeAreaProvider>
    // <TrackOrder />
    // <Categories />
    // <CheckOutScreen />
    // <MyCart />
    // <ShippingAddress />
    // <ProdustScreen />
  );
}

export default App;
