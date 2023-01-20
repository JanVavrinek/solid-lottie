import { createEffect, createSignal, on, onCleanup, onMount, splitProps, VoidComponent } from 'solid-js';
import lottie, { AnimationDirection, AnimationItem, AnimationSegment } from 'lottie-web';
import localProps from './constants';
import { LottieProps } from '../..';
import { LottieListener } from '../../types';

const Lottie: VoidComponent<LottieProps> = (props) => {
  const [local, others] = splitProps(props, localProps);
  const [animation, setAnimation] = createSignal<AnimationItem>();

  let container: HTMLDivElement | undefined;

  createEffect(() => {
    const a = animation();
    if (!a) return;
    const listeners: LottieListener[] = [
      { name: 'DOMLoaded', handler: local.onDOMLoaded },
      { name: 'complete', handler: local.onComplete },
      { name: 'config_ready', handler: local.onConfigReady },
      { name: 'data_failed', handler: local.onDataFailed },
      { name: 'data_ready', handler: local.onDataReady },
      { name: 'destroy', handler: local.onDestroy },
      { name: 'enterFrame', handler: local.onEnterFrame },
      { name: 'error', handler: local.onError },
      { name: 'loaded_images', handler: local.onLoadedImages },
      { name: 'loopComplete', handler: local.onLoopComplete },
      { name: 'segmentStart', handler: local.onSegmentStart }
    ].filter((listener): listener is LottieListener => listener.handler !== undefined);

    if (!listeners.length) return;

    listeners.forEach((listener) => a.addEventListener(listener.name, listener.handler));
  });

  /**
   * Setup new animation and destroy old animation if it exists
   */
  const setupAnimation = () => {
    setAnimation((s) => {
      s?.destroy();

      if (!container) return;
      if (!local.path && !local.animationData)
        throw new Error('You must provide animationData or path to the animation data');

      const a = lottie.loadAnimation({
        container,
        animationData: local.animationData,
        path: local.path,
        loop: local.loop,
        autoplay: local.autoplay,
        name: local.name,
        initialSegment: local.initialSegment
      });
      a.setSpeed(local.speed ?? 1);
      return a;
    });
  };

  createEffect(on(() => local.animationData, setupAnimation));
  createEffect(on(() => local.path, setupAnimation));

  createEffect(() => {
    const a = animation();
    if (!a) return;

    a.setSpeed(local.speed ?? 1);
    a.loop = local.loop ?? false;
    a.autoplay = local.autoplay ?? false;
  });

  /**
   * Destroy animation
   */
  const destroy = () =>
    setAnimation((s) => {
      s?.destroy();
      return undefined;
    });

  /**
   * Stop animation
   */
  const stop = () => animation()?.stop();

  /**
   * Play animation
   */
  const play = () => animation()?.play();

  /**
   * Pause animation
   */
  const pause = () => animation()?.pause();

  /**
   * Set playback value and resume animation playback
   * @param value frame number or segment
   * @param isFrame set `true` if `value` is frame number
   */
  const goToAndPlay = (value: string | number, isFrame?: boolean) => animation()?.goToAndPlay(value, isFrame);

  /**
   * Set playback value and stop at it
   * @param value frame number or segment
   * @param isFrame set `true` if `value` is frame number
   */
  const goToAndStop = (value: string | number, isFrame?: boolean) => animation()?.goToAndStop(value, isFrame);

  /**
   * Get duration of the animation
   * @param inFrames set `true` for duration in frames
   */
  const getDuration = (inFrames?: boolean) => animation()?.getDuration(inFrames) ?? 0;

  /**
   * Set animation speed
   * @param speed defaults to `1`
   */
  const setSpeed = (speed: number) => animation()?.setSpeed(speed);

  /**
   * Set animation direction
   * @param direction `1` is forward, `-1` is reverse
   * @returns
   */
  const setDirection = (direction: AnimationDirection) => animation()?.setDirection(direction);

  /**
   * Play animation segments
   * @param segments segment is an array with two items (frame numbers) used as a first and last frames or an array of segments
   * @param forceFlag if true the new segment(s) will start immediately
   */
  const playSegments = (segments: AnimationSegment | AnimationSegment[], forceFlag?: boolean | undefined) =>
    animation()?.playSegments(segments, forceFlag);

  /**
   * Set if the original AE fps should be used. If true animation will update on every `requestAnimationFrame`
   * @param useSubFrames
   * @returns
   */
  const setSubframe = (useSubFrames: boolean) => animation()?.setSubframe(useSubFrames);

  /**
   * Setup ref onMount
   */
  onMount(() => {
    if (props.ref)
      props.ref({
        destroy,
        play,
        stop,
        pause,
        goToAndPlay,
        getDuration,
        goToAndStop,
        setSpeed,
        setDirection,
        playSegments,
        setSubframe
      });
  });

  /**
   * Destroy animation onCleanup
   */
  onCleanup(() => {
    if (destroy) destroy();
  });

  return (
    <div
      {...others}
      style={{ width: local.width ?? '100%', height: local.height ?? '100%', ...local.style }}
      ref={container}
    ></div>
  );
};
export default Lottie;
