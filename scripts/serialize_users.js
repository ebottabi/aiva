// dependencies
// Module to serialize users
var _ = require('lomath')
var co = require('co')
var Promise = require('bluebird')


// The function to serialize users from the brain to the KB. Invoked by user call or new user entering.
// This only updates fields and does not delete any, so that user node is save for other purposes.
function serialize_users(robot) {
  // get the list of users parsed by adapter
  var parsedUsers = robot.brain.data.users
  /* istanbul ignore next */
  if (_.isEmpty(parsedUsers)) {
    return Promise.resolve(0)
  }
  // legalize it for KB use
  var Users = _.map(parsedUsers, function(obj) {
    var lobj = cons.legalize(obj, 'id')
    var labels = ['user', `${robot.adapterName}_user`]
    return [
      [lobj, labels]
    ]
  });
  // add then return the number of members serialized
  return co(function*() {
    return yield KB.addNode(Users).then(_.size).catch(global.log.error)
  })
}


// export for bot
module.exports = function(robot) {
  // serialize on event
  robot.on('serialize_users', function() {
    // !skip for now, need to generalize and split cases like customMsg
    serialize_users(robot).then(function(size) {
      global.log.info("setting global.users from scripts/serialize_users.js")
    })
  })

  // manually call serialize_users
  robot.respond(/serialize users/i, function(res) {
    res.send('Serialize users')
    robot.emit('serialize_users')
  })

  // on a new user entering default room, re-serialize users
  robot.enter(function(res) {
    res.send(`Welcome ${res.envelope.user.name}, I am ${robot.name}. See what I can do by typing \`${robot.name} help\`. Meanwhile let me add you to my KB...`)
    robot.emit('serialize_users')
  })

}
