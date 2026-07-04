import SoftAurora from './SoftAurora';

export const AuroraBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-cream dark:bg-black transition-colors duration-500">
      <SoftAurora
        speed={0.5}
        scale={1}
        brightness={1.0}
        color1="#144ea0"
        color2="#d097ae"
        noiseFrequency={2}
        noiseAmplitude={8}
        bandHeight={0.5}
        bandSpread={1.0}
        octaveDecay={0.25}
        layerOffset={0.7}
        colorSpeed={3.7}
        enableMouseInteraction={true}
        mouseInfluence={0.5}
      />
    </div>
  );
};
