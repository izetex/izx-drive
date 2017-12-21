
## Running tests

Development environment, defined in truffle.js, uses local server.
To test locally, you can use [TestRPC](https://github.com/pipermerriam/eth-testrpc) or
[Ganache](https://github.com/trufflesuite/ganache-cli):

```
npm install -g ganache-cli
ganache-cli
```
After server started, you can compile, run migrations and tests:

```
truffle compile
truffle migrate
truffle test
```

## License
Code released under the [MIT License](https://github.com/izetex/izx-drive/blob/master/LICENSE).
