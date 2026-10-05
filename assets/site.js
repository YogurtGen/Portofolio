(() => {
  'use strict';
  document.documentElement.classList.add('has-js');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (window.ScrollCraft) ScrollCraft.mount(document.body);
  const $ = (id) => document.getElementById(id);
  const data = window.PORTFOLIO_PROJECTS || [];
  const projects = new Map(data.map(p => [p.id, p]));
  let category = 'all', lens = null;
  const lensNames = {visual:'Visual', collaboration:'Kolaborasi', story:'Cerita'};
  const search = $('project-search');
  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  function matches(p) {
    const term = search.value.trim().toLocaleLowerCase('id');
    return (category === 'all' || p.category === category) && (!lens || p.lenses.includes(lens)) &&
      (!term || [p.title,p.summary,p.year,p.role,p.categoryLabel,...p.tools].join(' ').toLocaleLowerCase('id').includes(term));
  }
  function updateArchive() {
    const matchesData = data.filter(matches);
    const visibleIds = new Set(matchesData.map(p => p.id));
    document.querySelectorAll('[data-project-item]').forEach(el => el.hidden = !visibleIds.has(el.dataset.projectItem));
    filterButtons.forEach(b => b.setAttribute('aria-pressed', String(!lens && b.dataset.filter === category)));
    const featured = [...$('featured-gallery').children].some(el => !el.hidden);
    $('featured-gallery').hidden = !featured;
    $('archive-ledger').style.marginTop = featured ? '' : '15px';
    $('archive-ledger').hidden = !matchesData.length;
    $('empty-results').hidden = !!matchesData.length;
    $('active-lens').hidden = !lens;
    $('lens-label').textContent = lens ? 'Sudut pandang: ' + lensNames[lens] : '';
    $('archive-status').textContent = 'Menampilkan ' + matchesData.length + ' dari ' + data.length + ' proyek' + (lens ? ' melalui sudut pandang ' + lensNames[lens].toLowerCase() : '') + '.';
  }
  filterButtons.forEach(b => b.addEventListener('click', () => {category=b.dataset.filter;lens=null;updateArchive();}));
  search.addEventListener('input', updateArchive);
  document.querySelectorAll('[data-lens]').forEach(b => b.addEventListener('click', () => {
    lens=b.dataset.lens;category='all';search.value='';updateArchive();$('karya').scrollIntoView({behavior:reduced?'auto':'smooth',block:'start'});
  }));
  $('clear-lens').addEventListener('click', () => {lens=null;updateArchive();});
  $('reset-search').addEventListener('click', () => {category='all';lens=null;search.value='';updateArchive();search.focus();});
  document.querySelectorAll('[data-jump-year]').forEach(a => a.addEventListener('click', () => {category='all';lens=null;search.value=a.dataset.jumpYear;updateArchive();}));

  const dialog=$('project-dialog');
  function addText(parent,tag,text,className) {
    const element=document.createElement(tag);element.textContent=text;if(className)element.className=className;parent.append(element);return element;
  }
  function showProject(id) {
    const p=projects.get(id);if(!p)return;
    $('modal-title').textContent=p.title;
    $('modal-meta').replaceChildren();
    [p.categoryLabel,p.year,p.role,p.collaboration].filter(Boolean).forEach(s=>addText($('modal-meta'),'span',s));
    $('modal-intro').replaceChildren();
    p.details.forEach(s=>addText($('modal-intro'),'p',s));
    $('modal-tools').textContent=p.tools.length?'Alat: '+p.tools.join(' · '):'';
    $('modal-tools').hidden=!p.tools.length;
    $('modal-source').href=p.url;
    $('modal-empty').hidden=!p.limited;
    $('modal-empty').textContent=p.limited?'Sumber portofolio saat ini memuat judul entri. Rincian proyek belum ditambahkan.':'';
    $('modal-links').replaceChildren();
    (p.links||[]).forEach(link => {const a=addText($('modal-links'),'a',link.label);a.href=link.url;a.target='_blank';a.rel='noopener noreferrer';});
    $('modal-gallery').replaceChildren();
    p.gallery.forEach((src,i) => {
      const figure=document.createElement('figure'),image=document.createElement('img');
      image.src=src;image.alt='Dokumentasi '+p.title+' ('+(i+1)+')';image.loading='lazy';
      figure.append(image);addText(figure,'figcaption',p.title+' · '+(p.year||'Portofolio'));$('modal-gallery').append(figure);
    });
    dialog.showModal();document.body.style.overflow='hidden';dialog.scrollTop=0;
  }
  document.querySelectorAll('[data-project]').forEach(b=>b.addEventListener('click',()=>showProject(b.dataset.project)));
  $('modal-close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=>document.body.style.overflow='');
  dialog.addEventListener('click',e=>{
    if(e.target!==dialog)return;
    const r=dialog.getBoundingClientRect();
    if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();
  });

  const toggle=$('menu-toggle'),nav=$('site-nav');
  toggle.addEventListener('click',()=> {
    const open=toggle.getAttribute('aria-expanded')!=='true';
    toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);toggle.textContent=open?'Tutup':'Menu';
  });
  nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');toggle.textContent='Menu';
  }));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){nav.classList.remove('is-open');toggle.setAttribute('aria-expanded','false');toggle.textContent='Menu';}});

  $('copy-email').addEventListener('click',async()=>{
    const email='vanderluth@outlook.com';let copied=false;
    try {if(navigator.clipboard){await navigator.clipboard.writeText(email);copied=true;}}catch(e){}
    if(!copied){
      const t=document.createElement('textarea');t.value=email;t.style.position='fixed';t.style.opacity='0';document.body.append(t);t.select();
      try{copied=document.execCommand('copy');}catch(e){}
      t.remove();$('copy-email').focus();
    }
    $('copy-status').textContent=copied?'Alamat email tersalin.':'Salin alamat berikut: '+email;
  });

  if ('IntersectionObserver' in window) {
    const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target);}}),{threshold:.1});
    document.querySelectorAll('.enter').forEach(el=>io.observe(el));
    document.addEventListener('focusin',e=>e.target.closest('.enter')?.classList.add('is-visible'));
  } else document.querySelectorAll('.enter').forEach(el=>el.classList.add('is-visible'));
  const hero=$('hero');
  let ticking=false;
  function updateHero(){
    ticking=false;
    if(!reduced && window.innerWidth>800){
      hero.style.setProperty('--hero-p',String(Math.min(1,Math.max(0,window.scrollY/hero.offsetHeight))));
    }
    const observation=$('observasi');
    const rect=observation.getBoundingClientRect();
    if(!reduced && innerWidth>800 && rect.top<innerHeight && rect.bottom>0){
      const rendered=[...observation.querySelectorAll('.evidence-card')].map(el=>{
        const m=new DOMMatrixReadOnly(getComputedStyle(el).transform);
        return [m.a,m.b,m.c,m.d,m.e,m.f].map(n=>n.toFixed(2)).join(',');
      });
      rendered.push(getComputedStyle(observation.querySelector('.evidence-thread path')).strokeDashoffset);
      observation.setAttribute('data-sc-verify-state',rendered.join('|'));
    }else observation.removeAttribute('data-sc-verify-state');
  }
  window.addEventListener('scroll',()=>{if(!ticking){ticking=true;requestAnimationFrame(updateHero);}},{passive:true});
  window.addEventListener('resize',updateHero,{passive:true});
  if(!reduced && matchMedia('(hover: hover) and (pointer: fine)').matches){
    hero.addEventListener('pointermove',e=>hero.style.setProperty('--px',String((e.clientX/window.innerWidth-.5)*2)));
    hero.addEventListener('pointerleave',()=>hero.style.setProperty('--px','0'));
  }
  updateHero();
})();
