import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
   apiKey: 'AIzaSyBnC4w--ZH5ol_80ML09DvZ3aqkJxjKHAQ',
   authDomain: 'lesson-register-bac30.firebaseapp.com',
   projectId: 'lesson-register-bac30',
   storageBucket: 'lesson-register-bac30.appspot.com',
   messagingSenderId: '338579215239',
   appId: '1:338579215239:web:ab34ac3e96fffb0ec6b922',
   measurementId: 'G-5XHXGTE3XG'
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)