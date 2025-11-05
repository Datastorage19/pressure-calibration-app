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
    range: document.getElementById('range').value,
    accuracyClass: document.getElementById('accuracyClass').value,
    operatorName: document.getElementById('operatorName').value,
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
  dataList.innerHTML = '<div class="loading">กำลังโหลดข้อมูล...</div>';
  
  try {
    const snapshot = await db.collection('calibrations')
      .orderBy('createdAt', 'desc')
      .get();
    
    if (snapshot.empty) {
      dataList.innerHTML = '<p style="text-align:center; color:#999;">ยังไม่มีข้อมูล</p>';
      return;
    }
    
    dataList.innerHTML = '';
    snapshot.forEach(doc => {
      const data = doc.data();
      const card = document.createElement('div');
      card.className = 'data-card';
      card.innerHTML = `
        <h3>Serial: ${data.serialNumber}</h3>
        <p><strong>ประเภท:</strong> ${data.instrumentType}</p>
        <p><strong>ช่วงวัด:</strong> ${data.range}</p>
        <p><strong>Accuracy Class:</strong> ${data.accuracyClass}</p>
        <p><strong>ผู้สอบเทียบ:</strong> ${data.operatorName}</p>
        <p><strong>วันที่:</strong> ${data.calibrationDate}</p>
      `;
      dataList.appendChild(card);
    });
  } catch (error) {
    console.error('Error loading data:', error);
    dataList.innerHTML = '<p style="color:red;">ไม่สามารถโหลดข้อมูลได้</p>';
  }
}

// โหลดข้อมูลเมื่อเปิดหน้าเว็บ
loadData();
