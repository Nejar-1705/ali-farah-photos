const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxTX1LLrsGeOa_f0C1WOMVERy8L7V6LZLENF0DJpc18ATbd3QuEFGd2sJZsqNaqSb3m/exec";

document.addEventListener("DOMContentLoaded", () => {

    const intro = document.getElementById("intro");
    const card = document.querySelector(".card");

    const uploadBtn = document.getElementById("uploadBtn");
    const photoInput = document.getElementById("photoInput");
    const status = document.getElementById("status");

    // =========================
    // Opening Animation
    // =========================

    setTimeout(() => {
        intro.classList.add("hide");
        card.classList.add("show");
    }, 2000);


    // =========================
    // Countdown
    // =========================

    const targetDate = new Date("2026-08-09T18:00:00");

    const countdown = document.getElementById("countdown");

    function updateCountdown() {

        const now = new Date();
        const diff = targetDate - now;

        if (diff <= 0) {

            countdown.style.display = "none";
            uploadBtn.style.display = "flex";

            return;

        }

        uploadBtn.style.display = "none";

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        document.getElementById("days").textContent = days;
        document.getElementById("hours").textContent = hours;
        document.getElementById("minutes").textContent = minutes;
        document.getElementById("seconds").textContent = seconds;

    }

    updateCountdown();
    setInterval(updateCountdown, 1000);


    // =========================
    // Upload Button
    // =========================

    uploadBtn.onclick = () => {
        photoInput.click();
    };


    // =========================
    // Upload Photos
    // =========================

    photoInput.onchange = async () => {

        const files = [...photoInput.files];


        if(files.length === 0){
            status.textContent = "No photos selected.";
            return;
        }


        if(files.length > 50){

            alert("Maximum 50 photos allowed ❤️");
            photoInput.value="";
            return;

        }


        status.innerHTML = "Uploading... ⏳";


        for(const file of files){

            const reader = new FileReader();


            await new Promise(resolve => {

                reader.onload = async () => {

                    const base64 = reader.result.split(",")[1];


                    await fetch(WEB_APP_URL, {

                        method:"POST",

                        headers:{
                            "Content-Type":"text/plain;charset=utf-8"
                        },

                        body:JSON.stringify({

                            name:file.name,
                            type:file.type,
                            file:base64

                        })

                    });


                    resolve();

                };


                reader.readAsDataURL(file);

            });


        }


        status.innerHTML = "✅ Upload Complete! Thank you ❤️";


    };


});
