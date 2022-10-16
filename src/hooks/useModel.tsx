import React, { createContext, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";

import "@tensorflow/tfjs-react-native";
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-backend-cpu";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

interface Props {
  children: React.ReactNode;
}

const ModelContext = createContext<cocoSsd.ObjectDetection | null>(null);

const ModelProvider: React.FC<Props> = ({ children }) => {
  const [model, setModel] = useState<cocoSsd.ObjectDetection | null>(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        console.error("initializing tf");
        await tf.ready();

        console.error("loading model");
        const model = await cocoSsd.load();

        setModel(model);
        console.error("ready to go");
      } catch (err) {
        console.error(err, "error loading");
      }
    };
    loadModel();
  }, []);

  return (
    <ModelContext.Provider value={model}>{children}</ModelContext.Provider>
  );
};

export default ModelProvider;
