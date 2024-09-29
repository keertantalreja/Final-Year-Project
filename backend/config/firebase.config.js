const { initializeApp } = require("@firebase/app");
const {
  getStorage,
  getDownloadURL,
  ref,
  uploadBytes,
} = require("@firebase/storage");

const firebaseConfig = {
  apiKey: "AIzaSyBKN9grj92zKGAVeg0bcmX3d-kiGK20-IQ",
  authDomain: "dotcoinverse.firebaseapp.com",
  projectId: "dotcoinverse",
  storageBucket: "dotcoinverse.appspot.com",
  messagingSenderId: "700025687216",
  appId: "1:700025687216:web:d96795835a706d088a3f75",
  measurementId: "G-VK38TGLXHN",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const uploadSingleFile = async (file) => {
  const uniqueFilename = `${file.originalname}-${Date.now()}`;
  const storageRef = ref(storage, `${uniqueFilename}`);
  await uploadBytes(storageRef, file.buffer);
  const result = await getDownloadURL(storageRef);
  let downloadUrl = result;
  return downloadUrl;
};

module.exports = { uploadSingleFile };
