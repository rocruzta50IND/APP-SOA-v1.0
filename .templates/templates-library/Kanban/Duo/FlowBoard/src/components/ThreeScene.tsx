import dynamic from 'next/dynamic';

const ThreeSceneClient = dynamic(() => import('./ThreeSceneClient'), {
  ssr: false,
  loading: () => <div className="w-full h-full absolute inset-0 -z-10 bg-background/50 animate-pulse" />
});

export function ThreeScene() {
  return <ThreeSceneClient />;
}