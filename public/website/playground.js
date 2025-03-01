// ----- Lesson 1 Only Configuration -----
const lessonParams = {
    lessonId: "lesson1",
    idx: 0
  };
  
  // ----- Video, Canvas, and UI Elements -----
  const video4 = document.createElement('video');
  const out4 = document.getElementsByClassName('output4')[0];
  const wordCounter = document.getElementById("word-counter");
  const actionDisplay = document.querySelector('.waiting-text');
  const controlsElement4 = document.getElementsByClassName('control4')[0];
  const canvasCtx4 = out4.getContext('2d');
  
  // Set video dimensions for a phone screen.
  video4.width = window.innerWidth * .2;
  video4.height = window.innerHeight * .2;
  
  let currentIdx = lessonParams.idx;
  let wordList = getActionsForLesson(lessonParams.lessonId);
  let idxWord = "";
  const totalWords = wordList.length;
  
  // ----- Set Actions for Lesson 1 -----
  function getActionsForLesson(lessonId) {
    if (lessonId === "lesson1") {
      return ["bye", "hello", "please", "thankyou"];
    }
    return [];
  }
  
  let actions = getActionsForLesson(lessonParams.lessonId);
  
  // ----- UI Update Functions -----
  function updateCurrentWord(word) {
    idxWord = word;
    // Update the word to sign.
    const wordElement = document.getElementById("current-sign");
    if (wordElement) {
      wordElement.innerText = word;
    }
    // Update the progress counter (displayed as x/4).
    if (wordCounter) {
      // If lesson is complete, show totalWords/totalWords.
      if (word === "Lesson Complete!") {
        wordCounter.innerText = `${totalWords}/${totalWords}`;
      } else {
        wordCounter.innerText = `${currentIdx}/${totalWords}`;
      }
    }
    // Show restart button if lesson complete.
    const restartButton = document.getElementById("restart-button");
    if (word === "Lesson Complete!" && restartButton) {
      restartButton.style.display = "block";
    }
  }
  
  function restartLesson() {
    currentIdx = 0;
    if (wordList.length > 0) {
      updateCurrentWord(wordList[currentIdx]);
      updateProgressBar(currentIdx, totalWords);
    }
    const restartButton = document.getElementById("restart-button");
    if (restartButton) {
      restartButton.style.display = "none";
    }
  }
  
  // ----- Lesson Completion Logic -----
  async function completeLesson() {
    updateCurrentWord("Lesson Complete!");
    updateProgressBar(totalWords, totalWords);
    showConfetti();
    actionDisplay.innerText = "Congratulations! Lesson complete.";
    const skipButton = document.getElementById("skip-button");
    if (skipButton) {
      skipButton.disabled = true;
    }
  }
  
  async function nextWord() {
    if (currentIdx < wordList.length - 1) {
      currentIdx++;
      updateCurrentWord(wordList[currentIdx]);
      updateProgressBar(currentIdx, totalWords);
    } else {
      await completeLesson();
    }
  }
  
  // ----- Progress Bar Update -----
  function updateProgressBar(current, total) {
    const progressBar = document.querySelector(".progress-bar");
    if (!progressBar) return;
    const progressPercentage = ((current) / total) * 100;
    progressBar.style.width = `${progressPercentage}%`;
  }
  
  // ----- Confetti Animation -----
  function showConfetti() {
    if (typeof confetti === "function") {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    } else {
      console.log("Confetti triggered (placeholder).");
    }
  }
  
  // ----- DOMContentLoaded Listeners -----
  document.addEventListener("DOMContentLoaded", () => {
    // Initialize display with the first word.
    if (wordList.length > 0) {
      updateCurrentWord(wordList[currentIdx]);
      updateProgressBar(currentIdx, totalWords);
    }
    const skipButton = document.getElementById("skip-button");
    const restartButton = document.getElementById("restart-button");
    if (skipButton) {
      skipButton.addEventListener("click", nextWord);
    }
    if (restartButton) {
      restartButton.addEventListener("click", restartLesson);
    }
  });
  
  document.addEventListener("DOMContentLoaded", () => {
    const showSignButton = document.getElementById("show-sign-button");
    if (showSignButton) {
      showSignButton.addEventListener("click", showSignModal);
    }
  });
  
  function showSignModal() {
    let signName = idxWord;
    if (!signName || signName === "Lesson Complete!") {
      console.warn("No valid sign to display.");
      return;
    }
    
    let modal = document.getElementById("signModal");
    if (!modal) {
      modal = document.createElement("div");
      modal.id = "signModal";
      modal.style.position = "fixed";
      modal.style.top = "0";
      modal.style.left = "0";
      modal.style.width = "100%";
      modal.style.height = "100%";
      modal.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
      modal.style.display = "flex";
      modal.style.justifyContent = "center";
      modal.style.alignItems = "center";
      modal.style.zIndex = "2000";
      document.body.appendChild(modal);
    }
    
    let videoElem = document.getElementById("modalVideo");
    if (!videoElem) {
      videoElem = document.createElement("video");
      videoElem.id = "modalVideo";
      // Adjusted size to be large but not too big.
      videoElem.style.width = "50vw";
      videoElem.style.height = "auto";
      videoElem.controls = true;
      videoElem.setAttribute("playsinline", "");
      modal.appendChild(videoElem);
    }
    
    videoElem.src = `/videos/${signName}.mp4`;
    videoElem.load();
    videoElem.play().catch((error) => {
      console.error("Error playing video:", error);
    });
    
    modal.style.display = "flex";
    
    setTimeout(() => {
      videoElem.pause();
      videoElem.currentTime = 0;
      modal.style.display = "none";
    }, 3000);
  }
  
  
  // ----- Recognition Logic (WASM-Based Integration) -----
  const sequenceLengthRecognition = 50;
  const landmarksBufferRecognition = [];
  let model = null;
  
  function getModelPath(lessonId) {
    if (lessonId === "lesson1") {
      return '/lesson1_model/model.json';
    }
    return '/lesson1_model/model.json';
  }
  
  async function loadRecognitionModel() {
    try {
      const modelPath = getModelPath(lessonParams.lessonId);
      model = await tf.loadLayersModel(modelPath);
      console.log('TFJS recognition model loaded.');
      model.summary();
    } catch (error) {
      console.error('Error loading recognition model:', error);
    }
  }
  
  function processLandmarksRecognition(results) {
    const out = new Array(126).fill(0);
    if (results.multiHandLandmarks) {
      for (let i = 0; i < Math.min(results.multiHandLandmarks.length, 2); i++) {
        const hand = results.multiHandLandmarks[i];
        for (let j = 0; j < hand.length; j++) {
          out[i * 63 + j] = hand[j].x;
          out[i * 63 + 21 + j] = hand[j].y;
          out[i * 63 + 42 + j] = hand[j].z;
        }
      }
    }
    return out;
  }
  
  function onResultsRecognition(results) {
    canvasCtx4.save();
    canvasCtx4.clearRect(0, 0, out4.width, out4.height);
    canvasCtx4.drawImage(results.image, 0, 0, out4.width, out4.height);
    if (results.multiHandLandmarks) {
      for (const landmarks of results.multiHandLandmarks) {
        window.drawConnectors(canvasCtx4, landmarks, window.HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 2 });
        window.drawLandmarks(canvasCtx4, landmarks, { color: '#FF0000', lineWidth: 1 });
      }
    }
    canvasCtx4.restore();
  
    const landmarksFlat = processLandmarksRecognition(results);
    if (landmarksBufferRecognition.length >= sequenceLengthRecognition) {
      landmarksBufferRecognition.shift();
    }
    landmarksBufferRecognition.push(landmarksFlat);
  
    if (landmarksBufferRecognition.length === sequenceLengthRecognition && model) {
      const inputTensor = tf.tensor(landmarksBufferRecognition).expandDims(0);
      const prediction = model.predict(inputTensor);
      const predictedIndex = prediction.argMax(-1).dataSync()[0];
      document.getElementById('current-gesture').innerText = wordList[predictedIndex];
      inputTensor.dispose();
      prediction.dispose();
      
      // Move to next word if the recognized sign matches the expected word.
      if (wordList[predictedIndex] === idxWord) {
        nextWord();
      }
    }
  }
  
  async function startRecognition() {
    await loadRecognitionModel();
    
    let videoElement = video4;
    if (!videoElement) {
      videoElement = document.createElement('video');
      videoElement.id = 'video';
      videoElement.style.display = 'none';
      document.body.appendChild(videoElement);
      console.log("Created hidden video element for recognition.");
    }
    
    const handsRecognition = new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
    });
    handsRecognition.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });
    handsRecognition.onResults(onResultsRecognition);
  
    const recognitionCamera = new Camera(videoElement, {
      onFrame: async () => {
        await handsRecognition.send({ image: videoElement });
      },
      width: 480,
      height: 480
    });
    console.log("Starting recognition camera...");
    recognitionCamera.start();
  }
  
  tf.setBackend('wasm').then(() => {
    console.log("WASM backend set for recognition.");
    startRecognition();
  });
  