import { useRef, useEffect} from "react";


const StarryBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const starsRef = useRef<{x: number, y: number, baseRadius: number, speed: number, offset: number}[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const countStars = 500;
        const stars = starsRef.current;

        const initStars = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            if (stars.length === 0) {
                for (let i = 0; i < countStars; i++) {
                    stars.push({
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        baseRadius: Math.random() * 2,
                        speed: Math.random() * 0.5 + .5,
                        offset: Math.random() * Math.PI * 0.5,
                    });
                }
            } else {
                for (let i = 0; i < stars.length; i++) {
                    stars[i].x = Math.random() * canvas.width;
                    stars[i].y = Math.random() * canvas.height;
                }
            }
        }

        initStars();

        const animate = (time: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < stars.length; i++) {
                const star = stars[i];
                star.x += star.speed;

                if (star.x > canvas.width) {
                    star.x = 0;
                    star.y = Math.random() * canvas.height;
                }

                const twinkle: number = Math.sin(time * 0.005 + star.offset) * 0.5 + 0.5;
                const radius: number = star.baseRadius * (twinkle * 0.5 + 0.75);

                ctx.beginPath();
                ctx.arc(star.x, star.y, radius, 0, Math.PI * 2);
                ctx.fillStyle = "#fff"
                ctx.fill();
            }
            requestAnimationFrame(animate);
        };
        const animationID = requestAnimationFrame(animate);

        const handleResize = () => {
            initStars();
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationID)
        }
    }, [])
    return <canvas ref={canvasRef} style={{position: "fixed", zIndex: -1}} />;
}
export default StarryBackground;