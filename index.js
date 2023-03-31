const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

const createTimerAnimator = () => {
  let intervalId;

  return (seconds) => {
    clearInterval(intervalId);

    let remainingSeconds = seconds;
    updateTimer(remainingSeconds);

    intervalId = setInterval(() => {
      remainingSeconds--;
      if (remainingSeconds >= 0) {
        updateTimer(remainingSeconds);
      } else {
        clearInterval(intervalId);
      }
    }, 1000);
  };

  function updateTimer(remainingSeconds) {
    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds - hours * 3600) / 60);
    const seconds = remainingSeconds % 60;

    const formattedTime = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    timerEl.textContent = formattedTime;
  }

  function pad(number) {
    return String(number).padStart(2, '0');
  }
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', () => {
  inputEl.value = inputEl.value.replace(/\D/g, '');
});

buttonEl.addEventListener('click', () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';
});
