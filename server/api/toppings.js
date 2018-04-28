const router = require('express').Router();
const axios = require('axios');
module.exports = router;

router.get('/', (req, res, next) => {
  axios.get('https://vast-brushlands-48771.herokuapp.com/api/toppings/')
  .then(response => res.json(response.data))
  .catch(next);
});
