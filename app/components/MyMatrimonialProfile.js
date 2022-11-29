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
import IIcon from 'react-native-vector-icons/Ionicons';
import VideoPlayer from 'react-native-video-player';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Avatar, HStack} from 'native-base';
import RNPickerSelect from 'react-native-picker-select';

function MyMatrimonialProfile(props) {
  const {navigation, route, setupProfile, setSetupProfile} = props;

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

  return (
    <ScrollView>
      <View
        style={[
          GlobalStyles.container,
          {
            paddingVertical: 10,
            paddingHorizontal: 10,
            backgroundColor: AppColor.white,
            marginTop: 5,
          },
        ]}>
        {setupProfile && (
          <View>
            <View
              style={[
                GlobalStyles.flexRow1,
                {justifyContent: 'space-between', marginTop: 10},
              ]}>
              <View style={[GlobalStyles.flexRow]}>
                <Image
                  source={require('../Assets/postImage.png')}
                  style={{width: 120, height: 120, borderRadius: 10}}
                />
                <Text
                  style={{
                    fontSize: 23,
                    color: AppColor.darkGray,
                    fontWeight: 'bold',
                    marginLeft: 10,
                    marginTop: 15,
                  }}>
                  Sarah Cruise
                </Text>
              </View>
              <View>
                <IIcon
                  style={{alignSelf: 'flex-end'}}
                  name="ellipsis-horizontal"
                  size={24}
                  color={AppColor.darkGray}
                />
                <View style={{marginTop: 30}}>
                  <HStack justifyContent="center" space={2}>
                    {sideImages.map(item => (
                      <Avatar
                        bg="green.500"
                        size={'sm'}
                        source={{
                          uri: item.image,
                        }}>
                        AJ
                      </Avatar>
                    ))}
                  </HStack>
                </View>
              </View>
            </View>
            <View style={{marginTop: 15}}>
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
        )}
        {!setupProfile && (
          <View>
            <Formik
              //   innerRef={CreatGroupPost}
              initialValues={{
                image: '',
                name: '',
                email: '',
                number: '',
                gender: '',
                age: '',
                height: '',
                weight: '',
                complextion: '',
                maritalStatus: '',
                aboutMe: '',
                religion: '',
                sect: '',
                fatherName: '',
                motherName: '',
                motherTongue: '',
                siblings: '',
                caste: '',
                education: '',
                jobCareer: '',
                income: '',
                nationality: '',
                location: '',
              }}
              enableReinitialize
              validateOnChange={false}
              validateOnBlur={false}
              // validationSchema={reviewSchema}
              onSubmit={(values, action) => {
                console.log('FormikValues', values);
                let apiData = {
                  name: values.name,
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
                //   postaEvent(apiData);
              }}>
              {formikProps => (
                <View style={{paddingHorizontal: 15}}>
                  <View style={[GlobalStyles.flexRow1, {marginTop: 10}]}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: AppColor.greenButton,
                      }}
                      numberOfLines={1}>
                      {'PROFILE INFORMATION'}
                    </Text>
                    <View
                      style={{
                        height: 1,
                        backgroundColor: AppColor.lightGray2,
                        width: Dimensions.get('window').width / 2.6,
                        marginLeft: 5,
                      }}
                    />
                  </View>
                  <View style={styles.camView}>
                    {formikProps.values.image && (
                      <Image
                        style={{width: 120, height: 120, borderRadius: 10}}
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
                    <Text style={styles.inputTitle}>Name</Text>
                    <TextInput
                      multiline={false}
                      style={styles.whatsNewText}
                      placeholderTextColor={AppColor.lightGray}
                      value={formikProps.values.name}
                      onChangeText={formikProps.handleChange('name')}
                      onBlur={formikProps.handleBlur('name')}
                      placeholder="Name"
                    />
                  </View>

                  <View style={{marginTop: 15}}>
                    <Text style={styles.inputTitle}>Email</Text>
                    <TextInput
                      multiline={false}
                      style={styles.whatsNewText}
                      placeholderTextColor={AppColor.lightGray}
                      value={formikProps.values.email}
                      onChangeText={formikProps.handleChange('email')}
                      onBlur={formikProps.handleBlur('email')}
                      placeholder="Email"
                    />
                  </View>
                  <View style={{marginTop: 15}}>
                    <Text style={styles.inputTitle}>Contact Number</Text>
                    <TextInput
                      multiline={false}
                      style={styles.whatsNewText}
                      placeholderTextColor={AppColor.lightGray}
                      value={formikProps.values.number}
                      onChangeText={formikProps.handleChange('number')}
                      onBlur={formikProps.handleBlur('number')}
                      placeholder="number"
                    />
                  </View>

                  <View style={[GlobalStyles.flexRow1, {marginTop: 20}]}>
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
                        width: Dimensions.get('window').width / 3,
                        marginLeft: 5,
                      }}
                    />
                  </View>

                  <View
                    style={[
                      GlobalStyles.flexRow1,
                      {marginTop: 20, width: '100%'},
                    ]}>
                    <View style={[{width: '48%', marginRight: 7}]}>
                      <Text style={styles.inputTitle}>{'Gender'}</Text>
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
                      <Text style={styles.inputTitle}>{'Age'}</Text>
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

                  <View
                    style={[
                      GlobalStyles.flexRow1,
                      {marginTop: 15, width: '100%'},
                    ]}>
                    <View style={[{width: '48%', marginRight: 7}]}>
                      <Text style={styles.inputTitle}>{'Height'}</Text>
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
                      <Text style={styles.inputTitle}>{'Weight'}</Text>
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
                      <Text style={styles.inputTitle}>{'Complextion'}</Text>
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
                      <Text style={styles.inputTitle}>{'Marital Status'}</Text>
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

                  <View style={{marginTop: 15}}>
                    <Text style={styles.inputTitle}>About me</Text>
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

                  <View style={[GlobalStyles.flexRow1, {marginTop: 20}]}>
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
                        width: Dimensions.get('window').width / 2.2,
                        marginLeft: 5,
                      }}
                    />
                  </View>

                  <View
                    style={[
                      GlobalStyles.flexRow1,
                      {marginTop: 15, width: '100%'},
                    ]}>
                    <View style={[{width: '48%', marginRight: 7}]}>
                      <Text style={styles.inputTitle}>{'Religion'}</Text>
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
                      <Text style={styles.inputTitle}>{'Sect'}</Text>
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

                  <View style={[GlobalStyles.flexRow1, {marginTop: 20}]}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: AppColor.greenButton,
                      }}
                      numberOfLines={1}>
                      {'FAMILY INFORMATION'}
                    </Text>
                    <View
                      style={{
                        height: 1,
                        backgroundColor: AppColor.lightGray2,
                        width: Dimensions.get('window').width / 2.48,
                        marginLeft: 5,
                      }}
                    />
                  </View>

                  <View style={{marginTop: 20}}>
                    <Text style={styles.inputTitle}>{`Father's Name`}</Text>
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
                  <View style={{marginTop: 15}}>
                    <Text style={styles.inputTitle}>{`Mother's Name`}</Text>
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
                  <View style={{marginTop: 15}}>
                    <Text style={styles.inputTitle}>{`Mother Tongue`}</Text>
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

                  <View
                    style={[
                      GlobalStyles.flexRow1,
                      {marginTop: 15, width: '100%'},
                    ]}>
                    <View style={[{width: '48%', marginRight: 7}]}>
                      <Text style={styles.inputTitle}>{'siblings'}</Text>
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
                      <Text style={styles.inputTitle}>{'Caste'}</Text>
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

                  <View style={[GlobalStyles.flexRow1, {marginTop: 20}]}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: AppColor.greenButton,
                      }}
                      numberOfLines={1}>
                      {'EDUCATION & CAREER'}
                    </Text>
                    <View
                      style={{
                        height: 1,
                        backgroundColor: AppColor.lightGray2,
                        width: Dimensions.get('window').width / 2.4,
                        marginLeft: 5,
                      }}
                    />
                  </View>
                  {/* <View
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
                    </View> */}
                  <View style={{marginTop: 20}}>
                    <Text style={styles.inputTitle}>Education</Text>
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
                    <Text style={styles.inputTitle}>Job Career</Text>
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
                    <Text style={styles.inputTitle}>
                      {'Average Income(Anually)'}
                    </Text>
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
                  <View style={[GlobalStyles.flexRow1, {marginTop: 20}]}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontWeight: 'bold',
                        color: AppColor.greenButton,
                      }}
                      numberOfLines={1}>
                      {'NATIONALITY & LOCATION'}
                    </Text>
                    <View
                      style={{
                        height: 1,
                        backgroundColor: AppColor.lightGray2,
                        width: Dimensions.get('window').width / 3.2,
                        marginLeft: 5,
                      }}
                    />
                  </View>
                  <View style={{marginTop: 20}}>
                    <Text style={styles.inputTitle}>{'Nationality'}</Text>
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
                    <Text style={styles.inputTitle}>{'Location'}</Text>
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
                    onPress={() => {
                      setSetupProfile(true);
                    }}>
                    CREATE
                  </Button>
                </View>
              )}
            </Formik>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  camView: {
    width: 120,
    height: 120,
    borderRadius: 10,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
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
  inputTitle: {color: AppColor.darkGray, fontWeight: '500'},
});

export default MyMatrimonialProfile;
