import React, { PropsWithChildren, useCallback, useMemo } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
  useAnimatedReaction,
} from 'react-native-reanimated';

interface ZoomableViewProps {
  style?: StyleProp<ViewStyle>;
  onZoomChange?: (isZoomed: boolean) => void;
}

function ZoomableView({
  children,
  style = undefined,
  onZoomChange = () => {},
}: PropsWithChildren<ZoomableViewProps>): JSX.Element {
  // Shared values for animation
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const ANIMATION_DURATION = 300;
  const ZOOM_THRESHOLD = 1.1;

  // Function to reset zoom and translation
  const resetZoom = useCallback(() => {
    scale.value = withTiming(1, { duration: ANIMATION_DURATION });
    savedScale.value = 1;
    translateX.value = withTiming(0, { duration: ANIMATION_DURATION });
    translateY.value = withTiming(0, { duration: ANIMATION_DURATION });
  }, [scale, savedScale, translateX, translateY]);

  // React to changes when zoom
  useAnimatedReaction(
    () => scale.value > ZOOM_THRESHOLD,
    (isZoomed, previouslyZoomed) => {
      if (isZoomed !== previouslyZoomed) {
        // run onZoomChange on the JS thread when zoom state change
        runOnJS(onZoomChange)(isZoomed);
      }
    },
    [onZoomChange],
  );

  const gesture = useMemo(
    () =>
      Gesture.Simultaneous(
        // Pinch gesture for zooming
        Gesture.Pinch()
          .onStart(() => {
            savedScale.value = scale.value;
          })
          .onUpdate((e) => {
            if (e.numberOfPointers >= 2) {
              scale.value = savedScale.value * e.scale;
            }
          })
          .onEnd(() => {
            runOnJS(resetZoom)();
          }),
        // Pan gesture for moving zoomed area
        Gesture.Pan()
          .minPointers(2)
          .onUpdate((e) => {
            if (scale.value > 1 && e.numberOfPointers >= 2) {
              translateX.value = e.translationX;
              translateY.value = e.translationY;
            }
          })
          .onEnd(() => {
            runOnJS(resetZoom)();
          }),
      ),
    [resetZoom, scale, savedScale, translateX, translateY],
  );

  // Animated style for zoom and translation
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[style, animatedStyle]}>{children}</Animated.View>
    </GestureDetector>
  );
}

export default ZoomableView;