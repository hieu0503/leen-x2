// JS cho menu mobile

const menuIcon = document.querySelector('.header-button');
const menu = document.querySelector('.header-menu');
const overlay = document.querySelector('.overlay');

menuIcon.addEventListener('click', () => {
    menu.classList.toggle('active');
    menuIcon.classList.toggle('change');
    overlay.classList.toggle('active');
});
overlay.addEventListener('click', () => {
    menu.classList.toggle('active');
    menuIcon.classList.toggle('change');
    overlay.classList.toggle('active');
})

// JavaScript cho slider
let slideIndex = 0;
const slides = document.getElementsByClassName('slider-slide');

showSlide(slideIndex);

function changeSlide(n) {
    showSlide(slideIndex += n);
}

function showSlide(n) {
    if (n >= slides.length) {
        slideIndex = 0;
    } else if (n < 0) {
        slideIndex = slides.length - 1;
    }

    for (var i = 0; i < slides.length; i++) {
        // slides[i].style.display = 'none';
        slides[i].style.opacity = '0';
        slides[i].style.visibility = 'hidden';
    }

    // slides[slideIndex].style.display = 'block';
    slides[slideIndex].style.opacity = '1';
    slides[slideIndex].style.visibility = 'visible';

}

// JS video

const video = document.getElementById("myVideo");
const playPauseBtn = document.getElementById("playPauseBtn");

function togglePlayPause() {
    if (video.paused) {
        video.play();
        playPauseBtn.style.opacity = '0';
        // playPauseBtn.innerHTML = '<img src="" alt="" class="">';
    } else {
        video.pause();

        playPauseBtn.style.opacity = '1';
        // playPauseBtn.innerHTML = '<img src="./theme/frontend/images/play.svg" alt="play" class="btn-video">';
    }
}

playPauseBtn.addEventListener("click", togglePlayPause);

// JS FAQ

window.addEventListener('DOMContentLoaded', (event) => {
    // Lấy danh sách tab và tab links
    var tabs = document.querySelectorAll(".tab");
    var tabLinks = document.querySelectorAll(".tab-link");

    // Hiển thị nội dung của Tab 1 khi trang được tải và thêm lớp active vào tab link và tab tương ứng
    tabs[0].classList.add("active");
    tabLinks[0].classList.add("active");
});

function changeTab(event, tabId) {
    var tabs = document.querySelectorAll(".tab");
    var tabLinks = document.querySelectorAll(".tab-link");

    // Ẩn tất cả nội dung tab và xóa lớp active khỏi tất cả tab links
    tabs.forEach(tab => tab.classList.remove("active"));
    tabLinks.forEach(link => link.classList.remove("active"));

    // Hiển thị nội dung tab được chọn và thêm lớp active vào tab link tương ứng
    var selectedTab = document.getElementById(tabId);
    var selectedTabLink = event.currentTarget;
    selectedTab.classList.add("active");
    selectedTabLink.classList.add("active");
}
