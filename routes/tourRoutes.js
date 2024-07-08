const fs = require('fs');

const express = require('express');

// Read tours from file

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// Route handlers
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestAt: req.requestTime,
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};
const getTour = (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find((obj) => obj.id === id);

  //   if (id > tours.length) {
  if (!tour) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tours: tour,
    },
  });
};
const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;

  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tours: newTour,
        },
      });
    }
  );
};
const updateTour = (req, res) => {
  const id = Number(req.params.id);

  if (id > tours.length) {
    return res.status(404).json({
      message: 'There' + 's' + 'no such id',
    });
  }

  res.status(200).json({
    message: 'success',
  });
};
const deleteTour = (req, res) => {
  const id = Number(req.params.id);
  const filteredOut = tours.filter((el) => el.id !== id);

  if (id > tours.length) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  }

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(filteredOut),
    (err) => {
      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );
};

// Routes
const router = express.Router();

router.route('/').get(getAllTours).post(createTour);

router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
