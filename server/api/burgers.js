const router = require('express').Router();
const axios = require('axios');
const {endPointUrl} = require('../config');
module.exports = router;

router.get('/', (req, res, next) => {
  axios.get(`${endPointUrl}/api/burgers/`)
  .then(response => res.json(response.data))
  .catch(next);
});

router.post('/', (req, res, next) => {
  axios.post(`${endPointUrl}/api/burgers/`, req.body)
  .then(response => res.json(response.data))
  .catch(next);
});

router.put('/:id', (req, res, next) => {
  axios.put(`${endPointUrl}/api/burgers/${req.params.id}/`, req.body)
  .then(response => res.json(response.data))
  .catch(next);
});

router.delete('/:id', (req, res, next) => {
  axios.delete(`${endPointUrl}/api/burgers/${req.params.id}/`)
  .then(() => res.sendStatus(204))
  .catch(next);
});
