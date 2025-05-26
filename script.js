// script.js

const textInput = document.getElementById('textInput');
const fileInput = document.getElementById('fileInput');
const fileDropZone = document.getElementById('fileDropZone');
const algorithmSelect = document.getElementById('algorithm');
const hashButton = document.getElementById('hashButton');
const hashOutput = document.getElementById('hashOutput');
const copyButton = document.getElementById('copyButton');
const compareInput = document.getElementById('compareInput');
const compareResult = document.getElementById('compareResult');

let currentHash = '';

function bufferToHex(buffer) {
  return [...new Uint8Array(buffer)]
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

async function computeHash(data, algorithm) {
  const encoder = new TextEncoder();
  const encoded = typeof data === 'string' ? encoder.encode(data) : data;
  const hashBuffer = await crypto.subtle.digest(algorithm, encoded);
  return bufferToHex(hashBuffer);
}

async function handleHashInput() {
  const algorithm = algorithmSelect.value;
  if (textInput.value.trim()) {
    currentHash = await computeHash(textInput.value, algorithm);
    showHash(currentHash);
  } else if (fileInput.files.length) {
    const file = fileInput.files[0];
    const arrayBuffer = await file.arrayBuffer();
    currentHash = await computeHash(arrayBuffer, algorithm);
    showHash(currentHash);
  } else {
    alert("Please enter text or upload a file.");
  }
}

function showHash(hash) {
  hashOutput.textContent = hash;
  compareHash();
}

function compareHash() {
  const input = compareInput.value.trim().toLowerCase();
  const output = currentHash.toLowerCase();
  if (!input) {
    compareResult.textContent = "—";
    compareResult.style.color = "";
  } else if (input === output) {
    compareResult.textContent = "✅ Hashes Match!";
    compareResult.style.color = "green";
  } else {
    compareResult.textContent = "❌ Hashes Do Not Match";
    compareResult.style.color = "red";
  }
}

copyButton.addEventListener('click', () => {
  if (currentHash) {
    navigator.clipboard.writeText(currentHash);
    copyButton.textContent = "✅ Copied!";
    setTimeout(() => copyButton.textContent = "📋 Copy Hash", 1500);
  }
});

hashButton.addEventListener('click', handleHashInput);
compareInput.addEventListener('input', compareHash);

// Drag & drop support
fileDropZone.addEventListener('click', () => fileInput.click());

fileDropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  fileDropZone.classList.add('dragover');
});

fileDropZone.addEventListener('dragleave', () => {
  fileDropZone.classList.remove('dragover');
});

fileDropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  fileDropZone.classList.remove('dragover');
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    fileInput.files = files;
    handleHashInput();
  }
});
