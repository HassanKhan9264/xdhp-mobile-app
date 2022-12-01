import React, {useState, useEffect, useLayoutEffect, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground,
  TextInput,
  ScrollView,
  Dimensions,
  Image,
  FlatList,
  Pressable,
  Modal,
} from 'react-native';
import {AppColor} from '../shared/appColors';
import {GlobalStyles} from '../shared/GlobalStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IIcon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {ServiceApi} from '../Api/ServiceApi';
import {Loader} from '../components/LoaderComponent';
import {IconButton, Button, Avatar} from 'react-native-paper';
import {getUser, getUserData} from '../helpers/localStorage';
import {FastField, Formik} from 'formik';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ImageStore} from 'react-native';
import EventsHomeComponent from '../components/EventsHomeComponent';
import MyEventsComponent from '../components/MyEventsComponent';
import {Avatar as Navater} from 'native-base';
import moment from 'moment';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import VolunteerHome from '../components/VolunteerHome';
import MyVolunteerProfile from '../components/MyVolunteerProfile';

function VolunteerScreen(props) {
  const {navigation, route} = props;
  const [setupProfile, setSetupProfile] = useState(false);
  const [viewType, setViewType] = useState('1');

  const icons = [
    {
      icon: require('../Assets/message.png'),
      type: 1,
      onPress: () => {
        // console.log('2');
        navigation.navigate('chat');
      },
    },
    {
      icon: require('../Assets/bell.png'),
      type: 2,
      onPress: () => {
        // console.log('3');
        navigation.navigate('notifications');
      },
    },
    {
      icon: require('../Assets/search.png'),
      type: 3,
      onPress: () => {
        console.log('4');
      },
    },
  ];

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            // backgroundColor: 'red',
            // justifyContent: 'space-around',
            alignItems: 'center',
            marginRight: 10,
          }}>
          {icons.map(item => (
            <View style={{position: 'relative'}}>
              <IconButton
                icon={item.icon}
                size={20}
                color={AppColor.darkGray}
                onPress={item.onPress}
              />
            </View>
          ))}
        </View>
      ),
    });
  }, [navigation]);

  const buttonText = [
    {
      text: 'Home',
      type: 1,
    },
    {
      text: 'Your Profile',
      type: 2,
    },
  ];

  return (
    <View style={[GlobalStyles.flex]}>
      <View
        style={[
          GlobalStyles.flexRow,
          {
            // justifyContent: 'space-around',
            alignItems: 'center',
            backgroundColor: AppColor.white,
            // width: '100%',
            height: 45,
            elevation: 5,
            marginLeft: -5,
            marginRight: -5,
          },
        ]}>
        {buttonText?.map(item => (
          <Pressable
            onPress={() => {
              var btnolor = 1;
              switch (item.type) {
                default:
                  setViewType(item.type);
                  break;
              }
            }}>
            <View
              style={[
                styles.navigationBarStyle,
                {marginLeft: item.type == 2 ? 20 : 10},
              ]}>
              <Text
                style={{
                  color:
                    item.type == viewType
                      ? AppColor.greenButton
                      : AppColor.black,
                  fontSize: 14,
                }}>
                {item.text}
              </Text>
              <View
                style={[
                  styles.lineStyle,
                  {
                    backgroundColor:
                      item.type == viewType
                        ? AppColor.greenButton
                        : 'transparent',
                  },
                ]}
              />
            </View>
          </Pressable>
        ))}
      </View>

      {viewType == 1 && <VolunteerHome />}
      {viewType == 2 && (
        <MyVolunteerProfile
          setupProfile={setupProfile}
          setSetupProfile={setSetupProfile}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  lineStyle: {
    height: 2.5,
    width: 25,
    marginTop: 10,
  },
  navigationBarStyle: {
    marginTop: 10,
    paddingRight: 10,
    paddingLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default VolunteerScreen;
