// PASTE YOUR FIREBASE CONFIG HERE (Step 4 will show how)
const firebaseConfig = {
    apiKey: "AIzaSyCVWZUSkcOWMa1ki5O1TWjgAEKpy_7EtDg",
    authDomain: "my-chat-app-f33de.firebaseapp.com",
    projectId: "my-chat-app-f33de",
    storageBucket: "my-chat-app-f33de.firebasestorage.app",
    messagingSenderId: "951242308229",
    appId: "1:951242308229:web:29b6302a37b6ec2c86c7ec",
    measurementId: "G-TWNR6TPQT2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  const storage = firebase.storage();

  // Chat Functions
  function sendMessage() {
    const messageInput = document.getElementById('message-input');
    db.collection('messages').add({
      text: messageInput.value,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });
    messageInput.value = ''; // Clear input
  }

  // Real-time Updates
  db.collection('messages')
    .orderBy('timestamp')
    .onSnapshot(snapshot => {
      const chatBox = document.getElementById('chat-box');
      chatBox.innerHTML = '';
      snapshot.forEach(doc => {
        const msg = doc.data();
        chatBox.innerHTML += `<div class="msg">${msg.text}</div>`;
      });
    });

  // File Sharing
  function uploadFile() {
    const file = document.getElementById('file-input').files[0];
    const storageRef = storage.ref('shared-files/' + file.name);
    storageRef.put(file).then(() => {
      alert('File shared: ' + file.name);
    });
  }
