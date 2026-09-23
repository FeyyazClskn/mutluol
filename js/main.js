window.APP_CONFIG = { debug:false, roomWidth:1672, roomHeight:941 };

document.addEventListener('DOMContentLoaded',()=>{
  if(window.APP_CONFIG.debug) document.body.classList.add('debug');
  const room=document.getElementById('roomImage');
  room.addEventListener('dragstart',e=>e.preventDefault());
});
