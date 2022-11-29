import React, {useEffect, useState, useRef, useCallback} from 'react';
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
  TouchableOpacity,
  TouchableHighlight,
  Keyboard,
} from 'react-native';
import {AppColor} from '../shared/appColors';
import {GlobalStyles} from '../shared/GlobalStyles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Button, Checkbox, Switch} from 'react-native-paper';
import StarRating from 'react-native-star-rating-widget';
import {Formik} from 'formik';
import * as yup from 'yup';
import RNPickerSelect from 'react-native-picker-select';
import {color} from '@rneui/base';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {ServiceApi} from '../Api/ServiceApi';
import {Loader} from '../components/LoaderComponent';

const shippingSchema = yup.object({
  name: yup.string().required(),
  phone_number: yup.string().required(),
  email: yup.string().required().email(),
  country: yup.object().required(),
  // province: yup.object().required(),
  city: yup.object().required(),
  // area: yup.string().required(),
  address: yup.string().required(),
});

function ShippingAddress(props) {
  const {navigation, route} = props;
  const shippingFormikRef = useRef();
  const billingFormikRef = useRef();
  const shippingDetails = route?.params?.shippingDetails;
  const [viewVisibility, setViewVisibility] = useState(false);
  const [checked, setChecked] = useState(
    shippingDetails?.isBillingSame ?? true,
  );
  const [addressList, setAddressList] = useState([]);

  const [countrys, setCountrys] = useState([]);
  const [provinces, setProvinces] = useState([
    {label: 'Sindh', value: 'Sindh'},
    {label: 'Sindh', value: 'Sindh'},
  ]);
  const [citys, setCitys] = useState([]);
  const [loaderVisible, setLoaderVisible] = useState(false);
  const showLoader = () => setLoaderVisible(true);
  const hideLoader = () => setLoaderVisible(false);

  useEffect(() => {
    navigation.setOptions({
      title: checked ? 'Billing Address' : 'Shipping Address',
    });
  }, [navigation, checked]);

  useEffect(() => {
    getcounter();
    // getCity();
  }, []);

  const getcounter = async () => {
    showLoader();
    var result = await new ServiceApi().allCountry();
    console.log('asdsadsadsad', result.data);
    if (result && result.data) {
      hideLoader();
      var country = [];
      result.data.forEach(x => {
        country.push({label: x.name, value: x.id});
      });
      let filterCountry = country.filter(x => x.label == 'Pakistan');
      console.log('filterCountry', filterCountry);
      setCountrys(filterCountry);
    } else {
      hideLoader();
      alert('Something went wrong');
    }
  };

  const getCity = async data => {
    showLoader();
    var result = await new ServiceApi().allCity(data);
    console.log('kchbe', result.data);
    if (result && result.data) {
      hideLoader();
      var city = [];
      result.data.forEach(x => {
        city.push({label: x.name, value: x.id});
      });
      setCitys(city);
    } else {
      hideLoader();
      // alert('Something went wrong');
    }
  };

  const postBillingAdress = async shippingDetails => {
    showLoader();
    var result = await new ServiceApi().billingAddress(shippingDetails.billing);
    console.log('postBillingAdress', result.data);
    if (result && result.data) {
      hideLoader();
      navigation.navigate({
        name: 'CheckOut',
        params: {shippingDetails},
        merge: true,
      });
    }
    // else {
    //   hideLoader();
    //   // alert('Something went wrong');
    // }
  };

  return (
    <View
      style={[
        GlobalStyles.container3,
        {paddingHorizontal: 10, paddingVertical: 10, position: 'relative'},
      ]}>
      {/* {!viewVisibility && (
        <View>
          <View style={[GlobalStyles.flexRow1, styles.viewStyle]}>
            <Text style={{color: AppColor.greenButton}}>Add address</Text>
            <Icon
              name={'plus-circle-outline'}
              size={24}
              color={AppColor.greenButton}
              onPress={() => {
                setViewVisibility(true);
              }}
            />
          </View>

          {addressList?.map(item => {
            console.log('addressList', addressList);
            return (
              <View style={[GlobalStyles.flexRow, styles.viewStyle2]}>
                <Pressable
                  onPress={() => {
                    navigation.navigate('CheckOut', {obj: item});
                  }}>
                  <View style={[GlobalStyles.flexRow]}>
                    <Icon
                      name={'map-marker'}
                      size={24}
                      color={AppColor.greenButton}
                      onPress={() => {
                        setAdd(add - 1);
                      }}
                    />
                    <View
                      style={{
                        width: Dimensions.get('window').width / 1.28,
                        marginLeft: 10,
                        // marginTop: 2,
                      }}>
                      <Text
                        style={{color: AppColor.darkGray, fontWeight: '500'}}>
                        {item?.name}
                      </Text>
                      <Text style={{color: AppColor.lightGray, fontSize: 11}}>
                        {item?.phone}
                      </Text>
                      <Text
                        numberOfLines={2}
                        style={{
                          color: AppColor.lightGray,
                          fontSize: 11,
                          marginTop: 5,
                        }}>
                        {item?.address}
                      </Text>
                    </View>
                  </View>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setEditAdress(item);
                    setViewVisibility(true);
                  }}>
                  <Text style={{color: AppColor.greenButton, fontSize: 12}}>
                    EDIT
                  </Text>
                </Pressable>
              </View>
            );
          })}
        </View>
      )} */}
      {/* {viewVisibility && ( */}
      <ScrollView showsVerticalScrollIndicator={checked}>
        <View>
          <Formik
            innerRef={shippingFormikRef}
            initialValues={{
              name: shippingDetails.shipping?.name ?? '',
              phone_number: shippingDetails.shipping?.phone_number ?? '',
              email: shippingDetails.shipping?.email ?? '',
              country: shippingDetails.shipping?.country_id
                ? countrys.filter(
                    country =>
                      country.value == shippingDetails.shipping?.country_id,
                  )[0]
                : '',
              // province: shippingDetails.shipping?.province?.label ?? '',
              city: shippingDetails.shipping?.country_id
                ? citys.filter(
                    city => city.value == shippingDetails.shipping?.city_id,
                  )[0]
                : '',
              // area: shippingDetails.shipping?.area ?? '',
              address: shippingDetails.shipping?.address ?? '',
            }}
            enableReinitialize
            validateOnChange={false}
            validateOnBlur={false}
            validationSchema={shippingSchema}
            onSubmit={(values, action) => {
              console.log('values', values);
              return;

              if (editAddress) {
                setAddressList(
                  addressList.map(x => (x.id == editAddress.id ? values : x)),
                );
                setEditAdress(null);
              } else {
                var id = addressList[addressList.length - 1]?.id;
                id = id ? id + 1 : 1;
                setAddressList([...addressList, {...values, id}]);
              }
              let data = {
                address: values.address,
                cart_id: 12,
                city_id: values.city.value,
                country_id: values.country.value,
                email: values.email,
                full_name: values.name,
                gross_amount: 1550,
                payment_method_id: 1,
                phone_number: values.phone,
                shipping_charges: 50,
                status_id: 1,
                user_coupon_id: 0,
              };
              console.log('datadata', data);
              setViewVisibility(false);
              // navigation.navigate('CheckOut', {obj: data});
            }}>
            {formikProps => (
              <ScrollView>
                <View style={{paddingHorizontal: 10, paddingVertical: 5}}>
                  <View style={{marginTop: 10}}>
                    <Text style={{color: AppColor.darkGray, fontSize: 12}}>
                      Name
                    </Text>
                    <TextInput
                      style={[GlobalStyles.textInput, styles.inputStyle]}
                      placeholderTextColor={AppColor.lightGray}
                      value={formikProps.values.name}
                      onChangeText={formikProps.handleChange('name')}
                      onBlur={formikProps.handleBlur('name')}
                      placeholder="Name"
                    />
                    {formikProps.errors.name && (
                      <Text style={styles.error}>
                        {formikProps.errors.name}
                      </Text>
                    )}
                  </View>

                  <View style={{marginTop: 10}}>
                    <Text style={{color: AppColor.darkGray, fontSize: 12}}>
                      Phone
                    </Text>
                    <TextInput
                      style={[GlobalStyles.textInput, styles.inputStyle]}
                      placeholderTextColor={AppColor.lightGray}
                      value={formikProps.values.phone_number}
                      onChangeText={formikProps.handleChange('phone_number')}
                      onBlur={formikProps.handleBlur('phone_number')}
                      placeholder="Phone Number"
                      keyboardType="numeric"
                    />
                    {formikProps.errors.phone_number && (
                      <Text style={styles.error}>
                        {formikProps.errors.phone_number}
                      </Text>
                    )}
                  </View>

                  <View style={{marginTop: 10}}>
                    <Text style={{color: AppColor.darkGray, fontSize: 12}}>
                      Email
                    </Text>
                    <TextInput
                      style={[GlobalStyles.textInput, styles.inputStyle]}
                      placeholderTextColor={AppColor.lightGray}
                      value={formikProps.values.email}
                      onChangeText={formikProps.handleChange('email')}
                      onBlur={formikProps.handleBlur('email')}
                      keyboardType="email-address"
                      placeholder="Email"
                    />
                    {formikProps.errors.email && (
                      <Text style={styles.error}>
                        {formikProps.errors.email}
                      </Text>
                    )}
                  </View>

                  <View style={{marginTop: 10}}>
                    <Text style={{color: AppColor.darkGray, fontSize: 12}}>
                      Country
                    </Text>
                    <View
                      style={[
                        styles.selectingView,
                        {justifyContent: 'center'},
                      ]}>
                      <RNPickerSelect
                        placeholder={{
                          label: 'Select Country',
                          color: AppColor.darkGray,
                        }}
                        onValueChange={value => {
                          console.log('countryValue', value);

                          // if (!value) return;
                          let pay = countrys.filter(x => x.value === value)[0];
                          console.log('pay', pay);
                          let cityId = {
                            country_id: pay?.value,
                          };
                          getCity(cityId);
                          formikProps.setFieldValue('country', pay);
                        }}
                        items={countrys}
                        value={formikProps.values.country?.value}>
                        <Text
                          style={
                            formikProps.values.country?.value
                              ? styles.content
                              : {
                                  ...styles.content,
                                  color: AppColor.lightGray,
                                }
                          }>
                          {formikProps.values.country?.label ??
                            'Select Country'}
                        </Text>
                      </RNPickerSelect>
                    </View>
                  </View>
                  {formikProps.errors.country && (
                    <Text style={styles.error}>
                      {formikProps.errors.country}
                    </Text>
                  )}

                  {/* <View style={{marginTop: 10}}>
                  <Text style={{color: AppColor.darkGray, fontSize: 12}}>
                    Province
                  </Text>
                  <View
                    style={[styles.selectingView, {justifyContent: 'center'}]}>
                    <RNPickerSelect
                      placeholder={{
                        label: 'Select province',
                        color: AppColor.darkGray,
                      }}
                      onValueChange={value => {
                        // console.log('value', value);
                        // if (!value) return;
                        let pay = provinces.filter(x => x.value === value)[0];
                        console.log('pay', pay);
                        formikProps.setFieldValue('province', pay);
                      }}
                      items={provinces}
                      value={formikProps.values.province?.value}>
                      <Text
                        style={
                          formikProps.values.province?.value
                            ? styles.content
                            : {
                                ...styles.content,
                                color: AppColor.lightGray,
                              }
                        }>
                        {formikProps.values.province?.label ??
                          'Select Province'}
                      </Text>
                    </RNPickerSelect>
                  </View>
                </View>
                {formikProps.errors.province && (
                  <Text style={styles.error}>
                    {formikProps.errors.province}
                  </Text>
                )} */}

                  <View style={{marginTop: 10}}>
                    <Text style={{color: AppColor.darkGray, fontSize: 12}}>
                      City
                    </Text>
                    <View
                      style={[
                        styles.selectingView,
                        {justifyContent: 'center'},
                      ]}>
                      <RNPickerSelect
                        placeholder={{
                          label: 'Select City',
                          color: AppColor.darkGray,
                        }}
                        onValueChange={value => {
                          // console.log('value', value);
                          // if (!value) return;
                          let pay = citys.filter(x => x.value === value)[0];
                          console.log('pay', pay);
                          formikProps.setFieldValue('city', pay);
                        }}
                        items={citys}
                        value={formikProps.values.city?.value}>
                        <Text
                          style={
                            formikProps.values.city?.value
                              ? styles.content
                              : {
                                  ...styles.content,
                                  color: AppColor.lightGray,
                                }
                          }>
                          {formikProps.values.city?.label ?? 'Select City'}
                        </Text>
                      </RNPickerSelect>
                    </View>
                  </View>
                  {formikProps.errors.city && (
                    <Text style={styles.error}>{formikProps.errors.city}</Text>
                  )}

                  {/* <View style={{marginTop: 10}}>
                  <Text style={{color: AppColor.darkGray, fontSize: 12}}>
                    Area
                  </Text>
                  <TextInput
                    style={[GlobalStyles.textInput, styles.inputStyle]}
                    placeholderTextColor={AppColor.lightGray}
                    value={formikProps.values.area}
                    onChangeText={formikProps.handleChange('area')}
                    onBlur={formikProps.handleBlur('area')}
                    placeholder="Area"
                  />
                  {formikProps.errors.area && (
                    <Text style={styles.error}>{formikProps.errors.area}</Text>
                  )}
                </View> */}

                  <View style={{marginTop: 10}}>
                    <Text style={{color: AppColor.darkGray, fontSize: 12}}>
                      Address
                    </Text>
                    <TextInput
                      style={[GlobalStyles.textInput, styles.inputStyle]}
                      placeholderTextColor={AppColor.lightGray}
                      value={formikProps.values.address}
                      onChangeText={formikProps.handleChange('address')}
                      onBlur={formikProps.handleBlur('address')}
                      placeholder="Address"
                    />
                    {formikProps.errors.address && (
                      <Text style={styles.error}>
                        {formikProps.errors.address}
                      </Text>
                    )}
                  </View>

                  {/* <View style={{marginTop: 10}}>
                  <Text style={{color: AppColor.darkGray, fontSize: 12}}>
                    Addres
                  </Text> */}
                  {/* <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={styles.map}
              region={{
                // latitude: initialPosition.latitude,
                // longitude: initialPosition.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}>
              <Marker
                coordinate={initialPosition}
                draggable
                onDragEnd={e => {
                  let coords = e.nativeEvent.coordinate;
                  getAddress(coords.latitude, coords.longitude);
                  setInitialPosition(coords);
                  setIsLocationChanged(true);
                  // setTimeout(() => {
                  //   setIsLocationChanged(false);
                  // }, 100);
                }}
              // title={marker.title}
              // description={marker.description}
              />
              <MapView.Circle
                key={(
                  initialPosition.latitude + initialPosition.longitude
                ).toString()}
                center={initialPosition}
                radius={MAX_DISTANCE_ALLOWED}
                strokeWidth={1}
                strokeColor={'#1a66ff'}
                fillColor={'rgba(230,238,255,0.5)'}
              //onRegionChangeComplete = { this.onRegionChangeComplete.bind(this) }
              />
            </MapView> */}
                  {/* <View style={{position: 'relative'}}>
                    <Image
                      source={require('../Assets/map.png')}
                      style={styles.mapImage}
                    />
                    <TextInput
                      style={[styles.addres]}
                      placeholderTextColor={AppColor.lightGray}
                      onChangeText={value => {
                        setSearchAddress(value);
                      }}
                      value={searchAddress}
                      placeholder="Address"
                    />
                  </View>
                </View> */}

                  <View>
                    <View
                      style={[
                        GlobalStyles.flexRow1,
                        {justifyContent: 'space-between', marginTop: 15},
                      ]}>
                      <Text style={{color: AppColor.darkGray}}>
                        Billing same as shipping
                      </Text>
                      <Checkbox
                        status={checked ? 'checked' : 'unchecked'}
                        onPress={() => {
                          setChecked(!checked);
                        }}
                      />
                    </View>
                    {/* <Button
                    mode="contained"
                    style={[styles.save]}
                    contentStyle={{paddingHorizontal: 120}}
                    onPress={formikProps.handleSubmit}
                    labelStyle={[GlobalStyles.buttonHrLbl, {fontSize: 15}]}>
                    SAVE
                  </Button> */}
                  </View>
                </View>
              </ScrollView>
            )}
          </Formik>

          {!checked && (
            <Formik
              innerRef={billingFormikRef}
              initialValues={{
                name: shippingDetails.billing?.name ?? '',
                phone_number: shippingDetails.billing?.phone_number ?? '',
                email: shippingDetails.billing?.email ?? '',
                country: shippingDetails.billing?.country_id
                  ? countrys.filter(
                      country =>
                        country.value == shippingDetails.billing?.country_id,
                    )[0]
                  : '',
                // province: shippingDetails.shipping?.province?.label ?? '',
                city: shippingDetails.billing?.country_id
                  ? citys.filter(
                      city => city.value == shippingDetails.billing?.city_id,
                    )[0]
                  : '',
                // area: shippingDetails.shipping?.area ?? '',
                address: shippingDetails.billing?.address ?? '',
              }}
              enableReinitialize
              validateOnChange={false}
              validateOnBlur={false}
              validationSchema={shippingSchema}
              onSubmit={(values, action) => {
                console.log('values', values);
                return;

                if (editAddress) {
                  setAddressList(
                    addressList.map(x => (x.id == editAddress.id ? values : x)),
                  );
                  setEditAdress(null);
                } else {
                  var id = addressList[addressList.length - 1]?.id;
                  id = id ? id + 1 : 1;
                  setAddressList([...addressList, {...values, id}]);
                }
                let data = {
                  address: values.address,
                  cart_id: 12,
                  city_id: values.city.value,
                  country_id: values.country.value,
                  email: values.email,
                  full_name: values.name,
                  gross_amount: 1550,
                  payment_method_id: 1,
                  phone_number: values.phone,
                  shipping_charges: 50,
                  status_id: 1,
                  user_coupon_id: 0,
                };
                console.log('datadata', data);
                setViewVisibility(false);
                // navigation.navigate('CheckOut', {obj: data});
              }}>
              {formikProps => (
                <ScrollView>
                  <View style={{paddingHorizontal: 10, paddingVertical: 5}}>
                    <View>
                      <Text style={{color: AppColor.darkGray, fontSize: 12}}>
                        Name
                      </Text>
                      <TextInput
                        style={[GlobalStyles.textInput, styles.inputStyle]}
                        placeholderTextColor={AppColor.lightGray}
                        value={formikProps.values.name}
                        onChangeText={formikProps.handleChange('name')}
                        onBlur={formikProps.handleBlur('name')}
                        placeholder="Name"
                      />
                      {formikProps.errors.name && (
                        <Text style={styles.error}>
                          {formikProps.errors.name}
                        </Text>
                      )}
                    </View>

                    <View style={{marginTop: 10}}>
                      <Text style={{color: AppColor.darkGray, fontSize: 12}}>
                        Phone
                      </Text>
                      <TextInput
                        style={[GlobalStyles.textInput, styles.inputStyle]}
                        placeholderTextColor={AppColor.lightGray}
                        value={formikProps.values.phone_number}
                        onChangeText={formikProps.handleChange('phone_number')}
                        onBlur={formikProps.handleBlur('phone_number')}
                        placeholder="Phone Number"
                      />
                      {formikProps.errors.phone_number && (
                        <Text style={styles.error}>
                          {formikProps.errors.phone_number}
                        </Text>
                      )}
                    </View>

                    <View style={{marginTop: 10}}>
                      <Text style={{color: AppColor.darkGray, fontSize: 12}}>
                        Email
                      </Text>
                      <TextInput
                        style={[GlobalStyles.textInput, styles.inputStyle]}
                        placeholderTextColor={AppColor.lightGray}
                        value={formikProps.values.email}
                        onChangeText={formikProps.handleChange('email')}
                        onBlur={formikProps.handleBlur('email')}
                        placeholder="Email"
                      />
                      {formikProps.errors.email && (
                        <Text style={styles.error}>
                          {formikProps.errors.email}
                        </Text>
                      )}
                    </View>

                    <View style={{marginTop: 10}}>
                      <Text style={{color: AppColor.darkGray, fontSize: 12}}>
                        Country
                      </Text>
                      <View
                        style={[
                          styles.selectingView,
                          {justifyContent: 'center'},
                        ]}>
                        <RNPickerSelect
                          placeholder={{
                            label: 'Select Country',
                            color: AppColor.darkGray,
                          }}
                          onValueChange={value => {
                            console.log('countryValue', value);

                            // if (!value) return;
                            let pay = countrys.filter(
                              x => x.value === value,
                            )[0];
                            console.log('pay', pay);
                            let cityId = {
                              country_id: pay?.value,
                            };
                            getCity(cityId);
                            formikProps.setFieldValue('country', pay);
                          }}
                          items={countrys}
                          value={formikProps.values.country?.value}>
                          <Text
                            style={
                              formikProps.values.country?.value
                                ? styles.content
                                : {
                                    ...styles.content,
                                    color: AppColor.lightGray,
                                  }
                            }>
                            {formikProps.values.country?.label ??
                              'Select Country'}
                          </Text>
                        </RNPickerSelect>
                      </View>
                    </View>
                    {formikProps.errors.country && (
                      <Text style={styles.error}>
                        {formikProps.errors.country}
                      </Text>
                    )}

                    {/* <View style={{marginTop: 10}}>
                  <Text style={{color: AppColor.darkGray, fontSize: 12}}>
                    Province
                  </Text>
                  <View
                    style={[styles.selectingView, {justifyContent: 'center'}]}>
                    <RNPickerSelect
                      placeholder={{
                        label: 'Select province',
                        color: AppColor.darkGray,
                      }}
                      onValueChange={value => {
                        // console.log('value', value);
                        // if (!value) return;
                        let pay = provinces.filter(x => x.value === value)[0];
                        console.log('pay', pay);
                        formikProps.setFieldValue('province', pay);
                      }}
                      items={provinces}
                      value={formikProps.values.province?.value}>
                      <Text
                        style={
                          formikProps.values.province?.value
                            ? styles.content
                            : {
                                ...styles.content,
                                color: AppColor.lightGray,
                              }
                        }>
                        {formikProps.values.province?.label ??
                          'Select Province'}
                      </Text>
                    </RNPickerSelect>
                  </View>
                </View>
                {formikProps.errors.province && (
                  <Text style={styles.error}>
                    {formikProps.errors.province}
                  </Text>
                )} */}

                    <View style={{marginTop: 10}}>
                      <Text style={{color: AppColor.darkGray, fontSize: 12}}>
                        City
                      </Text>
                      <View
                        style={[
                          styles.selectingView,
                          {justifyContent: 'center'},
                        ]}>
                        <RNPickerSelect
                          placeholder={{
                            label: 'Select City',
                            color: AppColor.darkGray,
                          }}
                          onValueChange={value => {
                            // console.log('value', value);
                            // if (!value) return;
                            let pay = citys.filter(x => x.value === value)[0];
                            console.log('pay', pay);
                            formikProps.setFieldValue('city', pay);
                          }}
                          items={citys}
                          value={formikProps.values.city?.value}>
                          <Text
                            style={
                              formikProps.values.city?.value
                                ? styles.content
                                : {
                                    ...styles.content,
                                    color: AppColor.lightGray,
                                  }
                            }>
                            {formikProps.values.city?.label ?? 'Select City'}
                          </Text>
                        </RNPickerSelect>
                      </View>
                    </View>
                    {formikProps.errors.city && (
                      <Text style={styles.error}>
                        {formikProps.errors.city}
                      </Text>
                    )}

                    {/* <View style={{marginTop: 10}}>
                  <Text style={{color: AppColor.darkGray, fontSize: 12}}>
                    Area
                  </Text>
                  <TextInput
                    style={[GlobalStyles.textInput, styles.inputStyle]}
                    placeholderTextColor={AppColor.lightGray}
                    value={formikProps.values.area}
                    onChangeText={formikProps.handleChange('area')}
                    onBlur={formikProps.handleBlur('area')}
                    placeholder="Area"
                  />
                  {formikProps.errors.area && (
                    <Text style={styles.error}>{formikProps.errors.area}</Text>
                  )}
                </View> */}

                    <View style={{marginTop: 10}}>
                      <Text style={{color: AppColor.darkGray, fontSize: 12}}>
                        Address
                      </Text>
                      <TextInput
                        style={[GlobalStyles.textInput, styles.inputStyle]}
                        placeholderTextColor={AppColor.lightGray}
                        value={formikProps.values.address}
                        onChangeText={formikProps.handleChange('address')}
                        onBlur={formikProps.handleBlur('address')}
                        placeholder="Address"
                      />
                      {formikProps.errors.address && (
                        <Text style={styles.error}>
                          {formikProps.errors.address}
                        </Text>
                      )}
                    </View>

                    {/* <View style={{marginTop: 10}}>
                  <Text style={{color: AppColor.darkGray, fontSize: 12}}>
                    Addres
                  </Text> */}
                    {/* <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              style={styles.map}
              region={{
                // latitude: initialPosition.latitude,
                // longitude: initialPosition.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
              }}>
              <Marker
                coordinate={initialPosition}
                draggable
                onDragEnd={e => {
                  let coords = e.nativeEvent.coordinate;
                  getAddress(coords.latitude, coords.longitude);
                  setInitialPosition(coords);
                  setIsLocationChanged(true);
                  // setTimeout(() => {
                  //   setIsLocationChanged(false);
                  // }, 100);
                }}
              // title={marker.title}
              // description={marker.description}
              />
              <MapView.Circle
                key={(
                  initialPosition.latitude + initialPosition.longitude
                ).toString()}
                center={initialPosition}
                radius={MAX_DISTANCE_ALLOWED}
                strokeWidth={1}
                strokeColor={'#1a66ff'}
                fillColor={'rgba(230,238,255,0.5)'}
              //onRegionChangeComplete = { this.onRegionChangeComplete.bind(this) }
              />
            </MapView> */}
                    {/* <View style={{position: 'relative'}}>
                    <Image
                      source={require('../Assets/map.png')}
                      style={styles.mapImage}
                    />
                    <TextInput
                      style={[styles.addres]}
                      placeholderTextColor={AppColor.lightGray}
                      onChangeText={value => {
                        setSearchAddress(value);
                      }}
                      value={searchAddress}
                      placeholder="Address"
                    />
                  </View>
                </View> */}

                    <View>
                      {/* <View
                    style={[
                      GlobalStyles.flexRow1,
                      {justifyContent: 'space-between', marginTop: 15},
                    ]}>
                    <Text style={{color: AppColor.darkGray}}>
                      Billing same as shipping
                    </Text>
                    <Checkbox
                      status={checked ? 'checked' : 'unchecked'}
                      onPress={() => {
                        setChecked(!checked);
                      }}
                    />
                  </View> */}
                      {/* <Button
                    mode="contained"
                    style={[styles.save]}
                    contentStyle={{paddingHorizontal: 120}}
                    onPress={formikProps.handleSubmit}
                    labelStyle={[GlobalStyles.buttonHrLbl, {fontSize: 15}]}>
                    SAVE
                  </Button> */}
                    </View>
                  </View>
                </ScrollView>
              )}
            </Formik>
          )}

          <Button
            mode="contained"
            style={[styles.save]}
            contentStyle={{paddingHorizontal: 120}}
            onPress={async () => {
              var shippingRef = shippingFormikRef.current;
              var billingRef = billingFormikRef.current;
              if (checked) {
                shippingRef.handleSubmit(); // submit action to show user if there is any error
                var shippingErrors = await shippingRef.validateForm(
                  shippingRef.values,
                ); // get form errors
                var hasShippingFormErros =
                  Object.keys(shippingErrors).length != 0; // check if form has error
                var shippingValues = shippingRef.values;
                console.log('Shipping errors', shippingErrors);
                console.log('Shipping errors', hasShippingFormErros);
                console.log('Shipping form values', shippingValues);
                if (!hasShippingFormErros) {
                  var shipping = {
                    ...shippingValues,
                    address_line_1: '',
                    address_line_2: '',
                    country_id: shippingValues.country.value,
                    city_id: shippingValues.city.value,
                    state_id: 1, // dummy value
                  };
                  delete shipping.city;
                  delete shipping.country;
                  console.log('shippingShipping', shipping);
                  var shippingDetails = {
                    shipping,
                    isBillingSame: checked,
                    billing: {},
                  };
                  navigation.navigate({
                    name: 'CheckOut',
                    params: {shippingDetails},
                    merge: true,
                  });
                }
              } else {
                shippingRef.handleSubmit(); // submit action to show user if there is any error
                billingRef.handleSubmit(); // submit action to show user if there is any error
                var shippingErrors = await shippingRef.validateForm(
                  shippingRef.values,
                ); // get form errors
                var billingErrors = await billingRef.validateForm(
                  billingRef.values,
                ); // get form errors
                var hasShippingFormErros =
                  Object.keys(shippingErrors).length != 0; // check if form has error
                var hasBillingFormErros =
                  Object.keys(billingErrors).length != 0; // check if form has error
                var shippingValues = shippingRef.values;
                var billingValues = billingRef.values;
                console.log('Shipping errors', shippingErrors);
                console.log('Shipping errors', hasShippingFormErros);
                console.log('Shipping form values', shippingValues);

                console.log('billing errors', billingErrors);
                console.log('billing errors', hasBillingFormErros);
                console.log('Billing form values', billingValues);
                if (!hasBillingFormErros && !hasShippingFormErros) {
                  var shipping = {
                    ...shippingValues,
                    address_line_1: '',
                    address_line_2: '',
                    country_id: shippingValues.country.value,
                    city_id: shippingValues.city.value,
                    state_id: 1, // dummy value
                  };

                  var billing = {
                    ...billingValues,
                    address_line_1: '',
                    address_line_2: '',
                    country_id: billingValues.country.value,
                    city_id: billingValues.city.value,
                    state_id: 1, // dummy value
                  };
                  delete shipping.city;
                  delete shipping.country;
                  console.log('shipping', shipping);
                  delete billing.city;
                  delete billing.country;
                  console.log('billing', billing);
                  var shippingDetails = {
                    shipping,
                    isBillingSame: checked,
                    billing,
                  };
                  postBillingAdress(shippingDetails);
                  // navigation.navigate({
                  //   name: 'CheckOut',
                  //   params: {shippingDetails},
                  //   merge: true,
                  // });
                }
              }
            }}
            labelStyle={[GlobalStyles.buttonHrLbl, {fontSize: 15}]}>
            SAVE
          </Button>
        </View>
      </ScrollView>

      {/* )} */}
      {loaderVisible && (
        <Loader
          loaderVisible={loaderVisible}
          setLoaderVisible={setLoaderVisible}
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  addres: {
    position: 'absolute',
    top: 15,
    alignSelf: 'center',
    height: 45,
    borderRadius: 25,
    backgroundColor: AppColor.white,
    paddingHorizontal: 15,
    color: AppColor.black,
    width: '90%',
  },
  content: {
    fontSize: 15,
    // marginLeft: 15,
    color: AppColor.black,
    // fontWeight: 'bold',
    // backgroundColor: 'red',
    // width: 220,
  },
  error: {
    // backgroundColor: 'red',
    width: 300,
    color: 'tomato',
  },
  inputStyle: {
    textAlign: 'left',
    backgroundColor: AppColor.lightGray2,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginTop: 5,
    height: 45,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginTop: 5,
  },
  save: {
    width: '95%',
    backgroundColor: AppColor.greenButton,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    height: 45,
    marginTop: 10,
  },
  selectingView: {
    // textAlign: 'left',
    backgroundColor: AppColor.lightGray2,
    borderRadius: 10,
    paddingLeft: 15,
    // paddingHorizontal: 15,
    marginTop: 5,
    height: 45,
  },
  viewStyle: {
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    // borderBottomWidth: 1,
    // borderColor: AppColor.lightGray2,
  },
  viewStyle2: {
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: AppColor.lightGray2,
  },
});

export default ShippingAddress;
