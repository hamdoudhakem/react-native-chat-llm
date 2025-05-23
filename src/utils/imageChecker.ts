export const checkImageURL = (url: string) => {
  if (!url) return false;

  const pattern = new RegExp(
    '^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$',
    'i'
  );
  return pattern.test(url);
};
