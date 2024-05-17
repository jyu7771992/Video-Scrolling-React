import { useCallback, useMemo, useRef } from 'react';
import { useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import './App.css';
const App = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['center end', 'start start'],
  });

  const images = useMemo(() => {
    const loadedImages: HTMLImageElement[] = [];
    //the number of 86 is the total of the image
    const totalImages = 86;
    for (let i = 1; i <= totalImages; i++) {
      const img = new Image();
      img.src = `images/${i}.webp`;
      loadedImages.push(img);
    }

    return loadedImages;
  }, []);

  const currentIdx = useTransform(scrollYProgress, [0, 1], [1, 86]);

  const renderImg = useCallback(
    (index: number) => {
      if (images[index - 1]) {
        ref.current?.getContext('2d')?.drawImage(images[index - 1], 0, 0);
      }
    },
    [images]
  );

  useMotionValueEvent(currentIdx, 'change', (latest) => {
    renderImg(Number(latest.toFixed()));
  });

  return (
    <div className='image-container'>
      <div className='image-gap' />
      <canvas width={1000} height={1000} ref={ref}></canvas>
    </div>
  );
};

export default App;
