# Angular Firebase Auth App

An app built using **Angular 20**, **Firebase**, and **Tailwind CSS**.

---

## Features

- Sign-up, log-in and reset password with Firebase Authentication
- Auth and status guard to protect routes accessibility
- Admin Dashboard with user list, roles, status, actions and audit logs
- Profile page with editable profile icon, name, DoB and mobile number

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
3. Make new project on firebase and enable email/password authentication and database
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
