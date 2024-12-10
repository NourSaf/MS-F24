document.addEventListener('DOMContentLoaded', () => {
    const title = document.querySelector('.loading-title');
    const paragraphLanding = document.querySelector('.paragraph-landing');
    const exploreBtn = document.querySelector('.explore-btn');
    const visualization = document.querySelector('.visualization');
    const visualizationHeader = document.querySelector('.visualization-header');
    const backgroundScene = document.querySelector('#background-scene');

    gsap.to(title, {duration: 1, opacity: 1, y: -20});
    gsap.to(paragraphLanding, {duration: 1, opacity: 1, y: -20, delay: 0.3});
    gsap.to(exploreBtn, {duration: 1, opacity: 1, y: -20, delay: 0.6});

    exploreBtn.addEventListener('click', () => {
  gsap.to([title, paragraphLanding, exploreBtn], {
      duration: 0.5,
      opacity: 0,
      y: -40,
      onComplete: () => {
    document.querySelector('.load').remove();
      }
  });
  gsap.to(visualization, {duration: 0.3, display: 'block', opacity: 1, y: -20, delay: 0.5});
  gsap.to(visualizationHeader, {duration: 0.3, display: 'block', opacity: 1, y: -20, delay: 0.5});
  gsap.to(backgroundScene, {duration: 0.5, opacity: 0, delay: 0.5});
    });
});