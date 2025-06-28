# Angular Firebase Auth App

A simple authentication app built using **Angular 20**, **Firebase**, and **Tailwind CSS**.

---

## Features

- Sign Up with Email, Password, and Username
- Log In with Firebase Authentication
- Forgot Password with email reset link
- Auth Guard to protect routes
- Edit Profile (Profile icon, name, DoB and mobile no)
- Tailwind CSS styling

---

## Tech Stack

- Angular 20
- Firebase Authentication & Database
- Cloudinary Image Storage
- Tailwind CSS v4.1

---

## Setup Instructions

1. Do ``ng new auth-app``
2. Install tailwind css in the project (follow tailwind's official documentation)
3. Make new project on firebase & enable email/password authentication
4. Get your Firebase config and paste it in src/environments/environment.ts:
```
export const environment = {
  firebase: {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  }
};
```
5. Build all pages with their logic and run ``ng serve``
