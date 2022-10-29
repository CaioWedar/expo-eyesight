import React, { createContext, useContext, useEffect, useState } from "react";
import * as tf from "@tensorflow/tfjs";

import "@tensorflow/tfjs-react-native";
import "expo-gl";
import "expo-gl-cpp";
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

export const useModel = () => {
  const context = useContext(ModelContext);

  if (context) {
    return context;
  }

  console.error("useModel hook can only be used inside ModelProvider");
};

export default ModelProvider;
