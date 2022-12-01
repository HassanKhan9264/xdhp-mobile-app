import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AppColor} from '../shared/appColors';
import Login from '../screens/login';
import Home from '../screens/home';
import {navigationRef} from '../helpers/navigationHelper';
import SignIn from '../screens/SignIn';
import SplashScreen from '../screens/SplashScreen';
import LoginSelections from '../screens/LoginSelections';
import Dashboard from '../screens/Dashboard';
import ProductOverView from '../screens/ProductOverView';
import LoginScreen from '../screens/LoginScreen';
import SocialHomeScreen from '../screens/SocialHomeScreen';
import UserPostScreen from '../screens/UserPostScreen';
import NotificationScreen from '../screens/NotificationScreen';
import ChatScreen from '../screens/ChatScreen';
import NewChatScreen from '../screens/NewChatScreen';
import InboxScreen from '../screens/InboxScreen';
import ProdustScreen from '../screens/ProdustScreen';
import MyCart from '../screens/MyCart';
import CheckOutScreen from '../screens/CheckOutScreen';
import ShippingAddress from '../screens/ShippingAddress';
import TrackOrder from '../screens/TrackOrder';
import DrawerRoute from './drawerRoute';
import StartPoll from '../screens/StartPollScreen';
import InviteFriend from '../screens/InviteFriend';
import CreateCampaign from '../screens/CreateCampaign';
import CreateJob from '../screens/createJob';
const Stack = createNativeStackNavigator();

function MainRoute({route = 'login'}) {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={route}
      screenOptions={{
        headerStyle: {
          backgroundColor: AppColor.white,
        },
        headerTintColor: AppColor.black,
        headerTitleStyle: {
          fontWeight: 'bold',
          color: AppColor.black,
        },
        headerBackTitleStyle: {
          color: AppColor.black,
        },
      }}>
      <Stack.Group>
        {routes.map(route => (
          <Stack.Screen
            options={{headerShown: route.headerShown, title: route.title}}
            name={route.name}
            component={route.component}
          />
        ))}
      </Stack.Group>
    </Stack.Navigator>
  );
}

const routes = [
  {
    name: 'splash',
    component: SplashScreen,
    headerShown: false,
  },
  {
    name: 'selection',
    component: LoginSelections,
    headerShown: false,
  },
  {
    name: 'loginScreen',
    component: LoginScreen,
    headerShown: false,
  },

  // {
  //   name: 'login',
  //   component: Login,
  //   headerShown: false,
  // },
  {
    name: 'signin',
    component: SignIn,
    headerShown: false,
  },
  {
    name: 'home',
    title: 'Home',
    component: DrawerRoute,
    headerShown: false,
  },
  {
    name: 'product',
    title: 'Product',
    component: ProductOverView,
    headerShown: true,
  },
  // {
  //   name: 'socialHome',
  //   title: 'Social Home',
  //   component: SocialHomeScreen,
  //   headerShown: true,
  // },
  {
    name: 'userPost',
    component: UserPostScreen,
    headerShown: false,
  },
  {
    name: 'startPoll',
    component: StartPoll,
    headerShown: false,
  },
  {
    name: 'inviteFriendToGroup',
    component: InviteFriend,
    headerShown: false,
  },
  {
    name: 'notifications',
    title: 'Notifications',
    component: NotificationScreen,
    headerShown: true,
  },
  {
    name: 'chat',
    title: 'Chat',
    component: ChatScreen,
    headerShown: true,
  },
  {
    name: 'newChat',
    title: 'New Chat',
    component: NewChatScreen,
    headerShown: true,
  },
  {
    name: 'inbox',
    component: InboxScreen,
    headerShown: false,
  },
  {
    name: 'productScreen',
    // title: 'My Cart',
    component: ProdustScreen,
    headerShown: true,
  },
  {
    name: 'myCart',
    title: 'My Cart',
    component: MyCart,
    headerShown: true,
  },
  {
    name: 'CheckOut',
    title: 'CheckOut',
    component: CheckOutScreen,
    headerShown: true,
  },
  {
    name: 'shippingAddress',
    title: 'Shipping Address',
    component: ShippingAddress,
    headerShown: true,
  },
  {
    name: 'trackOrder',
    title: 'Track Order',
    component: TrackOrder,
    headerShown: true,
  },
  {
    name: 'createcampaign',
    title: 'Create Campaign',
    component: CreateCampaign,
    headerShown: true,
  },
  {
    name: 'createjob',
    title: 'Create Job',
    component: CreateJob,
    headerShown: true,
  },
];

export default MainRoute;
