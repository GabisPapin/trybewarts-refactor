import { ImageList, ImageListItem } from '@mui/material';
import TrybewartsLogo from '../assets/logo-trybewarts.png';

const ImageLogo = (): JSX.Element => {
  return (
    <ImageList sx={{ width: 900, height: 600 }} rowHeight={200}>
      <ImageListItem>
        <img src={TrybewartsLogo} />
      </ImageListItem>
    </ImageList>
  );
};

export default ImageLogo;
