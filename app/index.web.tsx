import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, Pressable, Linking, Image } from 'react-native';
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
import { MANCHESTER_PUB_CRAWL } from '@/constants/PubCrawlData';

// Image mapping for local pub images
const PUB_IMAGES = {
  1: require('@/assets/images/wharf.jpeg'),
  2: require('@/assets/images/bunny_jacksons.jpeg'),
  3: require('@/assets/images/refuge.jpg'),
  4: require('@/assets/images/rain_bar.jpeg'),
  5: require('@/assets/images/temple.jpeg'),
  6: require('@/assets/images/speak_in_code.jpg'),
  7: require('@/assets/images/salt_dog_slims.jpg'),
  8: require('@/assets/images/sinclairs.jpeg'),
  9: require('@/assets/images/washhouse.jpeg'),
  10: require('@/assets/images/ramona.jpeg'),
  11: require('@/assets/images/lost_cat.jpeg'),
  12: require('@/assets/images/crazy_pedros.jpeg'),
  13: require('@/assets/images/behind_closed_doors.jpeg'),
};

// Fixed viewport height
const ITEM_HEIGHT = 600; // Increased height for taller images
const VERTICAL_DELAY = 500; // Delay in ms for vertical transitions

export default function HomeScreen() {
  const scrollY = useSharedValue(0);
  const verticalScrollY = useSharedValue(0); // Used only for vertical animations with delay
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Force black background on web and add responsive styles
  useEffect(() => {
    // Apply global styles
    document.body.style.backgroundColor = '#000';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.color = '#fff';
    document.body.style.overflow = 'hidden'; // Prevent body scrolling
    
    // Add meta tag for mobile viewport
    const viewportMeta = document.createElement('meta');
    viewportMeta.name = 'viewport';
    viewportMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.head.appendChild(viewportMeta);
    
    // No mobile check needed, using media queries directly
    
    // Add hover and responsive styles
    const style = document.createElement('style');
    style.textContent = `
      .list-item:hover {
        background-color: rgba(255, 255, 255, 0.05);
      }
      
      /* Mobile-specific layout */
      @media only screen and (max-width: 480px) {
        .progress-container {
          display: none !important;
        }
        
        .list-item {
          display: flex !important;
          flex-direction: column !important;
          align-items: flex-start !important;
          padding: 30px 10px !important;
        }
        
        .number-container {
          position: relative !important;
          left: 0 !important;
          top: 0 !important;
          width: 40px !important;
          height: 40px !important;
          margin-right: 0 !important;
          margin-bottom: 15px !important;
          transform: none !important;
          opacity: 1 !important;
        }
        
        .pub-container {
          width: 100% !important;
          transform: none !important;
          opacity: 1 !important;
        }
        
        /* Force inline styles to be overridden */
        [style*="transform"] {
          transform: none !important;
        }
      }
      
      @media (max-width: 480px) {
        .header-text {
          font-size: 28px !important;
        }
        
        .number {
          font-size: 20px !important;
        }
        
        .title {
          font-size: 18px !important;
        }
        
        .text {
          font-size: 13px !important;
        }
        
        img {
          height: 180px !important;
        }
      }
      
      /* Tablet styles */
      @media (max-width: 768px) and (min-width: 481px) {
        .header-text {
          font-size: 32px !important;
        }
        
        .number-container {
          width: 60px !important;
          height: 60px !important;
          margin-right: 20px !important;
        }
        
        .number {
          font-size: 28px !important;
        }
        
        .title {
          font-size: 22px !important;
        }
        
        .text {
          font-size: 14px !important;
        }
        
        img {
          height: 200px !important;
        }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      document.body.style.overflow = '';
      document.head.removeChild(viewportMeta);
      document.head.removeChild(style);
      // No cleanup needed for resize listener
    };
  }, []);
  
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
  useEffect(() => {
    const updateActiveIndex = () => {
      const newIndex = Math.floor(scrollY.value / ITEM_HEIGHT);
      if (newIndex !== activeIndex && newIndex >= 0 && newIndex < MANCHESTER_PUB_CRAWL.length) {
        setActiveIndex(newIndex);
      }
    };
    
    const interval = setInterval(updateActiveIndex, 100);
    return () => clearInterval(interval);
  }, [scrollY.value, activeIndex]);
  
  // Check if we're on mobile
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Function to check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 480);
    };
    
    // Initial check
    checkMobile();
    
    // Listen for resize events
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return (
    <ThemedView style={styles.container}>
      {/* Fixed header that stays in place */}
      <View style={styles.fixedHeader}>
        <ThemedText style={styles.headerText} className="header-text">Slaker's Dozen</ThemedText>
      </View>
      
      {/* Main content that scrolls */}
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        contentContainerStyle={styles.scrollContent}>
        
        {/* Spacer to push content below fixed header */}
        <View style={{ height: 150 }} />
        
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
          
          const handlePress = () => {
            Linking.openURL(pub.url);
          };
          
          return (
            <Pressable 
              key={pub.id} 
              style={({pressed}) => [
                styles.listItem, 
                { height: ITEM_HEIGHT },
                pressed && {backgroundColor: 'rgba(255, 255, 255, 0.1)'},
                isMobile && styles.mobileListItem
              ]}
              onPress={handlePress}
              className="list-item"
            >
              <Animated.View 
                style={[
                  styles.numberContainer, 
                  numberAnimatedStyle,
                  isMobile && styles.mobileNumberContainer
                ]} 
                className="number-container"
              >
                <ThemedText style={styles.number} className="number">{pub.id}</ThemedText>
              </Animated.View>
              
              <Animated.View 
                style={[
                  styles.textContainer, 
                  pubAnimatedStyle,
                  isMobile && styles.mobileTextContainer
                ]} 
                className="pub-container"
              >
                <ThemedText style={styles.title} className="title">{pub.name}</ThemedText>
                <ThemedText style={styles.text} className="text">{pub.description}</ThemedText>
                
                {pub.specialFeature && (
                  <View style={styles.specialFeatureContainer}>
                    <ThemedText style={styles.specialFeature}>✨ {pub.specialFeature}</ThemedText>
                  </View>
                )}
                
                <View style={styles.imageContainer}>
                  <Image
                    source={PUB_IMAGES[pub.id]}
                    style={[
                      styles.venueImage,
                      isMobile && { height: 180 }
                    ]}
                    resizeMode="cover"
                  />
                </View>
                
              </Animated.View>
            </Pressable>
          );
        })}
        
        <View style={styles.footer}>
          <ThemedText style={styles.footerEmoji}>🍻</ThemedText>
        </View>
      </Animated.ScrollView>
      
      {/* Fixed progress indicator - hidden on mobile */}
      {!isMobile && (
        <View style={styles.progressContainer} className="progress-container">
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
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    height: '100vh', // Use 100vh to match viewport height on web
    position: 'relative', // Needed for fixed positioning
    overflow: 'hidden', // Prevent scrolling outside the container
  },
  fixedHeader: {
    position: 'fixed',
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
    maxWidth: 800,
    marginHorizontal: 'auto',
    paddingHorizontal: 16,
  },
  listItem: {
    flexDirection: 'row',
    paddingVertical: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    overflow: 'hidden',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  numberContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 60,
  },
  number: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  textContainer: {
    flex: 1,
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
  },
  specialFeatureContainer: {
    backgroundColor: 'rgba(255, 215, 0, 0.15)',
    borderRadius: 8,
    padding: 8,
    marginTop: 12,
    marginBottom: 12,
  },
  specialFeature: {
    color: '#d4af37',
    fontSize: 14,
    fontWeight: 'bold',
  },
  imageContainer: {
    marginTop: 16,
    marginBottom: 16,
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'rgba(30, 30, 30, 0.5)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  venueImage: {
    width: '100%',
    height: 220,
    borderRadius: 8,
  },
  // Mobile-specific styles
  mobileListItem: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingVertical: 30,
    paddingHorizontal: 10,
  },
  mobileNumberContainer: {
    width: 40,
    height: 40,
    marginRight: 0,
    marginBottom: 15,
    position: 'relative',
    left: 0,
    transform: [{ translateX: 0 }, { translateY: 0 }],
    opacity: 1,
  },
  mobileTextContainer: {
    width: '100%',
    transform: [{ translateX: 0 }, { translateY: 0 }],
    opacity: 1,
  },
  linkText: {
    fontSize: 16,
    color: '#3498db',
    marginTop: 12,
    fontWeight: 'bold',
  },
  footer: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  footerEmoji: {
    fontSize: 72,
    textAlign: 'center',
  },
  progressContainer: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -100 }],
    flexDirection: 'column',
    alignItems: 'center',
    zIndex: 10,
    padding: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 10,
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