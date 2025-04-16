
let recording = false;
let events = [];
let startTime = 0;

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const exportBtn = document.getElementById("exportBtn");
const logList = document.getElementById("logList");

startBtn.onclick = () => {
  events = [];
  recording = true;
  startTime = Date.now();
  logList.innerHTML = '';
  startBtn.disabled = true;
  stopBtn.disabled = false;
  exportBtn.disabled = true;
  console.log("開始錄製");
};

stopBtn.onclick = () => {
  recording = false;
  stopBtn.disabled = true;
  exportBtn.disabled = false;
  console.log("停止錄製");
};

exportBtn.onclick = () => {
  const blob = new Blob([JSON.stringify(events, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "recording.json";
  a.click();
  URL.revokeObjectURL(url);
};

document.addEventListener("click", (e) => {
  if (!recording || e.target.tagName === "BUTTON") return;
  const log = {
    type: "click",
    target: e.target.tagName,
    time: Date.now() - startTime
  };
  events.push(log);
  const li = document.createElement("li");
  li.textContent = `點擊：${log.target}`;
  logList.appendChild(li);
});

document.addEventListener("input", (e) => {
  if (!recording) return;
  const log = {
    type: "input",
    value: e.target.value,
    time: Date.now() - startTime
  };
  events.push(log);
  const li = document.createElement("li");
  li.textContent = `輸入：${log.value}`;
  logList.appendChild(li);
});

document.addEventListener("keydown", (e) => {
  if (!recording) return;
  const log = {
    type: "keydown",
    key: e.key,
    time: Date.now() - startTime
  };
  events.push(log);
  const li = document.createElement("li");
  li.textContent = `按鍵：${log.key}`;
  logList.appendChild(li);
});
