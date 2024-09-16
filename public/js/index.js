var navLinks = document.getElementById("navLinks");
function showmenu(){
    navLinks.style.right = "0px";
}
function hidemenu(){
    navLinks.style.right = "-700px";
}

const nav = document.querySelector('nav');
const header = document.querySelector('header');

const navObserverCallback = (watchEntry, navObserver) => {
    if(!watchEntry[0].isIntersecting) {
        nav.classList.add('active');
    } else {
        nav.classList.remove('active');
    }
    console.log(watchEntry[0].isIntersecting);
}

const navObserverOptions = {
    threshold: .09
}

const navObserver = new IntersectionObserver(navObserverCallback, navObserverOptions);

navObserver.observe(header);

document.querySelectorAll('.image img').forEach(img => {
    img.addEventListener('click', function() {
        const imageUrl = img.src;
        document.getElementById('popup-image').src = imageUrl;
        document.getElementById('popup-container').style.display = 'block';
    });
});

function closePopup() {
    document.getElementById('popup-container').style.display = 'none';
}

function openPopup2(){
    document.getElementById('upload-page').style.display = 'flex'
}

function closePopup2() {
    document.getElementById('upload-page').style.display = 'none';
}