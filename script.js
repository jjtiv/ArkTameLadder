// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore, doc, updateDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnRP12nXtY10cetd5lX6AmgBVZmRol_sE",
  authDomain: "atljjtiv.firebaseapp.com",
  projectId: "atljjtiv",
  storageBucket: "atljjtiv.firebasestorage.app",
  messagingSenderId: "726975353449",
  appId: "1:726975353449:web:7e0e8ea399e4e5c4ca48f8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const output = document.getElementById("output");

try {

    const snapshot = await getDocs(
        collection(db, "dinosaurs")
    );

    output.innerHTML = "";

    snapshot.forEach((doc) => {

        const data = doc.data();

        output.innerHTML += `
            <p>
                <strong>${doc.id}</strong>
                : ${data.status}
                : ${data.level}
            </p>
        `;
    });

}
catch (error) {

    output.textContent =
        "Error: " + error.message;

    console.error(error);
}