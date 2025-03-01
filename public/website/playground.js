// ----- Firebase Configuration & Initialization -----
const firebaseConfig = {
    apiKey: "AIzaSyA3v2ipO1Ja3HaGaol0lTABB7mvcix5Rmk",
    authDomain: "deaflingo-nivvay.firebaseapp.com",
    projectId: "deaflingo-nivvay",
    storageBucket: "deaflingo-nivvay.firebasestorage.app",
    messagingSenderId: "189847137203",
    appId: "1:189847137203:web:4f40478bf749b0228b79c6"
  };
  
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const db = firebase.firestore();
  
  // ----- Global Variables for Playground -----
  const globalWordList = ['after', 'airplane', 'alligator', 'animal', 'apple', 'arm', 'aunt', 'bad', 'balloon', 'bed', 'bedroom', 'bee', 'before', 'better', 'bird', 'black', 'blue', 'boat', 'book', 'boy', 'brother', 'brown', 'bug', 'bye', 'car', 'carrot', 'cat', 'cereal', 'cheek', 'child', 'chin', 'chocolate', 'closet', 'cow', 'cute', 'dad', 'dirty', 'dog', 'donkey', 'drawer', 'dryer', 'duck', 'ear', 'elephant', 'eye', 'face', 'fast', 'feet', 'fine', 'finger', 'fish', 'flower', 'food', 'frenchfries', 'frog', 'giraffe', 'girl', 'glasswindow', 'goose', 'grandma', 'grandpa', 'grass', 'gum', 'hair', 'happy', 'hat', 'head', 'helicopter', 'hello', 'hen', 'home', 'horse', 'hot', 'icecream', 'jacket', 'jeans', 'kitty', 'lamp', 'later', 'lion', 'lips', 'mad', 'man', 'milk', 'mitten', 'mom', 'moon', 'morning', 'mouse', 'mouth', 'napkin', 'night', 'noisy', 'nose', 'now', 'nuts', 'old', 'outside', 'owl', 'pajamas', 'pen', 'pencil', 'penny', 'person', 'pig', 'pizza', 'please', 'pool', 'potty', 'pretty', 'puppy', 'radio', 'rain', 'red', 'refrigerator', 'room', 'scissors', 'shirt', 'shoe', 'shower', 'snack', 'snow', 'sticky', 'sun', 'table', 'thankyou', 'tiger', 'time', 'tomorrow', 'tongue', 'tooth', 'toothbrush', 'tree', 'uncle', 'underwear', 'vacuum', 'weus', 'white', 'wolf', 'yellow', 'yesterday', 'yucky', 'zebra', 'zipper'];
  // (globalWordList is in alphabetical order)
  
  let wordList = []; // randomized list for current test
  let currentIdx = 0;
  let idxWord = "";
  let model = null;
  let timerInterval = null;
  let countdownTime = 60; // seconds
  
  // ----- Video, Canvas, and UI Elements -----
  const video4 = document.createElement('video');
  const out4 = document.getElementsByClassName('output4')[0];
  const wordCounter = document.querySelector('.word-counter');
  const actionDisplay = document.querySelector('.waiting-text');
  const controlsElement4 = document.getElementsByClassName('control-box')[0];
  const canvasCtx4 = out4.getContext('2d');
  
  // Set video dimensions for mobile screens.
  video4.width = window.innerWidth;
  video4.height = window.innerHeight;
  
  // ----- Countdown Timer Functions -----
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return (mins < 10 ? "0" + mins : mins) + ":" + (secs < 10 ? "0" + secs : secs);
  }
  
  function startCountdown() {
    let timeLeft = countdownTime;
    document.getElementById("timer").innerText = formatTime(timeLeft);
    timerInterval = setInterval(() => {
      timeLeft--;
      if (timeLeft <= 0) {
        document.getElementById("timer").innerText = "00:00";
        clearInterval(timerInterval);
        completeTest();
      } else {
        document.getElementById("timer").innerText = formatTime(timeLeft);
      }
    }, 1000);
  }
  
  function stopCountdown() {
    clearInterval(timerInterval);
  }
  
  // ----- Shuffle Function -----
  function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
  
  // ----- Populate Visible Word Container -----
  // Only displays a block (window) of 20 words at a time.
  function updateWordContainerWindow() {
    const blockStart = Math.floor(currentIdx / 20) * 20;
    const visibleWords = wordList.slice(blockStart, blockStart + 20);
    const container = document.getElementById("word-container");
    container.innerHTML = "";
    visibleWords.forEach((word, idx) => {
      const wordSpan = document.createElement("span");
      wordSpan.className = "word";
      wordSpan.id = `word-${blockStart + idx}`;
      wordSpan.innerText = word;
      // Highlight the current word relative to this window.
      if (blockStart + idx === currentIdx) {
        wordSpan.classList.add("primary");
      }
      container.appendChild(wordSpan);
    });
  }
  
  // ----- UI Update Functions -----
  function updateCurrentWord(word) {
    idxWord = word;
    const wordElement = document.getElementById("current-sign");
    if (wordElement) {
      wordElement.innerText = word;
    }
    updateWordContainerWindow();
  }
  
  function restartTest() {
    currentIdx = 0;
    // Randomize the word list for this test
    wordList = shuffle([...globalWordList]);
    updateWordContainerWindow();
    updateCurrentWord(wordList[currentIdx]);
    document.getElementById("word-counter").innerText = `0/${wordList.length}`;
    actionDisplay.innerText = "";
    document.getElementById("result-modal").style.display = "none";
    startCountdown();
  }
  
  // ----- Backend: Update Progress Functions -----
  function incrementSignsCompleted(userId) {
    if (!userId) {
      console.error("No userId provided for incrementing signs.");
      return;
    }
    const userRef = db.collection('users').doc(userId);
    userRef.set({
      signs_completed: firebase.firestore.FieldValue.increment(1)
    }, { merge: true })
    .then(() => {
      console.log("Signs completed incremented for user " + userId);
    })
    .catch((error) => {
      console.error("Error incrementing signs completed: ", error);
    });
  }
  
  // ----- Confetti Animation -----
  function showConfetti() {
    if (typeof confetti === "function") {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }
  
  // ----- Test Completion Logic -----
  function completeTest() {
    updateCurrentWord("Test Complete!");
    stopCountdown();
    // Calculate signs per minute based on words completed during 60 seconds.
    const spm = currentIdx; // since test duration is 1 minute
    actionDisplay.innerText = "Congratulations! Test complete.";
    showConfetti();
    const resultModal = document.getElementById("result-modal");
    document.getElementById("result-stats").innerText = `You signed ${currentIdx} words | SPM: ${spm}`;
    resultModal.style.display = "flex";
  }
  
  // ----- Proceed to Next Word -----
  function nextWord() {
    if (currentIdx < wordList.length - 1) {
      currentIdx++;
      updateCurrentWord(wordList[currentIdx]);
      document.getElementById("word-counter").innerText = `${currentIdx}/${wordList.length}`;
      // incrementSignsCompleted(userId); // Uncomment and pass a valid userId if needed.
    } else {
      completeTest();
    }
  }
  
  // ----- Recognition Model Loading -----
  async function loadRecognitionModel() {
    try {
      model = await tf.loadLayersModel('/playground_model/model.json');
      console.log('TFJS playground model loaded.');
      model.summary();
    } catch (error) {
      console.error('Error loading playground model:', error);
    }
  }
  
  // ----- Recognition Processing -----
  const sequenceLengthRecognition = 50;
  const landmarksBufferRecognition = [];
  
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
      // Use globalWordList (alphabetical order) for label matching.
      const recognizedWord = globalWordList[predictedIndex];
      console.log(`Recognized word: ${recognizedWord}`);
      const currentGestureElement = document.getElementById('current-gesture');
      if (currentGestureElement) {
        currentGestureElement.innerText = recognizedWord;
      }
      inputTensor.dispose();
      prediction.dispose();
  
      if (recognizedWord === idxWord) {
        nextWord();
      }
    }
  }
  
  // ----- Start Recognition -----
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
  
  // ----- Modal for Showing Sign Video -----
  function showSignModal() {
    let signName = idxWord;
    if (!signName || signName === "Test Complete!") {
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
      videoElem.style.maxWidth = "90%";
      videoElem.style.maxHeight = "90%";
      videoElem.controls = true;
      videoElem.setAttribute("playsinline", "");
      modal.appendChild(videoElem);
    }
  
    videoElem.src = `assets/videos/${signName}.mp4`;
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
  
  // ----- DOMContentLoaded Listeners -----
  document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start-button");
    startButton.addEventListener("click", () => {
      document.getElementById("pre-test-controls").style.display = "none";
      document.getElementById("active-test-controls").style.display = "block";
      wordList = shuffle([...globalWordList]);
      currentIdx = 0;
      updateWordContainerWindow();
      updateCurrentWord(wordList[currentIdx]);
      document.getElementById("word-counter").innerText = `0/${wordList.length}`;
      startCountdown();
      startRecognition();
    });
  
    const skipButton = document.getElementById("skip-current");
    if (skipButton) {
      skipButton.addEventListener("click", nextWord);
    }
  
    const viewSignButton = document.getElementById("view-current");
    if (viewSignButton) {
      viewSignButton.addEventListener("click", showSignModal);
    }
  
    const restartButton = document.getElementById("restart-button");
    if (restartButton) {
      restartButton.addEventListener("click", () => {
        document.getElementById("active-test-controls").style.display = "block";
        restartTest();
      });
    }
  
    const modalRestart = document.getElementById("modal-restart");
    if (modalRestart) {
      modalRestart.addEventListener("click", () => {
        document.getElementById("result-modal").style.display = "none";
        restartTest();
      });
    }
  });
  
  // Ensure the WASM backend is set before starting recognition.
  tf.setBackend('wasm').then(() => {
    console.log("WASM backend set for recognition.");
  });
  