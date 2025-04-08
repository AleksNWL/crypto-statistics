import { useRef, useEffect} from "react";


const StarryBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const countStars = 150;

        for (let i = 0; i < countStars; i++) {
            const placeX = Math.random() * canvas.width;
            const placeY = Math.random() * canvas.height;

            ctx.beginPath();
            ctx.arc(placeX, placeY, 2, 0, 2 * Math.PI);
            ctx.fillStyle = "#fff"
            ctx.fill();
        }
    }, [])
    return <canvas ref={canvasRef} width={400} height={400} style={{border: "1px solid white"}}/>;
}
export default StarryBackground;