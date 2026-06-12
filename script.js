// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { getFirestore, doc, updateDoc, collection, getDocs, setDoc, orderBy, query, where, limit } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";
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

// import {
//   getAuth,
//   signInWithPopup,
//   GoogleAuthProvider
// } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// const auth = getAuth();
// const provider = new GoogleAuthProvider();

// await signInWithPopup(auth, provider);

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

document.getElementById("loginBtn").onclick = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
};

function celebrate() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.7 }
    });
}

async function loadNextCreature() {

    const q = query(
        collection(db, "dinosaurs"),
        where("status", "==", "0"),
        orderBy("level"),
        limit(1)
    );

    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        document.getElementById("output").innerHTML =
            "<h2>All creatures completed!</h2>";
        return;
    }

    const creatureDoc = snapshot.docs[0];
    const creature = creatureDoc.data();

    document.getElementById("output").innerHTML = `
        <h2>${creatureDoc.id}</h2>
        <button id="completeBtn">Mark Complete</button>
    `;

    document.getElementById("completeBtn").onclick = () =>
        markComplete(creatureDoc.id);
}


async function markComplete(creatureName) {

    await updateDoc(
        doc(db, "dinosaurs", creatureName),
        {
            status: "1"
        }
    );
    celebrate();
    setTimeout(() => {
        loadNextCreature();
    }, 1000);
}


onAuthStateChanged(auth, async (user) => {

    const loginBtn = document.getElementById("loginBtn");

    if (user) {

        console.log("Logged in as:", user.email);

        // Hide login button
        loginBtn.style.display = "none";
        loadNextCreature();


    } else {

        console.log("Not logged in");

        // Show login button
        loginBtn.style.display = "inline-block";
    }
});




async function importCsv(){
    const response = await fetch("ATL.csv");
    const csvText = await response.text();

    const lines = csvText.trim().split("\n");
    const headers = lines[0].split(",");

    for (let i = 1; i < lines.length; i++) {

        const values = lines[i].split(",");

        const dinosaur = {};

        headers.forEach((header, index) => {
            dinosaur[header.trim()] = values[index]?.trim();
        });

        await setDoc(
            doc(db, "dinosaurs", dinosaur.name),
            {
                status: dinosaur.status,
                level: Number(dinosaur.level)
            }
        );

        console.log("Added:", dinosaur.name);
    }
};

document.getElementById("importBtn").onclick = importCsv;



