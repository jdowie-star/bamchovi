import { Image } from 'expo-image';
import { useCallback } from 'react';
import { StyleSheet, Linking } from 'react-native';
import * as Haptics from 'expo-haptics';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { ExternalLink } from '@/components/ExternalLink';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

type PubStopProps = {
  name: string;
  description: string;
  url: string;
  imageUrl: string;
  specialFeature?: string;
};

export function PubStop({ name, description, url, imageUrl, specialFeature }: PubStopProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const themeColors = Colors[colorScheme];
  
  const handlePress = useCallback(async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    await Linking.openURL(url);
  }, [url]);

  return (
    <ThemedView style={styles.container}>
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.image} 
        contentFit="cover"
        transition={1000}
      />
      
      <ThemedView style={styles.contentContainer}>
        <ThemedText type="title" style={styles.title}>{name}</ThemedText>
        <ThemedText style={styles.description}>{description}</ThemedText>
        
        {specialFeature && (
          <ThemedView style={styles.specialFeatureContainer}>
            <ThemedText type="defaultSemiBold" style={styles.specialFeature}>
              ✨ {specialFeature}
            </ThemedText>
          </ThemedView>
        )}
        
        <ExternalLink href={url} style={styles.linkButton} onPress={handlePress}>
          <ThemedText type="link">Visit Website</ThemedText>
        </ExternalLink>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 24,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    height: 200,
    width: '100%',
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    marginBottom: 8,
  },
  description: {
    marginBottom: 12,
  },
  specialFeatureContainer: {
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    borderRadius: 8,
    padding: 8,
    marginBottom: 12,
  },
  specialFeature: {
    color: '#d4af37',
  },
  linkButton: {
    alignSelf: 'flex-start',
    marginTop: 4,
  },
});