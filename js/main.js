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
  const phrases=['Predictive Maintenance','Computer Vision','Fault Detection AI','Physics-Informed ML','Mechanical Engineering','AI Engineering'];
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
