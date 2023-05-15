const Photo = require('../models/Photo');
const fs = require('fs');

exports.getAllPhotos = async (req, res) => {
  const page = req.query.page || 1;
  const photosPerPage = 1;
  const totalPhotos = await Photo.find({}).countDocuments();
  const photos = await Photo.find({})
  .sort('-dateCreated')
  .skip((page-1) * photosPerPage)
  .limit(photosPerPage)

  res.render('index', {
    photos: photos,
    current: page,
    pages: Math.ceil(totalPhotos / photosPerPage)
  })
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