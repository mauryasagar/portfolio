/* Restore saved light/dark theme before first paint */
try{if(localStorage.getItem("theme")==="dark")document.documentElement.dataset.mode="dark"}catch(e){}