import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';
import apiURL from '../../utils/apiURL';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const width = Dimensions.get('screen').width;

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef();

  useEffect(() => {
    const getBanners = async () => {
      try {
        const { data } = await axios.get(`${apiURL}/banners`);
        setBanners(data.banners);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getBanners();
  }, []);

  const renderItem = ({ item, index }) => {
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
          marginTop: -50
        }}
        dotStyle={{
          width: 6,
          height: 6,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: 'rgba(0, 0, 0, 0.92)'
        }}
        inactiveDotStyle={
          {
            // Define styles for inactive dots here
          }
        }
        tappableDots={true}
        inactiveDotOpacity={0.4}
        inactiveDotScale={1}
        carouselRef={carouselRef.current}
      />
    );
  };

  return (
    <View>
      {!isLoading && (
        <>
          <Carousel
            data={banners}
            ref={c => {
              carouselRef.current = c;
            }}
            renderItem={renderItem}
            sliderWidth={width}
            itemWidth={width}
            onSnapToItem={index => setActiveIndex(index)}
          />
          {pagination()}
        </>
      )}
    </View>
  );
};

export default Banner;

const styles = StyleSheet.create({
  bannerImg: {
    width: '100%',
    height: 200
  }
});
