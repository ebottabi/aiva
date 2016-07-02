# Roadmap and Changelog


## Roadmap

- lower the complexity of neo4jkb, make lightweight and easier to use
- user serialization and identity linking for omnipresence
- customMessage and customFormat for each adapter (very soon)
- better help menu format for UI
- 3 layers of KB with fallback mechanism - local then conceptnet then google
- Attach KB source to answers
- RNN train intent args parsing
- KB canonicalization for node and edge keys
- KB local memory with auto structure and streamlined interface
- KB self inquiry and learning mechanism
- functional hash reinsert function with partial args for inquire if incomplete
- store cron in KB for restoration



## Changelog

`Jan~March 2016`

- save logs locally in `logs/`.
- start brain `neo4j` server on spawn, stop on death.
- expandable bash script `bin/install` as auto global dependency setup for both MacOSX and Linux.
- add `mocha` using `chai`, `chai-as-promised`, `sinon` libraries for tests; coverage by `istanbul`.
- using `hubot-test-helper` for unit tests. Tests should be written in `coffeescript` for brevity.
- all devs and tests shall be done locally via the `shell` adapter, using `npm run shell`. This sets the `.env` and `bin/.keys-<default_bot>` local env vars, starts the `neo4j` brain server, then launches `bin/hubot`. i.e. It should work the same as `npm start` except for `forever` and `Slack-adapter`. See [Setup](#setup).
- `npm` script runs all. See [Run](#run).
- modularize graph KB externally to [kengz/neo4jKB](https://github.com/kengz/neo4jKB)
- add Travis CI (private)
- `scripts/0_init.js` is the first loaded script (lexicographically)l used to setup and extend hubot. It emits `'ready'` when the bot is done setting up, and before all other scripts start loading. One can make good use of event emitters for global, cross-script coordination.
- add user serializer for `defaultRoom` (in `env`), 'general' to reserialize on new user joining.
- support `NODE_ENV=development` for dev and tests: `shell` sets from `npm run shell`; Mocha sets from `test/common.js`.
- add `test/0_init_test.js` to do global test setup.
- basic infrastructure tested: initialization, event emission and handling, messaging
- unify all env vars safely to under `.env` and `bin/.keys-<bot-name>`, with auto customization for Shell, Mocha, Travis and production.
- dev must ensure that `scripts/0_init.js` is called first, thus `lib/` scripts cannot be imported at `0_init.js`.
- for KB creation pattern making use of graph relation, refer to `scripts/todo.js`
- add `lib/user.js` for user-searching. `scripts/serialize_users.js` will set `global.users = robot.brain.data.users` for global access of users.
- `bin/install` now installs `neo4j-shell-tools` for db migration. Use `export-graphml -o backup.graphml -t -r` and `import-graphml -i backup.graphml -t` from within `neo4j-shell`. Files will be saved to `${NEO4J_HOME}`.
- add `Socket.io` plugging into `robot.server` for polyglot communication. Connect to it by e.g. `var socket = require('socket.io-client')('http://localhost:8080')`
- add `python3` automated setup and packaging processes.
- multiple language (polyglot) process control: add `socket.io` clients for `nodejs, python3, ruby` in `lib`, with proper import/file examples and structures.
- in `mocha` tests, there's a `global.room` as an entire emulated hubot for use.
- add `bin/vagrant_travis` script to emulate a Travis CI VM for CI debugging.
- standard: `<comment-symbol> !` to note future implementation or fixes
- add `global.io.{reply, send, say}` for hubot replies from io. Use as `io.send(res)`; see `scripts/translate.js` for example.
- unify clients: one for each language.
- Different port to simultaneous use of production and dev/testing. Port 8080 for production, port 9090 for development. Set TEST_PORT in `.env`
- add `lib/js/nlp.js` to export basic NLP tasks based on Princeton WordNet, NodeNatural, wordpos. With basic examples
- make it easy to import .env vars with the index.js exported method
- add IBM Watson ready to use, includes alchemyAPI. (tokens in .keys-<bot>)
- add indico.io ready to use. (tokens in .keys-<bot>)
- add tensorflow and skflow in `bin/install`
- add DNN example: pretrained, saved, loaded example in `py/ai` with `skflow`
- unit test now waits for all clients to join socketio server before starting tests
- travis and unit tests shall cover only systems, and not AI, models etc.
- promisify all ai modules for chaining
- add google kg search with interface
- restore py `Textblob`
- `io_start` enables modularity on the complete polyglot deve environment with socket.io. Also returns promise for chaining
- add google knowledge graph search
- `client.<lang>` flexibly invokes function with dotpath, try with passing `msg` or retry with `msg.input`, then on returned result checks and compiles reply into a JSON with `correctJSON(reply, msg)`
- replace textblob with spaCy - MIT, very advanced and performant. Nest under `py.ai.nlp`. Add translate too.
- finish `gen_nlp.js` as the general nlp to use for parsing all user inputs, for all purposes. parses core NLP properties, and time.
- add NER_POS tag and tree for `gen_nlp` from python nlp
- finish google API interface
- remove default room and serialize automessage for omnipresence
- implement multi-adapter omnipresence deployment
- use npm run server to replace node lib/io_start.js
- finish multiadapters with ngrok

`April-May 2016`

- experiment with deepdream in docker
- work with other authors on hubot-adapters: fb, telegram
- improve logging using `log` module
- properly use 2 sets of ports for all in production/development. All ports listed in `index.js`
- Dockerize aiva, is now the default distribution method
- Docker and non-Docker dev is identical - no fragmentation
- rewrite npm commands and delegate to bash scripts
- use supervisord, nginx for Docker AIVA
- stable docker image release, with deepdream branch for AI and system demo

