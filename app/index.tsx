import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedStyle,
  useAnimatedScrollHandler,
  useSharedValue,
  interpolate,
  Extrapolation,
  withTiming,
} from 'react-native-reanimated';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { PubStop } from '@/components/PubStop';
import { MANCHESTER_PUB_CRAWL } from '@/constants/PubCrawlData';

// Fixed viewport height
const VIEWPORT_HEIGHT = Dimensions.get('window').height;
const ITEM_HEIGHT = 600; // Increased height for pub stops
const VERTICAL_DELAY = 500; // Delay in ms for vertical transitions

export default function HomeScreen() {
  const scrollY = useSharedValue(0);
  const verticalScrollY = useSharedValue(0); // Used only for vertical animations with delay
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Handle scroll events
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      // Update horizontal animations immediately
      scrollY.value = event.contentOffset.y;
      
      // Update vertical animations with delay
      verticalScrollY.value = withTiming(event.contentOffset.y, {
        duration: VERTICAL_DELAY,
      });
    },
  });
  
  // Update the active index based on scroll position
  React.useEffect(() => {
    const updateActiveIndex = () => {
      const newIndex = Math.floor(scrollY.value / ITEM_HEIGHT);
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < MANCHESTER_PUB_CRAWL.length) {
        setActiveIndex(newIndex);
      }
    };
    
    const interval = setInterval(updateActiveIndex, 100);
    return () => clearInterval(interval);
  }, [scrollY.value, activeIndex]);
  
  return (
    <ThemedView style={styles.container}>
      {/* Fixed header that stays in place */}
      <View style={styles.fixedHeader}>
        <ThemedText style={styles.headerText}>Manchester Pub Crawl</ThemedText>
        <ThemedText style={styles.subHeaderText}>Scroll to explore</ThemedText>
      </View>
      
      {/* Main content that scrolls */}
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        contentContainerStyle={styles.scrollContent}>
        
        {/* Spacer to push content below fixed header */}
        <View style={{ height: 150 }} />
        
        <ThemedView style={styles.introContainer}>
          <ThemedText style={styles.introText}>
            Embark on an adventure through Manchester's most iconic pubs and bars. 
            From historic watering holes to hidden speakeasies, this curated journey 
            showcases the city's diverse drinking culture.
          </ThemedText>
        </ThemedView>
        
        {MANCHESTER_PUB_CRAWL.map((pub, index) => {
          // Create animated styles for number (from left) - immediate horizontal response
          const numberAnimatedStyle = useAnimatedStyle(() => {
            // Horizontal movement (immediate)
            const translateX = interpolate(
              scrollY.value,
              [(index - 1) * ITEM_HEIGHT, index * ITEM_HEIGHT, (index + 1) * ITEM_HEIGHT],
              [-300, 0, 0],
              Extrapolation.CLAMP
            );
            
            // Vertical movement (delayed)
            const translateY = interpolate(
              verticalScrollY.value,
              [index * ITEM_HEIGHT, (index + 0.5) * ITEM_HEIGHT, (index + 1) * ITEM_HEIGHT],
              [0, -50, -150],
              Extrapolation.CLAMP
            );
            
            // Opacity based on horizontal movement (immediate)
            const opacity = interpolate(
              scrollY.value,
              [(index - 1) * ITEM_HEIGHT, index * ITEM_HEIGHT, (index + 1) * ITEM_HEIGHT],
              [0, 1, 0.3],
              Extrapolation.CLAMP
            );
            
            return {
              transform: [
                { translateX },
                { translateY }
              ],
              opacity,
            };
          });
          
          // Create animated styles for pub content (from right) - immediate horizontal response
          const pubAnimatedStyle = useAnimatedStyle(() => {
            // Horizontal movement (immediate)
            const translateX = interpolate(
              scrollY.value,
              [(index - 1) * ITEM_HEIGHT, index * ITEM_HEIGHT, (index + 1) * ITEM_HEIGHT],
              [300, 0, 0],
              Extrapolation.CLAMP
            );
            
            // Vertical movement (delayed)
            const translateY = interpolate(
              verticalScrollY.value,
              [index * ITEM_HEIGHT, (index + 0.5) * ITEM_HEIGHT, (index + 1) * ITEM_HEIGHT],
              [0, -50, -150],
              Extrapolation.CLAMP
            );
            
            // Opacity based on horizontal movement (immediate)
            const opacity = interpolate(
              scrollY.value,
              [(index - 1) * ITEM_HEIGHT, index * ITEM_HEIGHT, (index + 1) * ITEM_HEIGHT],
              [0, 1, 0.3],
              Extrapolation.CLAMP
            );
            
            return {
              transform: [
                { translateX },
                { translateY }
              ],
              opacity,
            };
          });
          
          return (
            <View key={pub.id} style={[styles.listItem, { minHeight: ITEM_HEIGHT }]}>
              <ThemedView style={styles.stopIndicatorContainer}>
                <Animated.View style={[styles.numberContainer, numberAnimatedStyle]}>
                  <ThemedText style={styles.number}>{pub.id}</ThemedText>
                </Animated.View>
              </ThemedView>
              
              <Animated.View style={[styles.pubContainer, pubAnimatedStyle]}>
                <PubStop 
                  name={pub.name}
                  description={pub.description}
                  url={pub.url}
                  imageUrl={pub.imageUrl}
                  specialFeature={pub.specialFeature}
                />
              </Animated.View>
            </View>
          );
        })}
        
        <View style={styles.footer}>
          <ThemedText style={styles.footerTitle}>Journey Complete!</ThemedText>
          <ThemedText style={styles.footerText}>
            Congratulations on exploring Manchester's legendary pub crawl! Remember to drink
            responsibly and always plan a safe way home.
          </ThemedText>
        </View>
      </Animated.ScrollView>
      
      {/* Fixed progress indicator */}
      <View style={styles.progressContainer}>
        {MANCHESTER_PUB_CRAWL.map((_, index) => (
          <View 
            key={index} 
            style={[
              styles.progressDot, 
              index === activeIndex && styles.activeProgressDot
            ]} 
          />
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  headerText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  subHeaderText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 8,
  },
  scrollContent: {
    paddingBottom: 80,
    paddingHorizontal: 16,
  },
  introContainer: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  introText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#fff',
    textAlign: 'center',
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: 32,
    alignItems: 'flex-start',
    overflow: 'hidden',
  },
  stopIndicatorContainer: {
    width: 100,
    alignItems: 'center',
    paddingTop: 20,
  },
  numberContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  pubContainer: {
    flex: 1,
  },
  footer: {
    padding: 24,
    borderRadius: 16,
    backgroundColor: 'rgba(50, 150, 50, 0.15)',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  footerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  footerText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
  },
  progressContainer: {
    position: 'absolute',
    right: 20,
    top: '50%',
    transform: [{ translateY: -100 }],
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 10,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    margin: 4,
  },
  activeProgressDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
});