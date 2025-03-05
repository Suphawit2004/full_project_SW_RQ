document.addEventListener("DOMContentLoaded", function() {
    // ตั้งค่าฟังก์ชันให้ปุ่มล็อกอินทำงาน
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();
            login();
        });
    }

    // ตั้งค่าฟังก์ชันให้ปุ่ม Admin Only ทำงาน
    const adminOnlyButton = document.getElementById("adminOnlyButton");
    if (adminOnlyButton) {
        adminOnlyButton.addEventListener("click", function() {
            // นำไปยังหน้า admin-login.html เพื่อให้ผู้ดูแลระบบเข้าสู่ระบบ
            window.location.href = "/page/admin_login.html";
        });
    }

    // ตั้งค่าฟังก์ชันให้ปุ่มจองคิวทำงาน
    const bookingForm = document.getElementById("bookingForm");
    if (bookingForm) {
        bookingForm.addEventListener("submit", function(event) {
            event.preventDefault();
            bookAppointment();
        });
    }

    // แสดงชื่อผู้ใช้ที่ล็อกอินอยู่
    showUsernameOnPage();
});

// ✅ ฟังก์ชันล็อกอิน
function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // ตรวจสอบชื่อผู้ใช้และรหัสผ่าน
    if (username === "admin" && password === "admin1234") {
        alert("เข้าสู่ระบบผู้ดูแลสำเร็จ!");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);
        window.location.href = "/page/admin.html"; // ไปที่หน้า Admin
    } else if (username === "test1234" && password === "test1234") {
        alert("เข้าสู่ระบบสำเร็จ!");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);
        window.location.href = "index.html"; // ไปที่หน้า index สำหรับผู้ใช้งานทั่วไป
    } else {
        alert("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง!");
    }
}

// ✅ ฟังก์ชันตรวจสอบสถานะล็อกอิน
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    // ตรวจสอบเฉพาะหน้าที่ต้องล็อกอิน
    const restrictedPages = ["profile.html", "booking.html", "history.html"];
    const currentPage = window.location.pathname.split("/").pop();

    if (restrictedPages.includes(currentPage) && isLoggedIn !== "true") {
        alert("กรุณาเข้าสู่ระบบก่อนใช้งาน");
        window.location.href = "login.html"; // ส่งกลับไปล็อกอิน
    }
}

// ✅ ฟังก์ชันออกจากระบบ
function logout() {
    console.log("🔄 กำลังออกจากระบบ...");

    if (localStorage.getItem("isLoggedIn")) {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("username");
        alert("ออกจากระบบแล้ว!");
        window.location.href = "index.html";
    } else {
        alert("คุณยังไม่ได้ล็อกอิน!");
    }
}

// ✅ ฟังก์ชันแสดงชื่อผู้ใช้ที่ล็อกอินอยู่
function showUsernameOnPage() {
    const username = localStorage.getItem("username");
    const userDisplay = document.getElementById("userDisplay");

    if (username && userDisplay) {
        userDisplay.innerText = `ยินดีต้อนรับ, ${username}`;
    }
}

// ✅ ฟังก์ชันจองคิว
function bookAppointment() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
        alert("กรุณาเข้าสู่ระบบก่อนทำการจองคิว");
        window.location.href = "login.html";
        return;
    }

    const username = localStorage.getItem("username");
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const service = document.getElementById("service").value;

    if (date && time && service) {
        // ดึงประวัติการจองจาก LocalStorage
        let history = JSON.parse(localStorage.getItem("bookingHistory")) || [];

        // สร้างอ็อบเจ็กต์การจอง
        const bookingData = {
            username: username,
            date: date,
            time: time,
            service: service,
            status: "รอการยืนยัน" // สถานะเริ่มต้น
        };

        // เพิ่มข้อมูลใหม่เข้าไป
        history.push(bookingData);
        localStorage.setItem("bookingHistory", JSON.stringify(history));

        alert("จองคิวสำเร็จ!");
        window.location.href = "history.html";
    } else {
        alert("กรุณากรอกข้อมูลให้ครบถ้วน!");
    }
}

// ✅ ฟังก์ชันโหลดประวัติการจองในหน้า History
function loadBookingHistory() {
    const historyTableBody = document.getElementById("historyTableBody");

    if (!historyTableBody) return; // ถ้าไม่มีตาราง ไม่ต้องทำอะไร

    // ดึงข้อมูลจาก LocalStorage
    const history = JSON.parse(localStorage.getItem("bookingHistory")) || [];

    historyTableBody.innerHTML = "";

    if (history.length === 0) {
        historyTableBody.innerHTML = "<tr><td colspan='4'>ไม่มีประวัติการจอง</td></tr>";
        return;
    }

    history.forEach((booking) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${booking.date}</td>
            <td>${booking.time}</td>
            <td>${booking.service}</td>
            <td>${booking.status}</td>
        `;

        historyTableBody.appendChild(row);
    });
}

// โหลดประวัติการจองเมื่ออยู่ในหน้า History
document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname.includes("history.html")) {
        loadBookingHistory();
    }
});

// ฟังก์ชันที่ทำงานเมื่อหน้าเว็บโหลด
window.onload = function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const loginButton = document.getElementById('loginButton');
    const logoutButton = document.getElementById('logoutButton');
    const protectedLinks = document.querySelectorAll('.protected-link');

    // If the user is logged in, hide the login button and show the logout button
    if (isLoggedIn) {
        loginButton.style.display = "none"; // Hide login button
        logoutButton.style.display = "block"; // Show logout button
    } else {
        // Protect the links by redirecting to the login page
        protectedLinks.forEach(link => {
            link.addEventListener('click', function(event) {
                event.preventDefault(); // Prevent the default link behavior
                window.location.href = '/page/login.html'; // Redirect to login page
            });
        });
    }

    // Handle logout functionality
    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('isLoggedIn'); // Remove the logged-in status
        location.reload(); // Reload the page
    });
};