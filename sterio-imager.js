// reduced sample rate uses far less computing power. 48khz max.
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

let serioImager = function (audioCtx, canvasCtx){
    requestAnimationFrame(stereoImager);
    const buffer = analyser.frequencyBinCount;
    const stream = new Uint8Array(buffer);
    analyser.getByteFrequencyData(stream);

    canvasCtx.clearRect(0, 0, canvas.width, canvas.height)

    // Visualize the audio data using a bar graph
    const barWidth = canvas.width / buffer;
    for (let i = 0; i < buffer; i++) {
        const y = stream[i] / 255 * canvas.height / 2;
        const x = barWidth * i;

        // Create a linear gradient
        const gradient = canvasCtx.createLinearGradient(0, 0, 0, canvas.height);
        // Add two color stops
        gradient.addColorStop(0, 'blue');
        gradient.addColorStop(1, 'red');
        // Set the fill style to the gradient
        canvasCtx.fillStyle = gradient;
        canvasCtx.fillRect(x, canvas.height - y, barWidth, y);
    }
}

setAudioContext();
stereoImager();
