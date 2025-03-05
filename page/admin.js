document.addEventListener("DOMContentLoaded", function() {
    loadServices();
    loadBookingRequests();

    // ฟังก์ชันเพิ่มบริการ
    document.getElementById('addService').addEventListener('click', function() {
        addService();
    });
});

// ฟังก์ชันโหลดบริการจาก localStorage หรือกำหนดบริการเริ่มต้น
function loadServices() {
    const serviceList = document.getElementById('serviceList');
    const defaultServices = ["ทาสีมือ", "ต่อเล็บเจล", "ตัดเล็บขบ"];
    let services = JSON.parse(localStorage.getItem('services')) || defaultServices;

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