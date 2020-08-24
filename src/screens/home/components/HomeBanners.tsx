import React, { useState, useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { BannerService } from '@/services';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Banner } from '@/types';
import { colors } from '@/theme';

export const HomeBanners = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const carouselRef = useRef(null);

  const width = Dimensions.get('screen').width;

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setIsLoading(true);
        const results = await BannerService.getBanners();
        setBanners(results.banners);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBanners();
  }, []);

  if (isLoading || error) {
    return <View style={styles.box}></View>;
  }

  const renderItem = ({ item }: { item: Banner }) => {
    return (
      <View>
        <Image source={{ uri: item.imageURL }} style={styles.bannerImg} />
      </View>
    );
  };

  const pagination = () => {
    return (
      <Pagination
        dotsLength={banners.length}
        activeDotIndex={activeIndex}
        containerStyle={{
          marginTop: -50,
        }}
        dotStyle={{
          width: 6,
          height: 6,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: 'rgba(0, 0, 0, 0.92)',
        }}
        tappableDots={carouselRef.current ? true : false}
        inactiveDotOpacity={0.4}
        inactiveDotScale={1}
        carouselRef={carouselRef.current}
      />
    );
  };

  return (
    <View>
      <Carousel
        data={banners}
        ref={(c) => {
          carouselRef.current = c;
        }}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
      {pagination()}
    </View>
  );
};

const styles = StyleSheet.create({
  bannerImg: {
    width: '100%',
    height: 200,
  },
  box: {
    backgroundColor: colors.lightGray,
    height: 200,
  },
});
