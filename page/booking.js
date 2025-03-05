// ✅ โหลดบริการจาก localStorage หรือใช้ค่าเริ่มต้น
function loadServices() {
    const serviceSelect = document.getElementById('service');
    const services = JSON.parse(localStorage.getItem('services')) || [];

    serviceSelect.innerHTML = `<option value="">-- กรุณาเลือกบริการ --</option>`;

    services.forEach(service => {
        let option = document.createElement('option');
        option.value = service;
        option.textContent = service;
        serviceSelect.appendChild(option);
    });
}

// ✅ โหลดตัวเลือกเวลา (10:00 - 21:00 ทุก 30 นาที)
function loadTimeOptions() {
    const timeSelect = document.getElementById('time');
    timeSelect.innerHTML = ''; // เคลียร์รายการเวลาเก่า

    // เริ่มเวลา 10:00 - 21:00 ทุก 30 นาที
    for (let hour = 10; hour <= 21; hour++) {
        for (let minute of["00", "30"]) {
            let time = `${hour}:${minute}`;
            let option = document.createElement('option');
            option.value = time;
            option.textContent = time;
            timeSelect.appendChild(option);
        }
    }
}

// ✅ ตรวจสอบและแสดงข้อมูลก่อนยืนยัน
function updateConfirmation() {
    const name = document.getElementById('name').value.trim();
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const service = document.getElementById('service').value;
    const confirmSection = document.getElementById('confirmationSection');
    const confirmButton = document.getElementById('confirmBooking');
    const today = new Date().toISOString().split('T')[0];

    if (date < today) {
        alert("กรุณาเลือกวันที่ในอนาคต!");
        return;
    }

    if (name && date && time && service) {
        document.getElementById('confirmName').textContent = name;
        document.getElementById('confirmDate').textContent = date;
        document.getElementById('confirmTime').textContent = time;
        document.getElementById('confirmService').textContent = service;
        confirmSection.style.display = 'block';
        confirmButton.style.display = 'inline-block';
        confirmButton.disabled = false;
    } else {
        confirmSection.style.display = 'none';
        confirmButton.style.display = 'none';
        confirmButton.disabled = true;
    }
}

// ✅ ยืนยันการจองและบันทึกลง localStorage
function confirmBooking() {
    const name = document.getElementById('name').value.trim();
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const service = document.getElementById('service').value;

    const bookingData = { name, date, time, service, status: 'รอดำเนินการ' };

    let bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    bookings.push(bookingData);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    alert("การจองของคุณสำเร็จ!");
    window.location.href = '/page/history.html'; // เปลี่ยนไปยังหน้าประวัติการจอง
}

// ✅ โหลดข้อมูลที่จำเป็นเมื่อหน้าโหลด
window.onload = function() {
    if (document.getElementById('service')) {
        loadServices();
        loadTimeOptions();
    }
    if (document.getElementById('historyTableBody')) {
        loadBookingHistory();
    }
};

// ✅ Event Listeners
if (document.getElementById('confirmBooking')) {
    document.getElementById('confirmBooking').addEventListener('click', confirmBooking);
}

if (document.getElementById('backButton')) {
    document.getElementById('backButton').addEventListener('click', function() {
        window.history.back();
    });
}

if (document.getElementById('name') || document.getElementById('date') || document.getElementById('time') || document.getElementById('service')) {
    document.getElementById('name').addEventListener('input', updateConfirmation);
    document.getElementById('date').addEventListener('change', updateConfirmation);
    document.getElementById('time').addEventListener('change', updateConfirmation);
    document.getElementById('service').addEventListener('change', updateConfirmation);
}