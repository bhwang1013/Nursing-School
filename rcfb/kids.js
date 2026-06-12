// Quiz
document.querySelectorAll('.quiz__btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (document.querySelector('.quiz__btn.correct, .quiz__btn.wrong')) return;
    const feedback = document.getElementById('quizFeedback');
    if (btn.dataset.correct === 'true') {
      btn.classList.add('correct');
      feedback.textContent = '🎉 That\'s right! We help 5,000 people every single week!';
    } else {
      btn.classList.add('wrong');
      document.querySelector('.quiz__btn[data-correct="true"]').classList.add('correct');
      feedback.textContent = '😊 Not quite — the answer is 5,000 people every week! That\'s a lot of neighbors!';
    }
  });
});

// Food facts popup
const popup = document.getElementById('foodFactPopup');
document.querySelectorAll('.food-fact').forEach(btn => {
  btn.addEventListener('click', () => {
    popup.textContent = btn.dataset.fact;
    popup.classList.add('visible');
    popup.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
});
document.addEventListener('click', e => {
  if (!e.target.closest('.food-fact') && !e.target.closest('#foodFactPopup')) {
    popup.classList.remove('visible');
  }
});

// Smooth scroll nav links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
