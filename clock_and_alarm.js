export default function clockAndAlarm(buttonSelector, containerSelector) {
    // https://youtu.be/ktqSr7Lq_Hc?list=PLvq-jIkSeTUZ6QgYYO3MwG9EMqC-KoLXA&t=359
    const d = document;
    d.onclick = (e) => {
        if (e.target.matches(buttonSelector)) {
            e.target.disabled = true;

            const $btnList = d.querySelectorAll(buttonSelector);
            const $container = d.querySelector(containerSelector);
            const $alarm = document.createElement("audio");
            $alarm.src = "alarm.wav";
            let timer;


            switch (e.target.id) {
                case "start-clock":
                    $container.innerHTML = `<span id="digital-clock">00:00:00</span>`;
                    $container.innerHTML += `
                                                <span id="analog-clock">
                                                    <i class="hour-hand"></i>
                                                    <i class="minute-hand"></i>
                                                    <i class="second-hand"></i>
                                                </span>
                                            `;

                    timer = setInterval(() => {
                        getTime("digital-clock", "analog-clock");
                    }, 1000);

                    $btnList.forEach($btn => {
                        if ($btn.id === "stop-clock") {
                            $btn.disabled = false;
                        }
                        else $btn.disabled = true;
                    });
                    break;

                case "stop-clock":

                    $container.innerHTML = ``;

                    $btnList.forEach($btn => {
                        if ($btn.id === "start-clock" || $btn.id === "start-alarm") {
                            $btn.disabled = false;
                        }
                        else $btn.disabled = true;
                    });
                    break;

                case "start-alarm":
                    $container.innerHTML = `
                                            <audio style="display:none" src="alarm.wav" loop controls autoplay></audio>
                                            <img src="alarm.png">
                                            `;
                    // $container.classList.toggle("flex-center");
                    
                    
                    // timer2 = setTimeout(()=> {
                    //     $alarm.loop = true; 
                    //     $alarm.play();
                    // }, 1000);
                    // $container.appendChild()
                    $btnList.forEach($btn => {
                        if ($btn.id === "stop-alarm") {
                            $btn.disabled = false;
                        }
                        else $btn.disabled = true;
                    });
                    break;

                case "stop-alarm":
                    // console.log(timer2)
                    // clearTimeout(timer2);
                    // $alarm.pause();
                    $container.innerHTML = ``;

                    $btnList.forEach($btn => {
                        if ($btn.id === "start-alarm" || $btn.id === "start-clock") {
                            $btn.disabled = false;
                        }
                        else $btn.disabled = true;
                    });
                    break;
            }



        }
    }
}



function getTime(digitalSelector, analogSelector) {
    const date = new Date();
    const seconds = date.getSeconds();
    const minutes = date.getMinutes();
    const hours = date.getHours();
   

    const $digitalClock = document.querySelector(`#${digitalSelector}`);

    if ($digitalClock)
        $digitalClock.textContent = `${getDigits(hours, minutes, seconds)}`;

    const $analogClock = document.querySelector(`#${analogSelector}`);

    if ($analogClock) 
    {
        const secondDegrees = seconds * 6;
        const minuteDegrees = (minutes + (seconds/60)) * 6;
        const hourDegrees = (hours + ((minutes + (seconds/60)) / 60)) * 30;
       
        console.log(hourDegrees)
        
        
        

        const $hourHand = $analogClock.querySelector(".hour-hand");
        const $minuteHand = $analogClock.querySelector(".minute-hand");
        const $secondHand = $analogClock.querySelector(".second-hand");

        $hourHand.style.setProperty("--deg", `${hourDegrees}deg`);
        $minuteHand.style.setProperty("--deg", `${minuteDegrees}deg`);
        $secondHand.style.setProperty("--deg", `${secondDegrees}deg`);


    }
}

function getDigits(hours, minutes, seconds) {
    return `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}



