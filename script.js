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


function showToast(message) {
  toast.textContent = message;
  toast.classList.remove("opacity-0");
  toast.classList.add("opacity-100");
  setTimeout(() => toast.classList.add("opacity-0"), 2000);
}

function showHash(hash) {
  currentHash = hash;
  const algoName = algorithmSelect.value;
  outputLabel.textContent = `🔒 Hash Output (${algoName})`;
  hashOutput.textContent = hash;
  compareHash();
}

async function updateHash() {
  const algorithm = algorithmSelect.value;
  if (textInput.value.trim()) {
    const hash = await computeHash(textInput.value, algorithm);
    showHash(hash);
  } else if (currentFile) {
    const buffer = await currentFile.arrayBuffer();
    const hash = await computeHash(buffer, algorithm);
    showHash(hash);
  } else {
    hashOutput.textContent = "—";
    currentHash = '';
  }
}

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
    showToast("✅ Hashes match!");
  } else {
    compareResult.textContent = "❌ Hashes Do Not Match";
    compareResult.style.color = "red";
  }
}


// Events
algorithmSelect.addEventListener('change', updateHash);
textInput.addEventListener('input', () => {
  currentFile = null;
  fileNameDisplay.textContent = "";
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
    fileNameDisplay.textContent = `📄 File: ${currentFile.name}`;
    textInput.value = "";
    updateHash();
  }
});

fileInput.addEventListener('change', () => {
  if (fileInput.files.length > 0) {
    currentFile = fileInput.files[0];
    fileNameDisplay.textContent = `📄 File: ${currentFile.name}`;
    textInput.value = "";
    updateHash();
  }
});
