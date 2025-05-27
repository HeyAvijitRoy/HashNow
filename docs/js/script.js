const textInput = document.getElementById('textInput');
const fileInput = document.getElementById('fileInput');
const fileDropZone = document.getElementById('fileDropZone');
const fileNameDisplay = document.getElementById('fileName');
const algorithmSelect = document.getElementById('algorithm');
const hashButton = document.getElementById('hashButton'); // Not used anymore
const hashOutput = document.getElementById('hashOutput');
const outputLabel = document.getElementById('outputLabel');
const copyButton = document.getElementById('copyButton');
const compareInput = document.getElementById('compareInput');
const compareResult = document.getElementById('compareResult');
const toast = document.getElementById('toast');

let currentHash = '';
let currentFile = null;

function bufferToHex(buffer) {
  return [...new Uint8Array(buffer)]
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Hash Compute
async function computeHash(data, algorithm) {
  if (algorithm === "MD5") {
    if (typeof data === 'string') {
      return SparkMD5.hash(data);
    } else {
      return SparkMD5.ArrayBuffer.hash(data);
    }
  }

  const encoder = new TextEncoder();
  const encoded = typeof data === 'string' ? encoder.encode(data) : data;
  const hashBuffer = await crypto.subtle.digest(algorithm, encoded);
  return bufferToHex(hashBuffer);
}

// Toast - Popup and display
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.remove("opacity-0");
  toast.classList.add("opacity-100");

  setTimeout(() => {
    toast.classList.remove("opacity-100");
    toast.classList.add("opacity-0");
  }, 2000);
}



// Display Hash
function showHash(hash) {
  currentHash = hash;
  const algoName = algorithmSelect.value;
  outputLabel.textContent = `🔒 Hash Output (${algoName})`;
  hashOutput.textContent = hash;
  compareHash();
}

// Display Live Elapsed Time
function startLiveTimer(liveTimerEl) {
  const start = performance.now();
  const interval = setInterval(() => {
    const elapsed = (performance.now() - start) / 1000;
    liveTimerEl.textContent = `Elapsed: ${elapsed.toFixed(1)}s`;
  }, 100);
  return { start, interval };
}

// Update Hash
async function updateHash() {
  const algorithm = algorithmSelect.value;
  const text = textInput.value;
  const file = fileInput.files[0] || currentFile;
  const elapsedEl = document.getElementById('elapsedTime');
  const overlay = document.getElementById('processingOverlay');
  const liveTimer = document.getElementById('liveTimer');

  overlay.style.display = 'none';
  // If nothing to hash
  if (!text && !file) {
    currentHash = '';
    hashOutput.textContent = "—";
    compareResult.textContent = "—";
    compareResult.style.color = "";
    fileNameDisplay.classList.add("d-none");
    outputLabel.textContent = `🔒 Hash Output (${algorithm})`;
    elapsedEl.textContent = `Time Elapsed: —`;
    return;
  }

  liveTimer.textContent = "Elapsed: 0.0s";
  elapsedEl.textContent = "Time Elapsed: —";

  const { start, interval: timerInterval } = startLiveTimer(liveTimer);

  // Show time overlay if file is more than 5mb
  if (file && file.size > 5 * 1024 * 1024) {
    overlay.style.display = 'flex';
  } else {
    overlay.style.display = 'none';
  }

  try {
    if (text) {
      currentFile = null;
      fileNameDisplay.classList.add("d-none");
      const hash = await computeHash(text, algorithm);
      clearInterval(timerInterval);
      overlay.style.display = 'none';
      showHash(hash);
      const end = performance.now();
      elapsedEl.textContent = `Time Elapsed: ${Math.round(end - start)} ms`;
      return;
    }

    if (file) {
      currentFile = file;
      fileNameText.textContent = `📄 File: ${file.name}`;
      fileNameDisplay.classList.remove("d-none");
      const buffer = await file.arrayBuffer();
      const hash = await computeHash(buffer, algorithm);
      clearInterval(timerInterval);
      overlay.style.display = 'none';
      showHash(hash);
      const end = performance.now();
      elapsedEl.textContent = `Time Elapsed: ${Math.round(end - start)} ms`;
    }
  } catch (err) {
    clearInterval(timerInterval);
    overlay.style.display = 'none';
    elapsedEl.textContent = `Time Elapsed: —`;
    console.error("Hash computation failed:", err);
  }
}

// Hash Comparison
function compareHash() {
  const input = compareInput.value.trim().toLowerCase();
  const output = currentHash?.trim().toLowerCase();

  if (!output || !input) {
    compareResult.textContent = "—";
    compareResult.style.color = "";
    return;
  }

  if (input === output) {
    compareResult.textContent = "✅ Hashes Match!";
    compareResult.style.color = "green";
    // showToast("✅ Hashes match!"); // Popup toast notification
  } else {
    compareResult.textContent = "❌ Hashes Do Not Match";
    compareResult.style.color = "red";
  }
}

// Events
algorithmSelect.addEventListener('change', updateHash);
textInput.addEventListener('input', () => {
  currentFile = null;
  fileInput.value = "";
  if (document.getElementById('fileNameText')) {
    fileNameText.textContent = "";
  }
  fileNameDisplay.classList.add("d-none");
  updateHash();
});

compareInput.addEventListener('input', compareHash);

copyButton.addEventListener('click', () => {
  if (currentHash) {
    navigator.clipboard.writeText(currentHash);
    showToast("📋 Hash copied to clipboard!");
  }
});

// Drag & Drop
fileDropZone.addEventListener('click', () => fileInput.click());

fileDropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  fileDropZone.classList.add('bg-blue-100');
});

fileDropZone.addEventListener('dragleave', () => {
  fileDropZone.classList.remove('bg-blue-100');
});

fileDropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  fileDropZone.classList.remove('bg-blue-100');
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    currentFile = files[0];
    fileNameText.textContent = `📄 File: ${currentFile.name}`;
    fileNameDisplay.classList.remove('d-none');
    textInput.value = "";
    updateHash();
  }
});

fileInput.addEventListener('change', () => {
  if (fileInput.files.length > 0) {
    currentFile = fileInput.files[0];
    fileNameText.textContent = `📄 File: ${currentFile.name}`;
    textInput.value = "";
    updateHash();
  }
});

// Attachment Clear Button
document.getElementById('clearFileBtn').addEventListener('click', () => {
  currentFile = null;
  fileInput.value = '';
  fileNameDisplay.classList.add('d-none');
  updateHash();
});

// Reset Button
document.getElementById('resetBtn').addEventListener('click', () => {
  textInput.value = '';
  fileInput.value = '';
  compareInput.value = '';
  currentFile = null;
  fileNameDisplay.classList.add('d-none');
  currentHash = '';
  hashOutput.textContent = '—';
  compareResult.textContent = '—';
  compareResult.style.color = '';
  document.getElementById('elapsedTime').textContent = 'Time Elapsed: —';
  outputLabel.textContent = `🔒 Hash Output (${algorithmSelect.value})`;
});

// Elapsed Time Calculation
let timerInterval;

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("processingOverlay").style.display = "none";
});

function hideOverlay() {
  clearInterval(timerInterval);
  overlay.style.display = 'none';
}