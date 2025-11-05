// Firebase Configuration (ใส่ค่าจริงจาก Firebase Console)
const firebaseConfig = {
  apiKey: "AIzaSyCgCqYq3V2xGguNl3h4U9Fg3PS8uOQ7Bbs",
  authDomain: "pressure-calibration-app.firebaseapp.com",
  projectId: "pressure-calibration-app",
  storageBucket: "pressure-calibration-app.firebasestorage.app",
  messagingSenderId: "569873646958",
  appId: "1:569873646958:web:1c679adb0d12196419ed7f",
  measurementId: "G-M85KV54V9L"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// DOM Elements
const form = document.getElementById('calibrationForm');
const dataList = document.getElementById('dataList');

// บันทึกข้อมูล
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const data = {
    serialNumber: document.getElementById('serialNumber').value,
    instrumentType: document.getElementById('instrumentType').value,
    rangeMin: document.getElementById('rangeMin').value,
    rangeMax: document.getElementById('rangeMax').value,
    rangeUnit: document.getElementById('rangeUnit').value,
    accuracyClass: document.getElementById('accuracyClass').value,
    calibrationDate: document.getElementById('calibrationDate').value,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  };
  
  try {
    await db.collection('calibrations').add(data);
    alert('บันทึกข้อมูลสำเร็จ!');
    form.reset();
    loadData();
  } catch (error) {
    console.error('Error:', error);
    alert('เกิดข้อผิดพลาด: ' + error.message);
  }
});

// โหลดข้อมูลทั้งหมด
async function loadData() {
  // ... (ส่วนนี้เหมือนเดิม)
}

// โหลดข้อมูลเมื่อเปิดหน้าเว็บ
loadData();

