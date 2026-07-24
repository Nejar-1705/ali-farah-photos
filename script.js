const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxTX1LLrsGeOa_f0C1WOMVERy8L7V6LZLENF0DJpc18ATbd3QuEFGd2sJZsqNaqSb3m/exec";

document.addEventListener("DOMContentLoaded", () => {

    const uploadBtn = document.getElementById("uploadBtn");
    const photoInput = document.getElementById("photoInput");
    const status = document.getElementById("status");

    uploadBtn.onclick = () => photoInput.click();

    photoInput.onchange = async () => {

        const files = [...photoInput.files];

        if(files.length > 50){
            alert("Maximum 50 photos allowed.");
            photoInput.value="";
            return;
        }

        status.innerHTML = "Uploading... ⏳";

        for(const file of files){

            const reader = new FileReader();

            await new Promise(resolve=>{

                reader.onload = async ()=>{

                    const base64 = reader.result.split(",")[1];

                    await fetch(WEB_APP_URL,{
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

        status.innerHTML="✅ Upload Complete! Thank you ❤️";

    };

});
