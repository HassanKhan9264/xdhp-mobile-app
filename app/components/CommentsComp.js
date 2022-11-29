import {View} from 'native-base';
import React, {useEffect} from 'react';
import {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Image} from 'react-native';
import {Text} from 'react-native';
import {TextInput} from 'react-native';
import {createIconSetFromFontello} from 'react-native-vector-icons';
import {ServiceApi} from '../Api/ServiceApi';
import {AppColor} from '../shared/appColors';

const CommentsComp = ({comment, setCommets}) => {
  const a = require('../Assets/lady.png');

  const [reply, setReply] = useState(true);
  const [sendReply, setSendReply] = useState('');
  const serviceApi = new ServiceApi();

  const handleReplies = async () => {
    // const response = await serviceApi.writeComment(sendReply);
    // setComments(comment.childComments[reply, ...comment.childComments])

    const dummySendReply = {
      id: Math.random(),
      name: 'New Commnet',
      description: sendReply,
      reply_to: comment.id,
      parent_comment_id: comment.id,
      reply: true,
      likes: Math.floor(Math.random() * 10),
    };

    console.log('dummySendReply:', {dummySendReply}, {comment});

    comment.childComments = [dummySendReply, ...comment.childComments];
    console.log({'handle replies': comment});
    setCommets(comment);
    setSendReply('');
    // console.log('response', response);
  };

  useEffect(() => {
    console.log('reply: ', reply);
  }, [setReply]);
  useEffect(() => {
    console.log('send reply: ', sendReply);
  }, [setSendReply, handleReplies]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.formRow}>
          <View style={styles.formIcon}>
            <View style={[styles.imageView]}>
              <Image
                source={require('../Assets/watch2.png')}
                style={[styles.image]}
              />
            </View>
          </View>
          <View style={[styles.formItem]}>
            <View style={[styles.name]}>
              <Text style={[styles.text, {fontWeight: '700'}]}>
                {comment.name}
              </Text>
              <Text style={[{color: 'lightgrey'}]}>3h</Text>
            </View>
            <Text style={[styles.text, {marginTop: 10}]}>
              {comment.description}
            </Text>
            <View style={[styles.like]}>
              <View>
                <View style={[{flexDirection: 'row'}]}>
                  <Text style={[{color: 'lightgrey'}]}>
                    Like {comment.likes}
                  </Text>
                  <Text
                    style={[{color: 'lightgrey', marginLeft: 10}]}
                    onPress={() => setReply(!reply)}>
                    Reply
                  </Text>
                </View>
                <View style={[replyTo.con, {width: 230, borderRadius: 100}]}>
                  {reply == true && (
                    <>
                      <ReplyTo comment={comment} setSendReply={setSendReply} />
                      <Text
                        onPress={() => handleReplies()}
                        style={[{color: 'black'}]}>
                        Send
                      </Text>
                    </>
                  )}
                </View>
              </View>
              <View>
                <Text
                  style={[
                    {color: 'lightgrey', fontSize: 16, fontWeight: '700'},
                  ]}>
                  ...
                </Text>
              </View>
            </View>
          </View>
        </View>
        {comment.childComments.length > 0 &&
          comment.childComments?.map((c, i) => {
            return (
              <View style={[{marginLeft: 50}]}>
                <Reply comment={c} />
              </View>
            );
          })}
      </View>
    </>
  );
};

export const Reply = ({comment}) => {
  // const [reply, setReply] = useState(true);

  return (
    <View style={[styles.container, {marginLeft: 0, padding: 0}]}>
      <View style={styles.formRow}>
        <View style={styles.formIcon}>
          <View style={[styles.imageView]}>
            <Image
              source={require('../Assets/watch2.png')}
              style={[styles.image]}
            />
          </View>
        </View>
        <View style={[styles.formItem]}>
          <View style={[styles.name]}>
            <Text style={[styles.text, {fontWeight: '700'}]}>
              {comment.name}
            </Text>
            <Text style={[{color: 'lightgrey'}]}>3h</Text>
          </View>
          <Text style={[styles.text, {marginTop: 10}]}>
            {comment.description}
          </Text>
          <View style={[styles.like]}>
            <View>
              <View style={[{flexDirection: 'row'}]}>
                <Text
                  style={[{color: 'lightgrey'}]}
                  onPress={() => {
                    comment.like++;
                  }}>
                  Like {comment.likes}
                </Text>
              </View>
            </View>
            <View>
              <Text
                style={[{color: 'lightgrey', fontSize: 16, fontWeight: '700'}]}>
                ...
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const ReplyTo = ({comment, setSendReply}) => {
  return (
    <View
      style={[
        replyTo.container,
        {
          borderRadius: 100,
          marginTop: 10,
          height: 40,
          paddingLeft: 10,
          width: '100%',
        },
      ]}>
      <TextInput
        placeholder="Reply"
        placeholderTextColor={AppColor.lightGray}
        style={[{color: AppColor.dark}]}
        onChangeText={text => setSendReply(text)}></TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  formRow: {
    flexDirection: 'row',
    height: 'auto',
  },
  formItem: {
    width: '85%',
    flex: 0,
    backgroundColor: '#F2F2F2',
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    // paddingTop: 10,
    // paddingBottom: 10,
    padding: 15,
  },
  formIcon: {
    width: 50,
    // backgroundColor: 'greenyellow',
  },
  image: {
    borderRadius: 100000,
    width: 40,
    height: 40,
  },
  imageView: {
    height: 'auto',
    width: 'auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 10000,
  },
  text: {
    color: 'black',
  },
  name: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  like: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '100%',
  },
});

const replyTo = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 30,
    width: 100,
  },
  input: {
    height: 50,
    width: '100%',
  },
});
export default CommentsComp;
