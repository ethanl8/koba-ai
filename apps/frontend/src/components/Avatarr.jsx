// src/components/Live2DViewer.js
import React, { useRef, useEffect } from 'react';
import * as PIXI from 'pixi.js';
import { Live2DModel } from 'pixi-live2d-display';

// This is important to make sure PIXI is available on the window
window.PIXI = PIXI;

const Live2DViewer = ({ modelUrl }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const app = new PIXI.Application({
      view: canvasRef.current,
      width: 500, // Set your desired width
      height: 800, // Set your desired height
      transparent: true,
    });

    const loadModel = async () => {
      const model = await Live2DModel.from(modelUrl);

      app.stage.addChild(model);

      // Scale and position the model
      model.scale.set(0.4);
      model.x = 250;
      model.y = 400;

      // You can also add animations here
      // model.motion('your_animation_name');
    };

    loadModel();

    return () => {
      app.destroy();
    };
  }, [modelUrl]);

  return <canvas ref={canvasRef} />;
};

export default Live2DViewer;