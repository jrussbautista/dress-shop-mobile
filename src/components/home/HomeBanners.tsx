import Banners from '@/components/banners';
import { BannerService } from '@/services';
import { colors } from '@/theme';
import { Banner } from '@/types';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

const HomeBanners = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loadingBanners, setLoadingBanners] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoadingBanners(true);
        const results = await BannerService.getBanners();
        setBanners(results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingBanners(false);
      }
    };
    fetchBanners();
  }, []);

  return (
    <>
      {loadingBanners ? (
        <View style={styles.bannersBox} />
      ) : (
        <Banners banners={banners} />
      )}
    </>
  );
};

export default HomeBanners;

const styles = StyleSheet.create({
  bannersBox: {
    backgroundColor: colors.lightGray,
    height: 200,
  },
});
