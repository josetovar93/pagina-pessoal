// script.js: interação da página.
// 1) Efeito de digitação na mensagem de boas-vindas
// 2) Botão para ocultar/mostrar a mensagem
const btn=document.getElementById('toggle'),msg=document.getElementById('welcome');
const text='👋 Bem-vindo! Obrigado por visitar minha página. Aqui você vai ver como ideias viram sites que funcionam de verdade. Fique à vontade para explorar meus projetos e entrar em contato.';
const chars=Array.from(text),typed=document.getElementById('typed'),rest=document.getElementById('rest');
let timer;
function type(){
  clearInterval(timer);
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){typed.textContent=text;rest.textContent='';return;}
  let i=0;typed.classList.add('typing');
  timer=setInterval(()=>{
    i++;typed.textContent=chars.slice(0,i).join('');rest.textContent=chars.slice(i).join('');
    if(i>=chars.length){clearInterval(timer);typed.classList.remove('typing');}
  },35);
}
rest.textContent=text;type();
btn.addEventListener('click',()=>{
  msg.hidden=!msg.hidden;
  btn.textContent=msg.hidden?'Mostrar boas-vindas':'Ocultar boas-vindas';
  if(!msg.hidden)type();
});