(() => {
  // Demo-only client-side gate. Not suitable for protecting production admin access.
  const USER = "malzx";
  const PASS = "malzz098";
  const defaultHTML = `<div class="eyebrow">PERSONAL WEBSPACE</div>
<h1>Build something<br><span>remarkable.</span></h1>
<p>Ini halaman utama website kamu. Masuk ke panel admin untuk mengganti konten HTML halaman ini.</p>
<a class="button" href="/admin.html">Buka Admin Panel</a>`;
  const loginCard = document.getElementById("login-card");
  const editorCard = document.getElementById("editor-card");
  const form = document.getElementById("login-form");
  const editor = document.getElementById("html-editor");
  const status = document.getElementById("status");
  const frame = document.getElementById("preview-frame");
  const isLoggedIn = () => sessionStorage.getItem("malzx_admin_session") === "active";
  function showEditor() {
    loginCard.hidden = true; editorCard.hidden = false;
    editor.value = localStorage.getItem("malzx_home_html") || defaultHTML;
    renderPreview();
  }
  function renderPreview() {
    frame.srcdoc = `<!doctype html><html><head><meta charset="utf-8"><style>body{font:15px/1.6 system-ui;padding:24px;color:#202633}h1{font-size:36px;line-height:1.1}span{color:#71839f}.eyebrow{font-size:10px;letter-spacing:2px;color:#71839f}.button{display:inline-block;padding:10px 15px;background:#202633;color:white;border-radius:7px;text-decoration:none}</style></head><body>${editor.value}</body></html>`;
  }
  form.addEventListener("submit", e => {
    e.preventDefault();
    const u = document.getElementById("username").value;
    const p = document.getElementById("password").value;
    if (u === USER && p === PASS) {
      sessionStorage.setItem("malzx_admin_session", "active");
      document.getElementById("login-error").textContent = "";
      showEditor();
    } else document.getElementById("login-error").textContent = "Username atau password salah.";
  });
  document.getElementById("logout").addEventListener("click", () => {
    sessionStorage.removeItem("malzx_admin_session"); editorCard.hidden = true; loginCard.hidden = false;
    document.getElementById("password").value = "";
  });
  document.getElementById("preview").addEventListener("click", () => { renderPreview(); status.textContent = "Preview diperbarui."; });
  document.getElementById("save").addEventListener("click", () => {
    localStorage.setItem("malzx_home_html", editor.value);
    status.textContent = "Tersimpan di browser ini. Buka halaman utama untuk melihat perubahan.";
  });
  document.getElementById("reset").addEventListener("click", () => {
    if (confirm("Kembalikan konten halaman utama ke bawaan?")) {
      editor.value = defaultHTML; localStorage.removeItem("malzx_home_html"); renderPreview();
      status.textContent = "Konten dikembalikan ke bawaan.";
    }
  });
  if (isLoggedIn()) showEditor();
})();