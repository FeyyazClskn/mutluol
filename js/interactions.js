(() => {
  const mirrorButton=document.getElementById('mirrorHotspot');
  const mirrorEffect=document.getElementById('mirrorEffect');
  const message=document.getElementById('mirrorMessage');
  let mirrorBroken=false;
  function showMessage(){message.classList.remove('show');void message.offsetWidth;message.classList.add('show')}
  function breakMirror(){
    if(mirrorBroken)return;
    mirrorBroken=true;
    showMessage();
    setTimeout(()=>{
      mirrorEffect.classList.remove('show');
      void mirrorEffect.offsetWidth;
      mirrorEffect.classList.add('show');
    },2050);
  }
  // Mouse + touch. Only click fires for normal mouse; touch gets a safe fallback.
  mirrorButton.addEventListener('click',breakMirror);
  mirrorButton.addEventListener('pointerup',e=>{if(e.pointerType==='touch')breakMirror()});
})();
