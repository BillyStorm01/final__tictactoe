import React, { useEffect, useRef } from 'react';

const Confetti = () => {
    const canvasRef = useRef(null);
    const particles = [];
    const maxConfettis = 150;

    // Particle Constructor
    function ConfettiParticle(W, H) {
        this.x = Math.random() * W;
        this.y = Math.random() * H - H; // Start above the canvas
        this.r = Math.random() * 10 + 5;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;

        this.draw = function (context) {
            context.beginPath();
            context.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
            context.fillStyle = this.color;
            context.fill();
        };

        this.update = function (H) {
            this.y += Math.sin(Math.random() * 0.5) * 5;
            this.x += (Math.random() - 0.5) * 5;

            if (this.y > H) {
                this.y = 0; // Reset to top
                this.x = Math.random() * W; // Reset x to a random position
            }
        };
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        const gameContainer = document.querySelector('.game__container');

        // Initialize particles only once
        const initializeParticles = (W, H) => {
            for (let i = 0; i < maxConfettis; i++) {
                particles.push(new ConfettiParticle(W, H));
            }
        };

        const updateCanvasSize = () => {
            if (gameContainer) {
                const W = gameContainer.offsetWidth;
                const H = gameContainer.offsetHeight;
                canvas.width = W;
                canvas.height = H;

                // Adjust the position of existing particles
                particles.forEach((particle) => {
                    if (particle.y > H) {
                        particle.y = 0; // Reset to top if it goes off the canvas
                        particle.x = Math.random() * W; // Reset x to a random position
                    }
                });
            }
        };

        // Initialize the particles and set the canvas size
        updateCanvasSize();
        initializeParticles(canvas.width, canvas.height); // Initialize particles with the initial size

        // ResizeObserver to observe changes to the game container
        const resizeObserver = new ResizeObserver(() => {
            updateCanvasSize();
        });
        if (gameContainer) {
            resizeObserver.observe(gameContainer);
        }

        const draw = () => {
            context.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((particle) => {
                particle.draw(context);
                particle.update(canvas.height);
            });

            requestAnimationFrame(draw);
        };

        draw();

        return () => {
            if (gameContainer) {
                resizeObserver.unobserve(gameContainer);
            }
            context.clearRect(0, 0, canvas.width, canvas.height);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: -1,
                width: '100vw', // Ensure the canvas takes full viewport width
                height: '100vh', // Ensure the canvas takes full viewport height
                margin: '0', // Ensure no margins affect positioning
            }}
        ></canvas>
    );
};

export default Confetti;
