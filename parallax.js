document.addEventListener('DOMContentLoaded', () => {
  const parallaxContainer = document.querySelector('#canvas3d_character');
  const layers = document.querySelectorAll('.layer');
  const layerTransforms = new Map();


  layers.forEach(layer => {
    layerTransforms.set(layer, { hover: '', scroll: '', initial: '' });
  });

  const applyInitialEffect = (layer, index) => {
  
  if (layer.id !== 'canvas3d_character') {
    const scale = layer.getAttribute('data-scale') || 1.1;
    const transforms = layerTransforms.get(layer);
    transforms.initial = `scale(${scale})`;
    layer.style.transform = transforms.initial;
  } else {
    
    const transforms = layerTransforms.get(layer);
    transforms.initial = `scale(1)`; 
  }
  layer.style.opacity = '0';

  setTimeout(() => {
    layer.style.opacity = '1';
    const transforms = layerTransforms.get(layer);
    transforms.initial = (layer.id !== 'canvas3d_character') ? 'scale(1.1)' : 'scale(1)'; 
    layer.style.transform = `${transforms.initial} ${transforms.scroll} ${transforms.hover}`;
    layer.style.transition = 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease';
  }, 500 + index * 200);
};

  layers.forEach(applyInitialEffect);

  const updateLayersOnHover = (mouseX, mouseY, rect) => {
    layers.forEach(layer => {
      const depth = parseFloat(layer.getAttribute('data-depth')) || 0;
      const translateX = (mouseX - rect.width / 2) * depth;
      const translateY = (mouseY - rect.height / 2) * depth;

      const transforms = layerTransforms.get(layer);
      transforms.hover = `translateX(${translateX}px) translateY(${translateY}px)`;
      layer.style.transform = `${transforms.initial} ${transforms.scroll} ${transforms.hover}`;
    });
  };


 
function throttle(callback, limit) {
  let wait = false;
  return function () {
    if (!wait) {
      callback.apply(null, arguments);
      wait = true;
      setTimeout(() => {
        wait = false;
      }, limit);
    }
  };
}

parallaxContainer.addEventListener('mousemove', throttle((event) => {
  const rect = parallaxContainer.getBoundingClientRect();
  requestAnimationFrame(() => {
    updateLayersOnHover(event.clientX - rect.left, event.clientY - rect.top, rect);
  });
}, 80)); 

  parallaxContainer.addEventListener('mouseout', () => {
    layers.forEach(layer => {
      const transforms = layerTransforms.get(layer);
      transforms.hover = '';
      layer.style.transform = `${transforms.initial} ${transforms.scroll}`;
    });
  });

  const updateParallaxOnScroll = () => {
    const scrollY = window.scrollY;
    layers.forEach(layer => {
      const dataZoom = layer.getAttribute('data-zoom');
      const speedFactorZoom = parseFloat(dataZoom) || 0;
      const offsetZoom = 1 + (scrollY * speedFactorZoom / 1000);

      const dataSpeed = layer.getAttribute('data-speed');
      const speedFactor = parseFloat(dataSpeed) || 0;
      const offset = scrollY * speedFactor;

      const transforms = layerTransforms.get(layer);
      transforms.scroll = `translateY(${offset}px) scale(${offsetZoom})`;
      layer.style.transform = `${transforms.initial} ${transforms.scroll} ${transforms.hover}`;
    });
  };
  window.addEventListener('scroll', updateParallaxOnScroll);
});