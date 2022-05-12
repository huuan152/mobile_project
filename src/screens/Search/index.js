import React, {useState, useEffect, useRef} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, Platform } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import BUTTON_COLORS from '../../Constants/Utilities/index';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const SeachScreen = () => {
    const [selectedItems, setSelectedItems] = useState({});
    const [items, setItems] = useState([]);

    ///////////////////////////////////////
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const nav = useNavigation();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    
        // This listener is fired whenever a notification is received while the app is foregrounded
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        });
    
        // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          nav.navigate("ProfileStack")
        });
    
        return () => {
          Notifications.removeNotificationSubscription(notificationListener.current);
          Notifications.removeNotificationSubscription(responseListener.current);
        };
      }, []);

    const searchLocation = async (input) => {
        var newItems = [];    
        // API search
        // await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&language=vi&components=country:vn&types=geocode&key=AIzaSyC_8ZzcEbucSlkDlE7GTiLHNhFvfGHDMlQ`)
        // .then(function (response) {
        //     console.log(response);
        //     response.data.predictions.forEach((element, index) => {
        //         console.log(element.description);
        //          newItems.push({
        //              id: index,
        //              name: element
        //          })
        //     })
        //     setItems(newItems);
        // })
        // .catch (function (error) { 
        //     console.log(error);
        // });
        setItems(newItems);
    }
    return (
        <View style={styles.container}>
            <Text style={styles.header}>{'Tìm kiếm'}</Text>
            <SearchableDropdown 
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
            />
            <TouchableOpacity>
                <Text style={styles.searchText}>{'Tìm quanh đây'}</Text>
            </TouchableOpacity>
            <View>
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
            </View>
        </View>
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
    }
})

export default SeachScreen;