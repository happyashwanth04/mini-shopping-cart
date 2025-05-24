export const getDeviceType = () => {
  const screenWidth = window.innerWidth;
  
  // Standard breakpoints (can be customized)
  if (screenWidth < 768) {
    return 'mobile';
  } else if (screenWidth >= 768 && screenWidth < 1024) {
    return 'tablet';
  } else {
    return 'desktop';
  }
}