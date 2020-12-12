const auth = (request, response) => {
    const authHeader = request.get('authorization')
    if (!authHeader) {
      return response.status(401).send('You need to login!');
    };
    const token = authHeader.split(' ')[1];
    return token
  };
  
  module.exports = { auth };