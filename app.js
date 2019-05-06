import html2canvas from 'html2canvas';
import './style.scss';

html2canvas(document.querySelector('#capture')).then(canvas => {
  const width = canvas.width;
  const height = canvas.height;
  const ctx = canvas.getContext('2d');
  const idata = ctx.getImageData(0, 0, width, height);
  console.log(idata);
  let datums = [];
  for (let i = 0; i < 36; i++) {
    datums.push(ctx.createImageData(width, height));
  }

  for (let w = 0; w < width; w++) {
    for (let h = 0; h < height; h++) {
      let n = 4 * (h * width + w);
      let m = Math.floor(36 * (Math.random() + 2*w/width)/3);

      for (let p = 0; p < 4; p++) {
        datums[m].data[n + p] = idata.data[n + p];
      }
      console.log(idata.data[n]);
    }
  }

  datums.forEach((imageData,i) => {
    let cloned = canvas.cloneNode();
    cloned.style.transition = 'all 2.5s ease-out' + i/36 +'s';
    cloned.getContext('2d').putImageData(imageData, 0, 0);
    document.body.appendChild(cloned);
    setTimeout(() => {
      let angle = (Math.random()-0.5)*Math.PI;
      cloned.style.transform =
        'translate(' +
        60 * Math.cos(angle) +
        'px,' +
        60 * Math.sin(angle) +
        'px)';
      cloned.style.opacity = 0;
    },3000);
  });
});
