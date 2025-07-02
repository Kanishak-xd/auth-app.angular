# Angular Firebase Auth App

[![Angular](https://img.shields.io/badge/Angular-20-DD0031?logo=angular&logoColor=white)](https://angular.io/)
[![Firebase](https://img.shields.io/badge/Firebase-Firestore%20+%20Auth-FFCA28?logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.1-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-Image%20Upload-3448C5?logo=cloudinary&logoColor=white)](https://cloudinary.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

A modern authentication app built with Angular 20, Firebase Authentication & Firestore, and Tailwind CSS.  
Includes an admin dashboard, global audit logs, user management, and editable profiles.

---

## Features

- Firebase Email/Password Authentication
- Secure route guards for login and admin access
- Admin Dashboard:
  - View, filter, and manage all users
  - Toggle account status (active/unactive)
  - Real-time global logs of user activity
- Editable User Profiles:
  - Update name, date of birth, mobile, and profile picture
  - Cloudinary-powered image uploads
- Audit Logs:
  - Tracks key user events (sign-up, profile update, etc.)

---

## Tech Stack

- Angular 20
- Firebase Authentication & Firestore
- Cloudinary (for image storage)
- Tailwind CSS v4.1
- TypeScript

---

## Setup Instructions

### 1. Create Angular App

```bash
ng new auth-app
cd auth-app
```

### 2. Install Tailwind CSS

Follow the official [Tailwind CSS Angular guide](https://tailwindcss.com/docs/guides/angular) to set up Tailwind properly.


### 3. Setup Firebase

- Go to [Firebase Console](https://console.firebase.google.com/)
- Create a new Firebase project
- Enable **Email/Password** under **Authentication**
- Go to **Firestore Database** and create your database in test mode
- Copy your Firebase config and paste it into `src/environments/environment.ts`:

```ts
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

### 4. Add Cloudinary Support

- Sign up at [Cloudinary](https://cloudinary.com/)
- Use **unsigned upload preset** and your **cloud name**
- Use `fetch` to upload images directly from the client

Example upload logic:

```ts
const cloudName = 'your_cloud_name';
const uploadPreset = 'unsigned_preset';
const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
```

### 5. Start the App

```bash
ng serve
```

Visit [http://localhost:4200](http://localhost:4200)

---

## Screenshots

### Login Page  
![Login Page](https://i.ibb.co/Kzz5gzNr/EA3-F978-E-BA47-475-B-ACCA-9664-DD4-E4356.png)

### Signup Page  
![Signup Page](https://i.ibb.co/Kzjsk0tL/E5-C7-D126-8911-4-C23-87-DE-7-A393-A32-F9-CF.png)

### Reset Password Page  
![Reset Password](https://i.ibb.co/YnPQvQp/B9937-E3-E-2-DC6-4909-AC65-D827-EAC3-B333.png)

### Profile Page  
![Profile Page](https://i.ibb.co/Xx9yVp1J/2-DB44-D03-9241-4-D4-C-8-C29-6-B6-D349-A8-AE1.png)

### Left Sidebar  
![Left Sidebar](https://i.ibb.co/GfMym1dw/3-CFF76-E1-008-B-4-C4-F-B9-FE-D6-EB7379-C0-FE.png)

### Right Sidebar  
![Right Sidebar](https://i.ibb.co/JgDr9n3/80-B46-DA8-1696-4311-BD7-E-95-B31508-D88-C.png)

### Admin Dashboard  
![Admin Dashboard](https://i.ibb.co/zVKZsvs0/354-EF13-F-97-B9-401-D-A32-B-F8-EF449-AEF91.png)

---


## License

MIT License
