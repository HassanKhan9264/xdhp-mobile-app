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
import {longPressGestureHandlerProps} from 'react-native-gesture-handler/lib/typescript/handlers/LongPressGestureHandler';
import DonationsHome from '../components/DonationsHome';
import DonationDonatefor from '../components/DonationDonatefor';
import DonationDonarWall from '../components/DonationDonarWall';
import DonationMyCampaigns from '../components/DonationMyCampaigns';

function DonationsScreen(props) {
  const {navigation, route} = props;
  const [viewType, setViewType] = useState('1');
  const [viewDonationPopupVisible, setViewDonationPopupVisible] =
    useState(false);
  const [singleDonationData, setSingleDonationData] = useState();
  const [donateForm, setDonateForm] = useState(false);
  const [newDonationComment, setNewDonationComment] = useState();
  const [loaderVisible, setLoaderVisible] = useState(false);
  const showLoader = () => setLoaderVisible(true);
  const hideLoader = () => setLoaderVisible(false);
  const [eventTypes, setEventTypes] = useState([
    {label: 'Online', value: 1},
    {label: 'In Person', value: 2},
  ]);

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
      text: 'Donate for',
      type: 2,
    },
    {
      text: 'Donar wall',
      type: 3,
    },
    {
      text: 'My Campaigns',
      type: 4,
    },
  ];

  const icons = [
    {
      icon: 'plus-circle-outline',
      type: 1,
      onPress: () => {
        navigation.navigate('createcampaign');
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

  const DonationPaymentForm = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={donateForm}
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
                  setDonateForm(false);
                }}
              />
              <Text
                style={{color: AppColor.darkGray, fontSize: 18, marginLeft: 5}}>
                Start Campaign
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
                  name: '',
                  category: '',
                  goalAound: '',
                  dueDate: '',
                  beneficiaryName: '',
                  discription: '',
                }}
                enableReinitialize
                validateOnChange={false}
                validateOnBlur={false}
                // validationSchema={reviewSchema}
                onSubmit={(values, action) => {
                  console.log('FormikValues', values);
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
                        value={formikProps.values.name}
                        onChangeText={formikProps.handleChange('name')}
                        onBlur={formikProps.handleBlur('name')}
                        placeholder="Campaign Name"
                      />
                    </View>

                    <View style={{marginTop: 15}}>
                      <Text style={styles.inputTitle}>Campaign Category</Text>
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
                              formikProps.setFieldValue('category', type);
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

                    <View
                      style={[
                        GlobalStyles.flexRow1,
                        {marginTop: 15, width: '100%'},
                      ]}>
                      <View style={[{width: '48%', marginRight: 7}]}>
                        <Text style={styles.inputTitle}>{'Goal Amount'}</Text>
                        <TextInput
                          multiline={false}
                          keyboardType="numeric"
                          style={styles.whatsNewText}
                          placeholderTextColor={AppColor.lightGray}
                          value={formikProps.values.goalAound}
                          onChangeText={formikProps.handleChange('goalAound')}
                          onBlur={formikProps.handleBlur('goalAound')}
                          placeholder="$0"
                        />
                      </View>

                      <View style={[{width: '48%', marginLeft: 7}]}>
                        <Text style={styles.inputTitle}>{'Due Date'}</Text>
                        <TextInput
                          multiline={false}
                          keyboardType="numeric"
                          style={styles.whatsNewText}
                          placeholderTextColor={AppColor.lightGray}
                          value={formikProps.values.dueDate}
                          onChangeText={formikProps.handleChange('dueDate')}
                          onBlur={formikProps.handleBlur('dueDate')}
                          placeholder="dd-mm-yyyy"
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
                        value={formikProps.values.beneficiaryName}
                        onChangeText={formikProps.handleChange(
                          'beneficiaryName',
                        )}
                        onBlur={formikProps.handleBlur('beneficiaryName')}
                        placeholder="Beneficiary Name"
                      />
                    </View>
                    <View style={{marginTop: 15}}>
                      <Text style={styles.inputTitle}>Discription</Text>
                      <TextInput
                        multiline={false}
                        style={[styles.whatsNewText, {height: 120}]}
                        placeholderTextColor={AppColor.lightGray}
                        value={formikProps.values.discription}
                        onChangeText={formikProps.handleChange('discription')}
                        onBlur={formikProps.handleBlur('discription')}
                        placeholder="Discription"
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
                        // formikProps.handleSubmit
                        setDonateForm(false);
                      }}>
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

  const ViewDonation = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={viewDonationPopupVisible}
      // visible={true}
    >
      <View style={styles.modalView}>
        <ScrollView>
          <View style={{position: 'relative', flex: 1}}>
            <View style={[GlobalStyles.container3]}>
              <ImageBackground
                source={
                  singleDonationData?.videolink ??
                  require('../Assets/donationImage.png')
                }
                resizeMode="cover"
                style={{width: '100%', height: 200, position: 'relative'}}>
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
                      setViewDonationPopupVisible(false);
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
                <Button
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    backgroundColor: AppColor.greenButton,
                    borderRadius: 0,
                  }}
                  // icon="camera"
                  mode="contained"
                  onPress={() => {
                    setViewDonationPopupVisible(false);
                    setDonateForm(true);
                  }}>
                  DONATE
                </Button>
              </ImageBackground>
              <View style={{paddingHorizontal: 10, marginTop: 5}}>
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
                      {'asdsadasdasdsa'}
                    </Text>
                    <Text
                      style={{
                        color: AppColor.cancel,
                        fontSize: 13,
                        fontWeight: 'bold',
                      }}>
                      {'asdasdsadsadsa'}
                    </Text>
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

                <View style={{marginTop: 15}}>
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
                    <Text
                      style={{
                        color: AppColor.lightGray,
                        fontSize: 14,
                        marginTop: 5,
                        marginHorizontal: 5,
                      }}
                      numberOfLines={5}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Quis ipsum suspendisse ultrices gravida. Risus
                      commodo viverra maecenas accumsan lacus vel facilisis.{' '}
                    </Text>
                  </View>
                </View>

                <View style={{marginTop: 15}}>
                  <View style={styles.viewStyle}>
                    <View style={[GlobalStyles.flexRow1]}>
                      <Text style={styles.title}>ORGANIZER</Text>
                      <View
                        style={[
                          // styles.lineStyle,
                          {
                            height: 1,
                            backgroundColor: AppColor.lightGray2,
                            marginLeft: 10,
                            marginTop: 5,
                            width: Dimensions.get('window').width / 1.45,
                          },
                        ]}
                      />
                    </View>
                    <View
                      style={[
                        GlobalStyles.flexRow1,
                        {
                          paddingVertical: 10,
                          marginHorizontal: 10,
                          position: 'relative',
                          //   justifyContent: 'space-between',
                        },
                      ]}>
                      <Avatar.Image
                        style={{backgroundColor: AppColor.white}}
                        size={35}
                        source={require('../Assets/postImage.png')}
                      />
                      <View style={{marginLeft: 10}}>
                        <Text
                          style={{
                            color: AppColor.darkGray,
                            fontWeight: 'bold',
                            fontSize: 13,
                          }}>
                          {'Jen'}
                        </Text>

                        <Text
                          style={{
                            color: AppColor.lightGray,
                            fontSize: 11,
                          }}>
                          Organizer
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={{marginTop: 15}}>
                  <View style={styles.viewStyle}>
                    <View style={[GlobalStyles.flexRow1]}>
                      <Text style={styles.title}>BENEFICIARY</Text>
                      <View
                        style={[
                          // styles.lineStyle,
                          {
                            height: 1,
                            backgroundColor: AppColor.lightGray2,
                            marginLeft: 10,
                            marginTop: 5,
                            width: Dimensions.get('window').width / 1.51,
                          },
                        ]}
                      />
                    </View>
                    <View
                      style={[
                        GlobalStyles.flexRow1,
                        {
                          paddingVertical: 10,
                          marginHorizontal: 10,
                          position: 'relative',
                          //   justifyContent: 'space-between',
                        },
                      ]}>
                      <Avatar.Image
                        style={{backgroundColor: AppColor.white}}
                        size={35}
                        source={require('../Assets/notificationImge.png')}
                      />
                      <View style={{marginLeft: 10}}>
                        <Text
                          style={{
                            color: AppColor.darkGray,
                            fontWeight: 'bold',
                            fontSize: 13,
                          }}>
                          {'Jen'}
                        </Text>

                        <Text
                          style={{
                            color: AppColor.lightGray,
                            fontSize: 11,
                          }}>
                          Organizer
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={{marginTop: 15}}>
                  <View style={styles.viewStyle}>
                    <View style={[GlobalStyles.flexRow1]}>
                      <Text style={styles.title}>COMMENTS</Text>
                      <View
                        style={[
                          // styles.lineStyle,
                          {
                            height: 1,
                            backgroundColor: AppColor.lightGray2,
                            marginLeft: 10,
                            marginTop: 5,
                            width: Dimensions.get('window').width / 1.45,
                          },
                        ]}
                      />
                    </View>
                    <View
                      style={{
                        width: '100%',
                        backgroundColor: 'rgba(255, 255, 255,0.8)',
                        height: 70,
                        // paddingHorizontal: 15,
                      }}>
                      <View
                        style={{
                          // borderBottomWidth: 1,
                          // borderColor: AppColor.lightGray2,
                          marginHorizontal: 15,
                          marginTop: 10,
                        }}
                      />
                      <View
                        style={[
                          GlobalStyles.flexRow1,
                          {
                            paddingVertical: 10,
                            backgroundColor: AppColor.white,
                            paddingHorizontal: 15,
                            // width: '100%',
                          },
                        ]}>
                        <Image
                          source={require('../Assets/notificationImge.png')}
                          style={styles.userImage2}
                        />
                        <TextInput
                          style={styles.whatsNewText2}
                          placeholderTextColor={AppColor.lightGray}
                          onChangeText={value => {
                            setNewDonationComment(value);
                          }}
                          // ref={inputText}
                          value={newDonationComment}
                          placeholder="Write a comment..."
                        />
                        <IconButton
                          icon={'send-outline'}
                          size={23}
                          color={AppColor.greenButton}
                          onPress={() => {
                            //   let mapCommntPostId = comments.map(x => x.post_id)[0];
                            //   if (commentRply && newComment) {
                            //     let postRpyComment = {
                            //       description: newComment,
                            //       post_id: item?.post_id,
                            //       reply_to: commentRply.user_id,
                            //       parent_comment_id: commentRply.id,
                            //     };
                            //     postaComment(postRpyComment);
                            //     setNewComment(null);
                            //   } else if (newComment) {
                            //     let postComment = {
                            //       description: newComment,
                            //       post_id: item?.post_id,
                            //       reply_to: 0,
                            //       parent_comment_id: 0,
                            //     };
                            //     console.log('postComment', postComment);
                            //     postaComment(postComment);
                            //     setNewComment(null);
                            //   }
                          }}
                        />
                      </View>
                    </View>
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
              justifyContent: 'space-around',
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
                  //   {marginLeft: item.type == 2 ? 20 : 10},
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
          <DonationsHome
            setSingleDonationData={setSingleDonationData}
            setViewDonationPopupVisible={setViewDonationPopupVisible}
          />
        )}
        {viewType == 2 && <DonationDonatefor />}
        {viewType == 3 && <DonationDonarWall />}
        {viewType == 4 && <DonationMyCampaigns />}

        <ViewDonation />
        <DonationPaymentForm />
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

export default DonationsScreen;
