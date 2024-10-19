import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { IconSize } from '@/constants';

type IconProps = React.ComponentProps<typeof Ionicons>;

interface IconTabBarProps {
  name: IconProps['name'];
  color: string;
  size?: number;
}

function IconTabBar({ name, color, size = IconSize }: IconTabBarProps): React.ReactElement {
  return <Ionicons name={name} color={color} size={size} />;
}

export default IconTabBar;
