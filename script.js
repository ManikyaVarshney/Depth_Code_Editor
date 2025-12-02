// THEME TOGGLE + SAVE
const themeToggle = document.getElementById("themeToggle");

let savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
    let newTheme = document.body.classList.contains("theme-light") ? "dark" : "light";
    applyTheme(newTheme);
    localStorage.setItem("theme", newTheme);
});

function applyTheme(mode) {
    if (mode === "dark") {
        document.body.classList.remove("theme-light");
        document.body.classList.add("theme-dark");
        themeToggle.textContent = "☀️";
    } else {
        document.body.classList.remove("theme-dark");
        document.body.classList.add("theme-light");
        themeToggle.textContent = "🌙";
    }
}

// FULLSCREEN
document.getElementById("fullscreenBtn").onclick = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
};

// Initialize CodeMirror
const editors = {
    html: CodeMirror.fromTextArea(document.getElementById("htmlCode"), {
        mode: "xml",
        theme: "dracula",
        lineNumbers: true
    }),
    css: CodeMirror.fromTextArea(document.getElementById("cssCode"), {
        mode: "css",
        theme: "dracula",
        lineNumbers: true
    }),
    js: CodeMirror.fromTextArea(document.getElementById("jsCode"), {
        mode: "javascript",
        theme: "dracula",
        lineNumbers: true
    })
};

// Auto-run on change
Object.values(editors).forEach(ed => {
    ed.on("change", () => {
        if (document.getElementById("autoRun").checked) runCode();
        saveToLocal();
    });
});

// RUN CODE
function runCode() {
    const output = document.getElementById("output").contentWindow.document;

    output.open();
    output.write(`
        <style>${editors.css.getValue()}</style>
        ${editors.html.getValue()}
        <script>${editors.js.getValue()}<\/script>
    `);
    output.close();
}

// LOCAL STORAGE SAVE
function saveToLocal() {
    localStorage.setItem("depth_html", editors.html.getValue());
    localStorage.setItem("depth_css", editors.css.getValue());
    localStorage.setItem("depth_js", editors.js.getValue());
}

// LOAD SAVED DATA
window.onload = () => {
    editors.html.setValue(localStorage.getItem("depth_html") || "");
    editors.css.setValue(localStorage.getItem("depth_css") || "");
    editors.js.setValue(localStorage.getItem("depth_js") || "");
    runCode();
};

// DOWNLOAD ZIP (simple version)
document.getElementById("downloadBtn").onclick = () => {
    const zipData =
`index.html:\n${editors.html.getValue()}

style.css:\n${editors.css.getValue()}

script.js:\n${editors.js.getValue()}`;

    const blob = new Blob([zipData], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "depth-code-editor.zip";
    link.click();
};

// Template Loader
function loadTemplate(type) {
    if (type === "navbar") {
        editors.html.setValue(`<nav><h1>My Navbar</h1></nav>`);
        editors.css.setValue(`nav { padding:15px; background:#222; color:white; }`);
    }
    if (type === "login") {
        editors.html.setValue(`<form><h2>Login</h2><input placeholder="Email"></form>`);
        editors.css.setValue(`form { width:300px; margin:50px auto; }`);
    }
    if (type === "portfolio") {
        editors.html.setValue(`<h1>My Portfolio</h1>`);
        editors.css.setValue(`body { font-family:sans-serif; text-align:center; }`);
    }
    runCode();
}


// ---------------- THEME TOGGLE ----------------
const themeBtn = document.getElementById("themeToggle");

// Load saved theme
if (localStorage.getItem("depth_theme") === "dark") {
    document.documentElement.classList.add("dark");
    themeBtn.textContent = "☀";
}

// Toggle theme
themeBtn.onclick = () => {
    document.documentElement.classList.toggle("dark");

    if (document.documentElement.classList.contains("dark")) {
        localStorage.setItem("depth_theme", "dark");
        themeBtn.textContent = "☀";
    } else {
        localStorage.setItem("depth_theme", "light");
        themeBtn.textContent = "🌙";
    }
};
