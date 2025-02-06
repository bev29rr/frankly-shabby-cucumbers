// Come on, don't spoil the fun, go watch it properly first and then come back
//
//
const textInput = document.getElementById("textInput");
function type(string, speed = 1, callback) {
    let index = 0;
    let typing = setInterval(() => {
        if (string[index] === "*") {
            textInput.innerHTML += "<br>";
        } else {
            textInput.innerHTML += string[index];
        }
        index++;
        if (index >= string.length) {
            clearInterval(typing);
            if (callback) callback();
        }
    }, speed * 100);
}

function typeMessages(messages, speed = 1) {
    if (messages.length === 0) return;

    function typeNextMessage(index) {
        if (index >= messages.length) return; // breaks recursion

        const currentMessage = messages[index];
        if (currentMessage === true) {
            textInput.innerHTML = "";
            typeNextMessage(index + 1);
        } else if (!isNaN(currentMessage)) { // detects timeout (for ints)
            setTimeout(() => {
                typeNextMessage(index + 1);
            }, currentMessage * 1000);
        } else {
            type(currentMessage, speed, () => {
                typeNextMessage(index + 1); 
            });
        }
    }

    typeNextMessage(0); // start recursion
}

function generateDataLog() {
    return new Promise((resolve, reject) => {
        let gLocation = "Unknown";
        fetch('/requestIP')
            .then(response => response.json())
            .then(data => {
                const isMobile = /Mobi|Android/i.test(navigator.userAgent);
                const platform = /Windows/.test(navigator.userAgent) ? 'Windows' :
                                 /Macintosh/.test(navigator.userAgent) ? 'Mac' :
                                 /Linux/.test(navigator.userAgent) ? 'Linux' :
                                 /Android/.test(navigator.userAgent) ? 'Android' :
                                 /iPhone|iPad|iPod/.test(navigator.userAgent) ? 'iPhone' :
                                 'Other';

                const logData = `IP: ${data?.ip || "Unknown"}*Browser Type: ${navigator.userAgent || "Unknown"}*Operating System: ${platform || "Unknown"}*Window Dimensions: x-${screen.width}, y-${screen.height}*IsMobile: ${isMobile}*Geolocation: ${gLocation}`;
                resolve(logData);
            })
            .catch(err => {
                const isMobile = /Mobi|Android/i.test(navigator.userAgent);
                const platform = /Windows/.test(navigator.userAgent) ? 'Windows' :
                                 /Macintosh/.test(navigator.userAgent) ? 'Mac' :
                                 /Linux/.test(navigator.userAgent) ? 'Linux' :
                                 /Android/.test(navigator.userAgent) ? 'Android' :
                                 /iPhone|iPad|iPod/.test(navigator.userAgent) ? 'iPhone' :
                                 'Other';

                const logData = `<g>IP: Unknown*Browser Type: ${navigator.userAgent || "Unknown"}*Operating System: ${platform || "Unknown"}*Window Dimensions: x-${screen.width}, y-${screen.height}*IsMobile: ${isMobile}*Geolocation: ${gLocation}`;
                resolve(logData);
            });
    });
}

let dataLog;
generateDataLog().then(dataLog => {
    typeMessages(
        [
            "You shouldn't have ventured this far", 
            3, true,
            "There are no Frankly Shabby Cucumbers here", 
            1, true,
            "Maybe what you're looking for lies in the sitemap?",
            1, true,
            "It's just darkness here", 
            0.5, true,
            "Pure darkness",
            0.02, ". ", 0.02, ". ", 0.02, ". ",
            0.7, true, 4,
            "Want to see something?",
            2, true,
            "I wasn't asking by the way",
            2, true, 1.5,
            dataLog
        ], 0.3
    );
})