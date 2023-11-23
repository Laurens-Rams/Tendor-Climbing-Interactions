document.addEventListener('DOMContentLoaded', () => {
  const canvas3d = document.getElementById('canvas3d');
  const canvas3dCard = document.getElementById('canvas3d_card');
  canvas3dCard.style.display = 'block';
  canvas3dCard.style.opacity = 0;

  const prevElement = document.querySelector('.rocks-container');
  const dynamicContent = document.querySelector('.dynamic-content');
  const rocksContainer = document.querySelector('.rocks-container');
  let triggerPoints;

  const contentData = [
    { title: "Embrace Nature's Majesty", text: "Connect with the majestic beauty of nature. Feel the rock, the rush of adrenaline, and the satisfaction of conquering your personal peaks."},
    { title: "Unleash Your Potential", text: "Climbing is not just a sport, it's a journey of self-discovery. Unleash your potential and surpass limits with every climb"},
    { title: "Climb with Confidence", text: "Choose our finger tape for your next ascent and experience the difference. It's the climber’s choice for reliable protection and unmatched performance."},
    { title: "", text: ""}
  ];

  const updateContent = (index) => {
    dynamicContent.innerHTML = `<h2 class="text-4xl mb-5">${contentData[index].title}</h2><h6 class="max-w-md">${contentData[index].text}</h6>`;
  };

  const fadeInContent = (index) => {
    if (currentIndex !== index) {
      updateContent(index);
      dynamicContent.style.opacity = 1;
    }
  };
  
  const fadeOutContent = () => {
    if (currentIndex !== -1) {
      dynamicContent.style.opacity = 0;
    }
  };

  let currentIndex = -1;

  const calculateTriggerPoints = () => {
    const containerHeight = rocksContainer.offsetHeight;
    const segmentHeight = containerHeight / 6;
    return [segmentHeight * 2, 3 * segmentHeight, 4 * segmentHeight, 5 * segmentHeight];
  };

  window.addEventListener('resize', () => {
    triggerPoints = calculateTriggerPoints();
  });

  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  let lastScrollTop = 0;
  const triggerPoint = screen.height;
  let triggerStickStart;
  const scrollStickDuration = window.innerHeight + 200;

  const getTriggerStart = () => {
    const rect = prevElement.getBoundingClientRect();
    return rect.bottom + window.scrollY - (window.innerHeight * 2);
  };

  function onScroll() {
    const scrollPosition = window.scrollY;

    if (scrollPosition < triggerPoints[0] && currentIndex !== -1) {
      fadeOutContent();
      currentIndex = -1;
    } else if (scrollPosition >= triggerPoints[0] && scrollPosition < triggerPoints[1] && currentIndex !== 0) {
      fadeInContent(0);
      currentIndex = 0;
    } else if (scrollPosition >= triggerPoints[1] && scrollPosition < triggerPoints[2] && currentIndex !== 1) {
      fadeInContent(1);
      currentIndex = 1;
    } else if (scrollPosition >= triggerPoints[2] && scrollPosition < triggerPoints[3] && currentIndex !== 3) {
      fadeInContent(2);
      currentIndex = 2;
    } else if (scrollPosition >= triggerPoints[3] && currentIndex !== 3) {
      fadeInContent(3);
      currentIndex = 3;
    }

    const scrollY = window.scrollY;
    const isScrollingUp = scrollY < lastScrollTop;
    const triggerStart = getTriggerStart();

    canvas3d.style.opacity = scrollY > triggerPoint ? 1.0 : 0;

    if (!triggerStickStart) {
      triggerStickStart = triggerStart + scrollStickDuration;
    }

    let opacity = 0;
    let display = scrollY < triggerStart ? 'none' : 'block'; 

    if (scrollY >= triggerStart && scrollY < triggerStickStart) {
      opacity = (scrollY - triggerStart) / (scrollStickDuration);
    } else if (scrollY >= triggerStickStart) {
      opacity = 1.0;
    }

    if (isScrollingUp && scrollY < triggerStart) {
      opacity = 1.0 - (triggerStart - scrollY) / (triggerStart - (triggerStart - window.innerHeight / 2));
      opacity = Math.max(opacity, 0);
    }

    canvas3dCard.style.display = display;
    canvas3dCard.style.opacity = opacity;
    canvas3dCard.style.position = scrollY >= triggerStickStart ? 'absolute' : 'fixed';
    canvas3dCard.style.top = scrollY >= triggerStickStart ? `${triggerStickStart}px` : '0';

    lastScrollTop = scrollY <= 0 ? 0 : scrollY;
  }

  window.addEventListener('scroll', throttle(onScroll, 50));
  setTimeout(() => {
    triggerPoints = calculateTriggerPoints(); 
    onScroll(); 
  }, 100);
});

window.onload = () => {
  triggerPoints = calculateTriggerPoints(); 
  onScroll();
};
