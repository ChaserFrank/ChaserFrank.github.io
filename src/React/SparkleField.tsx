import { useEffect, useRef } from "react";

type Spark = {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  phase: number;
  speed: number;
  color: string;
};

const COLORS = ["#a476ff", "#d7c5ff", "#65e8ff", "#ffffff"];

function createSpark(width: number, height: number, index: number): Spark {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.8 + 0.45,
    alpha: Math.random() * 0.55 + 0.25,
    phase: index * 0.73 + Math.random() * Math.PI * 2,
    speed: Math.random() * 0.018 + 0.006,
    color: COLORS[index % COLORS.length],
  };
}

export default function SparkleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let animationFrame = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let sparks: Spark[] = [];
    const pointer = { x: 0.5, y: 0.5, active: false };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      sparks = Array.from({ length: Math.max(55, Math.floor(width / 6)) }, (_, index) => createSpark(width, height, index));
    };

    const drawSpark = (spark: Spark, time: number) => {
      const pulse = (Math.sin(time * spark.speed + spark.phase) + 1) / 2;
      const alpha = spark.alpha * (0.45 + pulse * 0.75);
      const glow = spark.radius * (2.5 + pulse * 2.5);

      context.save();
      context.globalAlpha = alpha * 0.24;
      context.fillStyle = spark.color;
      context.shadowBlur = 18;
      context.shadowColor = spark.color;
      context.beginPath();
      context.arc(spark.x, spark.y, glow, 0, Math.PI * 2);
      context.fill();
      context.restore();

      context.save();
      context.globalAlpha = alpha;
      context.strokeStyle = spark.color;
      context.lineWidth = Math.max(0.6, spark.radius * 0.55);
      context.beginPath();
      context.moveTo(spark.x - glow, spark.y);
      context.lineTo(spark.x + glow, spark.y);
      context.moveTo(spark.x, spark.y - glow);
      context.lineTo(spark.x, spark.y + glow);
      context.stroke();
      context.restore();
    };

    const render = (time: number) => {
      context.clearRect(0, 0, width, height);

      const wash = context.createRadialGradient(width * pointer.x, height * pointer.y, 0, width * pointer.x, height * pointer.y, Math.max(width, height) * 0.72);
      wash.addColorStop(0, "rgba(164, 118, 255, 0.13)");
      wash.addColorStop(0.5, "rgba(63, 43, 102, 0.05)");
      wash.addColorStop(1, "rgba(16, 16, 16, 0)");
      context.fillStyle = wash;
      context.fillRect(0, 0, width, height);

      sparks.forEach((spark) => {
        if (pointer.active) {
          const dx = width * pointer.x - spark.x;
          const dy = height * pointer.y - spark.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            spark.x += dx * 0.0009;
            spark.y += dy * 0.0009;
          }
        }
        drawSpark(spark, time);
      });

      animationFrame = requestAnimationFrame(render);
    };

    const movePointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width;
      pointer.y = (event.clientY - rect.top) / rect.height;
      pointer.active = true;
    };
    const clearPointer = () => { pointer.active = false; };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", movePointer);
    canvas.addEventListener("pointerleave", clearPointer);
    animationFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", movePointer);
      canvas.removeEventListener("pointerleave", clearPointer);
    };
  }, []);

  return <canvas ref={canvasRef} className="sparkle-canvas" aria-hidden="true" />;
}
