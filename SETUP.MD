# Overview

This wallet is to manage the supported crypto currency in Crypto PiPs.  It is in React Native

## Install Expo CLI and Create React Native App

`npm install expo-cli --global`

Must be installed as global

change directory where you want to create your React Native project.  Run the command

`expo init rn-first-app` where `rn-first-app` is the name of the application you want to use.  This will create a directory using the app name.  Start with "blank" which is a minimal app but has all the essentials to get started

If developing on Windows platform, avoid working directories with spaces between directory names.

You should have the most bare bone React application.  Run command `npm start`

### For Android devices

When running app directly on a device be sure to run "adb reverse" and change connection from LAN to Tunnel from Expo's bundler

### Develoopment version

1. Web3 1.2.9
2. Nodejs v10.16.3
3. Ethers 5.0.24