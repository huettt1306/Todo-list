// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";

// Cấu hình Firebase


// Khởi tạo Firebase và Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function putData(newData) {
    try {
        const dataRef = doc(db, "subjects", "user_data"); 

        await setDoc(dataRef, { subjects: newData });

        console.log("✅ Dữ liệu đã được ghi đè thành công!");
    } catch (error) {
        console.error("❌ Lỗi khi ghi đè dữ liệu:", error);
    }
}


export async function loadData() {
    // Đọc tất cả dữ liệu khi tải trang
    try {
        const docSnap = await getDoc(doc(db, "subjects", "user_data"));
        if (docSnap.exists()) {
            return docSnap.data().subjects;
        }
    } catch (error) {
        console.error("Error loading data: ", error);
    }
}
