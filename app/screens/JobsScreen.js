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

function JobsScreen(props) {
  const {navigation, route} = props;
  const [viewType, setViewType] = useState('1');
  const [jobViewPopupVisible, setJobViewPopupVisible] = useState(false);
  const [applyingForJob, setApplyingForJob] = useState(false);
  const [getJobData, setGetJobData] = useState();
  const [jobsHomeData, setJobsHomeData] = useState();
  const [getJobId, setGetJobId] = useState();
  const [loaderVisible, setLoaderVisible] = useState(false);
  const showLoader = () => setLoaderVisible(true);
  const hideLoader = () => setLoaderVisible(false);

  console.log('getJobData', getJobData);

  useEffect(() => {
    getAllJobs();
  }, []);

  const getAllJobs = async () => {
    let user = await getUser();
    console.log('userUserData', user.userData[0].id);
    showLoader();
    var result = await new ServiceApi().allJobs();
    console.log('getAllJobs', result);
    if (result && result.data) {
      hideLoader();
      setJobsHomeData(result.data);
    } else {
      hideLoader();
      alert('Something went wrong');
    }
  };

  const getJobByID = async id => {
    showLoader();
    var result = await new ServiceApi().jobById(id);
    console.log('getJobByID', result);
    if (result && result.data) {
      hideLoader();
      setGetJobData(result.data[0]);
      // setJobViewPopupVisible(true)
    } else {
      hideLoader();
      alert('Something went wrong');
    }
  };

  const sendingResume = async data => {
    showLoader();
    var result = await new ServiceApi().applyingForJob(data);
    console.log('sendingResume', result);
    if (result && result.data) {
      hideLoader();
      setApplyingForJob(false);
    } else {
      hideLoader();
      alert('Something went wrong');
    }
  };

  const icons = [
    {
      icon: 'plus-circle-outline',
      type: 1,
      onPress: () => {
        navigation.navigate('createjob');
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
  }, [navigation]);

  const buttonText = [
    {
      text: 'Home',
      type: 1,
    },
    {
      text: 'Find Jobs',
      type: 2,
    },
    {
      text: 'Manage Jobs',
      type: 3,
    },
  ];

  const jobDetails = [
    {
      icon: 'briefcase',
      job: 'Administrative',
      jobCategory: 'Job Category',
    },
    {
      icon: 'briefcase',
      job: 'Administrative',
      jobCategory: 'Job Category',
    },
  ];

  const JobViewPopup = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={jobViewPopupVisible}
      // visible={true}
    >
      <View style={styles.modalView}>
        <ScrollView>
          <View>
            <View
              style={[
                GlobalStyles.flexRow1,
                {
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                  backgroundColor: AppColor.white,
                  justifyContent: 'space-between',
                  borderBottomWidth: 1,
                  elevation: 5,
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
                    setJobViewPopupVisible(false);
                  }}
                />
                {/* <Text
                style={{color: AppColor.darkGray, fontSize: 18, marginLeft: 5}}>
                Create Post
              </Text> */}
              </View>
            </View>
            <View
              style={[
                GlobalStyles.flexRow1,
                {
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                  marginTop: 10,
                },
              ]}>
              <View style={[GlobalStyles.flexRow1]}>
                <Image
                  source={require('../Assets/globe2.png')}
                  style={{
                    width: 25,
                    height: 25,
                    resizeMode: 'contain',
                    marginLeft: 10,
                  }}
                />
                <Image
                  source={require('../Assets/logo-linkedin2.png')}
                  style={{
                    width: 25,
                    height: 25,
                    resizeMode: 'contain',
                    marginLeft: 10,
                  }}
                />
              </View>
              <Icon
                name="dots-horizontal"
                size={20}
                color={AppColor.darkGray}
              />
            </View>

            <View
              style={[
                GlobalStyles.flexRow1,
                {
                  paddingHorizontal: 10,
                  marginTop: 5,
                },
              ]}>
              <View>
                <Image
                  source={
                    getJobData?.company_logo == '' ||
                    getJobData?.company_logo == 'test company logo'
                      ? require('../Assets/job-logo-9.png')
                      : {uri: getJobData?.company_logo}
                  }
                  style={{width: 80, height: 80, resizeMode: 'contain'}}
                />
              </View>
              <View style={{marginLeft: 10, width: '75%'}}>
                <Text
                  numberOfLines={2}
                  style={{
                    fontSize: 15,
                    width: '100%',
                    color: AppColor.darkGray,
                    fontWeight: 'bold',
                  }}>
                  {getJobData?.title}
                </Text>
                <Text
                  numberOfLines={2}
                  style={{
                    fontSize: 13,
                    color: AppColor.greenButton,
                    width: '100%',
                    marginTop: 5,
                    //   fontWeight: 'bold',
                  }}>
                  {getJobData?.category_name}
                </Text>
              </View>
            </View>
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
                {getJobData?.address}
              </Text>
            </View>

            <View style={styles.viewStyle2}>
              <View
                style={[
                  GlobalStyles.flexRow1,
                  {justifyContent: 'space-between', marginTop: 10},
                ]}>
                <View style={GlobalStyles.flexRow1}>
                  <IIcon
                    // style={{marginRight: 5}}
                    name={'briefcase'}
                    size={20}
                    color={AppColor.greenButton}
                  />
                  <Text
                    style={{
                      color: AppColor.darkGray,
                      fontSize: 16,
                      marginLeft: 10,
                    }}>
                    Administrative
                  </Text>
                </View>
                <Text style={{color: AppColor.lightGray, fontSize: 13}}>
                  Job Category
                </Text>
              </View>

              <View
                style={[
                  GlobalStyles.flexRow1,
                  {justifyContent: 'space-between', marginTop: 10},
                ]}>
                <View style={GlobalStyles.flexRow1}>
                  <IIcon
                    // style={{marginRight: 5}}
                    name={'time'}
                    size={20}
                    color={AppColor.greenButton}
                  />
                  <Text
                    style={{
                      color: AppColor.darkGray,
                      fontSize: 16,
                      marginLeft: 10,
                    }}>
                    {getJobData?.type_name}
                  </Text>
                </View>
                <Text style={{color: AppColor.lightGray, fontSize: 13}}>
                  Job Type
                </Text>
              </View>

              <View
                style={[
                  GlobalStyles.flexRow1,
                  {justifyContent: 'space-between', marginTop: 10},
                ]}>
                <View style={GlobalStyles.flexRow1}>
                  <IIcon
                    // style={{marginRight: 5}}
                    name={'cash'}
                    size={20}
                    color={AppColor.greenButton}
                  />
                  <Text
                    style={{
                      color: AppColor.darkGray,
                      fontSize: 16,
                      marginLeft: 10,
                    }}>
                    {'$' + getJobData?.salary + ' - $30,000 /monthly'}
                  </Text>
                </View>
                <Text style={{color: AppColor.lightGray, fontSize: 13}}>
                  Salary
                </Text>
              </View>

              <View
                style={[
                  GlobalStyles.flexRow1,
                  {justifyContent: 'space-between', marginTop: 10},
                ]}>
                <View style={GlobalStyles.flexRow1}>
                  <IIcon
                    // style={{marginRight: 5}}
                    name={'earth'}
                    size={20}
                    color={AppColor.greenButton}
                  />
                  <Text
                    style={{
                      color: AppColor.darkGray,
                      fontSize: 16,
                      marginLeft: 10,
                    }}>
                    www.webstie.com
                  </Text>
                </View>
                <Text style={{color: AppColor.lightGray, fontSize: 13}}>
                  Website
                </Text>
              </View>

              <View
                style={[
                  GlobalStyles.flexRow1,
                  {
                    justifyContent: 'space-between',
                    marginTop: 10,
                    marginBottom: 10,
                  },
                ]}>
                <View style={GlobalStyles.flexRow1}>
                  <IIcon
                    // style={{marginRight: 5}}
                    name={'logo-linkedin'}
                    size={20}
                    color={AppColor.greenButton}
                  />
                  <Text
                    style={{
                      color: AppColor.darkGray,
                      fontSize: 16,
                      marginLeft: 10,
                    }}>
                    Linkedin.com/company
                  </Text>
                </View>
                <Text style={{color: AppColor.lightGray, fontSize: 13}}>
                  Linkedin
                </Text>
              </View>
            </View>

            <View style={styles.viewStyle3}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: 'bold',
                  color: AppColor.darkGray,
                }}>
                Job Description
              </Text>

              <Text
                style={{fontSize: 15, color: AppColor.lightGray}}
                numberOfLines={6}>
                {getJobData?.description}
              </Text>

              <Button
                style={{
                  backgroundColor: AppColor.darkGray,
                  width: '100%',
                  marginTop: 20,
                  marginBottom: 10,
                }}
                mode="contained"
                onPress={() => {
                  console.log('getJobDatagetJobData', getJobData.id);
                  setGetJobId(getJobData.id);
                  setJobViewPopupVisible(false);
                  setApplyingForJob(true);
                }}>
                Apply for job
              </Button>
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );

  const ApplyForJob = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={applyingForJob}
      // visible={true}
    >
      <View style={styles.modalView}>
        {/* <ScrollView style={{backgroundColor:'red',flex:1}}> */}
        <View style={{flex: 1}}>
          <View
            style={[
              GlobalStyles.flexRow1,
              {
                paddingHorizontal: 10,
                paddingVertical: 10,
                backgroundColor: AppColor.white,
                justifyContent: 'space-between',
                borderBottomWidth: 1,
                elevation: 5,
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
                  setApplyingForJob(false);
                }}
              />
              <Text
                style={{color: AppColor.darkGray, fontSize: 18, marginLeft: 5}}>
                Apply For Job
              </Text>
            </View>
          </View>

          <View
            style={{
              backgroundColor: AppColor.white,
              marginTop: 5,
              width: '100%',
              flex: 1,
            }}>
            <Formik
              //   innerRef={CreatGroupPost}
              initialValues={{
                name: '',
                email: '',
                phone: '',
              }}
              enableReinitialize
              validateOnChange={false}
              validateOnBlur={false}
              // validationSchema={reviewSchema}
              onSubmit={(values, action) => {
                console.log('FormikValues', values);

                let applyData = {
                  job_id: getJobId,
                  full_name: values.name,
                  email: values.email,
                  contact_no: values.phone,
                  resume: 'dfsfsdfdsfsdfdsfd',
                };
                console.log('applyData', applyData);
                sendingResume(applyData);
                // setApplyingForJob(false);
                // setGroupPostDes(values.description);
                // return;
              }}>
              {formikProps => (
                <View style={{paddingHorizontal: 15}}>
                  <View style={{marginTop: 15}}>
                    <Text style={styles.inputTitle}>Applicant Name</Text>
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
                    <Text style={styles.inputTitle}>Applicant Email</Text>
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
                    <Text style={styles.inputTitle}>Applicant Phone</Text>
                    <TextInput
                      multiline={false}
                      style={styles.whatsNewText}
                      keyboardType="numeric"
                      placeholderTextColor={AppColor.lightGray}
                      value={formikProps.values.phone}
                      onChangeText={formikProps.handleChange('phone')}
                      onBlur={formikProps.handleBlur('phone')}
                      placeholder="Phone"
                    />
                  </View>

                  <View style={{marginTop: 15}}>
                    <Text style={styles.inputTitle}>Upload Resume</Text>
                    <View
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: 10,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f2f2f2',
                        marginTop: 5,
                      }}>
                      <IconButton
                        // style={{marginRight: 5}}
                        icon={'file-upload-outline'}
                        size={30}
                        color={AppColor.greenButton}
                      />
                      <Text
                        style={{
                          color: AppColor.lightGray,
                          fontSize: 14,
                          marginTop: -10,
                        }}>
                        Upload
                      </Text>
                    </View>
                  </View>

                  <Button
                    style={{
                      backgroundColor: AppColor.greenButton,
                      width: '100%',
                      marginTop: 40,
                    }}
                    mode="contained"
                    onPress={formikProps.handleSubmit}>
                    submit
                  </Button>
                </View>
              )}
            </Formik>
          </View>
        </View>
        {/* </ScrollView> */}
      </View>
    </Modal>
  );

  return (
    <ScrollView>
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
          <JobsHomeComponent
            getJobByID={getJobByID}
            jobsHomeData={jobsHomeData}
            setGetJobId={setGetJobId}
            setGetJobData={setGetJobData}
            setJobViewPopupVisible={setJobViewPopupVisible}
          />
        )}
        {viewType == 2 && <FindJobsComponent />}
        {viewType == 3 && <ManageJobsComponent />}

        <JobViewPopup />
        <ApplyForJob />
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
    color: AppColor.darkGray,
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

export default JobsScreen;
