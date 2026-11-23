import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAfOkKI5YQ1M7wfrVDPjlxBcO8hszV7sQc",
  authDomain: "pelotense-temp-file.firebaseapp.com",
  projectId: "pelotense-temp-file",
  storageBucket: "pelotense-temp-file.firebasestorage.app",
  messagingSenderId: "470771008330",
  appId: "1:470771008330:web:f87a20d3f64b52de9f77b3"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
