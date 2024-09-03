import '../App.css';
import React, { useState, useEffect, useContext, forwardRef } from 'react';
import AppContext from '../AppContext';

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

const Astroid = forwardRef(({ text },ref) => {
    const { innerWidth: width, innerHeight: height } = window;

    const {astroids} = useContext(AppContext);

    const [position, setPosition] = useState({ x: getRandomArbitrary(0, width), y: getRandomArbitrary(0, height) });
    const [movementVectorX, setMovementVectorX] = useState(1);
    const [movementVectorY, setMovementVectorY] = useState(1);
    const [speed, setSpeed] = useState(getRandomArbitrary(1, 4));
    const [spinSpeed, setSpinSpeed] = useState(getRandomArbitrary(5, 15));
    const [hover, setHover] = useState(false);
    const [size, setSize] = useState(height * 0.2);
    const [selected, setSelected] = useState(false);

    ref.current = {
        position: () => {return position},
        size: () => {return size}
    }

    const move = () => {
        setPosition({
            x: position.x + speed * movementVectorX,
            y: position.y + speed * movementVectorY
        });
    }

    const invertMovementVectorX = () => {
        setMovementVectorX(-movementVectorX);
    }

    const invertMovementVectorY = () => {
        setMovementVectorY(-movementVectorY);
    }

    const circlesOverlap = (pos1, size1, pos2, size2) => {
        // Calculate the distance between the centers of the two circles
        const dx = pos2.x - pos1.x;
        const dy = pos2.y - pos1.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
    
        // Calculate the sum of the radii
        const radius1 = size1 / 2;
        const radius2 = size2 / 2;
        const sumOfRadii = radius1 + radius2;
    
        // Check if the distance between the centers is less than or equal to the sum of the radii
        return distance <= sumOfRadii;
    }

    const isOverlappingOtherAstroid = () => {
        astroids.forEach(astroid => {
            if(astroid.ref.current && circlesOverlap(astroid.ref.current.position(), astroid.ref.current.size(), position, size)){
                console.log("overlap",text);
            }
        });
    }

    useEffect(() => {
        const handleMouseMove = (e) => {
        };

        const handleBoundaryCollision = () => {
            if (position.x <= 0 || position.x >= width - size * 1.5) {
                invertMovementVectorX()
                setPosition({
                    x: position.x <= 0 ? speed : width - (size * 1.5 + speed),
                    y: position.y
                });
            }
            if (position.y <= 0 || position.y >= height - size * 1.5) {
                invertMovementVectorY()
                setPosition({
                    x: position.x,
                    y: position.y <= 0 ?
                        speed : height - (size * 1.5 + speed)
                });
            }
        };

        const interval = setInterval(() => {
            if (!selected) {
                move();
                handleBoundaryCollision();
                // isOverlappingOtherAstroid();
            }
        }, 20);

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            clearInterval(interval);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [position, selected]);

    return (
        <div
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => setSelected(!selected)}
            style={
                {
                    position: "absolute",
                    height: selected ? height * 0.5 : size,
                    aspectRatio: "1/1",
                    backgroundImage:'url(https://static.vecteezy.com/system/resources/previews/016/778/815/non_2x/meteor-space-galaxy-free-png.png)',
                    backgroundSize:`contain`,
                    backgroundRepeat:'no-repeat',
                    color:'white',
                    padding: "2%",
                    animation: selected ? "" : `spin ${spinSpeed}s linear infinite`,
                    left: selected ? width * 0.38 : position.x,
                    top: selected ? height * 0.25 : position.y,
                    zIndex: selected ? 100000 : 0,
                    cursor: 'pointer',
                }
            }
        >
            <div style={{ fontSize: height * 0.03 }}>{text}</div>
        </div >
    );
});


export default Astroid;
