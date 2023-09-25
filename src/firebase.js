import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyC3jOlLE5rDFERehIw-DaKylrMd_SlRrUc",
	authDomain: "movie-app-c7807.firebaseapp.com",
	projectId: "movie-app-c7807",
	storageBucket: "movie-app-c7807.appspot.com",
	messagingSenderId: "750166160314",
	appId: "1:750166160314:web:aafc7a7694c5bbe7b02383",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
