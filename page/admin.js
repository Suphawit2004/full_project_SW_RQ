document.addEventListener("DOMContentLoaded", function() {
    // ตรวจสอบสถานะการเข้าสู่ระบบของผู้ดูแล
    checkAdminLoginStatus();

    // ตั้งค่าฟังก์ชันสำหรับปุ่มออกจากระบบ
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            logout();
        });
    }

    loadServices();
    loadBookingRequests();

    // ฟังก์ชันเพิ่มบริการ
    document.getElementById('addService').addEventListener('click', function() {
        addService();
    });
});

// ฟังก์ชันตรวจสอบการเข้าสู่ระบบของผู้ดูแล
function checkAdminLoginStatus() {
    const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn");

    // หากผู้ดูแลไม่ได้เข้าสู่ระบบ ให้กลับไปที่หน้า admin-login.html
    if (isAdminLoggedIn !== "true") {
        alert("กรุณาเข้าสู่ระบบก่อน!");
        window.location.href = "/page/admin_login.html";
    }
}

// ฟังก์ชันออกจากระบบ
function logout() {
    localStorage.removeItem("isAdminLoggedIn"); // ลบสถานะการเข้าสู่ระบบของผู้ดูแล
    alert("ออกจากระบบแล้ว!");
    window.location.href = "/page/index.html"; // นำผู้ใช้กลับไปยังหน้าหลัก
}

// ฟังก์ชันโหลดบริการจาก localStorage หรือกำหนดบริการเริ่มต้น
function loadServices() {
    const serviceList = document.getElementById('serviceList');
    const services = JSON.parse(localStorage.getItem('services')) || [];

    serviceList.innerHTML = '';
    services.forEach(service => {
        let li = document.createElement('li');
        li.innerHTML = `${service} <button onclick="removeService('${service}')">ลบ</button>`;
        serviceList.appendChild(li);
    });
}

// ฟังก์ชันเพิ่มบริการ
function addService() {
    const newService = document.getElementById('newService').value.trim();
    if (!newService) {
        alert("กรุณากรอกชื่อบริการ!");
        return;
    }

    let services = JSON.parse(localStorage.getItem('services')) || [];
    services.push(newService);
    localStorage.setItem('services', JSON.stringify(services));

    alert("เพิ่มบริการเรียบร้อย!");
    loadServices();
    document.getElementById('newService').value = '';
}

// ฟังก์ชันลบบริการ
function removeService(service) {
    let services = JSON.parse(localStorage.getItem('services')) || [];
    services = services.filter(s => s !== service);
    localStorage.setItem('services', JSON.stringify(services));

    loadServices();
}

// ฟังก์ชันโหลดรายการการจอง
function loadBookingRequests() {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const tableBody = document.getElementById('bookingList');
    tableBody.innerHTML = '';

    if (bookings.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6">ไม่มีการจอง</td></tr>';
        return;
    }

    bookings.forEach((booking, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${booking.name}</td>
            <td>${booking.date}</td>
            <td>${booking.time}</td>
            <td>${booking.service}</td>
            <td>${booking.status || 'รอดำเนินการ'}</td>
            <td>
                <button onclick="approveBooking(${index})">อนุมัติ</button>
                <button onclick="cancelBooking(${index})">ยกเลิก</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// ฟังก์ชันอนุมัติการจอง
function approveBooking(index) {
    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings[index].status = "อนุมัติแล้ว";
    localStorage.setItem('bookings', JSON.stringify(bookings));
    loadBookingRequests();
}

// ฟังก์ชันยกเลิกการจอง
function cancelBooking(index) {
    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.splice(index, 1);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    loadBookingRequests();
}