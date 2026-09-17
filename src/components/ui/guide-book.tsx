"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ArrowRight, BookOpen, Download, Phone, X } from "lucide-react";
import { SFU_PHONE } from "@/lib/worker-content";

/* Site palette, repeated here because canvas painting can't read CSS variables. */
const NAVY = "#0b2447";
const NAVY_LIGHT = "#1b4a86";
const ORANGE = "#ef7d32";
const PAPER = "#f7f3ea";

/* Book size in world units, and how far the front cover swings open (radians). */
const W = 1.42;
const H = 2.02;
const T = 0.3;
const CT = 0.035;
const OVERHANG = 0.04;
const OPEN_ANGLE = 2.55;

type Paint = (x: CanvasRenderingContext2D, w: number, h: number) => void;

/**
 * The Worker Referral Program Guide as a real 3D book (three.js). Closed, it floats and leans
 * toward the pointer. Opened (click the book or the button), it slides left and swings open to
 * its contents page while a detail panel with the guide's actions pops up beside it, the way a
 * product view does. The canvas is decorative: the chapters are also listed in the page's own
 * markup, and every control here is a real button or link. Escape closes it.
 */
export function GuideBook({ chapters }: { chapters: string[] }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef(false);
  const touched = useRef(false);
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    openRef.current = open;
    // Move focus with the view, but not on first render.
    if (!touched.current) return;
    if (open) closeButtonRef.current?.focus({ preventScroll: true });
    else openButtonRef.current?.focus({ preventScroll: true });
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Links to #open-guide (the "Open the guide" chapter card) bring the book into view and open it.
  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash !== "#open-guide") return;
      history.replaceState(null, "", "#guide-book");
      const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.getElementById("guide-book")?.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "center" });
      touched.current = true;
      setOpen(true);
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  const toggle = (next: boolean) => {
    touched.current = true;
    setOpen(next);
  };

  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;

    let cancelled = false;
    let cleanup = () => {};

    // Paint the covers only once the site font has loaded, or the canvas text falls back.
    void document.fonts.ready.then(() => {
      if (cancelled) return;
      cleanup = buildScene(stage, canvas, chapters, openRef, () => setFailed(true), () => {
        touched.current = true;
        setOpen((o) => !o);
      });
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [chapters]);

  return (
    <div className="guide-book" data-open={open ? "true" : undefined}>
      <div ref={stageRef} className="guide-book-stage">
        {failed ? (
          // No WebGL: a flat cover in the same colours, so the section never renders empty.
          <div className="guide-book-fallback" aria-hidden="true">
            <strong>RELIABLE</strong>
            <span>Worker Referral Program Guide</span>
            <em>Snow fighter edition</em>
          </div>
        ) : (
          <canvas ref={canvasRef} className="guide-book-canvas" aria-hidden="true" />
        )}
      </div>

      <button ref={openButtonRef} type="button" className="guide-book-toggle" aria-expanded={open} aria-controls="guide-detail" onClick={() => toggle(true)}>
        <BookOpen aria-hidden="true" /> Open the guide
      </button>

      {/* Pops up beside the open book. Inert while closed, so it can't be tabbed into. */}
      <div className="guide-detail" id="guide-detail" role="region" aria-labelledby="guide-detail-title" inert={!open}>
        <button ref={closeButtonRef} type="button" className="guide-detail-close" aria-label="Close the guide" onClick={() => toggle(false)}>
          <X aria-hidden="true" />
        </button>
        <p className="guide-detail-kicker">Snow fighter edition</p>
        <h2 id="guide-detail-title">Worker referral <em>program guide.</em></h2>
        <p className="guide-detail-lede">How referring a snow fighter works, what you earn for every hour they work, the positions, next day pay, safety and the program&apos;s rules.</p>
        <dl className="guide-detail-meta">
          <div><dt>{chapters.length}</dt><dd>chapters</dd></div>
          <div><dt>PDF</dt><dd>available at launch</dd></div>
          <div><dt>Since 1986</dt><dd>40+ years of Reliable</dd></div>
        </dl>
        <div className="guide-detail-actions">
          <button type="button" className="guide-detail-download" disabled>
            <Download aria-hidden="true" /> Download PDF
          </button>
          <a className="guide-detail-refer" href="/refer-a-worker#referral-form">
            Refer a worker <ArrowRight aria-hidden="true" />
          </a>
          <a className="guide-detail-call" href={SFU_PHONE.href} aria-label={`Call SFU ${SFU_PHONE.label}`}>
            <Phone aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}

function buildScene(
  stage: HTMLDivElement,
  canvas: HTMLCanvasElement,
  chapters: string[],
  openRef: { current: boolean },
  onFail: () => void,
  onToggle: () => void,
) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const font = getComputedStyle(document.body).fontFamily;

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch {
    onFail();
    return () => {};
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 50);
  camera.position.set(0, -0.03, 7.4);

  scene.add(new THREE.HemisphereLight(0xdbe8ff, 0x0b1a33, 1.1));
  const key = new THREE.DirectionalLight(0xffffff, 1.9);
  key.position.set(3, 4, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xffb27a, 0.8);
  rim.position.set(-3.5, 2, -4);
  scene.add(rim);

  const disposables: { dispose(): void }[] = [];
  const track = <D extends { dispose(): void }>(d: D) => {
    disposables.push(d);
    return d;
  };
  const texture = (w: number, h: number, draw: Paint) => {
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    draw(c.getContext("2d")!, w, h);
    const t = track(new THREE.CanvasTexture(c));
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = renderer.capabilities.getMaxAnisotropy();
    return t;
  };
  const mat = (params: THREE.MeshStandardMaterialParameters) =>
    track(new THREE.MeshStandardMaterial({ roughness: 0.62, metalness: 0.02, ...params }));

  /* ---------- painted surfaces ---------- */
  const setFont = (x: CanvasRenderingContext2D, spec: string) => {
    x.font = `${spec} ${font}`;
  };
  const speckle = (x: CanvasRenderingContext2D, w: number, h: number, alpha: number) => {
    x.fillStyle = `rgba(255,255,255,${alpha})`;
    for (let i = 0; i < 260; i++) x.fillRect(Math.random() * w, Math.random() * h, 2, 2);
  };

  const front = texture(1024, 1456, (x, w, h) => {
    const g = x.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, NAVY_LIGHT);
    g.addColorStop(1, NAVY);
    x.fillStyle = g;
    x.fillRect(0, 0, w, h);
    speckle(x, w, h, 0.05);
    x.textAlign = "center";
    x.fillStyle = "white";
    setFont(x, "italic 800 168px");
    x.fillText("RELIABLE", w / 2, 250);
    // Slanted white band under the wordmark, as on the company's signage.
    x.beginPath();
    x.moveTo(170, 290);
    x.lineTo(w - 130, 290);
    x.lineTo(w - 170, 370);
    x.lineTo(130, 370);
    x.closePath();
    x.fill();
    x.fillStyle = NAVY;
    setFont(x, "700 54px");
    x.fillText("Snow Plowing Specialists", w / 2, 350);
    x.fillStyle = "white";
    setFont(x, "800 104px");
    x.fillText("WORKER REFERRAL", w / 2, 600);
    x.fillText("PROGRAM GUIDE", w / 2, 715);
    x.fillStyle = "rgba(255,255,255,.55)";
    x.fillRect(150, 770, w - 300, 3);
    x.fillRect(150, 870, w - 300, 3);
    x.fillStyle = "white";
    setFont(x, "600 46px");
    x.fillText("OVERVIEW  •  RULES  •  RATES", w / 2, 838);
    x.fillStyle = ORANGE;
    x.beginPath();
    x.moveTo(90, 950);
    x.lineTo(w - 60, 950);
    x.lineTo(w - 110, 1060);
    x.lineTo(90, 1060);
    x.closePath();
    x.fill();
    x.fillStyle = "white";
    setFont(x, "800 58px");
    x.fillText("SNOW FIGHTER EDITION", w / 2 - 10, 1026);
    x.fillStyle = "rgba(255,255,255,.72)";
    setFont(x, "600 44px");
    x.fillText("40+ years  ·  since 1986", w / 2, 1330);
    x.strokeStyle = "rgba(255,255,255,.22)";
    x.lineWidth = 4;
    x.strokeRect(46, 46, w - 92, h - 92);
  });

  const back = texture(1024, 1456, (x, w, h) => {
    x.fillStyle = NAVY;
    x.fillRect(0, 0, w, h);
    speckle(x, w, h, 0.04);
    x.textAlign = "center";
    x.fillStyle = "white";
    setFont(x, "italic 800 110px");
    x.fillText("RELIABLE", w / 2, 300);
    x.fillStyle = "rgba(255,255,255,.2)";
    for (let i = 0; i < 7; i++) x.fillRect(170, 460 + i * 62, i === 6 ? 420 : w - 340, 16);
    x.fillStyle = ORANGE;
    x.fillRect(w / 2 - 60, 960, 120, 8);
    x.fillStyle = "rgba(255,255,255,.8)";
    setFont(x, "600 44px");
    x.fillText("reliablesnowplowing.net", w / 2, 1320);
  });

  const spine = texture(256, 1456, (x, w, h) => {
    x.fillStyle = NAVY;
    x.fillRect(0, 0, w, h);
    x.fillStyle = ORANGE;
    x.fillRect(0, h - 200, w, 120);
    x.save();
    x.translate(w / 2, h / 2);
    x.rotate(Math.PI / 2);
    x.textAlign = "center";
    x.fillStyle = "white";
    setFont(x, "800 50px");
    x.fillText("WORKER REFERRAL PROGRAM GUIDE", 30, 18);
    x.restore();
    x.fillStyle = "white";
    x.textAlign = "center";
    setFont(x, "italic 800 44px");
    x.save();
    x.translate(w / 2, 120);
    x.rotate(Math.PI / 2);
    x.fillText("RELIABLE", 0, 15);
    x.restore();
  });

  const endpaper = texture(512, 728, (x, w, h) => {
    x.fillStyle = "#e9f3fb";
    x.fillRect(0, 0, w, h);
    x.fillStyle = "rgba(11,36,71,.035)";
    x.textAlign = "center";
    setFont(x, "italic 800 90px");
    for (let row = 0; row < 7; row++) x.fillText("RELIABLE", w / 2 + (row % 2 ? 60 : -60), 110 + row * 100);
  });

  const contents = texture(1024, 1456, (x, w, h) => {
    x.fillStyle = PAPER;
    x.fillRect(0, 0, w, h);
    x.fillStyle = "rgba(120,100,70,.06)";
    for (let i = 0; i < 1400; i++) x.fillRect(Math.random() * w, Math.random() * h, 1.4, 1.4);
    x.fillStyle = NAVY;
    x.textAlign = "left";
    setFont(x, "800 92px");
    x.fillText("Contents", 120, 230);
    x.fillStyle = ORANGE;
    x.fillRect(120, 268, 150, 8);
    chapters.forEach((title, i) => {
      const y = 420 + i * 132;
      x.fillStyle = ORANGE;
      setFont(x, "800 44px");
      x.fillText(String(i + 1).padStart(2, "0"), 120, y);
      x.fillStyle = NAVY;
      setFont(x, "600 46px");
      x.fillText(title, 220, y);
      x.fillStyle = "rgba(11,36,71,.14)";
      x.fillRect(120, y + 36, w - 240, 2);
    });
    x.fillStyle = "rgba(11,36,71,.5)";
    setFont(x, "600 34px");
    x.fillText("Worker Referral Program Guide", 120, h - 110);
  });

  const edgeLines = texture(512, 64, (x, w, h) => {
    x.fillStyle = PAPER;
    x.fillRect(0, 0, w, h);
    for (let py = 0; py < h; py += 2) {
      x.fillStyle = `rgba(150,130,100,${0.08 + Math.random() * 0.12})`;
      x.fillRect(0, py, w, 1);
    }
  });

  const shadowTex = texture(256, 256, (x, w, h) => {
    const g = x.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2);
    g.addColorStop(0, "rgba(11,36,71,.42)");
    g.addColorStop(0.45, "rgba(11,36,71,.16)");
    g.addColorStop(1, "rgba(11,36,71,0)");
    x.fillStyle = g;
    x.fillRect(0, 0, w, h);
  });

  /* ---------- geometry ---------- */
  const navyMat = mat({ color: NAVY, roughness: 0.55 });
  const paperMat = mat({ color: PAPER, roughness: 0.9, emissive: PAPER, emissiveIntensity: 0.12 });
  const edgeMat = mat({ map: edgeLines, roughness: 0.92 });

  const book = new THREE.Group();
  scene.add(book);

  const coverGeo = track(new THREE.BoxGeometry(W + OVERHANG, H + OVERHANG * 2, CT));
  // BoxGeometry faces: +x, -x, +y, -y, +z, -z.
  const backCover = new THREE.Mesh(coverGeo, [navyMat, navyMat, navyMat, navyMat, mat({ map: endpaper, roughness: 0.85, emissive: 0xffffff, emissiveMap: endpaper, emissiveIntensity: 0.15 }), mat({ map: back })]);
  backCover.position.set(OVERHANG / 2, 0, -(T / 2 + CT / 2));
  book.add(backCover);

  const block = new THREE.Mesh(track(new THREE.BoxGeometry(W - 0.03, H - 0.02, T)), [
    edgeMat, paperMat, edgeMat, edgeMat, mat({ map: contents, roughness: 0.88, emissive: 0xffffff, emissiveMap: contents, emissiveIntensity: 0.22 }), paperMat,
  ]);
  block.position.x = 0.005;
  book.add(block);

  const spineMesh = new THREE.Mesh(track(new THREE.BoxGeometry(0.045, H + OVERHANG * 2, T + CT * 2)), [
    navyMat, mat({ map: spine, roughness: 0.6 }), navyMat, navyMat, navyMat, navyMat,
  ]);
  spineMesh.position.x = -W / 2 - 0.022;
  book.add(spineMesh);

  // The front cover hangs from a hinge on the spine, so it can swing open.
  const hinge = new THREE.Group();
  hinge.position.set(-W / 2 - 0.02, 0, T / 2 + CT / 2);
  const frontCover = new THREE.Mesh(coverGeo, [navyMat, navyMat, navyMat, navyMat, mat({ map: front, roughness: 0.5 }), mat({ map: endpaper, roughness: 0.85, emissive: 0xffffff, emissiveMap: endpaper, emissiveIntensity: 0.15 })]);
  frontCover.position.x = (W + OVERHANG) / 2 + 0.02;
  hinge.add(frontCover);
  book.add(hinge);

  const shadow = new THREE.Mesh(track(new THREE.PlaneGeometry(1, 1)), track(new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false })));
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.set(0, -H / 2 - 0.22, 0);
  shadow.scale.set(2.4, 1.6, 1);
  scene.add(shadow);

  /* ---------- interaction ---------- */
  const pointer = { x: 0, y: 0, inside: false };
  const onMove = (e: PointerEvent) => {
    const r = stage.getBoundingClientRect();
    pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
    pointer.y = -(((e.clientY - r.top) / r.height) * 2 - 1);
    pointer.inside = true;
  };
  const onLeave = () => {
    pointer.inside = false;
  };
  const onClick = () => onToggle();
  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerleave", onLeave);
  canvas.addEventListener("click", onClick);

  /* ---------- sizing ---------- */
  let fit = 1;
  const resize = () => {
    const { width, height } = stage.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    // Narrow stages pull the camera back so the open spread still fits.
    fit = 1 / Math.min(1, camera.aspect / 0.95);
    camera.updateProjectionMatrix();
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(stage);
  resize();

  /* ---------- loop ---------- */
  let visible = true;
  const visibility = new IntersectionObserver(([entry]) => {
    visible = entry?.isIntersecting ?? true;
  });
  visibility.observe(stage);

  const state = { open: 0, tiltX: 0, tiltY: 0 };
  const approach = (value: number, target: number, rate: number, dt: number) => value + (target - value) * (1 - Math.exp(-rate * dt));
  let last = performance.now();
  let raf = 0;

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (!visible) return;
    const t = now / 1000;

    state.open = reduce ? (openRef.current ? 1 : 0) : approach(state.open, openRef.current ? 1 : 0, 4.2, dt);
    const leanY = pointer.inside && !reduce ? pointer.x * 0.22 : 0;
    const leanX = pointer.inside && !reduce ? -pointer.y * 0.12 : 0;
    state.tiltY = approach(state.tiltY, leanY, 6, dt);
    state.tiltX = approach(state.tiltX, leanX, 6, dt);

    const o = state.open;
    // Ease the swing so the cover lifts off gently and settles flat.
    const swing = o * o * (3 - 2 * o);
    hinge.rotation.y = -swing * OPEN_ANGLE;
    // Closed: turned to show the spine, close to the camera. Open: square on, pulled back so the whole spread fits.
    book.rotation.y = 0.42 * (1 - swing) + 0.06 * swing + state.tiltY;
    camera.position.z = (5.6 + swing * 1.6) * fit;
    book.rotation.x = 0.05 + state.tiltX;
    book.rotation.z = reduce ? 0 : Math.sin(t * 0.7) * 0.012 * (1 - swing);
    book.position.x = swing * (W * 0.5);
    book.position.y = reduce ? 0 : Math.sin(t * 0.9) * 0.05;
    shadow.position.x = book.position.x;
    shadow.scale.x = 2.4 + swing * 0.2;
    (shadow.material as THREE.MeshBasicMaterial).opacity = 0.55 - (book.position.y + 0.05) * 1.5;

    renderer.render(scene, camera);
  };
  raf = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(raf);
    resizeObserver.disconnect();
    visibility.disconnect();
    canvas.removeEventListener("pointermove", onMove);
    canvas.removeEventListener("pointerleave", onLeave);
    canvas.removeEventListener("click", onClick);
    disposables.forEach((d) => d.dispose());
    renderer.dispose();
  };
}
