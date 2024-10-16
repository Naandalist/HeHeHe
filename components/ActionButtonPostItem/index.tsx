import React from 'react';
import { View, Text, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';
import { PostInfo } from '@/types';
import { styles } from './style';

// Import images
import arrowBigUpImage from '../../assets/images/arrow-big-up.png';
import arrowBigDownImage from '../../assets/images/arrow-big-down.png';
import messageSquareTextImage from '../../assets/images/message-square-text.png';
import forwardImage from '../../assets/images/forward.png';

interface ActionButtonsProps {
  item: PostInfo;
}

function ActionButtons({ item }: ActionButtonsProps) {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.likeAndDislike}>
          <TouchableOpacity style={styles.button}>
            <Image source={arrowBigUpImage as ImageSourcePropType} style={styles.icon} />
            <Text style={styles.buttonText}>{item.totalUpvotes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Image source={arrowBigDownImage as ImageSourcePropType} style={styles.icon} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.buttonComment}>
          <Image source={messageSquareTextImage as ImageSourcePropType} style={styles.icon} />
          <Text style={styles.buttonText}>{item.totalUpvotes}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.buttonShare}>
        <Image source={forwardImage as ImageSourcePropType} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}

export default ActionButtons;
