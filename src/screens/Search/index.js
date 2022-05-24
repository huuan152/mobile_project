import React, {useState, useEffect, useRef} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Platform, TextInput, FlatList, Pressable, ScrollView } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import BUTTON_COLORS from '../../Constants/Utilities/index';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
// import { useNavigation } from '@react-navigation/native';
import City from '../../Constants/Areas/tinh_tp.json'
import District from '../../Constants/Areas/quan_huyen.json';
import SubDistrict from '../../Constants/Areas/xa_phuong.json';
import CustomListPost from '../../Components/ListPost';
import { useDispatch, useSelector } from 'react-redux';
import { listPostSelector } from '../../redux/selectors';
import { postSlice } from '../../redux/slice/postSlice';
import ListPostWithAddress from '../../Components/ListPostWithAddress';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const SeachScreen = () => {
  const dispatch = useDispatch();
  const { post, searchPost } = useSelector(listPostSelector);
  console.log('All Post', post);
    // const [selectedItems, setSelectedItems] = useState({});
    // const [items, setItems] = useState([]);

    // useEffect(() => {

    // }, [])
    ///////////////////////////////////////
    // const [expoPushToken, setExpoPushToken] = useState('');
    // const [notification, setNotification] = useState(false);
    // const notificationListener = useRef();
    // const responseListener = useRef();
    // const nav = useNavigation();

    // useEffect(() => {
    //     registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    
    //     // This listener is fired whenever a notification is received while the app is foregrounded
    //     notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    //       setNotification(notification);
    //     });
    
    //     // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    //     responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    //       nav.navigate("Favorite");
    //       console.log(response);
    //     });
    
    //     return () => {
    //       Notifications.removeNotificationSubscription(notificationListener.current);
    //       Notifications.removeNotificationSubscription(responseListener.current);
    //     };
    //   }, []);

    // const searchLocation = (input) => {
    //     // var newItems = [];    
    //     // // API search
    //     // // await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&language=vi&components=country:vn&types=geocode&key=AIzaSyC_8ZzcEbucSlkDlE7GTiLHNhFvfGHDMlQ`)
    //     // // .then(function (response) {
    //     // //     //console.log(response);
    //     // //     response.data.predictions.forEach((element, index) => {
    //     // //         //console.log(element.description);
    //     // //          newItems.push({
    //     // //              id: index,
    //     // //              name: element
    //     // //          })
    //     // //     })
    //     // //     setItems(newItems);
    //     // // })
    //     // // .catch (function (error) { 
    //     // //     console.log(error);
    //     // // });
    //     // setItems(newItems);
    //     console.log(input);
    // }
    const [search, setSearch] = useState('');
    const [area, setArea] = useState('');
    const [data, setData] = useState([]);
    const [location, setLocation] = useState('');

    const searchArea = (input) => {
        setSearch(input);
        var result = [];
        if (input !== '') {
            var enoughData = false;
            City.every(x => {
                if (result.length > 10) {
                    enoughData = true;
                    return false;
                }
                if (x.name.startsWith(input)) {
                    result.push(x.name_with_type);
                }
                return true;
            });
            if (enoughData === false) {
                District.every(x => {
                    if (result.length > 10) {
                        enoughData = true;
                        return false;
                    }
                    if (x.name.startsWith(input)) {
                        result.push(x.path_with_type);
                    }
                    return true;
                });
            }
            if (enoughData === false) {
                SubDistrict.every(x => {
                    if (result.length > 10) {
                        return false;
                    }
                    if (result.length < 10 && x.name.startsWith(input)) {
                        result.push(x.path_with_type);
                    }
                    return true;
                });
            }
        }
        setData(result);
    }

    const ItemClicked = (item) => {
        searchArea(item);
        const list = District.concat(SubDistrict);
        const e = list.find(e => e.path_with_type === item);
        setLocation(e.name);
    }

    const ItemView = ({item}) => {
        return (
            <Pressable onPress={() => ItemClicked(item)}>
                <Text style={styles.itemStyle}>{item}</Text>
            </Pressable>
        );
    }

    const ItemSeparatorView = () => {
        return (
            <View style={{ height: 0.5, width: '100%', backgroundColor: BUTTON_COLORS.colorBasic}}></View>
        );
    }

    const addNewAreaTracking = () => {
        setArea(search);
        setSearch('');
        if(location !== ''){
          dispatch(postSlice.actions.getLocationSearchPost(location));
        }
    }
    
    return (
      <ScrollView>
        <View style={styles.container}>
            <Text style={styles.header}>{'Tìm kiếm'}</Text>
            {/* <SearchableDropdown 
                selectedItems={selectedItems}
                onItemSelect={(item) => {
                    setSelectedItems(item);
                    console.log(item);
                }}
                containerStyle={{ padding: 5 }}
                itemStyle={{
                    padding: 10,
                    backgroundColor: 'white',
                    borderColor: BUTTON_COLORS.colorBasic,
                    borderWidth: 1,
                    borderRadius: 5,
                }}
                itemTextStyle={{ color: 'black' }}
                items={items}
                textInputProps={{
                    placeholder: "Tìm quận, đường...",
                    underlineColorAndroid: "transparent",
                    style: {
                        padding: 6,
                        borderWidth: 1,
                        borderColor: BUTTON_COLORS.colorBasic,
                        borderRadius: 5,
                    },
                    onTextChange: text => searchLocation(text)
                }}
                listProps={{
                    nestedScrollEnabled: true,
                }}
            /> */}
            <View style={styles.inputArea}>
              <TextInput placeholder='Nhập khu vực muốn tìm kiếm' style={styles.input} value={search} onChangeText={text => searchArea(text)}></TextInput>
              <TouchableOpacity style={{backgroundColor: BUTTON_COLORS.colorPicked, padding: 10, borderRadius: 5}} onPress={addNewAreaTracking}>
                <Text style={{color: 'white'}}>Tìm kiếm</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={data}
              keyExtractor={(item, index) => index.toString()}
              ItemSeparatorComponent={ItemSeparatorView}
              renderItem={ItemView}
              style={styles.flatListStyle}
            >
            </FlatList>
            {/* <Text style={styles.searchText}>{area}</Text>
            {searchPost.length > 0 && <CustomListPost data={searchPost} />} */}
            <ListPostWithAddress title={area} data={searchPost} />
            {/* <View>
                <Text>Your expo push token: {expoPushToken}</Text>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Title: {notification && notification.request.content.title} </Text>
                    <Text>Body: {notification && notification.request.content.body}</Text>
                    <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
                </View>
                <Button
                    title="Press to Send Notification"
                    onPress={async () => {
                    await sendPushNotification(expoPushToken);
                    }}
                />
            </View> */}
        </View>
        </ScrollView>
    );
}

async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: 'default',
      title: 'Original Title',
      body: 'And here is the body!',
      data: { someData: 'goes here' },
    };
  
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
    // if (Platform.OS === 'ios') {
    //   Notifications.setNotificationChannelAsync('default', {
    //     name: 'default',
    //     importance: Notifications.AndroidImportance.MAX,
    //     vibrationPattern: [0, 250, 250, 250],
    //     lightColor: '#FF231F7C'
    //   });
    // }
  
    return token;
  }

const styles = StyleSheet.create({
    container: {
        padding: 12,
        marginTop: 48,
        minHeight: 500
    },
    header: {
        fontSize: 32,
        color: BUTTON_COLORS.colorPicked,
        fontWeight: 'bold',
        marginLeft: 6
    },
    searchText: {
        marginLeft: 6,
        fontSize: 16,
        marginTop: 6
    },
    inputArea: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    inputTitle: {
      fontSize: 17,
      marginBottom: 10,
    },
    input: {
        height: 40,
        borderWidth: 1,
        paddingHorizontal: 20,
        borderColor: BUTTON_COLORS.colorBasic,
        borderRadius: 5,
        backgroundColor: 'white',
        width: '80%'
    },
    itemStyle: {
      padding: 10,
    },
    flatListStyle: {
      zIndex: 99,
      position: 'absolute',
      top: 98,
      left: 12,
      backgroundColor: 'white',
      borderRadius: 12
    }
})

export default SeachScreen;