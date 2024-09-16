var navLinks = document.getElementById("navLinks");
function showmenu(){
    navLinks.style.right = "0px";
}
function hidemenu(){
    navLinks.style.right = "-700px";
}

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
