const middleware = {}

middleware['isLecturer'] = require('..\\middleware\\isLecturer.js')
middleware['isLecturer'] = middleware['isLecturer'].default || middleware['isLecturer']

middleware['isStudent'] = require('..\\middleware\\isStudent.js')
middleware['isStudent'] = middleware['isStudent'].default || middleware['isStudent']

export default middleware
