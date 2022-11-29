import {View} from 'native-base';
import React from 'react';
import {useState} from 'react';
import {StyleSheet} from 'react-native';
import {Image} from 'react-native';
import {Text, TextInput} from 'react-native';
import CommentsComp, {Reply} from '../components/CommentsComp';
import {AppColor} from '../shared/appColors';
import {ServiceApi} from '../Api/ServiceApi';
import {useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const Comments = () => {
  const comments = [
    {
      id: 1,
      name: 'Henry Cavil',
      description: 'thats badass!',
      reply: false,
      likes: 100,
      childComments: [
        {
          id: 2,
          name: 'Millie Bobby Brown',
          description: 'Thanks Henry ❤ 2',
          reply_to: 1,
          parent_comment_id: 1,
          reply: true,
          likes: 5,
        },
        {
          id: 3,
          name: 'Millie Bobby Brown',
          description: 'Thanks Henry ❤ 3',
          reply_to: 2,
          parent_comment_id: 1,
          reply: true,
          likes: 2,
        },
        {
          id: 4,
          name: 'Millie Bobby Brown',
          description: 'Thanks Henry ❤ 4',
          // reply_to: 1,
          parent_comment_id: 1,
          reply: false,
          likes: 10,
        },
      ],
    },

    {
      id: 5,
      name: 'Henry Cavil',
      description: 'Hail Anolna 😂1',
      reply: false,
      likes: 20,
      childComments: [
        {
          id: 6,
          name: 'Millie Bobby Brown',
          description: 'henryyyyyy 😂',
          reply_to: 5,
          parent_comment_id: 5,
          reply: true,
          likes: 50,
        },
      ],
    },
  ];

  const a = require('../Assets/lady.png');
  const [comment, setComments] = useState([]);
  const [writeComment, setWriteComment] = useState('');
  const commentsAndTheirReplies = [];
  const serviceApi = new ServiceApi();

  const commentsApi = async () => {
    // const allComments = await serviceApi.allComments(13);
    // setComments(allComments.data);
  };

  const handleSendComment = async () => {
    // const resposne = await serviceApi.writeComment({
    //   description: writeComment,
    //   post_id: comment.post_id,
    //   reply_to: comment.reply_to,
    //   parent_comment_id: comment.parent_comment_id,
    // });
    let dummyComment = {
      id: Math.random(),
      name: 'New Comment' + Math.random(),
      description: writeComment,
      reply: false,
      likes: Math.floor(Math.random() * 10),
      childComments: [],
    };
    setComments([dummyComment, ...comment]);
    setWriteComment('');
    commentsApi();
    console.log({resposne});
  };

  useEffect(() => {
    console.log({writeComment});
  }, [setWriteComment]);

  useEffect(() => {
    // commentsApi();
    setComments(comments);
  }, [setComments]);

  return (
    <>
      {comment?.map((c, i) => {
        return <>{<CommentsComp comment={c} setComments={setComments} />}</>;
      })}
      <View
        style={[
          styles.writeCommentView,
          {
            height: 'auto',
            borderTopWidth: 1,
            paddingTop: 10,
            // paddingBottom: 10,
            borderTopColor: AppColor.lightGray,
          },
        ]}>
        <View style={[styles.imageView, {borderRadius: 9999999}]}>
          <Image source={a} style={[{height: 40, width: 40}]} />
        </View>
        <View
          style={[
            {
              height: 'auto',
              width: '80%',
              // backgroundColor: 'blue',
            },
          ]}>
          <TextInput
            value={writeComment}
            onChangeText={text => {
              console.log({text});
              setWriteComment(text);
            }}
            placeholder="Write a Comment"
            style={[
              {
                height: 'auto',
                width: '100%',
                marginLeft: 5,
                backgroundColor: 'white',
              },
            ]}></TextInput>
        </View>
        <View>
          <Icon
            name="ios-send"
            size={30}
            color={AppColor.greenButton}
            onPress={() => {
              handleSendComment();
              console.log('send the commet');
            }}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  formRow: {
    flexDirection: 'row',
    height: 'auto',
  },
  formItem: {
    width: '75%',
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
  },
  writeCommentView: {
    // backgroundColor: 'red',
    height: 50,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // padding: 10,
  },
});
export default Comments;
