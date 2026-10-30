"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp, Gamepad2, Pause, Play, RotateCcw, X } from "lucide-react";

export type Game = "breaker" | "snake" | "runner";
type Status = "ready" | "playing" | "paused" | "over" | "won";
type Point = { x: number; y: number };
const W = 720, H = 400;
export const games: { id: Game; name: string; hint: string; description: string }[] = [
  { id: "breaker", name: "Brick Breaker", hint: "This wall looks breakable.", description: "One paddle. One ball. Absolutely no meetings." },
  { id: "snake", name: "Snake", hint: "Something’s hiding in the grid.", description: "A familiar little obsession. Just one more bite." },
  { id: "runner", name: "Jump Runner", hint: "Careful. The floor is moving.", description: "Tiny jumps. Big ambitions. Watch the landing." },
];

export function Arcade() {
  const [active, setActive] = useState<Game | null>(null);
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("portfolio:arcade-state", { detail: Boolean(active) }));
    window.dispatchEvent(new Event("portfolio:layout"));
    if (!active) return;
    const frame = requestAnimationFrame(() => {
      const target = document.getElementById("arcade-player");
      if (target) {
        target.scrollIntoView({ behavior: "instant", block: "start" });
        window.dispatchEvent(new CustomEvent("portfolio:game-open", { detail: target }));
      }
    });
    return () => cancelAnimationFrame(frame);
  }, [active]);
  const openingButton = useRef<HTMLButtonElement | null>(null);
  const close = () => { setActive(null); openingButton.current?.focus({ preventScroll: true }); };
  return (
    <div className="arcade" data-lenis-prevent>
      <div className="arcade-discoveries">
        {games.map((game, i) => <button key={game.id} className={`arcade-discovery discovery-${game.id} ${active === game.id ? "is-selected" : ""}`} onClick={(event) => { openingButton.current = event.currentTarget; setActive(game.id); }} aria-expanded={active === game.id} aria-controls="arcade-player">
          <div className="discovery-top"><span>HIDDEN IN PLAIN SIGHT / 0{i + 1}</span><Gamepad2 size={18} /></div>
          <div className="game-preview" aria-hidden="true">{game.id === "breaker" ? <><div className="preview-bricks">{Array.from({ length: 15 }, (_, n) => <i key={n} />)}</div><i className="preview-ball" /><i className="preview-paddle" /></> : game.id === "snake" ? <div className="preview-snake"><i /><i /><i /><i /><i /><b /></div> : <><i className="preview-runner" /><i className="preview-obstacle" /><i className="preview-ground" /></>}</div>
          <span className="discovery-hint">{game.hint}</span><span className="discovery-title">{game.name}<ArrowRight size={22} /></span><span className="discovery-description">{game.description}</span><span className="discovery-action">{active === game.id ? "PLAYING HERE" : "TAP TO DISCOVER"} <ArrowDown size={13} /></span>
        </button>)}
      </div>
      {active && <ArcadePlayer key={active} game={active} onClose={close} />}
    </div>
  );
}

export function ArcadePlayer({ game, onClose }: { game: Game; onClose: () => void }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const region = useRef<HTMLDivElement>(null);
  const controls = useRef({ left: false, right: false, jump: false, direction: { x: 1, y: 0 }, pointer: -1 });
  const statusRef = useRef<Status>("ready");
  const [status, setStatus] = useState<Status>("ready");
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [round, setRound] = useState(0);
  const scoreRef = useRef(0);
  const bestRef = useRef(0);
  const wake = useRef<() => void>(() => {});
  const updateStatus = (value: Status) => { statusRef.current = value; setStatus(value); };
  const restart = () => { scoreRef.current = 0; setScore(0); controls.current = { left: false, right: false, jump: false, direction: { x: 1, y: 0 }, pointer: -1 }; setRound(n => n + 1); updateStatus("playing"); region.current?.focus({ preventScroll: true }); };

  useEffect(() => {
    region.current?.focus({ preventScroll: true });
    try { const saved = Number(localStorage.getItem(`sriram-arcade-${game}`)); bestRef.current = Number.isFinite(saved) ? Math.max(0, saved) : 0; } catch { /* Storage is optional. */ }
    // Persisted scores are read after hydration, never during the initial render.
    setBest(bestRef.current);
  }, [game]);

  useEffect(() => {
    const element = canvas.current;
    const ctx = element?.getContext("2d");
    if (!element || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    element.width = W * dpr; element.height = H * dpr;
    ctx.scale(dpr, dpr);
    let raf = 0, last = 0, snakeClock = 0, obstacleClock = 0;
    let paddle = 305;
    const ball = { x: 360, y: 280, vx: 210, vy: -230 };
    const bricks = Array.from({ length: 32 }, (_, i) => ({ x: 36 + (i % 8) * 82, y: 48 + Math.floor(i / 8) * 27, alive: true }));
    let snake: Point[] = [{ x: 8, y: 10 }, { x: 7, y: 10 }, { x: 6, y: 10 }];
    let direction = { x: 1, y: 0 }, food = { x: 22, y: 10 };
    let runnerY = 312, velocity = 0, distance = 0;
    let obstacles: { x: number; w: number; h: number; passed: boolean }[] = [];

    const award = (points: number) => { scoreRef.current += points; setScore(scoreRef.current); };
    const finish = (won = false) => {
      statusRef.current = won ? "won" : "over"; setStatus(statusRef.current);
      if (scoreRef.current > bestRef.current) {
        bestRef.current = scoreRef.current; setBest(bestRef.current);
        try { localStorage.setItem(`sriram-arcade-${game}`, String(bestRef.current)); } catch { /* Private browsing can disable storage. */ }
      }
    };
    const resetInput = () => { controls.current.left = false; controls.current.right = false; controls.current.jump = false; };
    const pause = () => { resetInput(); if (statusRef.current === "playing") { statusRef.current = "paused"; setStatus("paused"); } };
    const visibility = () => { if (document.hidden) pause(); };
    const observer = new IntersectionObserver(([entry]) => { if (!entry.isIntersecting) pause(); }, { threshold: 0.1 });
    observer.observe(region.current ?? element);
    document.addEventListener("visibilitychange", visibility);
    window.addEventListener("blur", pause);

    function draw(time: number) {
      raf = 0;
      if (!ctx) return;
      const dt = Math.min((time - (last || time)) / 1000, 0.032); last = time;
      const playing = statusRef.current === "playing";
      if (playing && game === "breaker") {
        paddle = controls.current.pointer >= 0 ? Math.max(0, Math.min(W - 110, controls.current.pointer - 55)) : Math.max(0, Math.min(W - 110, paddle + (Number(controls.current.right) - Number(controls.current.left)) * 440 * dt));
        const oldY = ball.y;
        ball.x += ball.vx * dt; ball.y += ball.vy * dt;
        if (ball.x < 8) { ball.x = 8; ball.vx = Math.abs(ball.vx); }
        if (ball.x > W - 8) { ball.x = W - 8; ball.vx = -Math.abs(ball.vx); }
        if (ball.y < 8) { ball.y = 8; ball.vy = Math.abs(ball.vy); }
        if (ball.vy > 0 && oldY <= 343 && ball.y >= 338 && ball.y <= 358 && ball.x >= paddle - 6 && ball.x <= paddle + 116) { ball.y = 337; ball.vy = -Math.abs(ball.vy); ball.vx = ((ball.x - paddle - 55) / 55) * 290; }
        for (const brick of bricks) {
          if (brick.alive && ball.x + 7 > brick.x && ball.x - 7 < brick.x + 74 && ball.y + 7 > brick.y && ball.y - 7 < brick.y + 19) { brick.alive = false; ball.vy *= -1; award(10); break; }
        }
        if (bricks.every(b => !b.alive)) finish(true);
        else if (ball.y > H + 10) finish();
      }
      if (playing && game === "snake") {
        snakeClock += dt;
        if (snakeClock >= Math.max(0.075, 0.14 - scoreRef.current * 0.0004)) {
          snakeClock = 0;
          const requested = controls.current.direction;
          if (requested.x !== -direction.x || requested.y !== -direction.y) direction = { ...requested };
          const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
          const eating = head.x === food.x && head.y === food.y;
          const body = eating ? snake : snake.slice(0, -1);
          if (head.x < 0 || head.x >= 36 || head.y < 0 || head.y >= 20 || body.some(p => p.x === head.x && p.y === head.y)) finish();
          else {
            snake = [head, ...snake];
            if (eating) {
              award(10);
              const free: Point[] = [];
              for (let y = 0; y < 20; y++) for (let x = 0; x < 36; x++) if (!snake.some(p => p.x === x && p.y === y)) free.push({ x, y });
              if (!free.length) finish(true); else food = free[Math.floor(Math.random() * free.length)];
            } else snake.pop();
          }
        }
      }
      if (playing && game === "runner") {
        if (controls.current.jump && runnerY >= 312) velocity = -530;
        controls.current.jump = false;
        velocity += 1450 * dt; runnerY = Math.min(312, runnerY + velocity * dt);
        if (runnerY === 312) velocity = 0;
        distance += dt * 240; obstacleClock += dt;
        if (obstacleClock > 1.45) { obstacleClock = 0; obstacles.push({ x: W + 20, w: 22 + Math.random() * 16, h: 30 + Math.random() * 26, passed: false }); }
        for (const obstacle of obstacles) {
          obstacle.x -= (280 + Math.min(scoreRef.current * 2, 170)) * dt;
          if (!obstacle.passed && obstacle.x + obstacle.w < 90) { obstacle.passed = true; award(10); }
          if (90 + 26 > obstacle.x && 94 < obstacle.x + obstacle.w && runnerY + 28 > 340 - obstacle.h && runnerY < 340) finish();
        }
        obstacles = obstacles.filter(o => o.x > -60);
      }

      ctx.fillStyle = "#101010"; ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "#1b1b1b"; ctx.lineWidth = 1;
      for (let x = 0; x <= W; x += 20) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); }
      for (let y = 0; y <= H; y += 20) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
      if (game === "breaker") {
        bricks.forEach((brick, i) => { if (brick.alive) { ctx.fillStyle = i < 8 ? "#e34b45" : i < 16 ? "#b52c29" : i < 24 ? "#7d2927" : "#4d2423"; ctx.fillRect(brick.x, brick.y, 74, 19); } });
        ctx.fillStyle = "#e7e5d8"; ctx.fillRect(paddle, 348, 110, 9); ctx.beginPath(); ctx.arc(ball.x, ball.y, 7, 0, Math.PI * 2); ctx.fill();
      } else if (game === "snake") {
        snake.forEach((p, i) => { ctx.fillStyle = i === 0 ? "#e7e5d8" : "#d94b45"; ctx.fillRect(p.x * 20 + 2, p.y * 20 + 2, 16, 16); });
        ctx.fillStyle = "#e7e5d8"; ctx.beginPath(); ctx.arc(food.x * 20 + 10, food.y * 20 + 10, 6, 0, Math.PI * 2); ctx.fill();
      } else {
        ctx.fillStyle = "#e7e5d8"; ctx.fillRect(90, runnerY, 28, 28); ctx.fillStyle = "#101010"; ctx.fillRect(109, runnerY + 5, 4, 4);
        ctx.fillStyle = "#d94b45"; obstacles.forEach(o => ctx.fillRect(o.x, 340 - o.h, o.w, o.h));
        ctx.fillStyle = "#777"; ctx.fillRect(0, 340, W, 1);
        for (let i = 0; i < 15; i++) ctx.fillRect((i * 60 - distance % 60), 357, 18, 2);
      }
      // A static ready/paused board does not consume a perpetual animation loop.
      if (statusRef.current === "playing") raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);
    wake.current = () => { if (!raf) { last = 0; raf = requestAnimationFrame(draw); } };
    return () => { cancelAnimationFrame(raf); wake.current = () => {}; observer.disconnect(); document.removeEventListener("visibilitychange", visibility); window.removeEventListener("blur", pause); };
  }, [game, round]);

  useEffect(() => { if (status === "playing") wake.current(); }, [status]);

  const heading = games.find(g => g.id === game)!.name;
  const key = (event: React.KeyboardEvent, down: boolean) => {
    if (event.key === "Escape" && down) { onClose(); return; }
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " ", "a", "d", "w", "s"].includes(event.key)) {
      event.preventDefault();
      if (event.key === "ArrowLeft" || event.key === "a") { controls.current.left = down; if (down) controls.current.direction = { x: -1, y: 0 }; }
      if (event.key === "ArrowRight" || event.key === "d") { controls.current.right = down; if (down) controls.current.direction = { x: 1, y: 0 }; }
      if (down && (event.key === "ArrowUp" || event.key === "w")) controls.current.direction = { x: 0, y: -1 };
      if (down && (event.key === "ArrowDown" || event.key === "s")) controls.current.direction = { x: 0, y: 1 };
      if (down && !event.repeat && [" ", "ArrowUp", "w"].includes(event.key)) controls.current.jump = true;
    }
  };
  return (
    <div id="arcade-player" ref={region} className="arcade-player" tabIndex={-1} role="region" aria-label={`${heading} game`} onKeyDown={event => { if (event.key === "Escape") { event.preventDefault(); onClose(); } else if (event.target === region.current || event.target === canvas.current) key(event, true); }} onKeyUp={event => { if (event.target === region.current || event.target === canvas.current) key(event, false); }} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) { controls.current.left = false; controls.current.right = false; if (statusRef.current === "playing") updateStatus("paused"); } }}>
      <div className="player-top"><span><Gamepad2 size={18} />{heading}</span><div className="player-scores"><span>SCORE <b>{score.toString().padStart(3, "0")}</b></span><span>BEST <b>{best.toString().padStart(3, "0")}</b></span><button onClick={onClose} aria-label="Close game"><X size={20} /></button></div></div>
      <div className="canvas-wrap">
        <canvas ref={canvas} aria-label={game === "snake" ? "Snake board. Use arrow keys or on-screen arrows to collect food." : game === "breaker" ? "Brick Breaker board. Move the paddle with arrows or your pointer." : "Runner board. Press Space, Up, or tap to jump."} onPointerMove={event => { if (game === "breaker") controls.current.pointer = (event.clientX - event.currentTarget.getBoundingClientRect().left) / event.currentTarget.getBoundingClientRect().width * W; }} onPointerLeave={() => { controls.current.pointer = -1; }} onPointerDown={event => { if (game === "runner") controls.current.jump = true; if (game === "breaker") controls.current.pointer = (event.clientX - event.currentTarget.getBoundingClientRect().left) / event.currentTarget.getBoundingClientRect().width * W; region.current?.focus({ preventScroll: true }); }} />
        {status !== "playing" && <div className="game-overlay"><span>{status === "ready" ? "A SMALL DETOUR" : status === "paused" ? "TAKE YOUR TIME" : status === "won" ? "NICELY DONE" : "ONE MORE TRY?"}</span><h3>{status === "ready" ? "Ready, player?" : status === "paused" ? "On pause." : status === "won" ? "You cleared it." : "That was close."}</h3><p>{status === "ready" ? game === "breaker" ? "Move the paddle. Clear the wall." : game === "snake" ? "Find a bite. Don’t bite yourself." : "Jump the obstacles. Keep going." : `Score ${score} · Personal best ${best}`}</p><button className="home-button" onClick={() => { if (status === "paused") { updateStatus("playing"); region.current?.focus({ preventScroll: true }); } else restart(); }}><Play size={16} />{status === "paused" ? "Resume" : status === "ready" ? "Let’s play" : "Play again"}</button></div>}
      </div>
      <div className="player-controls"><span>{game === "breaker" ? "← → OR MOVE / DRAG" : game === "snake" ? "ARROW KEYS / WASD" : "SPACE / ↑ / TAP TO JUMP"}</span><div>{status === "playing" && <button onClick={() => updateStatus("paused")} aria-label="Pause game"><Pause size={17} /></button>}<button onClick={restart} aria-label="Restart game"><RotateCcw size={17} /></button></div></div>
      <div className="touch-controls">{game === "runner" ? <button onClick={() => { controls.current.jump = true; region.current?.focus({ preventScroll: true }); }}>JUMP <ArrowUp size={18} /></button> : <>{(game === "snake" ? ["left", "up", "down", "right"] : ["left", "right"]).map(direction => <button key={direction} aria-label={`Move ${direction}`} onPointerDown={event => { event.currentTarget.setPointerCapture(event.pointerId); controls.current.pointer = -1; if (direction === "left") controls.current.left = true; if (direction === "right") controls.current.right = true; controls.current.direction = direction === "left" ? { x: -1, y: 0 } : direction === "right" ? { x: 1, y: 0 } : direction === "up" ? { x: 0, y: -1 } : { x: 0, y: 1 }; }} onPointerUp={() => { controls.current.left = false; controls.current.right = false; }} onPointerCancel={() => { controls.current.left = false; controls.current.right = false; }}>{direction === "left" ? <ArrowLeft size={20} /> : direction === "right" ? <ArrowRight size={20} /> : direction === "up" ? <ArrowUp size={20} /> : <ArrowDown size={20} />}</button>)}</>}</div>
      <p className="sr-only" aria-live="polite">{status === "over" || status === "won" ? `${status === "won" ? "You won" : "Game over"}. Score ${score}. Best ${best}.` : status === "paused" ? "Game paused" : ""}</p>
    </div>
  );
}
