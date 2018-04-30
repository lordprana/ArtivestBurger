const router = require('express').Router();
const axios = require('axios');
const {endPointUrl} = require('../config');
module.exports = router;

router.get('/', (req, res, next) => {
  axios.get(`${endPointUrl}/api/toppings/`)
  .then(response => res.json(response.data))
  .catch(next);
});
