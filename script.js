// المتغيرات
const startBtn = document.getElementById('startBtn');
const userIdInput = document.getElementById('userId');
const modal = document.getElementById('modal');
const loadingState = document.getElementById('loadingState');
const errorState = document.getElementById('errorState');
const statusMsg = document.getElementById('statusMsg');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const closeModalBtn = document.getElementById('closeModalBtn');
const copyBtn = document.getElementById('copyBtn');

let interval;

// دالة زر البداية (Start)
startBtn.addEventListener('click', () => {
    const idValue = userIdInput.value;

    // التحقق من أن الـ ID مكون من 10 أرقام
    if (idValue.length !== 10) {
        alert("⚠️ المرجو إدخال ID صحيح مكون من 10 أرقام.");
        // إضافة حركة اهتزاز (Shake) للحقل إذا كان خطأ
        userIdInput.style.transform = "translateX(-10px)";
        setTimeout(() => userIdInput.style.transform = "translateX(10px)", 50);
        setTimeout(() => userIdInput.style.transform = "translateX(0)", 100);
        return;
    }

    // إعداد حالة التحميل وإظهار النافذة المنبثقة بـ Animation
    modal.classList.add('active');
    loadingState.style.display = 'flex';
    errorState.style.display = 'none';
    progressBar.style.width = '0%';
    progressText.innerText = '0%';
    statusMsg.innerText = "جاري التحقق من الـ ID الخاص بك...";
    statusMsg.style.color = "#00ff88"; // لون أخضر

    let timeElapsed = 0;
    const totalDuration = 10000; // 10 ثواني كاملة
    const step = 50; // سرعة التحديث

    // تشغيل شريط التحميل
    interval = setInterval(() => {
        timeElapsed += step;
        
        let percent = (timeElapsed / totalDuration) * 100;
        if (percent > 100) percent = 100;
        
        progressBar.style.width = percent + '%';
        progressText.innerText = Math.floor(percent) + '%';

        // تغيير النصوص
        if (timeElapsed === 3500) {
            statusMsg.innerText = "جاري التحقق من تطبيق الشروط...";
            statusMsg.style.color = "#0088ff"; // لون أزرق
        } else if (timeElapsed === 7000) {
            statusMsg.innerText = "جاري الفحص النهائي...";
            statusMsg.style.color = "#ffdd00"; // لون أصفر
        }

        // عند الوصول لـ 100%
        if (timeElapsed >= totalDuration) {
            clearInterval(interval);
            
            // إخفاء التحميل وإظهار رسالة الخطأ
            setTimeout(() => {
                loadingState.style.display = 'none';
                errorState.style.display = 'flex';
            }, 400); 
        }
    }, step);
});

// دالة إغلاق النافذة المنبثقة
closeModalBtn.addEventListener('click', () => {
    modal.classList.remove('active'); // إخفاء بـ Animation
    setTimeout(() => {
        progressBar.style.width = '0%';
        progressText.innerText = '0%';
    }, 300); // ننتظر حتى تختفي النافذة قبل التصفير
});

// دالة نسخ كود البرومو
copyBtn.addEventListener('click', () => {
    const promoText = "SOVOR";
    navigator.clipboard.writeText(promoText).then(() => {
        // تأثير النسخ
        copyBtn.innerText = "تم النسخ ✔";
        copyBtn.style.backgroundColor = "#00ff88"; 
        copyBtn.style.color = "#000";
        copyBtn.style.borderColor = "#00ff88";
        
        setTimeout(() => {
            copyBtn.innerText = "نسخ";
            copyBtn.style.backgroundColor = "#1e293b"; 
            copyBtn.style.color = "#fff";
            copyBtn.style.borderColor = "#334155";
        }, 2000);
    }).catch(() => {
        alert("حدث خطأ أثناء النسخ!");
    });
});
