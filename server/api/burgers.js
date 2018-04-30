const router = require('express').Router();
const axios = require('axios');
module.exports = router;

router.get('/', (req, res, next) => {
  axios.get('https://vast-brushlands-48771.herokuapp.com/api/burgers/')
  .then(response => res.json(response.data))
  .catch(next);
});

router.post('/', (req, res, next) => {
  axios.post('https://vast-brushlands-48771.herokuapp.com/api/burgers/', req.body)
  .then(response => res.json(response.data))
  .catch(next);
});

router.put('/:id', (req, res, next) => {
  axios.put(`https://vast-brushlands-48771.herokuapp.com/api/burgers/${req.params.id}/`, req.body)
  .then(response => res.json(response.data))
  .catch(next);
});

router.delete('/:id', (req, res, next) => {
  axios.delete(`https://vast-brushlands-48771.herokuapp.com/api/burgers/${req.params.id}/`)
  .then(() => res.sendStatus(204))
  .catch(next);
});
