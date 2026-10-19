(() => {
 const dataNode=document.getElementById('conversation-data'); if(!dataNode)return;
 const data=JSON.parse(dataNode.textContent), log=document.getElementById('conversation-messages');
 const buttons=[...document.querySelectorAll('[data-question]')]; let shown=new Set([0]);
 function message(text,who,index){
  const row=document.createElement('div');row.className='conversation-message '+who;
  if(index!==undefined)row.dataset.answer=String(index);
  const author=document.createElement('span');author.className='conversation-author';
  if(who==='character'){const avatar=document.createElement('span');avatar.className='avatar avatar-message';const img=document.createElement('img');img.src=data.avatar;img.alt='';avatar.append(img);author.append(avatar);}
  author.append(document.createTextNode(who==='character'?data.name:'You'));
  const body=document.createElement('p');body.textContent=text;row.append(author,body);return row;
 }
 function update(){document.getElementById('message-count').textContent=String(log.children.length).padStart(2,'0')+' messages';buttons.forEach((b,i)=>b.setAttribute('aria-pressed',String(shown.has(i))));}
 buttons.forEach((button,index)=>button.addEventListener('click',()=>{
  let answer=log.querySelector('[data-answer="'+index+'"]');
  if(!shown.has(index)){const item=data.exchanges[index];log.append(message(item.question,'user'));answer=message(item.answer,'character',index);log.append(answer);shown.add(index);update();}
  answer.scrollIntoView({block:'nearest',behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
 }));
 document.getElementById('restart-conversation').addEventListener('click',()=>{log.replaceChildren(message(data.intro,'character'));shown.clear();update();log.scrollTop=0;buttons[0].focus();});
})();