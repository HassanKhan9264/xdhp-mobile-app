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
import Comments from './Comments';

var postdescription;

function SocialHomeScreen(props) {
  const {navigation, route} = props;
  const [whatsNew, setWhatsNew] = useState();
  const showLoader = () => setLoaderVisible(true);
  const hideLoader = () => setLoaderVisible(false);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const [socailPosts, setSocailPosts] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupImage, setPopupImage] = useState();
  const [imagePopupVisible, setImagePopupVisible] = useState(false);
  const [user, setUser] = useState();
  const [offset, setOffset] = useState(0);
  const [postImageOrVideo, setPostImageOrVideo] = useState();
  const [like, setlike] = useState(false);
  const [
    onEndReachedCalledDuringMomentum,
    setOnEndReachedCalledDuringMomentum,
  ] = useState(true);
  const CreatPost = useRef();

  const icons = [
    {
      icon: require('../Assets/message.png'),
      type: 1,
    },
    {
      icon: require('../Assets/bell.png'),
      type: 2,
    },
    {
      icon: require('../Assets/search.png'),
      type: 3,
    },
  ];

  useLayoutEffect(() => {
    //console.log('Social Home Screen \n\n\n\n\n\n\n\n\n\n');
    navigation.addListener('focus', () => {
      navigation.getParent().setOptions({
        title: 'Social',
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
              <Pressable
                onPress={() => {
                  //console.log('icon', item);
                  switch (item.type) {
                    case 1:
                      //console.log('1');
                      navigation.navigate('chat');
                      break;

                    case 2:
                      navigation.navigate('notifications');
                      //console.log('2');
                      break;

                    case 3:
                      //console.log('3');
                      break;
                  }
                }}>
                <Image
                  source={item.icon}
                  style={[GlobalStyles.iconeStyle, {marginRight: 10}]}
                />
              </Pressable>
            ))}
          </View>
        ),
      });
    });
  }, [navigation]);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = async () => {
    //console.log('Share');
    let user = await getUser();
    setUser(user.userData[0]);
    showLoader();
    var data = {
      offset,
      type: 'photo',
    };
    var result = await new ServiceApi().allPosts(data);
    //console.log('getAllPosts', result);
    if (result && result.data) {
      hideLoader();
      setOffset(result.data.offset);
      setSocailPosts([...socailPosts, ...result.data.data]);
    } else if (result.data == null) {
      hideLoader();
      // alert(result.message);
    } else {
      hideLoader();
      alert('Something went wrong');
    }
  };

  const sharePost = async data => {
    showLoader();
    var result = await new ServiceApi().creatPost(data);
    //console.log('sharePost', result);
    if (result && result.data) {
      hideLoader();
      getAllPosts();
      alert('sharePost', result.message);
    } else {
      hideLoader();
      // getAllPosts();
      // alert('Something went wrong');
    }
  };

  const likePost = async data => {
    showLoader();
    var result = await new ServiceApi().likePostOrComment(data);
    //console.log('likePost', result);
    if (result && result.data) {
      hideLoader();
      getAllPosts();
    } else {
      hideLoader();
      // alert('Something went wrong');
    }
  };

  const postDelete = async id => {
    showLoader();
    var result = await new ServiceApi().deletePost(id);
    // //console.log('postDelete', result);
    if (result && result.message == 'Post Deleted') {
      hideLoader();
      getAllPosts();
    } else {
      hideLoader();
      // alert('Something went wrong');
    }
  };

  const postMenuOption = [
    {
      btn: 'Save',
      type: 1,
    },
    {
      btn: 'Unfollow User',
      type: 2,
    },
    {
      btn: 'Hide Post',
      type: 3,
    },
    {
      btn: 'Delete',
      type: 4,
    },
    {
      btn: 'Report Post',
      type: 5,
    },
  ];

  const HeaderWhatsNew = () => {
    return (
      <Pressable
        onPress={() => {
          setPopupVisible(true);
        }}>
        <View style={styles.whatsNew}>
          <Image
            source={require('../Assets/userImage.png')}
            style={styles.whatsNewImage}
          />
          <Text style={styles.whatsNewText}>{'on your mind?'}</Text>
        </View>
      </Pressable>
    );
  };

  const UserPost = ({item}) => {
    // //console.log('postss', item);
    // //console.log('asdsadasdsada', item.url[0]?.url);
    let postImage = item.url[0]?.url;
    return (
      <View style={styles.userPost}>
        <View
          style={[
            GlobalStyles.flexRow,
            {marginTop: 10, paddingHorizontal: 15, alignItems: 'center'},
          ]}>
          <Image
            source={
              {uri: item?.profile_image}
              // ??
              // require('../Assets/postImage.png')
            }
            style={styles.userImage}
          />
          <Text style={styles.userName}>
            {item?.first_name + ' ' + item?.last_name}
          </Text>

          <View>
            <Menu>
              <MenuTrigger>
                <Icon
                  name="dots-horizontal"
                  size={20}
                  color={AppColor.lightGray}
                />
              </MenuTrigger>

              <MenuOptions
                customStyles={{
                  // optionWrapper: {marginLeft: 10, marginRight: 10},
                  optionsContainer: {
                    width: 140,

                    marginLeft: -5,
                    marginTop: 15,
                    borderRadius: 8,
                    paddingLeft: 10,
                    backgroundColor: 'rgba(242, 245, 243,0.9)',
                    paddingBottom: 15,
                  },
                }}>
                {postMenuOption.map(option => (
                  <MenuOption
                    customStyles={{
                      optionText: {
                        color:
                          option?.btn == 'Delete'
                            ? AppColor.cancel
                            : AppColor.darkGray,
                        fontSize: 12,
                      },
                    }}
                    style={{
                      padding: 5,
                    }}
                    onSelect={() => {
                      switch (option.type) {
                        case 4:
                          postDelete(item?.post_id);
                          break;
                      }
                    }}
                    text={option?.btn}
                  />
                ))}
              </MenuOptions>
            </Menu>
          </View>
        </View>

        <Pressable
          onPress={() => {
            setPopupImage(postImage);
            setImagePopupVisible(true);
          }}>
          <Image
            source={
              {uri: postImage}
              // ??
              // require('../Assets/postImage.png')
            }
            style={styles.userPostImage}
          />
        </Pressable>

        <View
          style={[
            GlobalStyles.flexRow,
            {
              alignItems: 'center',
              paddingHorizontal: 5,
              paddingTop: 10,
              height: 30,
              // backgroundColor: 'red',
            },
          ]}>
          <Pressable onPress={() => {}}>
            <View
              style={[
                GlobalStyles.flexRow,
                {alignItems: 'center', marginLeft: -8},
              ]}>
              <IconButton
                icon="cards-heart-outline"
                size={20}
                color={
                  item.likeCount > 0 ? AppColor.greenButton : AppColor.darkGray
                }
                onPress={() => {
                  if (item.likeCount == 0) {
                    // setlike(!like);
                    let like = {
                      post_id: item?.post_id,
                    };
                    // //console.log('like12346', like);
                    likePost(like);
                  }
                }}
              />
              <Text style={styles.likes}>{item?.likeCount}</Text>
            </View>
          </Pressable>
          <View
            style={[
              GlobalStyles.flexRow,
              {
                alignItems: 'center',
                justifyContent: 'space-between',
                width: Dimensions.get('window').width / 1.25,
                height: 30,
                // backgroundColor: 'blue',
                marginLeft: 5,
              },
            ]}>
            <View style={[GlobalStyles.flexRow, {alignItems: 'center'}]}>
              <IconButton
                icon={require('../Assets/message2.png')}
                size={20}
                color={AppColor.darkGray}
                onPress={() => {
                  // if (item?.commentsCount > 0) {
                  navigation.navigate('userPost', {item: item});
                  // }
                }}
              />
              {/* <Image
                  source={require('../Assets/message2.png')}
                  style={styles.message}
                /> */}
              <Text style={styles.likes}>{' ' + item?.commentsCount}</Text>
            </View>

            <Icon
              name="share-variant-outline"
              size={20}
              color={AppColor.darkGray}
            />
          </View>
        </View>

        <View style={styles.postText}>
          <View style={[GlobalStyles.flexRow, {alignItems: 'center'}]}>
            <Text style={{fontWeight: 'bold', color: AppColor.darkGray}}>
              {'Lorem '}
            </Text>
            <Text
              style={{
                color: AppColor.darkGray,
              }}>
              {'ipsum dolor sit amet, consectetur adipiscing elit,'}
            </Text>
          </View>
          <Text
            style={{
              color: AppColor.darkGray,
            }}>
            {'sed do eiusmodipsum dolor sit amet, consectetur ,'}
          </Text>
          <View style={[GlobalStyles.flexRow, {alignItems: 'center'}]}>
            <Text style={{color: AppColor.darkGray}}>
              {'adipiscing elit sed do eiusmod '}
            </Text>
            <Text
              style={{
                color: AppColor.greenButton,
              }}>
              {'#Lorem'}
            </Text>
          </View>
          <View style={styles.transparentView} />
          <View>
            <Comments item={item} />
          </View>
        </View>
      </View>
    );
  };

  const loadMore = () => {
    //console.log('offset', offset);
    if (offset != -1) getAllPosts();
  };

  const modalIcons = [
    {
      icon: 'image-multiple-outline',
      name: 'Photos',
      onpress: async () => {
        const result = await launchImageLibrary({
          mediaType: 'mixed',
        });
        var mixedUri = [];
        result?.assets.forEach(x => {
          mixedUri.push({uri: x.uri});
        });
        //console.log('mixedUri', mixedUri[0]);
        setPostImageOrVideo(mixedUri[0]);
      },
    },
    {
      icon: 'camera-outline',
      name: 'Camera',
      onpress: async () => {
        const result = await launchCamera({
          mediaType: 'mixed',
        });
        var mixedUri = [];
        result?.assets.forEach(x => {
          mixedUri.push({uri: x.uri});
        });
        //console.log('mixedUri', mixedUri[0]);
        setPostImageOrVideo(mixedUri[0]);
      },
    },
  ];

  const Popup = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={popupVisible}
      // visible={true}
    >
      <View style={styles.modalView}>
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
                borderColor: AppColor.lightGray2,
              },
            ]}>
            <View style={[GlobalStyles.flexRow1]}>
              <IconButton
                style={{marginLeft: -2}}
                icon="close"
                size={20}
                color={AppColor.darkGray}
                onPress={() => {
                  postdescription = null;
                  setPopupVisible(false);
                }}
              />
              <Text
                style={{color: AppColor.darkGray, fontSize: 18, marginLeft: 5}}>
                Create Post
              </Text>
            </View>
            <View>
              <Button
                // disabled={whatsNew ? false : true}
                style={{
                  backgroundColor: AppColor.greenButton,

                  height: 35,
                  // width: 35,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                labelStyle={{
                  color: AppColor.white,
                }}
                mode="contained"
                onPress={async () => {
                  var post = CreatPost.current.values;
                  //console.log('asdsadsad', post);
                  postdescription = post?.description;
                  //console.log('postdescription', postdescription);
                  if (post || postImageOrVideo) {
                    let createPostData = {
                      description: post?.description,
                      media_type: 'photo',
                      media_url: postImageOrVideo?.uri || ' ',
                      media_title: 'Lens',
                      is_shared_post: 0,
                      is_group_post: 0,
                      group_id: null,
                      shared_by: null,
                      shared_description: '',
                      parent_post_id: 0,
                    };
                    //console.log('createPostData', createPostData);
                    setOffset(0);

                    //console.log('this is share post pre');
                    sharePost(createPostData);
                    postdescription = null;
                    setPopupVisible(false);
                  }
                }}>
                Post
              </Button>
            </View>
          </View>
          <View style={styles.whatsNew2}>
            <Image
              source={require('../Assets/userImage.png')}
              style={styles.whatsNewImage}
            />
            <Text
              style={{
                color: AppColor.darkGray,
                marginLeft: 10,
                fontWeight: 'bold',
                fontSize: 15,
              }}>
              {user?.first_name + ' ' + user?.last_name}
            </Text>
          </View>
          <View>
            <Formik
              innerRef={CreatPost}
              initialValues={{
                description: postdescription ?? '',
              }}
              enableReinitialize
              validateOnChange={false}
              validateOnBlur={false}
              // validationSchema={reviewSchema}
              onSubmit={async (values, action) => {
                //console.log(
                // '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nFormikValues',
                // values,
                // );
                postdescription = values.description;
                let response = await ServiceApi.creatPost(postdescription);
                //console.log({postdescription});
                return;
              }}>
              {formikProps => (
                <View>
                  <TextInput
                    multiline={true}
                    style={styles.whatsNewText}
                    placeholderTextColor={AppColor.lightGray}
                    value={formikProps.values.description}
                    onChangeText={value => {
                      formikProps.setFieldValue('description', value);
                      postdescription = value;
                    }}
                    onBlur={formikProps.handleBlur('description')}
                    placeholder="Whats on your mind?"
                  />
                </View>
              )}
            </Formik>
          </View>
        </View>
        <View style={styles.modalinnerViewPosition}>
          {modalIcons.map(item => (
            <Pressable onPress={item.onpress}>
              <View
                style={[
                  GlobalStyles.flexRow1,
                  {
                    marginTop: 10,
                    paddingVertical: 10,
                  },
                ]}>
                <Icon name={item.icon} size={20} color={AppColor.greenButton} />
                <Text style={{color: AppColor.darkGray, marginLeft: 10}}>
                  {item.name}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </Modal>
  );

  const ImagePopup = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={imagePopupVisible}
      // visible={true}
    >
      <View style={styles.modalView2}>
        <IconButton
          style={{position: 'absolute', top: 5, left: 2}}
          icon="close"
          size={20}
          color={AppColor.white}
          onPress={() => {
            setImagePopupVisible(false);
          }}
        />
        <Image style={styles.popupImgeStyle} source={{uri: popupImage}} />
      </View>
    </Modal>
  );

  return (
    <View
      style={[
        GlobalStyles.appBackground,

        GlobalStyles.flex,
        {alignItems: 'center', marginHorizontal: 10},
      ]}>
      {/* <View style={styles.whatsNew}>
          <Image
            source={require('../Assets/userImage.png')}
            style={styles.whatsNewImage}
          />
          <TextInput
            style={styles.whatsNewText}
            placeholderTextColor={AppColor.lightGray}
            onChangeText={value => {
              setWhatsNew(value);
            }}
            value={whatsNew}
            placeholder="Whats New?"
          />
        </View> */}
      <View style={{paddingBottom: 5, flex: 1}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          extraData={onEndReachedCalledDuringMomentum}
          ListHeaderComponent={HeaderWhatsNew}
          data={socailPosts}
          renderItem={UserPost}
          onEndReached={() => {
            if (!onEndReachedCalledDuringMomentum) {
              //console.log('new');
              setOnEndReachedCalledDuringMomentum(false);
              loadMore();
            }
          }}
          onMomentumScrollBegin={() =>
            setOnEndReachedCalledDuringMomentum(false)
          }
        />
      </View>
      {loaderVisible && (
        <Loader
          loaderVisible={loaderVisible}
          setLoaderVisible={setLoaderVisible}
        />
      )}
      <Popup />
      <ImagePopup />
    </View>
  );
}
const styles = StyleSheet.create({
  likes: {
    color: AppColor.darkGray,
    fontSize: 11,
    marginLeft: -8,
    // marginTop: -17,
    // marginLeft: -10,
  },
  message: {
    width: 19,
    height: 19,
    resizeMode: 'contain',
  },
  postText: {
    marginTop: 10,
    position: 'relative',
    paddingHorizontal: 15,
  },
  transparentView: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255,0.7)',
    width: '100%',
    height: 35,
  },
  userPost: {
    width: '100%',
    backgroundColor: AppColor.white,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 15,
    // height: Dimensions.get('window').height / 1.6,
  },
  userImage: {
    height: 45,
    width: 45,
    borderRadius: 25,
  },
  userPostImage: {
    width: '100%',
    height: Dimensions.get('window').height / 1.8,
    marginTop: 5,
  },
  popupImgeStyle: {
    width: '100%',
    height: Dimensions.get('window').height / 1.5,
  },
  userName: {
    marginLeft: 10,
    fontSize: 16,
    color: AppColor.darkGray,
    fontWeight: 'bold',
    width: '78%',
    // backgroundColor: 'red',
  },
  whatsNew: {
    backgroundColor: AppColor.white,
    width: '100%',
    height: 60,
    alignItems: 'center',
    // justifyContent: 'center',
    borderRadius: 30,
    marginTop: 15,
    flexDirection: 'row',
    paddingHorizontal: 15,
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
    color: AppColor.lightGray,
    fontWeight: '500',
    marginHorizontal: 5,
    fontSize: 16,
    width: '97%',
    marginLeft: 10,
    // backgroundColor: 'red',
    // paddingBottom: 150,
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
  modalView2: {
    height: '100%',
    flex: 1,
    backgroundColor: AppColor.black,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    // paddingVertical: 20,
  },
  modalinnerViewPosition: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: AppColor.white,
    elevation: 15,
    padding: 10,
    height: 120,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  // modalInnerView1: {},
});

export default SocialHomeScreen;
