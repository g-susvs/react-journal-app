import { ImageListItem, ImageList } from '@mui/material';
import { memo } from 'react';

export const ImageGallery = memo(({images = []}) => {

  return (
    <ImageList sx={{ width: '100%', height: 500 }} cols={4} rowHeight={200}>
      { images.map((img) => (
        <ImageListItem key={img}>
          <img
            src={img}
            srcSet={`${img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt="Imagen de la nota"
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
})