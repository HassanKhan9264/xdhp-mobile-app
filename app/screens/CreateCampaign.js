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

const CreateCampaign = props => {
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
    {label: 'campaign 1', value: 1},
    {label: 'campaign 2', value: 2},
    {label: 'campaign 3', value: 3},
    {label: 'campaign 4', value: 4},
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
  return (
    <ScrollView style={[{backgroundColor: 'white'}]}>
      <View>
        <Formik
          //   innerRef={CreatGroupPost}
          initialValues={{
            image: '',
            // eventName: '',
            date: '',
            time: '',
            endDate: '',
            endTime: '',
            eventType: '',
            privacy: '',
            // location: '',
            meetingLink: '',
            entryFee: '',
            fee: '',
            campaignName: '',
            campaignDesc: '',
          }}
          enableReinitialize
          validateOnChange={false}
          validateOnBlur={false}
          // validationSchema={reviewSchema}
          onSubmit={(values, action) => {
            console.log('FormikValues', values);
            let apiData = {
              //   name: values.eventName,
              description: values.campaignDesc,
              start_date: values.date,
              start_time: values.time,
              end_date: values.endDate,
              end_time: values.endTime,
              banner_image: values.image,
              event_type_id: 1,
              //   location: values.location,
              privacy: values.privacy.label,
              campaignName: values.campaignName,
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
                <Text style={styles.inputTitle}>Campaign Name</Text>
                <TextInput
                  multiline={false}
                  style={styles.whatsNewText}
                  placeholderTextColor={AppColor.lightGray}
                  value={formikProps.values.campaignName}
                  onChangeText={formikProps.handleChange('campaignName')}
                  onBlur={formikProps.handleBlur('campaignName')}
                  placeholder="Campaign Name"
                />
              </View>

              <View
                style={[GlobalStyles.flexRow1, {marginTop: 15, width: '100%'}]}>
                <View style={[{width: '100%', marginRight: 7}]}>
                  <Text style={styles.inputTitle}>{'Campaign Category'}</Text>
                  <View
                    style={[
                      styles.whatsNewText,
                      GlobalStyles.flexRow1,
                      {justifyContent: 'space-between'},
                    ]}>
                    <View style={{backgroundColor: '#f2f2f2', width: '85%'}}>
                      <RNPickerSelect
                        placeholder={{
                          label: 'Campaign Category',
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
                            'Campaign Category'}
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

                {/* <View style={[{width: '48%', marginLeft: 7}]}>
                  <Text style={styles.inputTitle}>{''}</Text>
                  <View
                    style={[
                      styles.whatsNewText,
                      GlobalStyles.flexRow1,
                      {justifyContent: 'space-between'},
                    ]}>
                    <View style={{backgroundColor: '#f2f2f2', width: '85%'}}>
                      <RNPickerSelect
                        placeholder={{
                          label: 'Privacy',
                          color: AppColor.darkGray,
                        }}
                        onValueChange={value => {
                          console.log('value', value);
                          // if (!value) return;
                          let type = privacys.filter(x => x.value === value)[0];
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
                </View> */}
              </View>

              {/* <View style={{marginTop: 15}}>
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
              </View> */}
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
                style={[GlobalStyles.flexRow1, {marginTop: 15, width: '100%'}]}>
                <View style={[{width: '48%', marginRight: 7}]}>
                  <Text style={styles.inputTitle}>{'Goal Amount'}</Text>
                  <View
                    style={[
                      styles.whatsNewText,
                      GlobalStyles.flexRow1,
                      {justifyContent: 'space-between'},
                    ]}>
                    <View style={{backgroundColor: '#f2f2f2', width: '85%'}}>
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
                          {formikProps.values.entryFee?.label ?? '0$'}
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
                  <Text style={styles.inputTitle}>{'Due Date'}</Text>

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
                    placeholder="mm/dd/yyyy"
                  />
                </View>
              </View>
              <View style={{marginTop: 15}}>
                <Text style={styles.inputTitle}>
                  Beneficiary Name/Organization
                </Text>
                <TextInput
                  multiline={false}
                  style={styles.whatsNewText}
                  placeholderTextColor={AppColor.lightGray}
                  value={formikProps.values.campaignName}
                  onChangeText={formikProps.handleChange('campaignName')}
                  onBlur={formikProps.handleBlur('campaignName')}
                  placeholder="Campaign Name"
                />
              </View>
              <View style={{marginTop: 15}}>
                <Text style={styles.inputTitle}>Description</Text>
                <TextInput
                  multiline={false}
                  style={[styles.whatsNewText, {height: 120}]}
                  placeholderTextColor={AppColor.lightGray}
                  value={formikProps.values.campaignDesc}
                  onChangeText={formikProps.handleChange('campaignDesc')}
                  onBlur={formikProps.handleBlur('campaignDesc')}
                  placeholder="Description"
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
  );
};
const styles = StyleSheet.create({
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
  userImage2: {
    height: 35,
    width: 35,
    borderRadius: 25,
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
    // paddingHorizontal: 10,
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingVertical: 20,
  },
  title: {color: AppColor.darkGray, fontSize: 17, fontWeight: '500'},
  whatsNewText2: {
    color: AppColor.lightGray,
    // backgroundColor: 'red',
    fontWeight: '500',
    marginLeft: 10,
    fontSize: 16,
    width: '80%',
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
});
export default CreateCampaign;
