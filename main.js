let input = document.querySelector(".inputBx input"),
    btn = document.querySelector(".inputBx .icon");
let icon = document.querySelector(".inputBx .icon i");

var isBrowserSuported = true;

let SpeechRecognition  = window.SpeechRecognition || window.webkitSpeechRecognition;
if(SpeechRecognition){
    const recognition = new SpeechRecognition();
    btn.addEventListener("click" , ()=>{
        if(icon.classList.contains('fa-microphone')){
            recognition.lang = "ar";
            recognition.start();
        }
        else{
            recognition.stop();
        }
    })

    recognition.addEventListener("result", (event)=>{
        let transcript = event.results[0][0].transcript;
        input.value = transcript;
    })

}
else{
    input.value = "your browser not supported, please change it";
    isBrowserSuported =false;
}

document.querySelector('button').addEventListener('click', async () => {
    // Prompt user to select any serial port.
    const port = await navigator.serial.requestPort();
    await port.open({ baudRate: 9600 });
    
    const textDecoder = new TextDecoderStream();
    const readableStreamClosed = port.readable.pipeTo(textDecoder.writable);
    const reader = textDecoder.readable.getReader();


    // Listen to data coming from the serial device.
    while (true) {
        const { value, done } = await reader.read();
        if (done) {
            // Allow the serial port to be closed later.
            reader.releaseLock();
            break;
        }
        // value is a Uint8Array.
        console.log(value);

        const textEncoder = new TextEncoderStream();
        const writableStreamClosed = textEncoder.readable.pipeTo(port.writable);
        const writer = textEncoder.writable.getWriter();

        await writer.write(input.value); 
        writer.close();
        await writableStreamClosed
    }

    
  });
  
