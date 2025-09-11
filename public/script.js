class Sakiniai {
    constructor() {
        this.sak = [];
    }

    async readSentencesFromFile(filePath) {
        try {
            const response = await fetch(filePath);
            if (!response.ok) {
                throw new Error(`File not found: ${filePath}`);
            }
            const text = await response.text();
            const lines = text.split('\n');
            for (let line of lines) {
                const sentences = line.split(/\.\s*/);
                for (let sentence of sentences) {
                    const trimmed = sentence.trim();
                    if (trimmed) {
                        this.sak.push(trimmed);
                    }
                }
            }
        } catch (e) {
            console.error("Error reading file: " + e.message);
        }
    }
}

class Mp3Player {
    async play(strFilePath) {
        return new Promise((resolve) => {
            try {
                const audio = new Audio(strFilePath);
                audio.addEventListener('ended', () => resolve());
                audio.addEventListener('error', (err) => {
                    console.error("Error playing MP3 file: " + err.message);
                    resolve();
                });
                audio.play();
            } catch (e) {
                console.error("Error playing MP3 file: " + e.message);
                resolve();
            }
        });
    }
}

let sakEng, sakSpn, sakEng_1, sakSpn_1, sakEng_2, sakSpn_2,
    sakEng_3, sakSpn_3, sakEng_5_8, sakSpn_5_8, sakEng_8_12, sakSpn_8_12,
    sakEng_15_20, sakSpn_15_20;
let pathEngMp3 = "", pathSpnMp3 = "",
    pathEngMp3_1 = "/mp3/1/Eng_1/", pathSpnMp3_1 = "/mp3/1/Spn_1/",
    pathEngMp3_2 = "/mp3/2/Eng_2/", pathSpnMp3_2 = "/mp3/2/Spn_2/",
    pathEngMp3_3 = "/mp3/3/Eng_3/", pathSpnMp3_3 = "/mp3/3/Spn_3/",
    pathEngMp3_5_8 = "/mp3/5_8/Eng_5_8/", pathSpnMp3_5_8 = "/mp3/5_8/Spn_5_8/",
    pathEngMp3_8_12 = "/mp3/8_12/Eng_8_12/", pathSpnMp3_8_12 = "/mp3/8_12/Spn_8_12/",
    pathEngMp3_15_20 = "/mp3/15_20/Eng_15_20/", pathSpnMp3_15_20 = "/mp3/15_20/Spn_15_20/";
let randomInt;
const Delay = 80;
let timerNext = null;
let timerTranslate = null;
const player = new Mp3Player();
let iChecked = 0;

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

const textArea1 = document.getElementById('textArea1');
const textArea2 = document.getElementById('textArea2');
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');
const slider1 = document.getElementById('slider1');
const slider2 = document.getElementById('slider2');
const slider3 = document.getElementById('slider3');
const slider4 = document.getElementById('slider4');
const checkBox1 = document.getElementById('checkBox1');
const checkBox2 = document.getElementById('checkBox2');
const checkBox3 = document.getElementById('checkBox3');
const checkBox4 = document.getElementById('checkBox4');
const checkBox5 = document.getElementById('checkBox5');
const checkBox6 = document.getElementById('checkBox6');
const checkBox7 = document.getElementById('checkBox7');
const checkBox8 = document.getElementById('checkBox8');
const checkBox9 = document.getElementById('checkBox9');
const checkBox10 = document.getElementById('checkBox10');
const checkBox11 = document.getElementById('checkBox11');

async function loadSentences() {
    sakEng_1 = new Sakiniai();
    sakSpn_1 = new Sakiniai();
    sakEng_2 = new Sakiniai();
    sakSpn_2 = new Sakiniai();
    sakEng_3 = new Sakiniai();
    sakSpn_3 = new Sakiniai();
    sakEng_5_8 = new Sakiniai();
    sakSpn_5_8 = new Sakiniai();
    sakEng_8_12 = new Sakiniai();
    sakSpn_8_12 = new Sakiniai();
    sakEng_15_20 = new Sakiniai();
    sakSpn_15_20 = new Sakiniai();

    await Promise.all([
        sakEng_1.readSentencesFromFile(pathEngMp3_1 + "Eng_1.txt"),
        sakSpn_1.readSentencesFromFile(pathSpnMp3_1 + "Spn_1.txt"),
        sakEng_2.readSentencesFromFile(pathEngMp3_2 + "Eng_2.txt"),
        sakSpn_2.readSentencesFromFile(pathSpnMp3_2 + "Spn_2.txt"),
        sakEng_3.readSentencesFromFile(pathEngMp3_3 + "Eng_3.txt"),
        sakSpn_3.readSentencesFromFile(pathSpnMp3_3 + "Spn_3.txt"),
        sakEng_5_8.readSentencesFromFile(pathEngMp3_5_8 + "Eng_5_8.txt"),
        sakSpn_5_8.readSentencesFromFile(pathSpnMp3_5_8 + "Spn_5_8.txt"),
        sakEng_8_12.readSentencesFromFile(pathEngMp3_8_12 + "Eng_8_12.txt"),
        sakSpn_8_12.readSentencesFromFile(pathSpnMp3_8_12 + "Spn_8_12.txt"),
        sakEng_15_20.readSentencesFromFile(pathEngMp3_15_20 + "Eng_15_20.txt"),
        sakSpn_15_20.readSentencesFromFile(pathSpnMp3_15_20 + "Spn_15_20.txt")
    ]);

    sakEng = sakEng_15_20;
    sakSpn = sakSpn_15_20;
    await buttonNextAction();
}

loadSentences();

button1.addEventListener('click', async () => {
    if (timerNext) clearTimeout(timerNext);
    if (timerTranslate) clearTimeout(timerTranslate);
    await buttonNextAction();
});

button2.addEventListener('click', async () => {
    if (timerNext) clearTimeout(timerNext);
    if (timerTranslate) clearTimeout(timerTranslate);
    await buttonTranslateAction();
});

button3.addEventListener('click', async () => {
    if (checkBox1.checked || checkBox2.checked) {
        checkBox1.checked = false;
        checkBox2.checked = false;
    } else {
        checkBox1.checked = true;
        checkBox2.checked = true;
    }
    if (timerNext) clearTimeout(timerNext);
    if (timerTranslate) clearTimeout(timerTranslate);
    if (checkBox1.checked) await buttonNextAction();
});

async function buttonNextAction() {
    getNext();
    textArea1.innerText = sakEng.sak[randomInt];
    textArea2.innerText = "";
    if (checkBox7.checked) {
        await player.play(pathEngMp3);
        if (checkBox9.checked) {
            await new Promise(resolve => setTimeout(resolve, slider3.value));
            await player.play(pathEngMp3);
        }
    }
    if (checkBox1.checked) {
        doTranslateAfterDelay();
    }
}

async function buttonTranslateAction() {
    textArea2.innerText = sakSpn.sak[randomInt];
    if (checkBox8.checked) {
        await player.play(pathSpnMp3);
        if (checkBox10.checked) {
            await new Promise(resolve => setTimeout(resolve, slider4.value));
            await player.play(pathSpnMp3);
        }
    }
    if (checkBox2.checked) {
        doNextAfterDelay();
    }
}

function doTranslateAfterDelay() {
    let engLength = sakEng.sak[randomInt].length;
    let extraPause = slider1.value * engLength;
    let delay = extraPause;
    if (iChecked === 1 && slider1.value > 0) {
        delay += 2000;
    }
    if (!checkBox7.checked) {
        let minDelay = 1000;
        let minDelayAdd = 600;
        let estSpeak = Delay * engLength;
        if (estSpeak < minDelay) estSpeak += minDelayAdd;
        if (checkBox9.checked) {
            estSpeak += Delay * engLength + slider3.value;
        }
        delay += estSpeak;
    }
    timerTranslate = setTimeout(async () => await buttonTranslateAction(), delay);
}

function doNextAfterDelay() {
    let spnLength = sakSpn.sak[randomInt].length;
    let extraPause = slider2.value * spnLength;
    let delay = extraPause;
    if (!checkBox8.checked) {
        let minDelay = 1000;
        let minDelayAdd = 600;
        let estTranslate = Delay * spnLength;
        if (estTranslate < minDelay) estTranslate += minDelayAdd;
        if (checkBox10.checked) {
            estTranslate += Delay * spnLength + slider4.value;
        }
        delay += estTranslate;
    }
    timerNext = setTimeout(async () => await buttonNextAction(), delay);
}

function getNext() {
    sakEng = sakEng_3;
    sakSpn = sakSpn_3;
    pathEngMp3 = pathEngMp3_3;
    pathSpnMp3 = pathSpnMp3_3;
    getNextChecked();
    switch (iChecked) {
        case 5:
            sakEng = sakEng_1;
            sakSpn = sakSpn_1;
            pathEngMp3 = pathEngMp3_1;
            pathSpnMp3 = pathSpnMp3_1;
            break;
        case 6:
            sakEng = sakEng_2;
            sakSpn = sakSpn_2;
            pathEngMp3 = pathEngMp3_2;
            pathSpnMp3 = pathSpnMp3_2;
            break;
        case 1:
            sakEng = sakEng_3;
            sakSpn = sakSpn_3;
            pathEngMp3 = pathEngMp3_3;
            pathSpnMp3 = pathSpnMp3_3;
            break;
        case 2:
            sakEng = sakEng_5_8;
            sakSpn = sakSpn_5_8;
            pathEngMp3 = pathEngMp3_5_8;
            pathSpnMp3 = pathSpnMp3_5_8;
            break;
        case 3:
            sakEng = sakEng_8_12;
            sakSpn = sakSpn_8_12;
            pathEngMp3 = pathEngMp3_8_12;
            pathSpnMp3 = pathSpnMp3_8_12;
            break;
        case 4:
            sakEng = sakEng_15_20;
            sakSpn = sakSpn_15_20;
            pathEngMp3 = pathEngMp3_15_20;
            pathSpnMp3 = pathSpnMp3_15_20;
            break;
        default:
            iChecked = 0;
            break;
    }
    if (sakEng.sak.length === 0) {
        console.error("No sentences loaded for category " + iChecked);
        textArea1.innerText = "No sentences loaded for this category. Check assets files.";
        textArea2.innerText = "";
        return;
    }
    randomInt = getRandomInt(sakEng.sak.length);
    pathEngMp3 += `E${randomInt + 1}.mp3`;
    pathSpnMp3 += `S${randomInt + 1}.mp3`;
    if (checkBox11.checked) {
        let temp = sakEng;
        sakEng = sakSpn;
        sakSpn = temp;
        let strTemp = pathEngMp3;
        pathEngMp3 = pathSpnMp3;
        pathSpnMp3 = strTemp;
    }
}

function getNextChecked() {
    if (iChecked === 0) {
        if (checkBox3.checked) iChecked = 1;
        else if (checkBox4.checked) iChecked = 2;
        else if (checkBox5.checked) iChecked = 3;
        else if (checkBox6.checked) iChecked = 4;
        else if (checkBox12.checked) iChecked = 5;
        else if (checkBox14.checked) iChecked = 6;
    } else if (iChecked === 1) {
        if (checkBox4.checked) iChecked = 2;
        else if (checkBox5.checked) iChecked = 3;
        else if (checkBox6.checked) iChecked = 4;
        else if (checkBox12.checked) iChecked = 5;
        else if (checkBox14.checked) iChecked = 6;
        else if (checkBox3.checked) iChecked = 1;
    } else if (iChecked === 2) {
        if (checkBox5.checked) iChecked = 3;
        else if (checkBox6.checked) iChecked = 4;
        else if (checkBox12.checked) iChecked = 5;
        else if (checkBox14.checked) iChecked = 6;
        else if (checkBox3.checked) iChecked = 1;
        else if (checkBox4.checked) iChecked = 2;
    } else if (iChecked === 3) {
        if (checkBox6.checked) iChecked = 4;
        else if (checkBox12.checked) iChecked = 5;
        else if (checkBox14.checked) iChecked = 6;
        else if (checkBox3.checked) iChecked = 1;
        else if (checkBox4.checked) iChecked = 2;
        else if (checkBox5.checked) iChecked = 3;
    } else if (iChecked === 4) {
        if (checkBox12.checked) iChecked = 5;
        else if (checkBox14.checked) iChecked = 6;
        else if (checkBox3.checked) iChecked = 1;
        else if (checkBox4.checked) iChecked = 2;
        else if (checkBox5.checked) iChecked = 3;
        else if (checkBox6.checked) iChecked = 4;
    } else if (iChecked === 5) {
        if (checkBox14.checked) iChecked = 6;
        else if (checkBox3.checked) iChecked = 1;
        else if (checkBox4.checked) iChecked = 2;
        else if (checkBox5.checked) iChecked = 3;
        else if (checkBox6.checked) iChecked = 4;
        else if (checkBox12.checked) iChecked = 5;
    } else if (iChecked === 6) {
        if (checkBox3.checked) iChecked = 1;
        else if (checkBox4.checked) iChecked = 2;
        else if (checkBox5.checked) iChecked = 3;
        else if (checkBox6.checked) iChecked = 4;
        else if (checkBox12.checked) iChecked = 5;
        else if (checkBox14.checked) iChecked = 6;
    }
    console.log("Selected category: " + iChecked);
    let attempts = 0;
    while (attempts < 7 && sakEng.sak.length === 0) {
        iChecked = (iChecked % 6) + 1;
        switch (iChecked) {
            case 1: sakEng = sakEng_1; break;
            case 2: sakEng = sakEng_2; break;
            case 3: sakEng = sakEng_3; break;
            case 4: sakEng = sakEng_5_8; break;
            case 5: sakEng = sakEng_8_12; break;
            case 6: sakEng = sakEng_15_20; break;
        }
        attempts++;
    }
    if (sakEng.sak.length === 0) {
        iChecked = 0;
        console.error("No non-empty categories found!");
    }
}