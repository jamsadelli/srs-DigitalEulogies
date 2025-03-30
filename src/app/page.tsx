// components/AutumnVines.js
import { useEffect, useState } from 'react';

export default function AutumnVines() {
    const [backgroundColor, setBackgroundColor] = useState('#f5f5f5');
    const autumnColors = ['#8B4513', '#A0522D', '#CD853F', '#D2691E', '#B22222', '#FF8C00', '#DAA520', '#FF4500', '#DC143C', '#FFD700'];

    useEffect(() => {
        // Function to change the background color
        const changeBackgroundColor = () => {
            const colors = ['#f5f5f5', '#f8f8e8', '#fafaf0', '#f0f8ff', '#f0fff0', '#f5f5dc', '#fffaf0'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            setBackgroundColor(color);
        };

        // Event listener for changing the background on Enter key press
        const handleKeyDown = (event) => {
            if (event.key === 'Enter') {
                changeBackgroundColor();
            }
        };
        
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div style={{ 
            height: '100vh', 
            backgroundColor, 
            overflow: 'hidden', 
            position: 'relative', 
            transition: 'background-color 1s ease' 
        }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                {Array.from({ length: 50 }).map((_, index) => {
                    const x = Math.random() * window.innerWidth;
                    const
