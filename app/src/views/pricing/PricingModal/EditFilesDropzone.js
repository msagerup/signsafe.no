/* eslint-disable react/no-array-index-key */
import React, { useState, useCallback, Suspense } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { useDropzone } from 'react-dropzone';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  makeStyles
} from '@material-ui/core';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import MoreIcon from '@material-ui/icons/MoreVert';
import bytesToSize from 'src/utils/bytesToSize';
// Firebase
import firebase from '../../../utils/firebase';
import 'firebase/storage';
// Redux
// import { getImageUrl } from '.../actions/hotelActions';
import { getImageUrl } from '../../../actions/hotelActions';

import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
  root: {},
  dropZone: {
    border: `1px dashed ${theme.palette.divider}`,
    padding: theme.spacing(6),
    outline: 'none',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      opacity: 0.5,
      cursor: 'pointer'
    }
  },
  dragActive: {
    backgroundColor: theme.palette.action.active,
    opacity: 0.5
  },
  image: {
    width: 130
  },
  info: {
    marginTop: theme.spacing(1)
  },
  list: {
    maxHeight: 320
  },
  actions: {
    marginTop: theme.spacing(2),
    display: 'flex',
    justifyContent: 'flex-end',
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  }
}));

function FilesDropzone({ className, ...rest }) {
  const classes = useStyles();
  const [files, setFiles] = useState([]);
  const dispatch = useDispatch();
  const { imageUrl } = useSelector(state => state.hotel);

  const handleDrop = useCallback(acceptedFiles => {
    setFiles(prevFiles => [...prevFiles].concat(acceptedFiles));
  }, []);

  const sendFiles = () => {
    // Set ref to firebase.
    const ref = firebase.storage().ref();
    const file = files[0];
    // Name image file.
    const name = +new Date() + '-' + file.name;
    const metadata = {
      contentType: file.type
    };
    // Get image download url and then save it to redux.
    const task = ref.child(name).put(file, metadata);
    task
      .then(snapshot => snapshot.ref.getDownloadURL())
      .then(url => {
        dispatch(getImageUrl(url));
      })
      .catch(console.error);
  };

  const handleRemoveAll = () => {
    setFiles([]);
    dispatch(getImageUrl(''));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop
  });

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      { files.length > 0 ? (
        ''
      ) :
      (
      <div
        className={clsx({
          [classes.dropZone]: true,
          [classes.dragActive]: isDragActive
        })}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div>
          <Typography gutterBottom variant="h5">
            Upload new file
          </Typography>
          <Box mt={2}>
            <Typography color="textPrimary" variant="body2">
              Drop file a here or click <Link underline="always">browse</Link>{' '}
              thorough your machine
            </Typography>
          </Box>
        </div>
      </div>
      )
    }
      {files.length > 0 && (
        <>
          <PerfectScrollbar options={{ suppressScrollX: true }}>
            <List className={classes.list}>
              {files.map((file, i) => (
                <div key={i}>
                  { imageUrl ? (
                  <Suspense fallback={<h5>lOADING</h5>}>
                    <img
                      alt="Select file"
                      className={classes.image}
                      src={imageUrl}
                    />
                  </Suspense>
                  ) : (
                    ''
                  )
                  }
                  <ListItem divider={i < files.length - 1}>
                    <ListItemIcon>
                      <FileCopyIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={file.name}
                      primaryTypographyProps={{ variant: 'h5' }}
                      secondary={bytesToSize(file.size)}
                    />
                  </ListItem>
                </div>
              ))}
            </List>
          </PerfectScrollbar>
          <div className={classes.actions}>
            <Button onClick={handleRemoveAll} size="small">
              Remove image
            </Button>
            <Button
              color="secondary"
              size="small"
              variant="contained"
              onClick={sendFiles}
              disabled={imageUrl ? true : false}
            >
              {imageUrl ? 'Filed uploaded' : 'Upload file'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

FilesDropzone.propTypes = {
  className: PropTypes.string
};

export default FilesDropzone;
