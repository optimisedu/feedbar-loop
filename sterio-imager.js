const audioCtx = new AudioContext({
    sampleRate: 24000,
})
const canvas = document.getElementById('imager');
const canvasCtx = canvas.getContext('2d');

const analyser = new AnalyserNode(audioCtx)
analyser.fftSize = 2048
analyser.minDecibels = -80
analyser.maxDecibels = -20
analyser.smoothingTimeConstant = 0.8;

const canvas = document.getElementById('imager')
const canvasCtx = canvas.getContext('2d')

micIn = () =>{
    return navigator.mediaDevices.getUserMedia({
    audio: true,
    video: false,
    echoCancellation: true,
    noiseSuppression: false,
    latency: 0
})
}

async function setAudioContext(audioCtx){
    const input = await getInput(micIn)
    const source = audioCtx.createMediaStreamSource(input)
    source
    .connect(analyser)
    // working on feedback loop - use a microphone
}

let stereoImager = function (audioCtx, canvasCtx){
    requestAnimationFrame(stereoImager);
    const buffer = analyser.frequencyBinCount;
    const stream = new Uint8Array(buffer);
    analyser.getByteFrequencyData(stream);

    canvasCtx.clearRect(0, 0, canvas.width, canvas.height)

    // Visualize the audio data using a circle
    const radius = canvas.width / 2;
    const angle = 2 * Math.PI / buffer;
    for (let i = 0; i < buffer; i++) {
        const y = stream[i] / 255 * radius;
        const x = radius + y * Math.cos(angle * i);
        const y = radius + y * Math.sin(angle * i);

        gradient.addColorStop(0, 'blue');
        gradient.addColorStop(1, 'red');
        // Set the fill style to the gradient
        canvasCtx.fillStyle = gradient;
        canvasCtx.fillRect(x, canvas.height - y, barWidth, y);
    }
}

setAudioContext();
stereoImager();
