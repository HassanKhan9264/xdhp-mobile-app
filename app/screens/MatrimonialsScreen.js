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
import {Formik} from 'formik';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ImageStore} from 'react-native';
import EventsHomeComponent from '../components/EventsHomeComponent';
import MyEventsComponent from '../components/MyEventsComponent';
import {Avatar as Navater} from 'native-base';
import JobsHomeComponent from '../components/JobsHomeComponent';
import ManageJobsComponent from '../components/ManageJobsComponent';
import FindJobsComponent from '../components/FindJobsComponent';
import MatrimonialHome from '../components/MatrimonialHome';
import MyMatrimonialProfile from '../components/MyMatrimonialProfile';
import {Avatar, HStack} from 'native-base';

function MatrimonialsScreen(props) {
  const {navigation, route} = props;
  const [viewType, setViewType] = useState('1');
  const [setupProfile, setSetupProfile] = useState(false);
  const [viewProfilePopupVisible, setViewProfilePopupVisible] = useState(false);

  const buttonText = [
    {
      text: 'Home',
      type: 1,
    },
    {
      text: 'Your Profile',
      type: 2,
    },
    {
      text: 'Partners Profile',
      type: 3,
    },
  ];

  const icons = [
    // {
    //   icon: 'plus-circle-outline',
    //   type: 1,
    //   onPress: () => {},
    // },
    {
      icon: require('../Assets/message.png'),
      type: 2,
      onPress: () => {
        console.log('2');
        navigation.naviagate('chat');
      },
    },
    {
      icon: require('../Assets/bell.png'),
      type: 3,
      onPress: () => {
        // console.log('3');
        navigation.naviagate('notifications');
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

  const sideImages = [
    {
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
    {
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
    {
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
  ];

  const contactInfo = [
    {
      icon: 'map-marker',
      text: 'Toronto Canada',
    },
    {
      icon: 'email',
      text: 'KWilson@mail.com',
    },
    {
      icon: 'phone',
      text: '000 000 000',
    },
  ];

  const personalInfo = [
    {
      infoOption: 'Marital Status:',
      Info: 'Single(never married)',
    },
    {
      infoOption: 'Gender:',
      Info: 'Female',
    },
    {
      infoOption: 'Looking For:',
      Info: 'Male',
    },
    {
      infoOption: 'Age',
      Info: '26',
    },
    {
      infoOption: 'Height:',
      Info: '5 oft',
    },
    {
      infoOption: 'Weight:',
      Info: '79kg',
    },
    {
      infoOption: 'Complextion:',
      Info: 'Brown',
    },
  ];

  const religionInfo = [
    {
      infoOption: 'Reliaion:',
      Info: 'Christian',
    },
    {
      infoOption: 'sect:',
      Info: 'Western Catholic',
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

  const ViewProfile = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={viewProfilePopupVisible}
      // visible={true}
    >
      <View style={styles.modalView}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{paddingHorizontal: 10, paddingBottom: 10}}>
            <View
              style={[
                GlobalStyles.flexRow1,
                {
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  backgroundColor: AppColor.white,
                  justifyContent: 'space-between',
                  borderBottomWidth: 1,
                  borderColor: AppColor.lightGray2,
                },
              ]}>
              <View style={[GlobalStyles.flexRow1]}>
                <IconButton
                  style={{marginLeft: -2}}
                  icon="arrow-left"
                  size={20}
                  color={AppColor.darkGray}
                  onPress={() => {
                    setViewProfilePopupVisible(false);
                  }}
                />
                <Text
                  style={{
                    color: AppColor.darkGray,
                    fontSize: 18,
                    marginLeft: 5,
                  }}>
                  {''}
                </Text>
              </View>
            </View>
            <ImageBackground
              source={require('../Assets/postImage.png')}
              style={{
                width: '100%',
                height: 350,
                position: 'relative',
                marginTop: 10,
              }}
              borderRadius={20}
              borderBottomLeftRadius={0}>
              <View style={{position: 'absolute', bottom: 15, right: 25}}>
                <HStack justifyContent="center" space={3}>
                  {sideImages.map(item => (
                    <Avatar
                      bg="green.500"
                      size={12}
                      style={{borderWidth: 1, borderColor: AppColor.white}}
                      source={{
                        uri: item.image,
                      }}>
                      AJ
                    </Avatar>
                  ))}
                </HStack>
              </View>
            </ImageBackground>
            <View
              style={[
                GlobalStyles.flexRow1,
                {justifyContent: 'space-between', marginTop: 10},
              ]}>
              <Text
                style={{
                  fontSize: 23,
                  color: AppColor.darkGray,
                  fontWeight: 'bold',
                }}>
                Sarah Cruise
              </Text>
              <IIcon
                name="ellipsis-horizontal"
                size={24}
                color={AppColor.darkGray}
              />
            </View>

            <View>
              {contactInfo.map(info => (
                <View style={[GlobalStyles.flexRow1, {marginTop: 10}]}>
                  <Icon name={info.icon} size={23} color={AppColor.darkGray} />
                  <Text
                    style={{
                      color: AppColor.greenButton,
                      fontSize: 16,
                      marginLeft: 10,
                    }}>
                    {info.text}
                  </Text>
                </View>
              ))}
            </View>
            <View style={{marginTop: 15, paddingVertical: 10}}>
              <View style={[GlobalStyles.flexRow1]}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: AppColor.greenButton,
                    width: Dimensions.get('window').width / 2.2,
                  }}
                  numberOfLines={1}>
                  {'ABOUT KATE WILSON'}
                </Text>
                <View
                  style={{
                    height: 1,
                    backgroundColor: AppColor.lightGray2,
                    width: Dimensions.get('window').width / 2.1,
                    marginLeft: 5,
                  }}
                />
              </View>
              <Text
                numberOfLines={5}
                style={{color: AppColor.lightGray, marginTop: 10}}>
                {
                  '0, "image": "https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F206359%2Fpexels-photo-206359.jpeg%3Fcs%3Dsrgb%26dl%3Dpexels-pixabay-206359.jpg%26fm%3Djpg&imgrefurl=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fpeaceful%2F&tbnid=mxYFfT4dw5xi6M&vet=12ahUKEwj53cub5-75AhUa_RoKHfPCDW0QMygVegUIARDrAQ..i&docid=oIJYmRriLtrNIM&w=2201&h=1467&q=images&ved=2ahUKEwj53cub5-75AhUa_RoKHfPCDW0QMygVegUIARDrAQ", "name": "Desi Wear", "updated_at": null}, {"category_section_id": 5, "created_at": null, "deleted_at": null, "description": null, "id": 31, "image": "https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.pinimg.com%2F236x%2F7b%2Fe2%2Fdb%2F7be2dbac345f7c212f295b4464ef91af.jpg&imgrefurl=https%3A%2F%2Fin.pinterest.com%2Fpari4665%2Fs%2F&tbnid=fkHhdlS55-QtaM&vet=12ahUKEwj53cub5-75AhUa_RoKHfPCDW0QMygWegUIARDtAQ..i&docid=pvD9B8bdhZEZuM&w=236&h=230&q=images&ved=2ahUKEwj53cub5-75AhUa_RoKHfPCDW0QMygWegUIARDtAQ", "name": "Western Wear", "updated_at": null}, {"category_section_id": 5, "created_at": null, "deleted_at": null, "description": null, "id": 32, "image": "https://www.google.com/imgres?imgurl=https%3A%2F%2Fstatic.vecteezy.com%2Fpacks%2Fmedia%2Fvectors%2Fterm-bg-1-666de2d9.jpg&imgrefurl=https%3A%2F%2Fwww.vecteezy.com%2Ffree-photos&tbnid=QOZymhPf48LDYM&vet=12ahUKEwj53cub5-75AhUa_RoKHfPCDW0QMygXegUIARDvAQ..i&docid=ibTdn4unYxO9nM&w=550&h=549&q=images&ved=2ahUKE'
                }
              </Text>
            </View>
            <View style={{marginTop: 15}}>
              <View style={[GlobalStyles.flexRow1]}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: AppColor.greenButton,
                  }}
                  numberOfLines={1}>
                  {'PERSONAL INFORMATION'}
                </Text>
                <View
                  style={{
                    height: 1,
                    backgroundColor: AppColor.lightGray2,
                    width: Dimensions.get('window').width / 2.45,
                    marginLeft: 5,
                  }}
                />
              </View>
              {personalInfo.map(pinfo => (
                <View
                  style={[
                    GlobalStyles.flexRow1,
                    {justifyContent: 'space-between', marginTop: 10},
                  ]}>
                  <Text style={{color: AppColor.lightGray}}>
                    {pinfo.infoOption}
                  </Text>
                  <Text style={{color: AppColor.darkGray}}>{pinfo.Info}</Text>
                </View>
              ))}
            </View>
            <View style={{marginTop: 15}}>
              <View style={[GlobalStyles.flexRow1]}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: AppColor.greenButton,
                  }}
                  numberOfLines={1}>
                  {'RELIGION & BELIEVE'}
                </Text>
                <View
                  style={{
                    height: 1,
                    backgroundColor: AppColor.lightGray2,
                    width: Dimensions.get('window').width / 1.9,
                    marginLeft: 5,
                  }}
                />
              </View>
              {religionInfo.map(rinfo => (
                <View
                  style={[
                    GlobalStyles.flexRow1,
                    {justifyContent: 'space-between', marginTop: 10},
                  ]}>
                  <Text style={{color: AppColor.lightGray}}>
                    {rinfo.infoOption}
                  </Text>
                  <Text style={{color: AppColor.darkGray}}>{rinfo.Info}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );

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
                {marginLeft: item.type == 2 || item.type == 3 ? 20 : 10},
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

      {viewType == 1 && (
        <MatrimonialHome
          setupProfile={setupProfile}
          setViewProfilePopupVisible={setViewProfilePopupVisible}
        />
      )}
      {viewType == 2 && (
        <MyMatrimonialProfile
          setupProfile={setupProfile}
          setSetupProfile={setSetupProfile}
        />
      )}

      {/* {setupProfile && ( */}
      <ViewProfile />
      {/* )} */}
    </View>
  );
}
const styles = StyleSheet.create({
  lineStyle: {
    height: 2.5,
    width: 25,
    marginTop: 10,
  },
  viewStyle: {
    backgroundColor: AppColor.white,
    paddingVertical: 20,
    paddingHorizontal: 15,
    width: '100%',
    marginTop: 8,
  },
  viewStyle2: {
    marginHorizontal: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: AppColor.lightGray2,
    paddingVertical: 15,
  },
  viewStyle3: {marginHorizontal: 15, paddingVertical: 15},
  title: {color: AppColor.darkGray, fontSize: 17, fontWeight: '500'},
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
  lineStyle2: {
    height: 1,
    backgroundColor: AppColor.lightGray,
    width: Dimensions.get('window').width / 1.62,
    marginLeft: 15,
    marginTop: 5,
  },
  whatsNewText: {
    backgroundColor: '#f2f2f2',
    marginTop: 5,
    fontSize: 16,
    width: '100%',
    paddingHorizontal: 10,
    borderRadius: 10,
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
});

export default MatrimonialsScreen;
