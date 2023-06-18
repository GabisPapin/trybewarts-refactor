import { ImageList, ImageListItem } from '@mui/material';
import TrybewartsLogo from '../assets/logo-trybewarts.png';

const ImageLogo = (): JSX.Element => {
  return (
    <ImageList>
      <ImageListItem>
        <img src={TrybewartsLogo} />
      </ImageListItem>
    </ImageList>
  );
};

export default ImageLogo;
