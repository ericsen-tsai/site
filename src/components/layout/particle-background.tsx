"use client";

import { IOptions, RecursivePartial } from "@tsparticles/engine";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useEffect, useMemo, useState } from "react";

function ParticleBackground() {
  const [init, setInit] = useState(false);

  const particleOptions = useMemo<RecursivePartial<IOptions>>(
    () => ({
      autoPlay: true,
      fullScreen: {
        enable: true,
        zIndex: 0,
      },
      detectRetina: true,
      fpsLimit: 120,
      interactivity: {
        detectsOn: "window",
        events: {
          resize: {
            enable: false,
          },
        },
        modes: {
          trail: {
            delay: 1,
            quantity: 1,
          },
          attract: {
            distance: 200,
            duration: 0.4,
            factor: 1,
            speed: 1,
          },
          bubble: {
            distance: 400,
            duration: 2,
            opacity: 0.8,
            size: 40,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
            factor: 100,
            speed: 1,
          },
        },
      },
      particles: {
        bounce: {
          horizontal: {
            value: 1,
          },
          vertical: {
            value: 1,
          },
        },
        collisions: {
          enable: false,
        },
        color: {
          value: "#ffffff",
        },
        move: {
          enable: true,
          speed: 0.5,
          outModes: {
            default: "out",
          },
        },
        number: {
          density: {
            enable: true,
            width: 1920,
            height: 1080,
          },
          value: 50,
        },
        opacity: {
          value: {
            min: 0.1,
            max: 0.5,
          },
        },
        shape: {
          type: "circle",
        },
        size: {
          value: {
            min: 1,
            max: 4,
          },
        },
        links: {
          color: {
            value: "#ffffff",
          },
          distance: 150,
          enable: true,
          opacity: 0.4,
          width: 1,
        },
      },
      pauseOnBlur: true,
      pauseOnOutsideViewport: true,
      zLayers: 1,
      motion: {
        reduce: {
          factor: 4,
          value: true,
        },
      },
    }),
    []
  );

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  return init ? (
    <Particles
      id="particles"
      options={particleOptions}
      className="absolute top-0 left-0 z-0"
    />
  ) : null;
}

export default ParticleBackground;
