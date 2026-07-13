const video = document.getElementById("video");
const feedback = document.getElementById("feedback");

Promise.all([
	faceapi.nets.tinyFaceDetector.loadFromUri("./models"),
	faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
]).then(startWebcam);

function startWebcam() {
	navigator.mediaDevices
		.getUserMedia({
			video: true,
			audio: false,
		})
		.then((stream) => {
			video.srcObject = stream;
			video.onloadedmetadata = () => {
				video.play();
				setInterval(() => {
					const isDark = isVideoTooDark(video);
					feedback.textContent = isDark
						? "O ambiente está muito escuro"
						: "O ambiente está claro";
				}, 1000); // Verifica a claridade a cada segundo
			};
		})
		.catch((error) => {
			console.error(error);
		});
}

video.addEventListener("play", () => {
	const canvas = faceapi.createCanvasFromMedia(video);
	document.body.append(canvas);
	faceapi.matchDimensions(canvas, {
		height: video.height,
		width: video.width,
	});

	setInterval(async () => {
		const detections = await faceapi
			.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
			.withFaceLandmarks();

		const resizedDetections = faceapi.resizeResults(detections, {
			height: video.height,
			width: video.width,
		});
		canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
		//faceapi.draw.drawDetections(canvas, resizedDetections);
		faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

		console.log(detections);
	}, 100);
});

function calculateBrightness(imageData) {
	const pixels = imageData.data;
	let brightnessSum = 0;
	for (let i = 0; i < pixels.length; i += 4) {
		// Média dos valores de cor vermelha, verde e azul
		brightnessSum += (pixels[i] + pixels[i + 1] + pixels[i + 2]) / 3;
	}
	// Retorna a média de brilho
	return brightnessSum / (pixels.length / 4);
}

// Função para verificar se o vídeo está muito escuro
function isVideoTooDark(video) {
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");
	canvas.width = video.videoWidth;
	canvas.height = video.videoHeight;
	ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

	// Obtém os dados de imagem do contexto do canvas
	const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

	// Calcula a claridade média do quadro
	const averageBrightness = calculateBrightness(imageData);
	console.log("Average brightness:", averageBrightness);

	// Verifica se a claridade é inferior a um certo limiar (por exemplo, 100)
	const darknessThreshold = 100; // Limiar de escuridão
	return averageBrightness < darknessThreshold;
}
