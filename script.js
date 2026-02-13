const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const hintText = document.getElementById('hint'); // Get the hint element
const mainImage = document.getElementById('mainImage');
const mainTitle = document.getElementById('mainTitle');
const container = document.querySelector('.container');

let noClickCount = 0;
let yesClickCount = 0; // Track how many times she tries to click Yes

// 1. Handle the YES click
function handleYesClick() {
    // If she hasn't clicked No 4 times yet...
    if (noClickCount < 4) {
        yesClickCount++; // Increase the count
        
        // IF she clicks it twice, show the hint!
        if (yesClickCount === 2) {
            hintText.style.display = 'block';
        }

        // ...The button runs away!
        moveButton();
    } else {
        // ...Otherwise, she wins!
        showSuccess();
    }
}

// 2. The function to move the button inside the white box
function moveButton() {
    // Get container dimensions
    const containerRect = container.getBoundingClientRect();
    const btnRect = yesBtn.getBoundingClientRect();

    // Calculate max X and Y (staying inside the box)
    // We use container.clientWidth to get the inner width (padding included)
    const maxX = container.clientWidth - btnRect.width; 
    const maxY = container.clientHeight - btnRect.height;

    // Generate random position
    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    // Apply new position
    yesBtn.style.position = 'absolute';
    yesBtn.style.left = randomX + 'px';
    yesBtn.style.top = randomY + 'px';
}

// 3. Handle the NO click
function handleNoClick() {
    noClickCount++;
    
    // Hide the hint if she clicks No (since she figured it out)
    hintText.style.display = 'none';

    // Make the YES button bigger every time she clicks No
    const currentSize = 1 + (noClickCount * 0.4); 
    yesBtn.style.transform = `scale(${currentSize})`;
    yesBtn.style.transition = "transform 0.3s ease"; // Smooth growth
    
    // Change the No button text
    const messages = [
        "No",
        "Betul ke?", 
        "Betul taknak?", 
        "Hmm cuba fikir lagi", 
        "Last chance!", 
        "Just click Yes!"
    ];
    
    if (noClickCount < messages.length) {
        noBtn.innerText = messages[noClickCount];
    }

    // After 4 clicks, we change the state
    if (noClickCount === 4) {
        // Hide the No button
        noBtn.style.display = 'none';
        
        // Reset Yes button position so it's easy to click
        yesBtn.style.position = 'relative';
        yesBtn.style.left = 'auto';
        yesBtn.style.top = 'auto';
        yesBtn.style.transform = 'scale(2.0)'; // Make it huge but fitting
        
        mainTitle.innerText = "Okay, now you HAVE to say Yes! ❤️";
    }
}

// 4. The Success Screen
function showSuccess() {
    // Clear the container content
    container.innerHTML = `
        <h1 class="header_text">Yay! My girlfriend agreed to be my Valentine! :) </h1>
        <div class="photo-frame">
            <img src="https://media.giphy.com/media/26BRv0ThflsHCqDrG/giphy.gif" alt="Happy GIF" style="width: 100%; border-radius: 10px;">
        </div>
        <p> I love you so much sayang. <3333 </p>
        <p> From yours truly, aish. </p>
    `;
    
    // Start falling hearts
    setInterval(createHeart, 300);
}

// Falling Hearts Animation
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 2 + 3 + "s";
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 5000);
}