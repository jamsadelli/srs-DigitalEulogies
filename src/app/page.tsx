<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Autumn Vines with Falling Text</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: Arial, sans-serif;
            height: 100vh;
            overflow: hidden;
            position: relative;
            background-color: #f5f5f5; /* Light gray background */
        }
        
        .background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            transition: background-color 1s ease;
        }
        
        .vine-container {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            pointer-events: none;
        }
        
        .vine {
            position: absolute;
            border-radius: 50%;
            transform-origin: center;
            z-index: 10;
            opacity: 0;
            transition: opacity 2s ease-in;
        }
        
        .leaf {
            position: absolute;
            border-radius: 50% 0;
            transform-origin: bottom left;
            z-index: 11;
            opacity: 0;
            transition: opacity 2s ease-in;
        }
        
        .falling-text {
            position: absolute;
            font-size: 18px;
            font-weight: bold;
            opacity: 0;
            z-index: 20;
            transition: top 2s ease-in, opacity 0.5s ease-in;
            transform-origin: center;
            user-select: none;
        }
    </style>
</head>
<body>
    <div class="background" id="background"></div>
    <div class="vine-container" id="vineContainer"></div>

    <script>
        // Change background color
        function changeBackgroundColor() {
            const colors = [
                '#f5f5f5', // Light gray
                '#f8f8e8', // Light cream
                '#fafaf0', // Ivory
                '#f0f8ff', // Alice blue
                '#f0fff0', // Honeydew
                '#f5f5dc', // Beige
                '#fffaf0'  // Floral white
            ];
            
            const color = colors[Math.floor(Math.random() * colors.length)];
            document.getElementById('background').style.backgroundColor = color;
            createFallingText();
        }
        
        // Autumn colors
        const autumnColors = [
            '#8B4513', // SaddleBrown (vine color)
            '#A0522D', // Sienna (vine color)
            '#CD853F', // Peru (vine color)
            '#D2691E', // Chocolate (vine color)
            '#B22222', // FireBrick (leaf color)
            '#FF8C00', // DarkOrange (leaf color)
            '#DAA520', // GoldenRod (leaf color)
            '#FF4500', // OrangeRed (leaf color)
            '#DC143C', // Crimson (leaf color)
            '#FFD700'  // Gold (leaf color)
        ];
        
        // Random autumn-themed words for falling text
        const autumnWords = [
            "Autumn", "Falling", "Leaves", "Harvest", 
            "October", "Golden", "Crisp", "Cozy", 
            "Maple", "Orchard", "Pumpkin", "Rustle",
            "Amber", "Crimson", "Flutter", "Gather",
            "Scenic", "Vibrant", "Nostalgic", "Breeze"
        ];
        
        // Leaf colors - more vibrant autumn colors
        const leafColors = autumnColors.slice(4);
        
        // Vine colors - more brown autumn colors
        const vineColors = autumnColors.slice(0, 4);
        
        // Create falling text
        function createFallingText() {
            const text = document.createElement('div');
            text.className = 'falling-text';
            
            // Random word from autumn words
            text.innerText = autumnWords[Math.floor(Math.random() * autumnWords.length)];
            
            // Random starting position at top of screen
            const startX = Math.random() * (window.innerWidth - 100);
            text.style.left = `${startX}px`;
            text.style.top = '-50px';
            
            // Random color from autumn colors
            text.style.color = autumnColors[Math.floor(Math.random() * autumnColors.length)];
            
            // Random rotation
            const rotation = Math.random() * 30 - 15;
            text.style.transform = `rotate(${rotation}deg)`;
            
            // Add to body
            document.body.appendChild(text);
            
            // Start falling animation
            setTimeout(() => {
                text.style.opacity = 1;
                
                // Random ending position (Y) - somewhere on screen
                const endY = 100 + Math.random() * (window.innerHeight - 200);
                text.style.top = `${endY}px`;
                
                // Text stays where it lands
            }, 10);
        }
        
        // Vine growth system
        let vineGrowthInterval;
        let vinePercentage = 0;
        const vineContainer = document.getElementById('vineContainer');
        const maxVines = 800;  // Number of vine segments
        let vines = [];
        
        function createVine() {
            if (vines.length >= maxVines) return;
            
            // Random position
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            
            // Create vine segment
            const vine = document.createElement('div');
            vine.className = 'vine';
            
            // Size
            const size = 5 + Math.random() * 10;
            vine.style.width = `${size}px`;
            vine.style.height = `${size}px`;
            
            // Position
            vine.style.left = `${x}px`;
            vine.style.top = `${y}px`;
            
            // Color - autumn brown
            vine.style.backgroundColor = vineColors[Math.floor(Math.random() * vineColors.length)];
            
            // Add to container
            vineContainer.appendChild(vine);
            vines.push(vine);
            
            // Fade in slowly
            setTimeout(() => {
                vine.style.opacity = 1;
            }, 10);
            
            // Create leaves (50% chance)
            if (Math.random() < 0.5) {
                const leaf = document.createElement('div');
                leaf.className = 'leaf';
                
                // Leaf size
                const leafSize = size * (1 + Math.random());
                leaf.style.width = `${leafSize}px`;
                leaf.style.height = `${leafSize}px`;
                
                // Position near vine
                const angle = Math.random() * Math.PI * 2;
                const distance = size / 2;
                const leafX = x + Math.cos(angle) * distance;
                const leafY = y + Math.sin(angle) * distance;
                
                leaf.style.left = `${leafX}px`;
                leaf.style.top = `${leafY}px`;
                
                // Rotation
                leaf.style.transform = `rotate(${Math.random() * 360}deg)`;
                
                // Color - autumn leaf color
                leaf.style.backgroundColor = leafColors[Math.floor(Math.random() * leafColors.length)];
                
                vineContainer.appendChild(leaf);
                vines.push(leaf);
                
                // Fade in slowly with delay
                setTimeout(() => {
                    leaf.style.opacity = 1;
                }, 500 + Math.random() * 1000);
            }
            
            // Calculate coverage percentage
            vinePercentage = (vines.length / maxVines) * 100;
            
            // If fully covered, reset after a delay
            if (vinePercentage >= 100) {
                clearInterval(vineGrowthInterval);
                setTimeout(resetVines, 2000);
            }
        }
        
        function resetVines() {
            // Fade out all vines
            vines.forEach(vine => {
                vine.style.opacity = 0;
            });
            
            // Remove all vines after fade out
            setTimeout(() => {
                while (vineContainer.firstChild) {
                    vineContainer.removeChild(vineContainer.firstChild);
                }
                
                vines = [];
                vinePercentage = 0;
                
                // Start growing again
                startVineGrowth();
                
                // Also remove all text
                const textElements = document.querySelectorAll('.falling-text');
                textElements.forEach(el => {
                    el.style.opacity = 0;
                    setTimeout(() => {
                        if (el.parentNode) {
                            el.parentNode.removeChild(el);
                        }
                    }, 500);
                });
            }, 2000);
        }
        
        function startVineGrowth() {
            // Create a new vine every 300ms to grow more slowly
            vineGrowthInterval = setInterval(createVine, 300);
        }
        
        // Start with one word
        setTimeout(createFallingText, 1000);
        
        // Occasionally add falling text automatically
        setInterval(() => {
            if (Math.random() < 0.3) { // 30% chance every 3 seconds
                createFallingText();
            }
        }, 3000);
        
        // Listen for Enter key to change background and add text
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                changeBackgroundColor();
            }
        });
        
        // Initialize
        startVineGrowth();
    </script>
</body>
</html>
