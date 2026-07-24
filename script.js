document.addEventListener("DOMContentLoaded", () => {

    const uploadBtn = document.getElementById("uploadBtn");
    const photoInput = document.getElementById("photoInput");
    const status = document.getElementById("status");

    uploadBtn.addEventListener("click", () => {
        photoInput.click();
    });

    photoInput.addEventListener("change", () => {

        const count = photoInput.files.length;

        if (count === 0) {
            status.innerHTML = "No photos selected yet.";
            return;
        }

        if (count > 50) {
            alert("Maximum 50 photos allowed ❤️");
            photoInput.value = "";
            status.innerHTML = "No photos selected yet.";
            return;
        }

        status.innerHTML = `✅ ${count} photo(s) selected`;

    });

});
