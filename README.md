# HEHEHE App 

This is social meme community platform built with Expo.

## 🚨 Get started
1. View video demo [here](https://install.appcenter.ms/users/naandalist/apps/hehehe/distribution_groups/beta%20tester).
2. Download app by clicking  [here](https://install.appcenter.ms/users/naandalist/apps/hehehe/distribution_groups/beta%20tester) or scanning the QR code below.

<img src="https://res.cloudinary.com/naandalistcloud/image/upload/v1729315311/temporer/oajslaymnwswzyenuzn6.jpg" width="200" alt="qr-code hehehe">

<br>

## 📦 Feature

1. The home page consists of a virtualized infinite scroll containing posts (by simulating fetch data).  ✅
2. Image or video posts have a fixed aspect ratio (4:1) to prevent layout shifting when loading media. ✅
3. Videos autoplayed once entering the viewport, also have a pause/play button, mute button, and slider to control the timeline. ✅
4. Zoom in image/video through pinching motion. ✅
5. Each post has a user avatar, user username, create date, hashtags, and some buttons. ✅

## 📦 Code

- Typescript ✅
- Hardcoded colors, numbers, or other variables has avoided ✅
- Unify components such as icons and buttons. Reuse and prevent redundant components ✅
- Styles and components must not be nested into a single file ✅
- Use Eslint AirBnB style & Prettier ✅
- Use comments '//' on codes that are not straight forward ✅

## 📦 Instalation

1. Install dependencies

   ```bash
   bun install
   ```

2. Start the app

   ```bash
    bun start
   ```

## 📦 Build with EAS

1. Generate APK *(useful for testing)*:
   
   ```bash
   build --profile preview-apk --platform android
   ```

2. Generate AAB *(preview version):*
   
   ```bash 
   build --profile preview-aab --platform android
   ```

3. Production AAB:

   ```bash
   build --profile production --platform android
   ```

