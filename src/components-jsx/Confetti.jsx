// Confetti.jsx
import React, { useEffect } from 'react';

const Confetti = () => {
    useEffect(() => {
        const canvas = document.getElementById('canvas');
        const context = canvas.getContext('2d');
        let W = window.innerWidth;
        let H = window.innerHeight;
        canvas.width = W;
        canvas.height = H;

        const maxConfettis = 150;
        const particles = [];

        
        function ConfettiParticle() {
            this.x = Math.random() * W;
            this.y = Math.random() * H - H;
            this.r = Math.random() * 10 + 5; 
            this.color = `hsl(${Math.random() * 360}, 100%, 50%)`; 

            this.draw = function () {
                context.beginPath();
                context.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
                context.fillStyle = this.color;
                context.fill();
            };

            this.update = function () {
                this.y += Math.sin(Math.random() * 0.5) * 5; 
                this.x += (Math.random() - 0.5) * 5; 

                if (this.y > H) {
                    this.y = 0; 
                    this.x = Math.random() * W;
                }
            };
        }

        
        for (let i = 0; i < maxConfettis; i++) {
            particles.push(new ConfettiParticle());
        }

        function draw() {
            context.clearRect(0, 0, W, H);
            particles.forEach((particle) => {
                particle.draw();
                particle.update();
            });

            requestAnimationFrame(draw);
        }

        draw();

        
        return () => {
            context.clearRect(0, 0, W, H);
        };
    }, []);

    return <canvas id="canvas" style={{ position: 'absolute', top: 0, left: 0, zIndex: -1 }}></canvas>;
};

export default Confetti;
