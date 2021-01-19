import React, { useState, useCallback, useContext } from 'react';
import Cropper from 'react-easy-crop';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { useMutation } from '@apollo/client';

import './cropimage.css';
import { GET_LOGGED_USER } from '../../services/Users/UsersQuery';
import { SET_PROFILE_PICTURE } from '../../services/Users/UsersAccessMutation';
import { AuthContext } from '../../Context/Auth';
import getCroppedImg from './CropImage.jsx';
import { styles } from './Styles.js';

function ImgCropper({ classes, imageLink }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const { user } = useContext(AuthContext);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const [setPicture] = useMutation(SET_PROFILE_PICTURE);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageLink,
        croppedAreaPixels,
        rotation
      );
      await setCroppedImage(croppedImage);
      await setPicture({
        variables: { file: croppedImage },
      });
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  return (
    <div>
      <div>
        <div className={classes.cropContainer}>
          <Cropper
            image={imageLink}
            crop={crop}
            cropShape="round"
            rotation={rotation}
            zoom={zoom}
            aspect={4 / 4}
            onCropChange={setCrop}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <div className={classes.controls}>
          <div className={classes.sliderContainer}>
            <Typography
              variant="overline"
              classes={{ root: classes.sliderLabel }}
            >
              Zoom
            </Typography>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              classes={{ container: classes.slider }}
              onChange={(e, zoom) => setZoom(zoom)}
            />
          </div>
          <div className={classes.sliderContainer}>
            <Typography
              variant="overline"
              classes={{ root: classes.sliderLabel }}
            >
              Rotation
            </Typography>
            <Slider
              value={rotation}
              min={0}
              max={360}
              step={1}
              aria-labelledby="Rotation"
              classes={{ container: classes.slider }}
              onChange={(e, rotation) => setRotation(rotation)}
            />
          </div>
          <Button
            onClick={showCroppedImage}
            variant="contained"
            color="primary"
            classes={{ root: classes.cropButton }}
          >
            Upload picture
          </Button>
        </div>
      </div>
    </div>
  );
}

const StyledDemo = withStyles(styles)(ImgCropper);

export default StyledDemo;
