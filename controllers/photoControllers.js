const Photo = require('../models/Photo');
const fs = require('fs');

exports.getAllPhotos = async (req, res) => {
  const photos = await Photo.find({}).sort('-dateCreated');
  res.render('index', {
    photos: photos,
  });
};

exports.getPhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });
};

exports.createPhoto = (req, res) => {
  const uploadFile = 'public/uploads';

  if (!fs.existsSync(uploadFile)) {
    fs.mkdirSync(uploadFile);
  }

  uploadImage = req.files.image;
  pathImage = __dirname + '/../public/uploads/' + uploadImage.name;

  uploadImage.mv(pathImage, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadImage.name,
    });
  });

  res.redirect('/');
};

exports.updatePhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  photo.title = req.body.title;
  photo.description = req.body.description;
  photo.save();

  res.redirect(`/photos/${req.params.id}`);
};

exports.deletePhoto = async (req, res) => {
  const photo = await Photo.findByIdAndRemove(req.params.id);

  const pathImage = __dirname + '/../public' + photo.image;

  fs.unlinkSync(pathImage);

  res.redirect('/');
};