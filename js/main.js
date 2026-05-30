/* ═══════════════════════════════════════════════════
   Muhammad Own Raza — Portfolio
   Three.js heavy 3D + GSAP + per-section color
═══════════════════════════════════════════════════ */

gsap.registerPlugin(ScrollTrigger);

/* ── Custom cursor ──────────────────────────────── */
const cur  = document.getElementById('cursor');
const curR = document.getElementById('cursor-ring');
let cx=0,cy=0,rx=0,ry=0;
document.addEventListener('mousemove', e => { cx=e.clientX; cy=e.clientY; });
(function loop(){
  rx+=(cx-rx)*0.12; ry+=(cy-ry)*0.12;
  cur.style.left=cx+'px'; cur.style.top=cy+'px';
  curR.style.left=rx+'px'; curR.style.top=ry+'px';
  requestAnimationFrame(loop);
})();
document.querySelectorAll('a,button,.pcard,.chip,.c-link,.pub-card,.scat,.exp-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>{ cur.style.transform='translate(-50%,-50%) scale(2.8)'; curR.style.transform='translate(-50%,-50%) scale(1.6)'; });
  el.addEventListener('mouseleave',()=>{ cur.style.transform='translate(-50%,-50%) scale(1)'; curR.style.transform='translate(-50%,-50%) scale(1)'; });
});

/* ── Loader ─────────────────────────────────────── */
window.addEventListener('load', ()=>{
  setTimeout(()=>{ document.getElementById('loader').classList.add('out'); boot(); }, 1600);
});

function boot(){
  applyColor('orange');
  const tl = gsap.timeline({ defaults:{ ease:'power4.out' } });
  tl.to('#heroEyebrow',{opacity:1,y:0,duration:0.8},0.1)
    .to('#heroTitle',  {opacity:1,y:0,duration:1.0},0.3)
    .to('#heroTyped',  {opacity:1,y:0,duration:0.8},0.6)
    .to('#heroCta',    {opacity:1,y:0,duration:0.8},0.8)
    .to('#heroStats',  {opacity:1,    duration:0.7},1.0)
    .to('#scrollHint', {opacity:1,    duration:0.7},1.2);

  initTyped();
  initCounters();
  initHeroScene();
  initExpScene();
  initScrollColor();
  initScrollReveal();
  initCardTilt();
  initJourneyPath();
  initForm();
  initParticleTrail();
  initThemeToggle();
  initRadarChart();
  initCaseStudy();
  initCurrentlyBuilding();
  initTerminal();
}

/* ── Per-section accent colour ──────────────────── */
const colorMap = {
  cyan:   { a:'#00d4ff', b:'#0088ff', g:'rgba(0,212,255,0.2)'   },
  blue:   { a:'#3b82f6', b:'#1d4ed8', g:'rgba(59,130,246,0.2)'  },
  teal:   { a:'#06b6d4', b:'#0e7490', g:'rgba(6,182,212,0.2)'   },
  purple: { a:'#8b5cf6', b:'#6d28d9', g:'rgba(139,92,246,0.2)'  },
  pink:   { a:'#ec4899', b:'#be185d', g:'rgba(236,72,153,0.2)'  },
  green:  { a:'#10b981', b:'#059669', g:'rgba(16,185,129,0.2)'  },
  orange: { a:'#f97316', b:'#c2410c', g:'rgba(249,115,22,0.2)'  },
};

let currentColor = '';
function applyColor(key){
  if(currentColor===key) return;
  currentColor = key;
  const c = colorMap[key]||colorMap.cyan;
  const r = document.documentElement;
  r.style.setProperty('--accent', c.a);
  r.style.setProperty('--accent2',c.b);
  r.style.setProperty('--glow',   c.g);
  if(cur)  cur.style.background   = c.a;
  if(curR) curR.style.borderColor = c.a;
  /* Update hero uniforms live */
  if(window._holoMat){
    window._holoMat.uniforms.uColorA.value.set(c.a);
    window._holoMat.uniforms.uColorB.value.set(c.b);
  }
  /* Redraw radar to reflect new accent colour */
  if(window._radarDrawn && window._radarRedraw){
    requestAnimationFrame(()=>window._radarRedraw(1));
  }
}

function initScrollColor(){
  document.querySelectorAll('section[data-color]').forEach(sec=>{
    ScrollTrigger.create({
      trigger:sec, start:'top 55%', end:'bottom 45%',
      onEnter:     ()=>applyColor(sec.dataset.color),
      onEnterBack: ()=>applyColor(sec.dataset.color),
    });
  });
}

/* ── Scroll reveal ──────────────────────────────── */
function initScrollReveal(){
  gsap.utils.toArray('.g-reveal').forEach(el=>{
    const delay=(+el.dataset.delay||0)/1000;
    const fromX=el.classList.contains('from-left')?-60:el.classList.contains('from-right')?60:0;
    gsap.fromTo(el,
      {opacity:0, y:fromX?0:55, x:fromX},
      {opacity:1, y:0, x:0, duration:0.9, delay, ease:'power3.out',
       scrollTrigger:{trigger:el,start:'top 88%',once:true}}
    );
  });
  document.querySelectorAll('.section-header h2').forEach(h=>{
    gsap.fromTo(h,
      {clipPath:'inset(0 100% 0 0)'},
      {clipPath:'inset(0 0% 0 0)',duration:1.1,ease:'power4.inOut',
       scrollTrigger:{trigger:h,start:'top 85%',once:true}}
    );
  });
}

/* ── Journey path draw on scroll ────────────────── */
function initJourneyPath(){
  const line = document.getElementById('journeyLine');
  if(!line) return;
  ScrollTrigger.create({
    trigger:'#experience', start:'top 70%', once:true,
    onEnter(){ line.style.strokeDashoffset='0'; }
  });
  /* Animate experience stats counters */
  document.querySelectorAll('.es-num[data-target]').forEach(el=>{
    ScrollTrigger.create({
      trigger:el, start:'top 90%', once:true,
      onEnter(){
        gsap.fromTo(el,{textContent:0},{
          textContent:+el.dataset.target, duration:1.6, ease:'power2.out',
          snap:{textContent:1},
          onUpdate(){ el.textContent=Math.round(+el.textContent); }
        });
      }
    });
  });
}

/* ── Typewriter ─────────────────────────────────── */
function initTyped(){
  const el=document.getElementById('typed'); if(!el) return;
  const phrases=['Turbofan RUL Estimation','Real-time Fault Detection','Computer Vision Systems','Physics-Informed Neural Nets','Vibration Signal Analysis','Industrial AI Engineering'];
  let pi=0,ci=0,del=false;
  function tick(){
    const p=phrases[pi];
    if(!del){ el.textContent=p.slice(0,++ci); if(ci===p.length){del=true;return setTimeout(tick,2000);} setTimeout(tick,68); }
    else { el.textContent=p.slice(0,--ci); if(ci===0){del=false;pi=(pi+1)%phrases.length;return setTimeout(tick,350);} setTimeout(tick,36); }
  }
  setTimeout(tick,2800);
}

/* ── Counters ───────────────────────────────────── */
function initCounters(){
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(!e.isIntersecting) return;
      const el=e.target,target=+el.dataset.target;
      gsap.fromTo(el,{textContent:0},{textContent:target,duration:1.6,ease:'power2.out',snap:{textContent:1},onUpdate(){el.textContent=Math.round(+el.textContent);}});
      obs.unobserve(el);
    });
  },{threshold:0.5});
  document.querySelectorAll('.stat-num[data-target]').forEach(el=>obs.observe(el));
}

/* ── Card tilt ──────────────────────────────────── */
function initCardTilt(){
  document.querySelectorAll('.pcard,.pub-card,.scat').forEach(card=>{
    const glow=card.querySelector('.pcard-glow');
    card.addEventListener('mousemove',e=>{
      const r=card.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-0.5, y=(e.clientY-r.top)/r.height-0.5;
      const s=card.classList.contains('pcard')?16:9;
      gsap.to(card,{rotateY:x*s,rotateX:-y*(s*0.7),transformPerspective:900,z:18,duration:0.35,ease:'power2.out'});
      if(glow){glow.style.left=(e.clientX-r.left)+'px';glow.style.top=(e.clientY-r.top)+'px';}
    });
    card.addEventListener('mouseleave',()=>{
      gsap.to(card,{rotateY:0,rotateX:0,z:0,duration:0.7,ease:'elastic.out(1,0.55)'});
    });
  });
}

/* ── Navbar ─────────────────────────────────────── */
const nav=document.getElementById('navbar');
const navToggle=document.getElementById('navToggle');
const mobileMenu=document.getElementById('mobileMenu');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',scrollY>60));
navToggle.addEventListener('click',()=>{ navToggle.classList.toggle('active'); mobileMenu.classList.toggle('open'); });
document.querySelectorAll('.mobile-link').forEach(l=>l.addEventListener('click',()=>{ mobileMenu.classList.remove('open'); navToggle.classList.remove('active'); }));

/* ── Contact form ───────────────────────────────── */
function initForm(){
  const f=document.getElementById('contactForm'); if(!f) return;
  f.addEventListener('submit',e=>{
    e.preventDefault();
    const d=Object.fromEntries(new FormData(f));
    window.location.href=`mailto:?subject=${encodeURIComponent(d.subject||'Portfolio Contact')}&body=${encodeURIComponent('From: '+d.name+'\n\n'+d.message)}`;
  });
}

/* ═══════════════════════════════════════════════════
   HERO THREE.JS — Turbofan Engine + CV Detection
   - Rotating 16-blade fan assembly + orange hub cone
   - Engine nacelle with compressor stages
   - Exhaust particle stream (orange glow)
   - CV bounding box overlays (detection simulation)
   - Orange-tinted animated grid floor
   - Dynamic multi-point lighting
═══════════════════════════════════════════════════ */
function initHeroScene(){
  const canvas=document.getElementById('hero-canvas');
  if(!canvas||!window.THREE) return;

  const W=innerWidth, H=innerHeight;
  const scene=new THREE.Scene();
  scene.fog=new THREE.FogExp2(0x03030a,0.015);

  const cam=new THREE.PerspectiveCamera(52,W/H,0.1,200);
  cam.position.set(-1.5,1.8,9.5);
  cam.lookAt(1.5,0,0);

  const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});
  renderer.setSize(W,H);
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  renderer.setClearColor(0,0);
  renderer.toneMapping=THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure=1.2;

  /* ─── Engine group (offset right) ─────────────── */
  const ENG=new THREE.Group();
  ENG.position.set(2.0,0,0);

  const metalMat=new THREE.MeshPhongMaterial({color:0x0d2137,shininess:180,emissive:0x030d1a,specular:0x3366aa});
  const orangeMat=new THREE.MeshPhongMaterial({color:0xf97316,shininess:220,emissive:0x5a2800,specular:0xffaa44});

  /* ───── Fan assembly (spins) ─────────────────── */
  const fanGroup=new THREE.Group();

  /* 16 swept blades */
  const bladeGeo=new THREE.BoxGeometry(0.036,1.38,0.30);
  for(let i=0;i<16;i++){
    const ang=(i/16)*Math.PI*2;
    const pivot=new THREE.Object3D(); pivot.rotation.z=ang;
    const blade=new THREE.Mesh(bladeGeo,metalMat.clone());
    blade.position.y=0.96; blade.rotation.y=0.28;
    pivot.add(blade); fanGroup.add(pivot);
  }

  /* Hub spinner cone — orange */
  const hubCone=new THREE.Mesh(new THREE.ConeGeometry(0.26,0.72,32),orangeMat);
  hubCone.rotation.x=-Math.PI/2; hubCone.position.z=-0.36;
  fanGroup.add(hubCone);

  /* Hub back disk */
  const hubDisk=new THREE.Mesh(new THREE.CylinderGeometry(0.28,0.28,0.09,32),metalMat);
  hubDisk.rotation.x=Math.PI/2; fanGroup.add(hubDisk);

  ENG.add(fanGroup);

  /* Outer fan tip ring */
  ENG.add(new THREE.Mesh(new THREE.TorusGeometry(1.70,0.065,12,80),
    new THREE.MeshPhongMaterial({color:0x1a3c5e,shininess:180,emissive:0x04101e,specular:0x224488})));

  /* Intake lip */
  const lip=new THREE.Mesh(new THREE.TorusGeometry(1.80,0.13,16,80),
    new THREE.MeshPhongMaterial({color:0x0e1f33,shininess:120,specular:0x1a44aa}));
  lip.position.z=0.10; ENG.add(lip);

  /* Orange intake chevrons */
  for(let i=0;i<14;i++){
    const ang=(i/14)*Math.PI*2;
    const ch=new THREE.Mesh(new THREE.BoxGeometry(0.06,0.22,0.10),orangeMat);
    ch.position.set(Math.cos(ang)*1.80,Math.sin(ang)*1.80,0.15);
    ch.rotation.z=ang; ENG.add(ch);
  }

  /* Nacelle cylinder (open-ended) */
  const nacelle=new THREE.Mesh(
    new THREE.CylinderGeometry(1.80,1.62,3.2,64,4,true),
    new THREE.MeshPhongMaterial({color:0x080f1a,side:THREE.DoubleSide,shininess:55,transparent:true,opacity:0.88,specular:0x0f2a55})
  );
  nacelle.rotation.x=Math.PI/2; nacelle.position.z=1.6; ENG.add(nacelle);

  /* Compressor stage rings (rotate independently) */
  const compRings=[];
  for(let i=0;i<7;i++){
    const cRing=new THREE.Mesh(
      new THREE.TorusGeometry(1.60-i*0.05,0.022,8,64),
      new THREE.MeshBasicMaterial({color:i===0?0xf97316:i<3?0x0077cc:0x003388,transparent:true,opacity:0.55-i*0.06})
    );
    cRing.position.z=0.5+i*0.42; compRings.push(cRing); ENG.add(cRing);
  }

  /* Exhaust nozzle rings (pulsing) */
  const exhRings=[];
  for(let i=0;i<5;i++){
    const eRing=new THREE.Mesh(
      new THREE.TorusGeometry(1.62-i*0.22,0.04,8,48),
      new THREE.MeshBasicMaterial({color:i<2?0xff7700:0xff3300,transparent:true,opacity:0.25+i*0.10})
    );
    eRing.position.z=3.0+i*0.20; exhRings.push(eRing); ENG.add(eRing);
  }

  scene.add(ENG);

  /* ─── Exhaust particle stream ──────────────────── */
  const EXN=2500;
  const exPos=new Float32Array(EXN*3),exSpd=new Float32Array(EXN),exAng=new Float32Array(EXN),exRad=new Float32Array(EXN);
  for(let i=0;i<EXN;i++){
    const ang=Math.random()*Math.PI*2, rad=Math.random()*1.3;
    exAng[i]=ang; exRad[i]=rad;
    exPos[i*3]=ENG.position.x+Math.cos(ang)*rad*0.25;
    exPos[i*3+1]=ENG.position.y+Math.sin(ang)*rad*0.25;
    exPos[i*3+2]=2.5+Math.random()*8.5;
    exSpd[i]=0.025+Math.random()*0.06;
  }
  const exGeo=new THREE.BufferGeometry();
  exGeo.setAttribute('position',new THREE.BufferAttribute(exPos,3));
  const exhaust=new THREE.Points(exGeo,new THREE.PointsMaterial({
    color:0xff8c00,size:0.042,transparent:true,opacity:0.65,blending:THREE.AdditiveBlending,depthWrite:false
  }));
  scene.add(exhaust);

  /* ─── CV Bounding boxes ─────────────────────────── */
  function cvBox(w,h,d,col,x,y,z,ry=0){
    const edges=new THREE.EdgesGeometry(new THREE.BoxGeometry(w,h,d));
    const mat=new THREE.LineBasicMaterial({color:col,transparent:true,opacity:0.8});
    const ln=new THREE.LineSegments(edges,mat);
    ln.position.set(x,y,z); ln.rotation.y=ry; return ln;
  }
  const cvBoxes=[
    cvBox(1.4,2.2,0.4,0x00ff88,-3.8, 0.2, 0,  0.12),
    cvBox(0.9,0.9,0.25,0xffaa00,-2.4, 1.5, 1.0,-0.10),
    cvBox(1.8,2.6,0.4,0x00ccff,-5.2,-0.2,-1.0, 0.18),
    cvBox(0.7,0.7,0.2,0xff5577,-1.6,-1.3, 0.5,-0.06),
  ];
  cvBoxes.forEach(b=>scene.add(b));

  /* Detection pulse dots */
  const detCols=[0x00ff88,0xffaa00,0x00ccff,0xff5577];
  const detDots=cvBoxes.map((b,i)=>{
    const dot=new THREE.Mesh(new THREE.SphereGeometry(0.065,8,8),
      new THREE.MeshBasicMaterial({color:detCols[i],transparent:true,opacity:0.9}));
    dot.position.copy(b.position); scene.add(dot); return dot;
  });

  /* ─── Ambient point cloud ───────────────────────── */
  const CLN=3500, clPos=new Float32Array(CLN*3);
  for(let i=0;i<CLN;i++){
    clPos[i*3]=(Math.random()-0.5)*55; clPos[i*3+1]=(Math.random()-0.5)*28; clPos[i*3+2]=(Math.random()-0.5)*32-6;
  }
  const clGeo=new THREE.BufferGeometry(); clGeo.setAttribute('position',new THREE.BufferAttribute(clPos,3));
  scene.add(new THREE.Points(clGeo,new THREE.PointsMaterial({color:0x1a2a3e,size:0.055,transparent:true,opacity:0.4})));

  /* ─── Grid floor (orange-tinted pulse rings) ────── */
  const gridMat=new THREE.ShaderMaterial({
    uniforms:{uTime:{value:0}},
    vertexShader:`varying vec3 vW; void main(){ vec4 w=modelMatrix*vec4(position,1.0); vW=w.xyz; gl_Position=projectionMatrix*viewMatrix*w; }`,
    fragmentShader:`
      uniform float uTime; varying vec3 vW;
      float gl2(vec2 p,float s,float t){ vec2 g=abs(mod(p,s)-s*0.5); return 1.0-smoothstep(t,t*2.5,min(g.x,g.y)); }
      void main(){
        vec2 p=vW.xz;
        float g=max(gl2(p,1.0,0.022)*0.22,gl2(p,5.0,0.055)*0.55);
        float d=length(p);
        float ring=pow(sin(d*1.3-uTime*2.5)*0.5+0.5,3.0)*(1.0-smoothstep(0.0,28.0,d));
        g+=ring*0.3; g*=1.0-smoothstep(5.0,28.0,d);
        vec3 col=mix(vec3(0.35,0.12,0.0),vec3(1.0,0.45,0.08),ring);
        gl_FragColor=vec4(col,g*0.65);
      }
    `,
    transparent:true,side:THREE.DoubleSide,depthWrite:false,
  });
  const gridMesh=new THREE.Mesh(new THREE.PlaneGeometry(80,80,1,1),gridMat);
  gridMesh.rotation.x=-Math.PI/2; gridMesh.position.y=-3.3;
  scene.add(gridMesh);

  /* ─── Lights ─────────────────────────────────────── */
  scene.add(new THREE.AmbientLight(0x04080f,1.4));
  const Lkey=new THREE.PointLight(0xff7722,5,22); Lkey.position.set(-2,3,6); scene.add(Lkey);
  const Lblue=new THREE.PointLight(0x0055ee,3,26); Lblue.position.set(-8,0,2); scene.add(Lblue);
  const Lexh=new THREE.PointLight(0xff4400,5,16); Lexh.position.set(ENG.position.x,0,5.5); scene.add(Lexh);
  const Lrim=new THREE.PointLight(0x00aaff,2,18); Lrim.position.set(ENG.position.x,-2,-3); scene.add(Lrim);

  /* ─── Mouse ──────────────────────────────────────── */
  let mX=0,mY=0,tX=0,tY=0;
  document.addEventListener('mousemove',e=>{ mX=(e.clientX/innerWidth-0.5)*1.2; mY=(e.clientY/innerHeight-0.5)*0.8; });

  /* ─── Resize ─────────────────────────────────────── */
  window.addEventListener('resize',()=>{ const w=innerWidth,h=innerHeight; cam.aspect=w/h; cam.updateProjectionMatrix(); renderer.setSize(w,h); });

  /* ─── Render loop ────────────────────────────────── */
  const clk=new THREE.Clock();
  function animate(){
    requestAnimationFrame(animate);
    const t=clk.getElapsedTime();

    /* Spin fan */
    fanGroup.rotation.z=t*3.8;

    /* Compressor rings — alternating directions */
    compRings.forEach((r,i)=>{ r.rotation.z=t*(0.9+i*0.25)*(i%2?-1:1); });

    /* Exhaust nozzle pulse */
    exhRings.forEach((r,i)=>{ r.material.opacity=0.25+i*0.10+Math.sin(t*3.5+i*0.8)*0.08; });

    /* Engine breathing */
    ENG.rotation.y=Math.sin(t*0.35)*0.065; ENG.rotation.x=Math.cos(t*0.28)*0.03;

    /* Stream particles */
    const ea=exGeo.attributes.position.array;
    for(let i=0;i<EXN;i++){
      ea[i*3+2]+=exSpd[i];
      const frac=Math.min((ea[i*3+2]-2.5)/8.5,1.0);
      ea[i*3]  =ENG.position.x+Math.cos(exAng[i])*exRad[i]*(0.25+frac*1.4);
      ea[i*3+1]=ENG.position.y+Math.sin(exAng[i])*exRad[i]*(0.25+frac*1.4);
      if(ea[i*3+2]>11) ea[i*3+2]=2.5;
    }
    exGeo.attributes.position.needsUpdate=true;

    /* CV boxes float & flicker */
    cvBoxes.forEach((b,i)=>{
      b.position.y+=Math.sin(t*0.5+i*1.4)*0.003;
      b.material.opacity=0.65+Math.sin(t*1.5+i*0.9)*0.15;
    });
    detDots.forEach((d,i)=>{
      d.position.y=cvBoxes[i].position.y;
      d.material.opacity=0.55+Math.sin(t*2.5+i)*0.45;
      d.scale.setScalar(1.0+Math.sin(t*3+i*1.2)*0.22);
    });

    /* Light animation */
    Lexh.intensity=4.0+Math.sin(t*4.5)*1.8;
    Lkey.position.x=Math.sin(t*0.45)*2-2;
    Lrim.intensity=1.5+Math.sin(t*0.7)*0.6;
    gridMat.uniforms.uTime.value=t;

    /* Mouse parallax */
    tX+=(mX-tX)*0.04; tY+=(mY-tY)*0.04;
    cam.position.x=-1.5+tX*1.6; cam.position.y=1.8-tY*1.0;
    cam.lookAt(1.5,0,0);

    renderer.render(scene,cam);
  }

  animate();
}

/* ═══════════════════════════════════════════════════
   EXPERIENCE SECTION — Mini floating 3D canvas
═══════════════════════════════════════════════════ */
function initExpScene(){
  const canvas=document.getElementById('expCanvas');
  if(!canvas||!window.THREE) return;

  const scene=new THREE.Scene();
  const W=canvas.offsetWidth||innerWidth;
  const H=canvas.offsetHeight||600;
  const cam=new THREE.PerspectiveCamera(60,W/H,0.1,100);
  cam.position.z=8;

  const renderer=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});
  renderer.setSize(W,H);
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
  renderer.setClearColor(0,0);

  /* Floating gear-like tori */
  const shapes=[];
  const cols=[0x06b6d4,0x3b82f6,0x8b5cf6,0x10b981,0xf97316];
  for(let i=0;i<12;i++){
    const g=Math.random()>0.5
      ? new THREE.TorusGeometry(0.3+Math.random()*0.5,0.05,6,32)
      : new THREE.OctahedronGeometry(0.2+Math.random()*0.3,0);
    const mat=new THREE.MeshBasicMaterial({
      color:cols[i%cols.length], wireframe:true, transparent:true, opacity:0.25+Math.random()*0.2
    });
    const m=new THREE.Mesh(g,mat);
    m.position.set((Math.random()-0.5)*14,(Math.random()-0.5)*8,(Math.random()-0.5)*4);
    m.userData={rx:Math.random()*0.008,ry:Math.random()*0.01,rz:Math.random()*0.006};
    scene.add(m); shapes.push(m);
  }

  const expClk=new THREE.Clock();
  function expLoop(){
    requestAnimationFrame(expLoop);
    const t=expClk.getElapsedTime();
    shapes.forEach((s,i)=>{
      s.rotation.x+=s.userData.rx;
      s.rotation.y+=s.userData.ry;
      s.rotation.z+=s.userData.rz;
      s.position.y+=Math.sin(t*0.4+i)*0.003;
    });
    renderer.render(scene,cam);
  }

  /* Only run when experience section is visible */
  const expSection=document.getElementById('experience');
  const io=new IntersectionObserver(entries=>{
    if(entries[0].isIntersecting) expLoop();
  },{threshold:0.1});
  if(expSection) io.observe(expSection);
}

/* ═══════════════════════════════════════════════════
   VISUAL WOW PACK
═══════════════════════════════════════════════════ */

/* ── 1. Particle cursor trail ───────────────────── */
function initParticleTrail(){
  const canvas=document.getElementById('trail-canvas');
  if(!canvas) return;
  const ctx=canvas.getContext('2d');
  let W=canvas.width=innerWidth, H=canvas.height=innerHeight;
  window.addEventListener('resize',()=>{ W=canvas.width=innerWidth; H=canvas.height=innerHeight; });

  const pts=[];
  let lx=-1,ly=-1,lastT=0;

  document.addEventListener('mousemove',e=>{
    const now=Date.now(); if(now-lastT<18) return; lastT=now;
    const dx=e.clientX-lx, dy=e.clientY-ly;
    const spd=Math.sqrt(dx*dx+dy*dy); lx=e.clientX; ly=e.clientY;
    if(spd<3) return;
    const ac=getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()||'#f97316';
    const n=Math.min(Math.ceil(spd/5),5);
    for(let i=0;i<n;i++){
      pts.push({
        x:e.clientX+(Math.random()-.5)*7,
        y:e.clientY+(Math.random()-.5)*7,
        vx:(Math.random()-.5)*2.2,
        vy:(Math.random()-.5)*2.2-.7,
        r:1.5+Math.random()*2.5,
        a:0.85,
        d:0.028+Math.random()*.022,
        c:ac
      });
    }
  });

  (function loop(){
    requestAnimationFrame(loop);
    ctx.clearRect(0,0,W,H);
    for(let i=pts.length-1;i>=0;i--){
      const p=pts[i];
      p.x+=p.vx; p.y+=p.vy; p.vy+=0.055;
      p.a-=p.d; p.r*=0.97;
      if(p.a<=0.02){pts.splice(i,1);continue;}
      ctx.save();
      ctx.globalAlpha=p.a;
      ctx.fillStyle=p.c;
      ctx.shadowBlur=10; ctx.shadowColor=p.c;
      ctx.beginPath();
      ctx.arc(p.x,p.y,Math.max(p.r,0.1),0,Math.PI*2);
      ctx.fill();
      ctx.restore();
    }
  })();
}

/* ── 2. Dark / Light mode toggle ────────────────── */
const SUN_SVG=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><circle cx="12" cy="12" r="5"/><path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;
const MOON_SVG=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>`;

function initThemeToggle(){
  const btn=document.getElementById('themeToggle');
  if(!btn) return;
  const icon=btn.querySelector('.theme-icon');
  const saved=localStorage.getItem('mor-theme')||'dark';
  if(saved==='light'){
    document.documentElement.setAttribute('data-theme','light');
    icon.innerHTML=MOON_SVG;
  } else {
    icon.innerHTML=SUN_SVG;
  }
  btn.addEventListener('click',()=>{
    const isLight=document.documentElement.getAttribute('data-theme')==='light';
    const next=isLight?'dark':'light';
    document.documentElement.setAttribute('data-theme',next);
    icon.innerHTML=next==='light'?MOON_SVG:SUN_SVG;
    localStorage.setItem('mor-theme',next);
    gsap.fromTo(btn,{rotate:-30,scale:0.8},{rotate:0,scale:1,duration:0.5,ease:'back.out(2)'});
    /* Redraw radar with new background context */
    if(window._radarDrawn&&window._radarRedraw) setTimeout(()=>window._radarRedraw(1),80);
  });
}

/* ── 3. Skills radar chart (pure canvas) ────────── */
function initRadarChart(){
  const canvas=document.getElementById('skillsRadar');
  if(!canvas) return;
  const ctx=canvas.getContext('2d');
  const SZ=420; canvas.width=SZ; canvas.height=SZ;
  const cx=SZ/2, cy=SZ/2, R=134;

  const skills=[
    {label:'Computer Vision',pct:92},
    {label:'AI / ML',        pct:88},
    {label:'Mech. Eng.',     pct:85},
    {label:'Programming',    pct:80},
    {label:'Data Science',   pct:82},
    {label:'Signal Proc.',   pct:78},
  ];
  const N=skills.length;
  const angs=skills.map((_,i)=>(i/N)*Math.PI*2-Math.PI/2);

  /* Set CSS custom property for animated bar widths */
  document.querySelectorAll('.rb-item').forEach(el=>{
    el.style.setProperty('--bar-w', el.dataset.pct+'%');
  });

  function draw(prog){
    const ac=getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()||'#f97316';
    const isDark=document.documentElement.getAttribute('data-theme')!=='light';
    const gridC=isDark?'rgba(255,255,255,0.07)':'rgba(0,0,0,0.08)';
    const textC=isDark?'rgba(226,232,240,0.75)':'rgba(15,23,42,0.7)';

    ctx.clearRect(0,0,SZ,SZ);

    /* Grid polygons — 5 levels */
    for(let lv=1;lv<=5;lv++){
      const r=(R/5)*lv;
      ctx.beginPath();
      angs.forEach((a,i)=>{ const x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r; i?ctx.lineTo(x,y):ctx.moveTo(x,y); });
      ctx.closePath(); ctx.strokeStyle=gridC; ctx.lineWidth=1; ctx.stroke();
    }
    /* Axes */
    angs.forEach(a=>{
      ctx.beginPath(); ctx.moveTo(cx,cy);
      ctx.lineTo(cx+Math.cos(a)*R, cy+Math.sin(a)*R);
      ctx.strokeStyle=gridC; ctx.lineWidth=1; ctx.stroke();
    });
    /* Data polygon */
    ctx.beginPath();
    skills.forEach((s,i)=>{
      const r=(s.pct/100)*R*prog;
      const x=cx+Math.cos(angs[i])*r, y=cy+Math.sin(angs[i])*r;
      i?ctx.lineTo(x,y):ctx.moveTo(x,y);
    });
    ctx.closePath();
    ctx.fillStyle=ac+'28'; ctx.fill();
    ctx.strokeStyle=ac; ctx.lineWidth=2;
    ctx.shadowBlur=14; ctx.shadowColor=ac; ctx.stroke(); ctx.shadowBlur=0;
    /* Dots */
    skills.forEach((s,i)=>{
      const r=(s.pct/100)*R*prog;
      const x=cx+Math.cos(angs[i])*r, y=cy+Math.sin(angs[i])*r;
      ctx.beginPath(); ctx.arc(x,y,4.5,0,Math.PI*2);
      ctx.fillStyle=ac; ctx.shadowBlur=12; ctx.shadowColor=ac; ctx.fill(); ctx.shadowBlur=0;
    });
    /* Labels */
    ctx.textAlign='center'; ctx.textBaseline='middle';
    skills.forEach((s,i)=>{
      const lr=R+30;
      const x=cx+Math.cos(angs[i])*lr, y=cy+Math.sin(angs[i])*lr;
      ctx.font='bold 11px JetBrains Mono,monospace';
      ctx.fillStyle=textC; ctx.fillText(s.label,x,y-7);
      ctx.font='11px JetBrains Mono,monospace';
      ctx.fillStyle=ac; ctx.fillText(s.pct+'%',x,y+9);
    });
  }

  draw(0);
  window._radarRedraw=draw;
  window._radarDrawn=false;

  ScrollTrigger.create({
    trigger:'#skills', start:'top 72%', once:true,
    onEnter(){
      window._radarDrawn=true;
      const obj={p:0};
      gsap.to(obj,{p:1,duration:2,ease:'power2.out',
        onUpdate(){ draw(obj.p); }
      });
      /* Animate skill bars */
      document.querySelectorAll('.rb-item').forEach((el,i)=>{
        setTimeout(()=>el.classList.add('anim'), i*120);
      });
    }
  });
}

/* ── 4. Case Study Overlay ──────────────────────── */
const caseStudies=[
  {
    num:'01',icon:'⚙',color:'#8b5cf6',tag:'Featured Project',
    title:'MechAI — Predictive Maintenance Platform',
    problem:'Industrial turbofan engines fail unpredictably, causing costly unplanned downtime. Existing RUL estimation models lacked real-time capability and struggled with the high-dimensional N-CMAPSS multi-sensor data streams.',
    approach:'Combined LSTM and Transformer architectures trained on NASA N-CMAPSS dataset. Designed a streaming data pipeline that processes 21 sensor channels in real-time, with anomaly detection that triggers alerts before threshold breach rather than after.',
    results:'Achieved 94.2% RUL prediction accuracy within a 10-cycle window. Reduced false-positive maintenance alerts by 62% vs baseline threshold methods. Processes 21 sensor streams at 50 Hz with sub-20ms latency on edge hardware.',
    metrics:[{l:'RUL Accuracy',v:'94.2%'},{l:'False Pos. ↓',v:'62%'},{l:'Latency',v:'<20ms'},{l:'Sensors',v:'21 ch.'}],
    tech:['TypeScript','LSTM','Transformer','N-CMAPSS','Real-time'],
    github:'https://github.com/Ownraza1214/MechAI',
  },
  {
    num:'02',icon:'👁',color:'#00d4ff',tag:'Computer Vision',
    title:'Advanced CV Suite',
    problem:'Real-time human body analysis for interactive AI apps needed a unified, low-latency toolkit capable of simultaneously tracking face, hands, and full-body pose without excessive hardware requirements.',
    approach:'Integrated MediaPipe FaceMesh (468 landmarks), Hand Tracking (21 keypoints/hand), and BlazePose (33 landmarks) into a unified Python framework. Added Air Writing Canvas that converts gesture trajectories into recognisable characters in real-time.',
    results:'60 fps real-time tracking on consumer-grade CPU. Average 2.3mm landmark error on face mesh. Air Writing system recognises 26 characters at 89% accuracy in fully unconstrained, real-world environments.',
    metrics:[{l:'Frame Rate',v:'60fps'},{l:'Landmarks',v:'522+'},{l:'Char Accuracy',v:'89%'},{l:'Latency',v:'16ms'}],
    tech:['Python','OpenCV','MediaPipe','Real-time','Gesture Recognition'],
    github:'https://github.com/Ownraza1214/Advanced-CV-Projects-MediaPipe',
  },
  {
    num:'03',icon:'🔬',color:'#ec4899',tag:'Research Project',
    title:'MSViTFD — Dual-Frequency Mamba',
    problem:'Rotating machinery fault detection suffers high false-alarm rates from single-scale feature extraction. Traditional CNNs miss the multi-resolution frequency patterns embedded in real-world vibration signals.',
    approach:'Designed a novel Multi-Scale Vision Transformer (MSViT) backbone fused with a Dual-Frequency Mamba SSM. The dual-frequency module separates high and low-frequency components before merging via cross-attention, capturing both local transients and global trends simultaneously.',
    results:'Outperforms baseline CNN and standalone ViT by +4.8% on the CWRU bearing benchmark. Achieves 97.3% classification accuracy across 10 fault classes. Mamba\'s linear complexity enables 3× faster inference than comparable Transformer-only architectures.',
    metrics:[{l:'Accuracy',v:'97.3%'},{l:'vs CNN ↑',v:'+4.8%'},{l:'Speed ↑',v:'3×'},{l:'Fault Classes',v:'10'}],
    tech:['Python','ViT','Mamba SSM','PyTorch','CWRU Dataset'],
    github:'https://github.com/Ownraza1214/FaultDetection-MSViTFD-DualFreqMamba',
  },
  {
    num:'04',icon:'🌊',color:'#10b981',tag:'Published Research',
    title:'WOA-PINNs — Pump Fault Detection',
    problem:'Cavitation fault detection in centrifugal pumps is critical in chemical and water treatment plants. Standard data-driven models ignore governing fluid dynamics, leading to poor generalisation outside training conditions.',
    approach:'Formulated a PINN where the loss function directly embeds Navier-Stokes equations alongside empirical pump performance curves. The Whale Optimization Algorithm (WOA) was used to auto-tune PINN architecture depth, width, and physics-weighting hyperparameters.',
    results:'Detects cavitation onset 3.2 cycles earlier than FFT-baseline methods. Generalises to unseen operating points at 91.4% accuracy using just 20% of the training data required by pure ML approaches. Published as pre-print 2026.',
    metrics:[{l:'Early Detection',v:'3.2×'},{l:'Accuracy',v:'91.4%'},{l:'Data Needed',v:'20%'},{l:'Status',v:'Published'}],
    tech:['Python','PINNs','WOA','Navier-Stokes','Metaheuristic Opt.'],
    github:'https://github.com/Ownraza1214/WOA-PINNS-',
  },
  {
    num:'05',icon:'⚙',color:'#f59e0b',tag:'Engineering Tool',
    title:'GearOptix — Transmission Design Suite',
    problem:'Mechanical engineers designing multi-stage gearboxes rely on scattered MATLAB scripts and spreadsheets. No unified open-source tool existed for end-to-end drivetrain analysis combining gear ratio optimisation, stress checks, and dynamic simulation.',
    approach:'Built GearOptix as a modular Python application with dedicated solvers for: Lewis bending stress, Hertz contact stress, gear ratio cascade optimisation, efficiency loss modelling, and natural frequency analysis of the full drivetrain torsional system.',
    results:'Reduced gearbox design iteration time by ~70% vs manual spreadsheet workflows. Correctly sized a 4-stage 18:1 reduction gearbox for a 15kW motor under full load. All stress calculations validated against AGMA industry standards.',
    metrics:[{l:'Time Saved',v:'~70%'},{l:'Standard',v:'AGMA'},{l:'Max Stages',v:'6'},{l:'License',v:'Open Source'}],
    tech:['Python','Mechanical Design','AGMA','Stress Analysis','Optimization'],
    github:'https://github.com/Ownraza1214/GearOptix',
  },
  {
    num:'06',icon:'🔧',color:'#06b6d4',tag:'Open Source Library',
    title:'mechforge — Python Mech. Eng. Library',
    problem:'Python lacks a comprehensive, engineer-friendly mechanical engineering library. Practitioners must reinvent standard formulas or rely on paid software like MATLAB for basic stress, heat transfer, and dynamics calculations.',
    approach:'Designed mechforge as a modular pip-installable package with a clean, discoverable API. Modules include: StressStrain (Von Mises, principal stresses), Thermodynamics (Rankine/Brayton cycles), FluidMechanics (Bernoulli, Moody chart), and Dynamics (vibration, modal decomposition).',
    results:'40+ engineering formulas across 6 modules. Full SI + Imperial unit handling prevents unit-error bugs. MIT licensed on PyPI. Designed for both students learning fundamentals and professionals needing fast reference calculations.',
    metrics:[{l:'Formulas',v:'40+'},{l:'Modules',v:'6'},{l:'Unit Systems',v:'SI + Imp.'},{l:'License',v:'MIT'}],
    tech:['Python','Open Source','PyPI','Mechanical Engineering','API Design'],
    github:'https://github.com/Ownraza1214/mechforge',
  },
];

function initCaseStudy(){
  const overlay=document.getElementById('caseOverlay');
  const inner=document.getElementById('caseInner');
  if(!overlay||!inner) return;

  /* Inject "Case Study" button into each pcard */
  document.querySelectorAll('.pcard').forEach((card,i)=>{
    if(i>=caseStudies.length) return;
    const btn=document.createElement('button');
    btn.className='pcard-cs-btn';
    btn.innerHTML='Case Study <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="11" height="11"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
    btn.addEventListener('click',e=>{ e.stopPropagation(); openCase(i); });
    card.appendChild(btn);
  });

  function openCase(idx){
    const cs=caseStudies[idx];
    inner.innerHTML=`
      <div class="cs-head">
        <div class="cs-head-left">
          <div class="cs-icon-wrap" style="background:${cs.color}1e;border-color:${cs.color}44">${cs.icon}</div>
          <span class="cs-badge" style="color:${cs.color};background:${cs.color}1a;border-color:${cs.color}44">${cs.tag}</span>
          <h2 class="cs-title">${cs.title}</h2>
        </div>
        <a href="${cs.github}" target="_blank" rel="noopener" class="cs-github-link">
          <svg viewBox="0 0 24 24" fill="currentColor" width="15" height="15"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
          View on GitHub
        </a>
      </div>
      <div class="cs-body">
        <div class="cs-text-col">
          <div class="cs-section"><span class="cs-lbl">Problem</span><p>${cs.problem}</p></div>
          <div class="cs-section"><span class="cs-lbl">Approach</span><p>${cs.approach}</p></div>
          <div class="cs-section"><span class="cs-lbl">Results</span><p>${cs.results}</p></div>
        </div>
        <div class="cs-side-col">
          <div>
            <span class="cs-lbl">Metrics</span>
            <div class="cs-metrics-grid" style="margin-top:0.5rem">
              ${cs.metrics.map(m=>`<div class="cs-metric"><span class="csm-v" style="color:${cs.color}">${m.v}</span><span class="csm-l">${m.l}</span></div>`).join('')}
            </div>
          </div>
          <div>
            <span class="cs-lbl">Stack</span>
            <div class="cs-chip-row">${cs.tech.map(t=>`<span class="cs-chip">${t}</span>`).join('')}</div>
          </div>
        </div>
      </div>
      ${renderArch(idx)}
    `;
    overlay.classList.add('open');
    document.body.style.overflow='hidden';
    gsap.set(overlay,{opacity:0});
    gsap.to(overlay,{opacity:1,duration:0.3});
    gsap.fromTo('.case-modal',
      {y:55,scale:0.95},
      {y:0,scale:1,duration:0.45,ease:'back.out(1.3)'}
    );
  }

  function closeCase(){
    gsap.to(overlay,{opacity:0,duration:0.25,
      onComplete(){overlay.classList.remove('open');document.body.style.overflow='';}
    });
  }

  document.getElementById('caseClose').addEventListener('click',closeCase);
  overlay.querySelector('.case-backdrop').addEventListener('click',closeCase);
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&overlay.classList.contains('open')) closeCase();
  });
}

/* ═══════════════════════════════════════════════════
   FEATURE #5 — System Architecture Diagrams
═══════════════════════════════════════════════════ */
const archDiagrams=[
  /* 0 — MechAI */
  [{l:'Input',c:'blue',n:['N-CMAPSS Dataset','21 Sensor Streams']},
   {l:'Preprocessing',c:'teal',n:['Normalisation','Sliding Window','FFT Extract']},
   {l:'Model',c:'orange',n:['LSTM Encoder','Transformer']},
   {l:'Fusion',c:'purple',n:['Feature Concat','Dense Head']},
   {l:'Output',c:'green',n:['RUL Prediction','Anomaly Alert']}],

  /* 1 — Advanced CV Suite */
  [{l:'Input',c:'blue',n:['Camera / Video','Frame Buffer']},
   {l:'Capture',c:'teal',n:['OpenCV Capture','Resize & Flip']},
   {l:'MediaPipe',c:'purple',n:['FaceMesh 468pt','HandTracking 21pt','BlazePose 33pt']},
   {l:'Processing',c:'orange',n:['Landmark Extract','Gesture Logic']},
   {l:'Output',c:'green',n:['AR Overlay','Air Writing Canvas']}],

  /* 2 — MSViTFD */
  [{l:'Input',c:'blue',n:['Vibration Signal','CWRU Dataset']},
   {l:'Decompose',c:'teal',n:['FFT Transform','High-Freq Branch','Low-Freq Branch']},
   {l:'Backbone',c:'purple',n:['Multi-Scale ViT','Dual-Freq Mamba']},
   {l:'Fusion',c:'orange',n:['Cross-Attention','Feature Merge']},
   {l:'Output',c:'green',n:['Fault Class ×10','97.3% Accuracy']}],

  /* 3 — WOA-PINNs */
  [{l:'Input',c:'blue',n:['Pump Sensor Data','Flow / Pressure']},
   {l:'Physics',c:'teal',n:['Navier-Stokes Eqs','Pump Curves']},
   {l:'PINN Loss',c:'orange',n:['Physics Residual','Data-Driven Loss','Composite Loss']},
   {l:'WOA Tuner',c:'purple',n:['Arch Search','Hyperparameter Opt.']},
   {l:'Output',c:'green',n:['Cavitation Detection','91.4% Accuracy']}],

  /* 4 — GearOptix */
  [{l:'Input',c:'blue',n:['Gear Parameters','Load / Torque']},
   {l:'Stress Analysis',c:'teal',n:['Lewis Bending','Hertz Contact','Efficiency Model']},
   {l:'Optimisation',c:'orange',n:['Ratio Cascade','Stage Balancing']},
   {l:'Simulation',c:'purple',n:['Dynamic Analysis','Natural Frequency']},
   {l:'Output',c:'green',n:['AGMA Report','Design Specs']}],

  /* 5 — mechforge */
  [{l:'User Input',c:'blue',n:['Parameters','Unit System']},
   {l:'Router',c:'teal',n:['Module Selector']},
   {l:'Engine',c:'orange',n:['StressStrain','Thermodynamics','FluidMechanics','Dynamics']},
   {l:'Post-process',c:'purple',n:['Unit Converter','Validation']},
   {l:'Output',c:'green',n:['Results + Plots','Error Handling']}],
];

function renderArch(idx){
  const layers=archDiagrams[idx]; if(!layers) return '';
  let h=`<div class="cs-arch-section"><span class="cs-lbl">System Architecture</span><div class="arch-flow">`;
  layers.forEach((layer,li)=>{
    if(li>0) h+=`<div class="arch-arr">→</div>`;
    h+=`<div class="arch-layer"><span class="arch-layer-lbl">${layer.l}</span><div class="arch-nodes-col">`;
    layer.n.forEach(node=>{ h+=`<div class="arch-nd arch-${layer.c}">${node}</div>`; });
    h+=`</div></div>`;
  });
  h+=`</div></div>`;
  return h;
}

/* ═══════════════════════════════════════════════════
   FEATURE #4 — Currently Building Widget
═══════════════════════════════════════════════════ */
const BUILD_CFG={
  repo:'Ownraza1214/FaultDetection-MSViTFD-DualFreqMamba',
};

function initCurrentlyBuilding(){
  const widget=document.getElementById('buildWidget');
  const collapseBtn=document.getElementById('bwCollapse');
  const content=document.getElementById('bwContent');
  const commitEl=document.getElementById('bwLastCommit');
  if(!widget) return;

  /* Collapse / expand */
  collapseBtn.addEventListener('click',()=>{
    const collapsed=content.classList.toggle('collapsed');
    collapseBtn.textContent=collapsed?'+':'−';
  });

  /* Fetch last commit time from GitHub public API */
  fetch(`https://api.github.com/repos/${BUILD_CFG.repo}/commits?per_page=1`)
    .then(r=>r.ok?r.json():null)
    .then(data=>{
      if(!data||!data[0]) return;
      const date=new Date(data[0].commit.author.date);
      const diff=Math.floor((Date.now()-date)/86400000);
      commitEl.textContent=diff===0?'committed today':diff===1?'committed yesterday':`committed ${diff}d ago`;
    })
    .catch(()=>{ commitEl.textContent='active development'; });

  /* Fade in after 2s so it doesn't distract on load */
  widget.style.opacity='0';
  widget.style.transform='translateY(12px)';
  setTimeout(()=>{
    gsap.to(widget,{opacity:1,y:0,duration:0.6,ease:'power2.out'});
  },2200);
}

/* ═══════════════════════════════════════════════════
   FEATURE #2 — Interactive Terminal
═══════════════════════════════════════════════════ */
function initTerminal(){
  const modal  =document.getElementById('terminalModal');
  const output =document.getElementById('termOutput');
  const input  =document.getElementById('termInput');
  const fab    =document.getElementById('termFab');
  const closeBtn=document.getElementById('termClose');
  if(!modal||!output||!input) return;

  let isOpen=false;
  const history=[];
  let histIdx=-1;

  /* ── Commands ── */
  const CMDS={
    help:()=>`<span class="tc-comment"># Available commands</span>
<span class="tc-cmd">whoami</span>          about me in 10 seconds
<span class="tc-cmd">skills</span>          tech stack with proficiency
<span class="tc-cmd">projects</span>        all 6 projects
<span class="tc-cmd">publications</span>    research papers
<span class="tc-cmd">contact</span>         links & availability
<span class="tc-cmd">ls</span>              list portfolio sections
<span class="tc-cmd">uname -a</span>        system info
<span class="tc-cmd">clear</span>           clear terminal
<span class="tc-cmd">exit</span>            close terminal
<span class="tc-dim">─────────────────────────────────</span>
<span class="tc-dim">Hint: try  sudo hire-me</span>`,

    whoami:()=>`<span class="tc-accent">Muhammad Own Raza</span>
<span class="tc-dim">─────────────────────────────────────</span>
Role      <span class="tc-accent">Industrial AI Engineer & Researcher</span>
Uni       PIEAS University, Pakistan
Focus     <span class="tc-green">Fault Detection · Computer Vision · Predictive ML</span>
Status    <span class="tc-green">● Open to full-time & freelance roles</span>
Upwork    Active · International clients
Scholar   2 citations · h-index 1 · 4 papers
<span class="tc-dim">─────────────────────────────────────</span>
<span class="tc-dim">"Making rotating machinery intelligent."</span>`,

    skills:()=>{
      const sk=[
        ['Computer Vision', 92,'OpenCV · MediaPipe · YOLO'],
        ['AI / ML',         88,'PyTorch · TensorFlow · Transformers'],
        ['Mech. Eng.',      85,'FEA · Vibration · SolidWorks'],
        ['Data Science',    82,'NumPy · Pandas · Signal Proc.'],
        ['Programming',     80,'Python · TypeScript · MATLAB'],
        ['Signal Proc.',    78,'FFT · Wavelet · Time-Series'],
      ];
      return sk.map(([n,p,t])=>{
        const filled=Math.round(p/10);
        const bar='<span class="tc-green">'+'█'.repeat(filled)+'</span>'+'<span class="tc-dim">'+'░'.repeat(10-filled)+'</span>';
        return `<span class="tc-accent">${n.padEnd(18)}</span>[${bar}] ${p}%  <span class="tc-dim">${t}</span>`;
      }).join('\n');
    },

    projects:()=>`<span class="tc-dim"># 6 Projects — scroll to #projects for case studies</span>

[01] <span class="tc-accent">MechAI</span>              Turbofan RUL · <span class="tc-green">94.2% accuracy</span>
[02] <span class="tc-accent">Advanced CV Suite</span>   522+ landmarks · <span class="tc-green">60fps real-time</span>
[03] <span class="tc-accent">MSViTFD</span>             Dual-Freq Mamba · <span class="tc-green">97.3% fault accuracy</span>
[04] <span class="tc-accent">WOA-PINNs</span>           Cavitation detection · <span class="tc-green">Published 2026</span>
[05] <span class="tc-accent">GearOptix</span>           Transmission design suite · AGMA validated
[06] <span class="tc-accent">mechforge</span>           Python mech. eng. library on PyPI`,

    publications:()=>`<span class="tc-dim"># Research — scholar.google.com/citations?user=aZGZaqQAAAAJ</span>

[2025] <span class="tc-accent">Physics-Informed DL for PEM Fuel Cell Optimisation</span>
       <span class="tc-green">1 citation</span> · Deep Learning · EV Systems · PINNs

[2025] <span class="tc-accent">Hybrid Transformer-SE-ANN for Flood Risk Assessment</span>
       <span class="tc-green">1 citation</span> · Transformer · Hybrid Models

[2026] <span class="tc-accent">WOA-PINNs for Cavitation Fault Detection</span>
       <span class="tc-dim">Pre-print</span> · PINNs · Metaheuristic Optimisation

[2026] <span class="tc-accent">Balancing Progress and Ethics in AI (Survey)</span>
       <span class="tc-dim">TechRxiv</span> · AI Ethics · Responsible Innovation

Total: <span class="tc-green">4 papers · 2 citations · h-index 1</span>`,

    contact:()=>`<span class="tc-accent">Contact Muhammad Own Raza</span>
<span class="tc-dim">────────────────────────────────────────</span>
Email     <span class="tc-green">bsme2249@pieas.edu.pk</span>
GitHub    <span class="tc-green">github.com/Ownraza1214</span>
LinkedIn  <span class="tc-green">linkedin.com/in/muhammad-own-raza-457261252</span>
Scholar   <span class="tc-green">scholar.google.com/citations?user=aZGZaqQAAAAJ</span>
Upwork    <span class="tc-green">● Available for contracts now</span>
<span class="tc-dim">────────────────────────────────────────</span>
Status    <span class="tc-green">● Open to roles & freelance</span>`,

    ls:()=>`<span class="tc-accent">about</span>/      <span class="tc-accent">experience</span>/  <span class="tc-accent">projects</span>/   <span class="tc-accent">lab</span>/
<span class="tc-accent">research</span>/   <span class="tc-accent">skills</span>/      <span class="tc-accent">resilience</span>/ <span class="tc-accent">contact</span>/`,

    'uname -a':()=>`PIEAS-AI 2.0 MOR-Portfolio #4 SMP Three.js GSAP Python3 PyTorch x86_64 Industrial-Linux`,
    uname:()=>`PIEAS-AI`,
    clear:()=>'__CLEAR__',
    exit:()=>'__CLOSE__',
    q:()=>'__CLOSE__',
  };

  /* Easter eggs */
  const EGGS={
    'sudo hire-me':`<span class="tc-dim">[sudo] password for recruiter:</span>
<span class="tc-green">✓  Authentication successful</span>
<span class="tc-accent">Installing muhammad-own-raza@latest...</span>
<span class="tc-green">████████████████████</span> 100%
<span class="tc-green">✓  Successfully hired! Welcome to the team.</span>
<span class="tc-dim">→  Contact: bsme2249@pieas.edu.pk</span>`,

    'git log --oneline':`<span class="tc-dim">a1b2c3e</span> <span class="tc-accent">feat: MSViTFD v2 dual-frequency Mamba branch</span>
<span class="tc-dim">9f8e7d6</span> feat: WOA-PINN cavitation detection published
<span class="tc-dim">5c4b3a2</span> fix: reduce false positives by 62%
<span class="tc-dim">1a2b3c4</span> feat: 60fps real-time CV landmark tracking
<span class="tc-dim">8d9e0f1</span> init: PIEAS mechanical engineering journey begins`,

    'rm -rf /':`<span class="tc-dim">rm: cannot remove '/':</span> <span class="tc-accent">Permission denied</span>
<span class="tc-dim">(nice try)</span>`,

    'npm install talent':`<span class="tc-accent">npm</span> notice created lockfile package-lock.json
<span class="tc-green">added 1 package</span> in 2.6s

<span class="tc-green">+ talent@∞.0.0</span>  →  <span class="tc-accent">muhammad-own-raza</span>`,

    'python --version':`Python 3.11.4 (PIEAS-AI Edition, Jun 2026)`,
    'python3 --version':`Python 3.11.4 (PIEAS-AI Edition, Jun 2026)`,
    'pwd':`/home/mor/industrial-ai-research`,
    'date':`${new Date().toUTCString()}`,
  };

  /* ── Welcome message ── */
  function showWelcome(){
    output.innerHTML=`<div class="tmo-welcome">┌──────────────────────────────────────────┐
│  MOR Terminal v1.0.0 · PIEAS AI Lab      │
│  Making rotating machinery intelligent.  │
│  Type <span class="tc-cmd">help</span> for available commands.         │
└──────────────────────────────────────────┘</div>`;
  }

  /* ── Process command ── */
  function runCmd(raw){
    const cmd=raw.trim().toLowerCase();
    if(!cmd) return;

    /* Echo the command */
    const block=document.createElement('div');
    block.className='tmo-block';
    const echo=document.createElement('div');
    echo.className='tmo-cmd-echo';
    echo.textContent=raw;
    block.appendChild(echo);

    let result='';
    if(EGGS[cmd]!==undefined) result=EGGS[cmd];
    else if(CMDS[cmd]) result=CMDS[cmd]();
    else result=`<span class="tc-dim">command not found: ${cmd}. Type <span class="tc-cmd">help</span> to see available commands.</span>`;

    if(result==='__CLEAR__'){ output.innerHTML=''; showWelcome(); return; }
    if(result==='__CLOSE__'){ closeTerminal(); return; }

    const res=document.createElement('div');
    res.className='tmo-result';
    res.innerHTML=result;
    block.appendChild(res);
    output.appendChild(block);
    output.scrollTop=output.scrollHeight;
  }

  /* ── Open / close ── */
  function openTerminal(){
    if(isOpen) return;
    isOpen=true;
    modal.classList.add('open');
    if(fab) fab.classList.add('active');
    if(!output.innerHTML.trim()) showWelcome();
    setTimeout(()=>input.focus(),380);
    /* Hide build widget while terminal is open */
    const bw=document.getElementById('buildWidget');
    if(bw) gsap.to(bw,{opacity:0,y:6,duration:0.2});
  }
  function closeTerminal(){
    if(!isOpen) return;
    isOpen=false;
    modal.classList.remove('open');
    if(fab) fab.classList.remove('active');
    const bw=document.getElementById('buildWidget');
    if(bw) gsap.to(bw,{opacity:1,y:0,duration:0.3});
  }
  function toggleTerminal(){ isOpen?closeTerminal():openTerminal(); }

  /* ── Input handling ── */
  input.addEventListener('keydown',e=>{
    if(e.key==='Enter'){
      const val=input.value;
      if(val.trim()) history.unshift(val);
      histIdx=-1;
      runCmd(val);
      input.value='';
    }
    if(e.key==='ArrowUp'){
      e.preventDefault();
      if(histIdx<history.length-1){ histIdx++; input.value=history[histIdx]; }
    }
    if(e.key==='ArrowDown'){
      e.preventDefault();
      if(histIdx>0){ histIdx--; input.value=history[histIdx]; }
      else{ histIdx=-1; input.value=''; }
    }
    if(e.key==='Escape') closeTerminal();
  });

  /* ── Triggers ── */
  document.addEventListener('keydown',e=>{
    /* Backtick ` — don't fire when typing in any input/textarea */
    if(e.key==='`'&&document.activeElement.tagName!=='INPUT'&&document.activeElement.tagName!=='TEXTAREA'){
      e.preventDefault(); toggleTerminal();
    }
    if(e.key==='Escape'&&isOpen) closeTerminal();
  });
  if(fab) fab.addEventListener('click',toggleTerminal);
  if(closeBtn) closeBtn.addEventListener('click',closeTerminal);
  modal.addEventListener('click',e=>{ if(e.target===modal) closeTerminal(); });
}
