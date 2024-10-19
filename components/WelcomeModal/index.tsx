import React from 'react';
import { View, Text, Modal, Pressable, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import styles from './style';

interface WelcomeModalProps {
  isVisible: boolean;
  onClose: () => void;
}

function WelcomeModal({ isVisible, onClose }: WelcomeModalProps) {
  return (
    <Modal animationType="fade" transparent visible={isVisible} onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalView}>
              <Image
                source="https://lahelu.com/media/icons/icon-only.svg"
                style={styles.icon}
                contentFit="contain"
              />
              <Text style={styles.modalTitle}>Selamat datang!</Text>
              <Text style={styles.modalText}>
                Buat meme, beri vote, dan berkomentar setelah login!
              </Text>
              <Pressable style={styles.googleButton} onPress={onClose}>
                <Ionicons name="logo-google" size={18} color="#4285F4" style={styles.googleIcon} />
                <Text style={styles.googleButtonText}>Sign in dengan Google</Text>
              </Pressable>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export default WelcomeModal;
