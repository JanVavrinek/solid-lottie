import { JSX } from 'solid-js';
import {
  AnimationConfig,
  AnimationConfigWithData,
  AnimationConfigWithPath,
  AnimationItem,
  AnimationEventCallback,
  AnimationEventName
} from 'lottie-web';

export interface LottieRef {
  destroy?: AnimationItem['destroy'];
  stop?: AnimationItem['stop'];
  play?: AnimationItem['play'];
  pause?: AnimationItem['pause'];
  goToAndPlay?: AnimationItem['goToAndPlay'];
  goToAndStop?: AnimationItem['goToAndStop'];
  getDuration?: AnimationItem['getDuration'];
  setSpeed?: AnimationItem['setSpeed'];
  setDirection?: AnimationItem['setDirection'];
  playSegments?: AnimationItem['playSegments'];
  setSubframe?: AnimationItem['setSubframe'];
}

export type LottieListener = { name: AnimationEventName; handler: AnimationEventCallback };
export type LottiePartialListener = { name: AnimationEventName; handler?: AnimationEventCallback };

export interface LottieListeners {
  onComplete?: AnimationEventCallback;
  onLoopComplete?: AnimationEventCallback;
  onEnterFrame?: AnimationEventCallback;
  onSegmentStart?: AnimationEventCallback;
  onConfigReady?: AnimationEventCallback;
  onDataReady?: AnimationEventCallback;
  onDataFailed?: AnimationEventCallback;
  onLoadedImages?: AnimationEventCallback;
  onDOMLoaded?: AnimationEventCallback;
  onDestroy?: AnimationEventCallback;
  onError?: AnimationEventCallback;
}

export interface LottieProps extends LottieListeners {
  animationData?: AnimationConfigWithData<'svg'>['animationData'];
  path?: AnimationConfigWithPath<'svg'>['path'];
  autoplay?: AnimationConfig<'svg'>['autoplay'];
  loop?: AnimationConfig<'svg'>['loop'];
  name?: AnimationConfig<'svg'>['name'];
  initialSegment?: AnimationConfig<'svg'>['initialSegment'];
  ref?: (ref: LottieRef) => void;
  width?: JSX.CSSProperties['width'];
  height?: JSX.CSSProperties['height'];
  style?: Omit<JSX.CSSProperties, 'height' | 'width'>;
  speed?: number;
}
