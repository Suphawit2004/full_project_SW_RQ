document.addEventListener("DOMContentLoaded", function() {
    loadBookingHistory();

    // ล้างประวัติทั้งหมด
    document.getElementById('clearHistory').addEventListener('click', function() {
        localStorage.removeItem('bookings');
        alert("ล้างประวัติการจองทั้งหมดเรียบร้อย!");
        loadBookingHistory();
    });

    // กลับไปหน้าจองคิว
    document.getElementById('backToBooking').addEventListener('click', function() {
        window.location.href = "/page/booking.html";
    });
});

// โหลดข้อมูลจาก Local Storage
function loadBookingHistory() {
    const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    const tableBody = document.getElementById('historyTableBody');

    tableBody.innerHTML = '';

    if (bookings.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6">ไม่มีประวัติการจอง</td></tr>';
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
            <td><button onclick="cancelBooking(${index})">ยกเลิก</button></td>
        `;

        tableBody.appendChild(row);
    });
}

// ลบการจองทีละรายการ
function cancelBooking(index) {
    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.splice(index, 1);
    localStorage.setItem('bookings', JSON.stringify(bookings));
    loadBookingHistory();
}