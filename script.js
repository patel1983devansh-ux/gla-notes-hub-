```javascript
// ==========================================
// 🔥 FIREBASE FIRESTORE
// ==========================================

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-firestore.js";


// ==========================================
// 🔐 FIREBASE CONFIG
// ==========================================

const firebaseConfig = {

    apiKey: "AIzaSyCjTQRuA8xtwESu-zY3jxC24pZyA5Hja50",

    authDomain: "gla-notes-hub.firebaseapp.com",

    projectId: "gla-notes-hub",

    storageBucket: "gla-notes-hub.firebasestorage.app",

    messagingSenderId: "988828174289",

    appId: "1:988828174289:web:b6f03f00ce3af8ae2702f0",

    measurementId: "G-GQVVVHGB93"

};


// ==========================================
// 🚀 INITIALIZE FIREBASE
// ==========================================

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


// ==========================================
// 🔎 SEARCH
// ==========================================

const searchBox =
    document.getElementById("searchBox");

const cards =
    document.querySelectorAll(".subject-card");


if (searchBox) {

    searchBox.addEventListener(
        "input",
        function () {

            const searchText =
                searchBox.value.toLowerCase();


            cards.forEach(function (card) {

                const text =
                    card.innerText.toLowerCase();


                if (text.includes(searchText)) {

                    card.style.display = "block";

                } else {

                    card.style.display = "none";

                }

            });

        }
    );

}


// ==========================================
// 📚 LOAD ALL NOTES FROM FIRESTORE
// ==========================================

let firestoreNotes = {};


async function loadNotes() {

    try {

        const notesSnapshot =
            await getDocs(
                collection(db, "notes")
            );


        notesSnapshot.forEach(function (doc) {

            const data = doc.data();

            if (data.subject) {

                firestoreNotes[data.subject] =
                    data;

            }

        });


        console.log(
            "✅ Firestore Notes Loaded:",
            firestoreNotes
        );


    } catch (error) {

        console.error(
            "❌ Firestore Error:",
            error
        );

    }

}


// ==========================================
// 📖 VIEW NOTES BUTTONS
// ==========================================

const buttons =
    document.querySelectorAll(
        ".view-notes-btn"
    );


buttons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const subject =
                button.getAttribute(
                    "data-subject"
                );


            const noteData =
                firestoreNotes[subject];


            document.getElementById(
                "notesTitle"
            ).innerText =
                "📚 " + subject;


            if (noteData) {

                if (noteData.notes) {

                    document.getElementById(
                        "notesText"
                    ).innerText =
                        "📄 Notes:\n\n" +
                        noteData.notes;

                } else {

                    document.getElementById(
                        "notesText"
                    ).innerText =
                        "📄 Is subject ke notes abhi upload nahi hue.";

                }

            } else {

                document.getElementById(
                    "notesText"
                ).innerText =
                    "❌ Is subject ka data Firestore mein nahi mila.";

            }


            document.getElementById(
                "overlay"
            ).style.display =
                "block";


            document.getElementById(
                "notesBox"
            ).style.display =
                "block";

        }
    );

});


// ==========================================
// ❌ CLOSE POPUP
// ==========================================

document.getElementById(
    "closeNotes"
).addEventListener(
    "click",
    closeNotes
);


document.getElementById(
    "overlay"
).addEventListener(
    "click",
    closeNotes
);


function closeNotes() {

    document.getElementById(
        "overlay"
    ).style.display =
        "none";


    document.getElementById(
        "notesBox"
    ).style.display =
        "none";

}


// ==========================================
// 🚀 START FIRESTORE
// ==========================================

loadNotes();
```
