import React, { useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  PanResponderGestureState,
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import {
  ReactNativeZoomableView,
  ZoomableViewEvent,
} from '@openspacelabs/react-native-zoomable-view';

interface ZoomableVideoProps {
  videoUri: string;
  width: number;
  height: number;
  isMuted: boolean;
  toggleMute: () => void;
}

const ZoomableVideo: React.FC<ZoomableVideoProps> = ({
  videoUri,
  width,
  height,
  isMuted,
  toggleMute,
}) => {
  const zoomableViewRef = useRef<ReactNativeZoomableView>(null);
  const [isZoomed, setIsZoomed] = useState(false);

  const handleZoomAfter = (
    event: GestureResponderEvent,
    gestureState: PanResponderGestureState,
    zoomableViewEventObject: ZoomableViewEvent,
  ) => {
    zoomableViewRef.current?.zoomTo(1);
    setIsZoomed(zoomableViewEventObject.zoomLevel > 1);
  };

  const handleShiftingEnd = () => {
    if (isZoomed) {
      zoomableViewRef.current?.zoomTo(1);
      setIsZoomed(false);
    }
  };

  return (
    <View style={styles.videoWrapper}>
      <ReactNativeZoomableView
        ref={zoomableViewRef}
        maxZoom={3}
        minZoom={1}
        zoomStep={0.5}
        initialZoom={1}
        bindToBorders={true}
        onZoomEnd={handleZoomAfter}
        onShiftingEnd={handleShiftingEnd}
        contentWidth={width}
        contentHeight={height}
      >
        <Video
          source={{ uri: videoUri }}
          style={[styles.media, { width, height }]}
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          isMuted={isMuted}
          useNativeControls={false}
          shouldPlay
        />
      </ReactNativeZoomableView>
      <TouchableOpacity style={styles.muteButton} onPress={toggleMute}>
        <Ionicons name={isMuted ? 'volume-mute' : 'volume-medium'} size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  videoWrapper: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  media: {
    width: '100%',
    height: '100%',
  },
  muteButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 5,
  },
});

export default ZoomableVideo;
