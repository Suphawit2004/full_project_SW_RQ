document.addEventListener("DOMContentLoaded", function() {
    // ตั้งค่าฟังก์ชันให้ปุ่มล็อกอินทำงาน
    const adminLoginForm = document.getElementById("adminLoginForm");

    if (adminLoginForm) {
        adminLoginForm.addEventListener("submit", function(event) {
            event.preventDefault();
            adminLogin();
        });
    }
});

// ฟังก์ชันตรวจสอบการเข้าสู่ระบบผู้ดูแล
function adminLogin() {
    const adminUsername = document.getElementById("adminUsername").value.trim();
    const adminPassword = document.getElementById("adminPassword").value.trim();

    // กำหนดชื่อผู้ใช้และรหัสผ่านที่ถูกต้อง
    const correctAdminUsername = "admin";
    const correctAdminPassword = "admin1234";

    // ตรวจสอบความถูกต้องของข้อมูล
    if (adminUsername === correctAdminUsername && adminPassword === correctAdminPassword) {
        alert("เข้าสู่ระบบสำเร็จ!");
        // ตั้งค่าข้อมูลว่าเป็นผู้ดูแล
        localStorage.setItem("isAdminLoggedIn", "true");
        window.location.href = "/page/admin.html"; // นำผู้ใช้ไปยังหน้า admin
    } else {
        alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง!");
    }
}