const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkId = (req, res, next, val) => {
  console.log(`Tour id is ${val}`);
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid ID',
    });
  }
  next();
};
exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestAt: req.requestTime,
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};
exports.getTour = (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find((obj) => obj.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      tours: tour,
    },
  });
};
exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: `You can't create request without name or price`,
    });
  }
  next();
};
exports.createTour = (req, res) => {
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
exports.updateTour = (req, res) => {
  res.status(200).json({
    message: 'success',
  });
};
exports.deleteTour = (req, res) => {
  const id = Number(req.params.id);
  const filteredOut = tours.filter((el) => el.id !== id);

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
