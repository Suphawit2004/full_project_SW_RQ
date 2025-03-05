document.addEventListener("DOMContentLoaded", function() {
    const registerForm = document.getElementById("registerForm");

    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const newUsername = document.getElementById("newUsername").value.trim();
        const newPassword = document.getElementById("newPassword").value.trim();

        // ดึงข้อมูลผู้ใช้ที่มีอยู่แล้ว
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // ตรวจสอบว่าชื่อผู้ใช้ซ้ำหรือไม่
        if (users.some(user => user.username === newUsername)) {
            alert("ชื่อผู้ใช้นี้ถูกใช้แล้ว!");
            return;
        }

        // เพิ่มผู้ใช้ใหม่
        users.push({ username: newUsername, password: newPassword });
        localStorage.setItem("users", JSON.stringify(users));

        alert("ลงทะเบียนสำเร็จ! กรุณาเข้าสู่ระบบ");
        window.location.href = "/page/login.html"; // กลับไปหน้าเข้าสู่ระบบ
    });
});