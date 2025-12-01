function switchMode(mode) {
  document.querySelectorAll('.tabs button').forEach(btn => btn.classList.remove('active'));
  if (mode === 'frontend') document.querySelectorAll('.tabs button')[0].classList.add('active');
  else document.querySelectorAll('.tabs button')[1].classList.add('active');
  loadPanels(mode);
}

function loadPanels(mode) {
  if (mode === 'frontend') {
    document.getElementById('panels').innerHTML = `
      <div class='code-box'> <div class='code-title'>HTML</div> <textarea id='html-code'></textarea> </div>
      <div class='code-box'> <div class='code-title'>CSS</div> <textarea id='css-code'></textarea> </div>
      <div class='code-box'> <div class='code-title'>JavaScript</div> <textarea id='js-code'></textarea> </div>
      <iframe id='output'></iframe>
    `;
  } 
}

loadPanels('frontend');

function runCode() {
  if (document.querySelector('.tabs button.active').innerText.includes('Frontend')) {
    const html = document.getElementById('html-code').value;
    const css = `<style>${document.getElementById('css-code').value}</style>`;
    const js = `<script>${document.getElementById('js-code').value}<\/script>`;
    const final = html + css + js;
    const out = document.getElementById('output');
    out.contentDocument.open();
    out.contentDocument.write(final);
    out.contentDocument.close();
  } else {
    document.getElementById('console-output').innerText = '⚠ Backend compiler will be added in next version.';
  }
}

function clearAll() {
  document.querySelectorAll('textarea').forEach(t => t.value = "");
  if (document.getElementById('console-output')) document.getElementById('console-output').innerText = '';
}

function downloadProject() {
  const html = document.getElementById('html-code')?.value || '';
  const css = document.getElementById('css-code')?.value || '';
  const js = document.getElementById('js-code')?.value || '';
  const zipContent = `HTML:\n${html}\n\nCSS:\n${css}\n\nJS:\n${js}`;
  const blob = new Blob([zipContent], { type:'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'project.txt';
  link.click();
}
