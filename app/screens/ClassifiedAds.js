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
import {IconButton, Button} from 'react-native-paper';
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
import {longPressGestureHandlerProps} from 'react-native-gesture-handler/lib/typescript/handlers/LongPressGestureHandler';
import {black} from 'react-native-paper/lib/typescript/styles/colors';
import {
  Categories,
  GridView,
  Home,
  MyAdverts,
} from '../components/classifiedAds';
export const ClassifiedAds = props => {
  const [viewType, setViewType] = useState('1');
  const {navigation, route} = props;

  const buttonText = [
    {
      text: 'Home',
      type: 1,
    },
    {
      text: 'Categories',
      type: 2,
    },
    {
      text: 'My Adverts',
      type: 3,
    },
  ];

  const icons = [
    {
      icon: 'plus-circle-outline',
      type: 1,
      onPress: () => {
        console.log('1');
        // setCreateEventPopupVisible(true);
        navigation.navigate('createjob');
      },
    },
    {
      icon: require('../Assets/message.png'),
      type: 2,
      onPress: () => {
        // console.log('2');
        navigation.navigate('chat');
      },
    },
    {
      icon: require('../Assets/bell.png'),
      type: 3,
      onPress: () => {
        // console.log('3');
        navigation.navigate('notifications');
      },
    },
    {
      icon: require('../Assets/search.png'),
      type: 4,
      onPress: () => {
        console.log('4');
      },
    },
  ];
  const categoriesItems = [
    {
      text: 'DHP Fashion',
      type: 1,
    },
    {
      text: 'Cell Phone & Devices',
      type: 2,
    },
    {
      text: 'Computer & Gaming',
      type: 3,
    },
    {
      text: 'Camera',
      type: 4,
    },
    {
      text: 'Men Fashion',
      type: 5,
    },
    {
      text: 'Women Fashion',
      type: 6,
    },
    {
      text: 'Kids Store',
      type: 7,
    },
    {
      text: 'Health & Beauty',
      type: 8,
    },
    {
      text: 'Home & LifeStyle',
      type: 9,
    },
    {
      text: 'Sports & Outdoor',
      type: 10,
    },
    {
      text: 'Grocery',
      type: 11,
    },
    {
      text: 'Gift',
      type: 12,
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

  return (
    <ScrollView>
      <View
      // style={[GlobalStyles.appBackground, GlobalStyles.flex]}
      >
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
          {/* header end */}

          {buttonText?.map(item => (
            <Pressable
              onPress={() => {
                // var btnolor = 1;
                switch (item.type) {
                  case 'Home':
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
      </View>
      {viewType == '1' ? (
        <View>
          <Home />
          <GridView />
        </View>
      ) : (
        ''
      )}
      {viewType == '2' ? (
        <View>
          <Categories />
        </View>
      ) : (
        ''
      )}
      {viewType == '3' ? (
        <View>
          <MyAdverts />
        </View>
      ) : (
        ''
      )}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  attachFile: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
    marginTop: 5,
  },
  content: {
    color: AppColor.darkGray,
  },
  camView: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
    marginTop: 15,
  },
  inputTitle: {color: AppColor.darkGray, fontWeight: '500'},
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
  modalView: {
    height: '100%',
    flex: 1,
    backgroundColor: AppColor.white,
    position: 'relative',
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingVertical: 20,
  },

  viewStyle: {
    backgroundColor: AppColor.white,
    paddingVertical: 20,
    paddingHorizontal: 15,
    width: '100%',
    marginTop: 8,
  },
  lineStyle: {
    height: 5,
    backgroundColor: AppColor.darkGray,
    marginLeft: 10,
    marginTop: 5,
  },
  title: {color: AppColor.darkGray, fontSize: 17, fontWeight: '500'},
  postText: {
    marginTop: 10,
    position: 'relative',
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: AppColor.lightGray2,
  },
  ticketBtn: {
    width: 115,
    backgroundColor: AppColor.lightGray2,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    borderRadius: 15,
    flexDirection: 'row',
    marginRight: 5,
  },
  ticketBtn2: {
    width: 115,
    backgroundColor: AppColor.greenButton,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    borderRadius: 15,
    flexDirection: 'row',
    marginRight: 5,
  },
  ticketBtn3: {
    width: 100,
    backgroundColor: AppColor.darkGray,
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
    borderRadius: 15,
    flexDirection: 'row',
    marginLeft: 5,
  },
  avaterBorder: {
    borderWidth: 1.5,
    padding: 2,
    borderRadius: 50,
    borderColor: AppColor.greenButton,
  },
  bio: {
    fontSize: 12,
  },
  friendList: {
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: AppColor.lightGray2,
    backgroundColor: AppColor.white,
    marginHorizontal: 10,
  },
  friendsName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: AppColor.darkGray,
  },
  mutualfriends: {
    fontSize: 11,
    fontWeight: 'bold',
    color: AppColor.lightGray,
  },
  searchBarStyle: {
    backgroundColor: AppColor.lightGray2,
    height: 40,
    // paddingTop: 5,
    // paddingBottom: 5,
    width: '95%',
    alignSelf: 'center',
    marginTop: 10,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  searchBarInputStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
  },
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
  modalView: {
    height: '100%',
    flex: 1,
    backgroundColor: AppColor.white,
    position: 'relative',
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingVertical: 20,
  },
  whatsNew2: {
    backgroundColor: AppColor.white,
    width: '100%',
    height: 60,
    alignItems: 'center',
    // justifyContent: 'center',
    borderRadius: 30,
    marginTop: 5,
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  whatsNewImage: {
    height: 40,
    width: 40,
    borderRadius: 25,
  },
  whatsNewText: {
    backgroundColor: '#f2f2f2',
    color: AppColor.darkGray,
    marginTop: 5,
    fontSize: 16,
    width: '100%',
    paddingHorizontal: 10,
    borderRadius: 10,
    height: 50,
  },
  whatsNewText2: {
    backgroundColor: '#f2f2f2',
    marginTop: 5,
    fontSize: 16,
    width: '48%',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 5,
  },
  whatsNewText3: {
    backgroundColor: '#f2f2f2',
    marginTop: 5,
    fontSize: 16,
    width: '48%',
    paddingHorizontal: 10,
    borderRadius: 10,
    marginLeft: 5,
  },
  searchBarStyle: {
    backgroundColor: AppColor.lightGray2,
    height: 40,
    // paddingTop: 5,
    // paddingBottom: 5,
    width: '95%',
    alignSelf: 'center',
    marginTop: 10,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  searchBarInputStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 8,
  },
});
