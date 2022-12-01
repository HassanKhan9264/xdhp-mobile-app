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
import {navigate} from '../helpers/navigationHelper';

function EventsScreen(props) {
  const {navigation, route} = props;
  const [viewType, setViewType] = useState('1');
  const [createEventPopupVisible, setCreateEventPopupVisible] = useState(false);
  const [viewEventsPopupVisible, setViewEventsPopupVisible] = useState(false);
  const [eventPostImage, setEventPostImage] = useState();
  const [eventItem, setEventItem] = useState();
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [allEvents, setAllEvents] = useState();
  const [eventId, setEventID] = useState();
  const [disable, setDisable] = useState(false);
  const [singleEventData, setSingleEventData] = useState();
  const [eventTypes, setEventTypes] = useState([
    {label: 'Online', value: 1},
    {label: 'In Person', value: 2},
  ]);
  const [privacys, setPrivacys] = useState([
    {label: 'Public', value: 1},
    {label: 'Private', value: 2},
  ]);
  const [entryFees, setEntryFees] = useState([
    {label: 'Free', value: 1},
    {label: 'Payed', value: 2},
  ]);
  const showLoader = () => setLoaderVisible(true);
  const hideLoader = () => setLoaderVisible(false);
  console.log('singleEventData', singleEventData);

  const icons = [
    {
      icon: 'plus-circle-outline',
      type: 1,
      onPress: () => {
        setCreateEventPopupVisible(true);
      },
    },
    {
      icon: require('../Assets/message.png'),
      type: 2,
      onPress: () => {
        navigation.navigate('chat');
      },
    },
    {
      icon: require('../Assets/bell.png'),
      type: 3,
      onPress: () => {
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
  }, [navigation, createEventPopupVisible]);

  const buttonText = [
    {
      text: 'Home',
      type: 1,
    },
    {
      text: 'My Events',
      type: 2,
    },
  ];

  const eventDelails = [
    {
      icon: 'dots-horizontal-circle-outline',
      image: require('../Assets/sparkles-outline.png'),
      title: singleEventData?.privacy + ' Event',
    },
    {
      icon: 'dots-horizontal-circle-outline',
      image: require('../Assets/person-outline.png'),
      title: 'Hosted by : ',
    },
    {
      icon: 'dots-horizontal-circle-outline',
      image: require('../Assets/location-outline.png'),
      title: singleEventData?.location,
    },
    {
      icon: 'dots-horizontal-circle-outline',
      image: require('../Assets/hourglass-outline.png'),
      title: 'Duration ' + singleEventData?.duration + ' days',
    },
    {
      icon: 'dots-horizontal-circle-outline',
      image: require('../Assets/people-outline.png'),
      title:
        singleEventData?.interestedCount +
        ' | ' +
        singleEventData?.member_capacity +
        ' Available seats',
    },
  ];

  const avaterData = [
    {
      uri: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
    {
      uri: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
    {
      uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
    {
      uri: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
    {
      uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
    {
      uri: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
    {
      uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
    {
      uri: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
    {
      uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    },
  ];

  useEffect(() => {
    getAllEvents();
  }, []);

  const getAllEvents = async () => {
    let user = await getUser();
    console.log('userUserData', user.userData[0].id);
    showLoader();
    var result = await new ServiceApi().allEvents();

    if (result && result.data) {
      let filterMyEvents = result.data.filter(
        x => x.user_id == user.userData[0].id,
      );
      setAllEvents(result.data);
      hideLoader();
    } else {
      hideLoader();
      alert('Something went wrong');
    }
  };

  const getEventById = async id => {
    showLoader();
    var result = await new ServiceApi().eventById(id);
    console.log('getEventById', result);
    if (result && result.data) {
      hideLoader();
      setSingleEventData(result.data);
    } else {
      hideLoader();
      alert('Something went wrong');
    }
  };

  const getUserInterest = async enevtId => {
    showLoader();
    let user = await getUser();
    console.log('userUserData', user.userData[0].id);
    if (!disable) {
      let data = {
        event_id: enevtId,
        interest: 1,
        notified_user_id: user.userData[0].id,
      };
      var result = await new ServiceApi().userInterest(data);
      console.log('getUserInterestTrue', result);
      if (result && result.data) {
        hideLoader();
      } else {
        hideLoader();
        alert('Something went wrong');
      }
    } else if (disable) {
      let data = {
        event_id: enevtId,
        interest: 0,
        notified_user_id: user.userData[0].id,
      };
      var result = await new ServiceApi().userInterest(data);
      console.log('getUserInterestFalse', result);
      if (result && result.data) {
        hideLoader();
      } else {
        hideLoader();
        alert('Something went wrong');
      }
    }
  };

  const postaEvent = async data => {
    showLoader();
    var result = await new ServiceApi().createEvent(data);
    console.log('postaEvent', result);
    if (result && result.data) {
      hideLoader();
      getAllEvents();
    } else {
      hideLoader();
      alert('Something went wrong');
    }
  };

  const CreateEvent = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={createEventPopupVisible}
      //   visible={true}
    >
      <View style={styles.modalView}>
        <View style={{position: 'relative', flex: 1}}>
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
                  setCreateEventPopupVisible(false);
                }}
              />
              <Text
                style={{color: AppColor.darkGray, fontSize: 18, marginLeft: 5}}>
                Create Event
              </Text>
            </View>
          </View>

          {/* <Text
            style={{color: AppColor.lightGray, marginLeft: 20, marginTop: 10}}>
            {groupPostDes}
          </Text> */}

          <ScrollView>
            <View>
              <Formik
                //   innerRef={CreatGroupPost}
                initialValues={{
                  image: '',
                  eventName: '',
                  date: '',
                  time: '',
                  endDate: '',
                  endTime: '',
                  eventType: '',
                  privacy: '',
                  location: '',
                  meetingLink: '',
                  entryFee: '',
                  fee: '',
                  seats: '',
                  eventDiscription: '',
                }}
                enableReinitialize
                validateOnChange={false}
                validateOnBlur={false}
                // validationSchema={reviewSchema}
                onSubmit={(values, action) => {
                  console.log('FormikValues', values);
                  let apiData = {
                    name: values.eventName,
                    description: values.eventDiscription,
                    start_date: values.date,
                    start_time: values.time,
                    end_date: values.endDate,
                    end_time: values.endTime,
                    banner_image: values.image,
                    event_type_id: 1,
                    location: values.location,
                    privacy: values.privacy.label,
                    member_capacity: values.seats,
                    event_category: 'free',
                    price: values.fee,
                    latitude: 28.68281,
                    longitude: 77.050751,
                  };
                  console.log('apiData', apiData);
                  postaEvent(apiData);
                }}>
                {formikProps => (
                  <View style={{paddingHorizontal: 15}}>
                    <View style={styles.camView}>
                      {formikProps.values.image && (
                        <Image
                          style={{width: '100%', height: 100, borderRadius: 10}}
                          source={{uri: formikProps.values?.image}}
                        />
                      )}
                      {!formikProps.values.image && (
                        <IconButton
                          //   style={{marginRight: 2}}
                          icon={'camera-outline'}
                          size={30}
                          color={AppColor.lightGray}
                          onPress={async () => {
                            const result = await launchCamera({
                              mediaType: 'photo',
                            });
                            console.log('imageresult', result);
                            var mixedUri = [];
                            result?.assets?.forEach(x => {
                              mixedUri.push({uri: x.uri});
                            });
                            console.log('mixedUri', mixedUri[0]);
                            formikProps.setFieldValue('image', mixedUri[0].uri);
                            // setEventPostImage(mixedUri[0]);
                          }}
                          // style={[GlobalStyles.iconeStyle, {marginRight: 10}]}
                        />
                      )}
                    </View>
                    <View style={{marginTop: 15}}>
                      <Text style={styles.inputTitle}>Event Name</Text>
                      <TextInput
                        multiline={false}
                        style={styles.whatsNewText}
                        placeholderTextColor={AppColor.lightGray}
                        value={formikProps.values.eventName}
                        onChangeText={formikProps.handleChange('eventName')}
                        onBlur={formikProps.handleBlur('eventName')}
                        placeholder="Event Name"
                      />
                    </View>

                    <View
                      style={[
                        GlobalStyles.flexRow1,
                        {marginTop: 15, width: '100%'},
                      ]}>
                      <View style={[{width: '48%', marginRight: 7}]}>
                        <Text style={styles.inputTitle}>{'Date & Time'}</Text>
                        <TextInput
                          multiline={false}
                          keyboardType="numeric"
                          style={styles.whatsNewText}
                          placeholderTextColor={AppColor.lightGray}
                          value={formikProps.values.date}
                          onChangeText={formikProps.handleChange('date')}
                          onBlur={formikProps.handleBlur('date')}
                          placeholder="dd-mm-yyyy"
                        />
                      </View>

                      <View style={[{width: '48%', marginLeft: 7}]}>
                        <Text style={styles.inputTitle}>{''}</Text>
                        <TextInput
                          multiline={false}
                          keyboardType="numeric"
                          style={styles.whatsNewText}
                          placeholderTextColor={AppColor.lightGray}
                          value={formikProps.values.time}
                          onChangeText={formikProps.handleChange('time')}
                          onBlur={formikProps.handleBlur('time')}
                          placeholder="00:00"
                        />
                      </View>
                    </View>

                    <View
                      style={[
                        GlobalStyles.flexRow1,
                        {marginTop: 15, width: '100%'},
                      ]}>
                      <View style={[{width: '48%', marginRight: 7}]}>
                        <Text style={styles.inputTitle}>
                          {'End Date & Time'}
                        </Text>
                        <TextInput
                          multiline={false}
                          keyboardType="numeric"
                          style={styles.whatsNewText}
                          placeholderTextColor={AppColor.lightGray}
                          value={formikProps.values.endDate}
                          onChangeText={formikProps.handleChange('endDate')}
                          onBlur={formikProps.handleBlur('endDate')}
                          placeholder="dd-mm-yyyy"
                        />
                      </View>

                      <View style={[{width: '48%', marginLeft: 7}]}>
                        <Text style={styles.inputTitle}>{''}</Text>
                        <TextInput
                          multiline={false}
                          keyboardType="numeric"
                          style={styles.whatsNewText}
                          placeholderTextColor={AppColor.lightGray}
                          value={formikProps.values.endTime}
                          onChangeText={formikProps.handleChange('endTime')}
                          onBlur={formikProps.handleBlur('endTime')}
                          placeholder="00:00"
                        />
                      </View>
                    </View>

                    <View
                      style={[
                        GlobalStyles.flexRow1,
                        {marginTop: 15, width: '100%'},
                      ]}>
                      <View style={[{width: '48%', marginRight: 7}]}>
                        <Text style={styles.inputTitle}>
                          {'Event Type & Privacy'}
                        </Text>
                        <View
                          style={[
                            styles.whatsNewText,
                            GlobalStyles.flexRow1,
                            {justifyContent: 'space-between'},
                          ]}>
                          <View
                            style={{backgroundColor: '#f2f2f2', width: '85%'}}>
                            <RNPickerSelect
                              placeholder={{
                                label: 'Event Type',
                                color: AppColor.darkGray,
                              }}
                              onValueChange={value => {
                                console.log('value', value);
                                // if (!value) return;
                                let type = eventTypes.filter(
                                  x => x.value === value,
                                )[0];
                                console.log('eventType', type);
                                formikProps.setFieldValue('eventType', type);
                              }}
                              items={eventTypes}
                              value={formikProps.values.eventType?.value}>
                              <Text
                                style={
                                  formikProps.values.eventType?.value
                                    ? styles.content
                                    : {
                                        ...styles.content,
                                        color: AppColor.lightGray,
                                      }
                                }>
                                {formikProps.values.eventType?.label ??
                                  'eventType'}
                              </Text>
                            </RNPickerSelect>
                          </View>

                          <Icon
                            name="chevron-down"
                            size={20}
                            color={AppColor.greenButton}
                          />
                        </View>
                      </View>

                      <View style={[{width: '48%', marginLeft: 7}]}>
                        <Text style={styles.inputTitle}>{''}</Text>
                        <View
                          style={[
                            styles.whatsNewText,
                            GlobalStyles.flexRow1,
                            {justifyContent: 'space-between'},
                          ]}>
                          <View
                            style={{backgroundColor: '#f2f2f2', width: '85%'}}>
                            <RNPickerSelect
                              placeholder={{
                                label: 'Privacy',
                                color: AppColor.darkGray,
                              }}
                              onValueChange={value => {
                                console.log('value', value);
                                // if (!value) return;
                                let type = privacys.filter(
                                  x => x.value === value,
                                )[0];
                                console.log('privacy', type);
                                formikProps.setFieldValue('privacy', type);
                              }}
                              items={privacys}
                              value={formikProps.values.privacy?.value}>
                              <Text
                                style={
                                  formikProps.values.privacy?.value
                                    ? styles.content
                                    : {
                                        ...styles.content,
                                        color: AppColor.lightGray,
                                      }
                                }>
                                {formikProps.values.privacy?.label ?? 'Privacy'}
                              </Text>
                            </RNPickerSelect>
                          </View>

                          <Icon
                            name="chevron-down"
                            size={20}
                            color={AppColor.greenButton}
                          />
                        </View>
                      </View>
                    </View>

                    <View style={{marginTop: 15}}>
                      <Text style={styles.inputTitle}>Location</Text>
                      <TextInput
                        multiline={false}
                        style={styles.whatsNewText}
                        placeholderTextColor={AppColor.lightGray}
                        value={formikProps.values.location}
                        onChangeText={formikProps.handleChange('location')}
                        onBlur={formikProps.handleBlur('location')}
                        placeholder="Location"
                      />
                    </View>
                    {/* <View style={{marginTop: 15}}>
                      <Text style={styles.inputTitle}>Meeting Link</Text>
                      <TextInput
                        multiline={false}
                        style={styles.whatsNewText}
                        placeholderTextColor={AppColor.lightGray}
                        value={formikProps.values.meetingLink}
                        onChangeText={formikProps.handleChange('meetingLink')}
                        onBlur={formikProps.handleBlur('meetingLink')}
                        placeholder="Meeting Link"
                      />
                    </View> */}
                    <View
                      style={[
                        GlobalStyles.flexRow1,
                        {marginTop: 15, width: '100%'},
                      ]}>
                      <View style={[{width: '48%', marginRight: 7}]}>
                        <Text style={styles.inputTitle}>
                          {'Event Entry Fee'}
                        </Text>
                        <View
                          style={[
                            styles.whatsNewText,
                            GlobalStyles.flexRow1,
                            {justifyContent: 'space-between'},
                          ]}>
                          <View
                            style={{backgroundColor: '#f2f2f2', width: '85%'}}>
                            <RNPickerSelect
                              placeholder={{
                                label: 'Entry Fee',
                                color: AppColor.darkGray,
                              }}
                              onValueChange={value => {
                                console.log('value', value);
                                // if (!value) return;
                                let type = entryFees.filter(
                                  x => x.value === value,
                                )[0];
                                console.log('eventType', type);
                                formikProps.setFieldValue('entryFee', type);
                              }}
                              items={entryFees}
                              value={formikProps.values.entryFee?.value}>
                              <Text
                                style={
                                  formikProps.values.entryFee?.value
                                    ? styles.content
                                    : {
                                        ...styles.content,
                                        color: AppColor.lightGray,
                                      }
                                }>
                                {formikProps.values.entryFee?.label ??
                                  'Entry fee'}
                              </Text>
                            </RNPickerSelect>
                          </View>

                          <Icon
                            name="chevron-down"
                            size={20}
                            color={AppColor.greenButton}
                          />
                        </View>
                      </View>

                      <View style={[{width: '48%', marginLeft: 7}]}>
                        <Text style={styles.inputTitle}>{''}</Text>

                        <TextInput
                          editable={
                            formikProps.values.entryFee?.label == 'Payed'
                              ? true
                              : false
                          }
                          multiline={false}
                          style={styles.whatsNewText}
                          placeholderTextColor={AppColor.lightGray}
                          value={formikProps.values.fee}
                          onChangeText={formikProps.handleChange('fee')}
                          onBlur={formikProps.handleBlur('fee')}
                          placeholder="$0.00"
                        />
                      </View>
                    </View>
                    <View style={{marginTop: 15}}>
                      <Text style={styles.inputTitle}>Seats</Text>
                      <TextInput
                        multiline={false}
                        style={styles.whatsNewText}
                        placeholderTextColor={AppColor.lightGray}
                        value={formikProps.values.seats}
                        onChangeText={formikProps.handleChange('seats')}
                        onBlur={formikProps.handleBlur('seats')}
                        placeholder="Seats"
                      />
                    </View>
                    <View style={{marginTop: 15}}>
                      <Text style={styles.inputTitle}>Event Discription</Text>
                      <TextInput
                        multiline={false}
                        style={[styles.whatsNewText, {height: 120}]}
                        placeholderTextColor={AppColor.lightGray}
                        value={formikProps.values.eventDiscription}
                        onChangeText={formikProps.handleChange(
                          'eventDiscription',
                        )}
                        onBlur={formikProps.handleBlur('eventDiscription')}
                        placeholder="Event Discription"
                      />
                    </View>

                    {/* <View style={{marginTop: 15}}>
                      <Text style={styles.inputTitle}>Event Documents</Text>
                      <View style={styles.attachFile}>
                        <IIcon
                          name="document-attach-outline"
                          size={25}
                          color={AppColor.lightGray}
                        />
                        <Text
                          style={{
                            color: AppColor.lightGray,
                            fontWeight: '500',
                          }}>
                          Attach
                        </Text>
                      </View>
                    </View> */}

                    <Button
                      style={{
                        backgroundColor: AppColor.greenButton,
                        width: '100%',
                        marginTop: 15,
                        marginBottom: 10,
                      }}
                      mode="contained"
                      onPress={formikProps.handleSubmit}>
                      Proceed to Payment
                    </Button>
                  </View>
                )}
              </Formik>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const ViewEvents = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={viewEventsPopupVisible}
      // visible={true}
    >
      <View style={styles.modalView}>
        <ScrollView>
          <View style={{position: 'relative', flex: 1}}>
            <View style={[GlobalStyles.container3]}>
              <ImageBackground
                source={{uri: singleEventData?.banner_image}}
                resizeMode="cover"
                style={{width: '100%', height: 200}}>
                <View
                  style={[
                    GlobalStyles.flexRow1,
                    {
                      justifyContent: 'space-between',
                      marginTop: 5,
                      marginHorizontal: 5,
                    },
                  ]}>
                  <IconButton
                    // style={{marginRight: 10}}
                    icon={'arrow-left'}
                    size={20}
                    color={AppColor.white}
                    onPress={() => {
                      setViewEventsPopupVisible(false);
                      // setAllEvents(null);
                    }}
                    // style={[GlobalStyles.iconeStyle, {marginRight: 10}]}
                  />
                  <View
                    style={{
                      flexDirection: 'row',
                      // backgroundColor: 'red',
                      // justifyContent: 'space-around',
                      alignItems: 'center',
                      // marginRight: 5,
                    }}>
                    {icons.map(item => (
                      <Pressable
                        onPress={() => {
                          console.log('icon', item);
                          switch (item.type) {
                            case 1:
                              console.log('1');
                              navigation.navigate('chat');
                              break;

                            case 2:
                              navigation.navigate('notifications');
                              console.log('2');
                              break;

                            case 3:
                              console.log('3');
                              break;
                          }
                        }}>
                        <IconButton
                          style={{marginRight: 2}}
                          icon={item.icon}
                          size={20}
                          color={AppColor.white}
                          // style={[GlobalStyles.iconeStyle, {marginRight: 10}]}
                        />
                      </Pressable>
                    ))}
                  </View>
                </View>
              </ImageBackground>
              <View
                style={[
                  styles.postText,
                  GlobalStyles.flexRow1,
                  {justifyContent: 'space-between'},
                ]}>
                <View>
                  <Text
                    style={{
                      color: AppColor.darkGray,
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>
                    {singleEventData?.name}
                  </Text>
                  <Text
                    style={{
                      color: AppColor.cancel,
                      fontSize: 13,
                      fontWeight: 'bold',
                    }}>
                    {moment(singleEventData?.start_date).format(
                      'dddd, MMMM Qo, ',
                    ) + moment(singleEventData?.start_time).format('hhA')}
                  </Text>
                </View>
                <View style={[GlobalStyles.flexRow1]}>
                  <Text
                    style={{
                      color: AppColor.darkGray,
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>
                    {'$' + singleEventData?.price + '/'}
                  </Text>
                  <Image
                    source={require('../Assets/ticket.png')}
                    style={{width: 15, height: 15, resizeMode: 'contain'}}
                  />
                </View>
              </View>

              <View
                style={[
                  styles.postText,
                  GlobalStyles.flexRow1,
                  {justifyContent: 'space-between'},
                ]}>
                <View style={GlobalStyles.flexRow1}>
                  <Button
                    // disabled={disable ? true : false}
                    icon="cards-heart-outline"
                    mode="contained"
                    contentStyle={{flexDirection: 'row-reverse'}}
                    style={{
                      backgroundColor: AppColor.lightGray2,
                      borderRadius: 15,
                    }}
                    labelStyle={{color: AppColor.darkGray, fontSize: 11}}
                    onPress={() => {
                      getUserInterest(singleEventData.id);
                      console.log('123213', disable);
                      setDisable(!disable);
                    }}>
                    Interested
                  </Button>

                  <Button
                    icon={require('../Assets/ticket.png')}
                    mode="contained"
                    contentStyle={{flexDirection: 'row-reverse'}}
                    style={{
                      backgroundColor: AppColor.greenButton,
                      borderRadius: 15,
                      marginLeft: 10,
                    }}
                    labelStyle={{color: AppColor.white, fontSize: 11}}
                    onPress={() => console.log('Pressed')}>
                    Buy Tickets
                  </Button>
                  {/* <View style={styles.ticketBtn}>
                    <Text style={{color: AppColor.darkGray, fontSize: 12}}>
                      Interested
                    </Text>
                    <Icon
                      style={{marginLeft: 5}}
                      name="cards-heart-outline"
                      size={15}
                      color={AppColor.darkGray}
                    />
                  </View>
                  <View style={styles.ticketBtn2}>
                    <Text style={{color: AppColor.white, fontSize: 12}}>
                      Buy Tickets
                    </Text>
                    <Image
                      source={require('../Assets/ticket.png')}
                      tintColor={AppColor.white}
                      style={{
                        width: 14,
                        height: 14,
                        resizeMode: 'contain',
                        marginLeft: 5,
                      }}
                    />
                  </View> */}
                </View>
                <View style={GlobalStyles.flexRow1}>
                  <IconButton
                    // style={{marginLeft: 5}}
                    icon="share-variant-outline"
                    size={20}
                    color={AppColor.darkGray}
                    onPress={() => {}}
                  />
                  <IconButton
                    // style={{marginLeft: 5}}
                    icon="dots-horizontal-circle-outline"
                    size={20}
                    color={AppColor.darkGray}
                    onPress={() => {}}
                  />
                </View>
              </View>

              <View
                style={[
                  styles.postText,
                  GlobalStyles.flexRow1,
                  {justifyContent: 'space-between'},
                ]}>
                <View style={GlobalStyles.flexRow1}>
                  {singleEventData?.userInterestProfile?.length > 0 && (
                    <Navater.Group
                      _avatar={{
                        size: 'md',
                      }}
                      max={5}>
                      {singleEventData?.userInterestProfile?.map(item => (
                        <Navater
                          bg="green.500"
                          source={{uri: item?.profile_image}}></Navater>
                      ))}
                    </Navater.Group>
                  )}
                </View>
                <View style={GlobalStyles.flexRow1}>
                  <View style={styles.ticketBtn3}>
                    <Icon
                      style={{marginRight: 5}}
                      name="plus"
                      size={15}
                      color={AppColor.white}
                    />
                    <Text style={{color: AppColor.white, fontSize: 12}}>
                      Invite
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{backgroundColor: AppColor.appBg}}>
                <View style={styles.viewStyle}>
                  <View style={[GlobalStyles.flexRow1]}>
                    <Text style={styles.title}>LOCATION</Text>
                    <View
                      style={[
                        // styles.lineStyle,
                        {
                          height: 1,
                          backgroundColor: AppColor.lightGray2,
                          marginLeft: 10,
                          marginTop: 5,
                          width: Dimensions.get('window').width / 1.4,
                        },
                      ]}
                    />
                  </View>
                  <Image
                    style={[
                      // styles.lineStyle,
                      {
                        height: 150,
                        width: '100%',
                        marginTop: 10,
                      },
                    ]}
                    source={require('../Assets/map.png')}
                  />
                  <Text style={{color: AppColor.darkGray, marginTop: 5}}>
                    {singleEventData?.location}
                  </Text>
                </View>

                <View style={styles.viewStyle}>
                  <View style={[GlobalStyles.flexRow1]}>
                    <Text style={styles.title}>DETAILS</Text>
                    <View
                      style={[
                        // styles.lineStyle,
                        {
                          height: 1,
                          backgroundColor: AppColor.lightGray2,
                          marginLeft: 10,
                          marginTop: 5,
                          width: Dimensions.get('window').width / 1.33,
                        },
                      ]}
                    />
                  </View>
                  <View style={{marginTop: 15}}>
                    {eventDelails.map(item => (
                      <View style={[GlobalStyles.flexRow1, {marginTop: 10}]}>
                        <Image
                          source={item?.image}
                          style={{width: 18, height: 18, resizeMode: 'contain'}}
                        />
                        <View style={[GlobalStyles.flexRow1]}>
                          <Text
                            style={{
                              color: AppColor.darkGray,
                              fontSize: 13,
                              fontWeight: 'bold',
                              marginLeft: 10,
                            }}>
                            {item.title}
                          </Text>
                          {item.title == 'Hosted by : ' && (
                            <Text
                              style={{
                                color: AppColor.greenButton,
                                fontSize: 13,
                                fontWeight: 'bold',
                              }}>
                              {singleEventData?.first_name +
                                ' ' +
                                singleEventData?.last_name}
                            </Text>
                          )}
                        </View>
                      </View>
                    ))}
                  </View>
                  <View style={[GlobalStyles.flexRow1, {marginTop: 10}]}>
                    <View
                      style={[
                        // styles.lineStyle,
                        {
                          height: 1,
                          backgroundColor: AppColor.lightGray2,

                          marginTop: 5,
                          width: Dimensions.get('window').width / 1.33,
                        },
                      ]}
                    />
                    <Text
                      style={[
                        styles.title,
                        {
                          color: AppColor.greenButton,
                          marginLeft: 5,
                          fontSize: 13,
                          fontWeight: 'bold',
                          marginTop: 3,
                        },
                      ]}>
                      READ MORE
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );

  return (
    <ScrollView>
      <View style={[GlobalStyles.appBackground, GlobalStyles.flex]}>
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

        {viewType == 1 && (
          <EventsHomeComponent
            setEventItem={setEventItem}
            setViewEventsPopupVisible={setViewEventsPopupVisible}
            allEvents={allEvents}
            getEventById={getEventById}
            getUserInterest={getUserInterest}
            setDisable={setDisable}
            setAllEvents={setAllEvents}
            disable={disable}
          />
        )}
        {viewType == 2 && (
          <MyEventsComponent
            setEventItem={setEventItem}
            setViewEventsPopupVisible={setViewEventsPopupVisible}
            allEvents={allEvents}
            getEventById={getEventById}
            setDisable={setDisable}
            setAllEvents={setAllEvents}
          />
        )}

        <CreateEvent />
        <ViewEvents />
        {loaderVisible && (
          <Loader
            loaderVisible={loaderVisible}
            setLoaderVisible={setLoaderVisible}
          />
        )}
      </View>
    </ScrollView>
  );
}
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

export default EventsScreen;
