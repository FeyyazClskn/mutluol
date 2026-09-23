(() => {
  const KEY='interactive-room-user-notes-v2';
  const defaultNotes=['Kendini hırpalama, üzme!','Feyyaz her zaman yanında.','Her şey gönlünce olsun.','Aynaya da tıkla :)'];
  const modal=document.getElementById('notebookModal'),openButton=document.getElementById('notebookHotspot'),closeButton=document.getElementById('closeNotebook'),form=document.getElementById('addNoteForm'),input=document.getElementById('newNote'),list=document.getElementById('notesList'),counter=document.getElementById('noteCounter');
  const read=()=>{try{const v=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(v)?v.filter(x=>typeof x==='string'):[]}catch{return[]}};
  const write=v=>localStorage.setItem(KEY,JSON.stringify(v));
  const esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  function render(){const u=read();const rows=[...defaultNotes.map(text=>({text,remove:false})),...u.map((text,index)=>({text,remove:true,index}))];list.innerHTML=rows.map(r=>`<div class="note-item"><div class="note-text">• ${esc(r.text)}</div>${r.remove?`<button class="note-delete" type="button" data-index="${r.index}" aria-label="Notu sil">×</button>`:''}</div>`).join('')}
  function open(){render();modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';setTimeout(()=>input.focus(),100)}
  function close(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';openButton.focus({preventScroll:true})}
  function count(){counter.textContent=`${input.value.length} / 240`}
  openButton.addEventListener('click',open);closeButton.addEventListener('click',close);modal.addEventListener('click',e=>{if(e.target===modal)close()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))close()});input.addEventListener('input',count);
  form.addEventListener('submit',e=>{e.preventDefault();const text=input.value.trim();if(!text)return;const u=read();u.push(text);write(u);input.value='';count();render()});
  list.addEventListener('click',e=>{const b=e.target.closest('.note-delete');if(!b)return;const u=read(),i=Number(b.dataset.index);if(Number.isInteger(i)&&i>=0&&i<u.length){u.splice(i,1);write(u);render()}});
  count();
})();
