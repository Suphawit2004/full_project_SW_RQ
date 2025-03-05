// สร้างตัวเลือกเวลา ตั้งแต่ 10:00 - 21:00 (ห่างกัน 30 นาที)
const timeSelect = document.getElementById('time');
for (let hour = 10; hour < 21; hour++) {
    for (let minute of["00", "30"]) {
        let time = `${hour}:${minute}`;
        let option = document.createElement('option');
        option.value = time;
        option.textContent = time;
        timeSelect.appendChild(option);
    }

    // เพิ่ม 21:00 เป็นตัวเลือกสุดท้าย
    let option = document.createElement('option');
    option.value = "21:00";
    option.textContent = "21:00";
    timeSelect.appendChild(option);

    // ตรวจสอบข้อมูลก่อนกดยืนยัน
    document.getElementById('confirmBooking').addEventListener('click', function() {
        const name = document.getElementById('name').value.trim();
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const promotion = document.getElementById('promotion').value;

        if (!name || !date || !time || !promotion) {
            alert("กรุณากรอกข้อมูลให้ครบทุกช่อง!");
            return;
        }

        const bookingData = {
            name: name,
            date: date,
            time: time,
            promotion: promotion,
            type: 'promotion' // ระบุว่าเป็นการจองโปรโมชั่น
        };

        // เก็บข้อมูลการจองใน LocalStorage
        localStorage.setItem('bookingData', JSON.stringify(bookingData));

        // แจ้งเตือนผู้ใช้และย้ายไปหน้า History
        alert("การจองของคุณสำเร็จ!");
        window.location.href = "/page/history.html"; // เปลี่ยนเส้นทางไปที่หน้า history.html
    });

    // ปุ่มย้อนกลับ
    document.getElementById('backButton').addEventListener('click', function() {
        window.history.back(); // กลับไปหน้าก่อนหน้า
    });