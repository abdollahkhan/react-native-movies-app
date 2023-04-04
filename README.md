## Running locally

Make sure you have all the necessary dependencies installed on your system:

- Node.js
- Ruby
- Xcode
- CocoaPods
- Android Studio and all Java dependencies.

You can follow the instructions on the React Native docs to set up your local environment: https://reactnative.dev/docs/environment-setup

To run the project locally:

- Clone the repo
- Install the dependencies with `npm install`
- Run `cd ios && pod install && cd ..` to install all iOS dependencies
- Run the dev server with `npx react-native start`
- Build and Run the app with `npx react-native run-ios` for the iOS version or `npx react-native run-android` for the Android version

If you have problems with any of the instructions above, please refer to the React Native docs. This is a newly created app and the latest instructions there should help you get your environment up and running without issues.

Please keep in mind that this app doesn't use Expo and we need you to run the app with the React Native CLI.



