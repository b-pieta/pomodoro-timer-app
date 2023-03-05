const circle = document.getElementById('circle');
const timer = document.querySelector('.timer p');
const startButton = document.getElementById('start');
const breakButton = document.getElementById('break');
const stopButton = document.getElementById('pause');
const repeatButton = document.getElementById('repeat');

//We use radius of the circle by getAttribute and then we use formula for calculating circumference of the circle (2 * pi * radius)
const circumference = 2 * Math.PI * circle.getAttribute('r');
circle.setAttribute('stroke-dasharray', circumference);

// Format the time as MM:SS
function formatTime(time) {
	const minutes = Math.floor(time / 60);
	const seconds = time % 60;
	return `${minutes.toString().padStart(2, '0')}:${seconds
		.toString()
		.padStart(2, '0')}`;
}

let time = 25 * 60;
timer.textContent = formatTime(time);

let countdown;
startButton.addEventListener('click', () => {
	countdown = setInterval(() => {
		time--;

		timer.textContent = formatTime(time);

		// Calculate the progress on the circle
		const dashoffset = circumference * (1 - time / (25 * 60));

		circle.setAttribute('stroke-dashoffset', dashoffset);
		startButton.disabled = true;

		if (time === 0) {
			clearInterval(countdown);
			circle.setAttribute('stroke-dashoffset', circumference);
			startButton.disabled = false;
			breakButton.disabled = false;
			const audio = new Audio('/bowl.mp3');
			audio.play();
		} else if (time < 0) {
			clearInterval(countdown);
			time = 25 * 60;
			timer.textContent = formatTime(time);
			circle.setAttribute('stroke-dashoffset', circumference);
			startButton.disabled = false;
		}
	}, 1000);
});

stopButton.addEventListener('click', () => {
	clearInterval(countdown);
	startButton.disabled = false;
	breakButton.disabled = false;
});

breakButton.addEventListener('click', () => {
	clearInterval(countdown);
	time = 5 * 60;
	timer.textContent = formatTime(time);

	countdown = setInterval(() => {
		startButton.disabled = true;
		breakButton.disabled = true;
		stopButton.disabled = true;
		repeatButton.disabled = false;

		time--;

		timer.textContent = formatTime(time);

		const dashoffset = circumference * (1 - time / (5 * 60));
		circle.setAttribute('stroke-dashoffset', dashoffset);

		if (time === 0) {
			clearInterval(countdown);
			circle.setAttribute('stroke-dashoffset', circumference);
			startButton.disabled = false;
			circle.setAttribute('stroke-dasharray', circumference);
			const audio = new Audio('/bowl.mp3');
			audio.play();
		}
	}, 1000);

	// Reset the stroke to full circle
	circle.setAttribute('stroke-dashoffset', circumference);
});

repeatButton.addEventListener('click', () => {
	// Reset the time and timer element
	startButton.disabled = false;
	breakButton.disabled = false;
	stopButton.disabled = false;
	clearInterval(countdown);

	time = 25 * 60;
	timer.textContent = formatTime(time);

	// Calculate the progress on the circle based on remaining time
	const dashoffset = circumference * (1 - time / (25 * 60));
	circle.setAttribute('stroke-dashoffset', dashoffset);
	circle.setAttribute('stroke-dasharray', circumference);

	countdown = setInterval(() => {
		startButton.disabled = true;
		breakButton.disabled = true;
		time--;
		timer.textContent = formatTime(time);

		const dashoffset = circumference * (1 - time / (25 * 60));
		circle.setAttribute('stroke-dashoffset', dashoffset);

		if (time === 0) {
			clearInterval(countdown);
			circle.setAttribute('stroke-dashoffset', circumference);
			startButton.disabled = false;
			circle.setAttribute('stroke-dasharray', circumference);
			const audio = new Audio('/bowl.mp3');
			audio.play();
		}
	}, 1000);
});

//music section

const playMusicBtn = document.getElementById('play-music');
const audio = document.getElementById('my-audio');
let isPlaying = false;

playMusicBtn.addEventListener('click', () => {
	if (isPlaying) {
		audio.pause();
		isPlaying = false;
	} else {
		audio.play();
		isPlaying = true;
	}
});
