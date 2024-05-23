# User Registration App

This project is a User Registration app developed as part of the Mobile App Developer role application at LiveIntuitions Technologies. The app is built using React-Native and Firebase, and it supports both user and admin functionalities.

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [File Structure](#file-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **User Registration**: Users can register using their email and password.
- **User Login**: Users can log in using their email and password or Google account.
- **Admin Login**: Admins can log in using predefined credentials.
- **User Deletion**: Admins have the privilege to delete users from the system.

## Screenshots

![User Login](screenshots/user_login.png)
*User Login Screen*

![Admin Dashboard](screenshots/admin_dashboard.png)
*Admin Dashboard Screen*

![User List](screenshots/user_list.png)
*List of Users*

## Technologies Used

- React Native
- Firebase Authentication
- Firebase Firestore

## Installation

To get a local copy up and running, follow these simple steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/NareshKumar1553/LiveInTech.git
    ```
2. Navigate to the project directory:
    ```sh
    cd LiveInTech
    ```
3. Install the dependencies:
    ```sh
    npm install
    ```
4. Link dependencies for iOS (if applicable):
    ```sh
    npx pod-install
    ```

## Usage

1. Start the application:
    ```sh
    npx react-native run-android
    ```
    or
    ```sh
    npx react-native run-ios
    ```

2. The app will launch on your emulator or connected device.

### Admin Login Details

- **Email**: admin@liveintech.co
- **Password**: admin

## File Structure

LiveInTech/
├── android/
├── ios/
├── lib/
│ ├── screens/
│ │ ├── AdminDashboard.js
│ │ ├── Login.js
│ │ ├── Register.js
│ │ └── UserList.js
│ ├── components/
│ │ ├── AdminHeader.js
│ │ └── UserHeader.js
│ ├── firebase/
│ │ ├── config.js
│ │ └── auth.js
│ ├── App.js
│ └── ...
├── assets/
├── screenshots/
│ ├── user_login.png
│ ├── admin_dashboard.png
│ └── user_list.png
├── .gitignore
├── README.md
└── package.json


## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Naresh Kumar S. - nareshkumar.s1553@gmail.com

Project Link: [https://github.com/NareshKumar1553/LiveInTech](https://github.com/NareshKumar1553/LiveInTech)
