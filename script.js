document.addEventListener("DOMContentLoaded", () => {

    const uploadBtn = document.getElementById("uploadBtn");
    const photoInput = document.getElementById("photoInput");

    uploadBtn.addEventListener("click", () => {
        photoInput.click();
    });

    photoInput.addEventListener("change", () => {

        const count = photoInput.files.length;

        if(count > 50){
            alert("Maximum 50 photos ❤️");
            photoInput.value = "";
            return;
        }

        alert(`${count} photo(s) selected 📸`);

    });

});
