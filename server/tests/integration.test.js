const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');
const values = require('../../measures.json');
const server = require('../app');

chai.use(chaiHttp);

const mockRigthWall = {
  height: 300, width: 500, doors: 1, window: 1,
};
const wrongWallHeigth = {
  height: 100, width: 500, doors: 1, window: 1,
};

const wrongWallArea = {
  height: 500, width: 500, doors: 0, window: 0,
};

const apiUrl = '/inkNeeded';

const wrongEntries = {};

const { expect } = chai;
describe('testa a chamada da api ', async () => {
  const DbServer = new MongoMemoryServer();
  before(async () => {
    const url = await DbServer.getUri();
    const connectionMock = await MongoClient.connect(url,
      { useNewUrlParser: true, useUnifiedTopology: true });
    await connectionMock.db('DgRepublic').collection('Measures').insertMany([...values]);
    sinon.stub(MongoClient, 'connect').resolves(connectionMock);
  });
  after(async () => {
    MongoClient.connect.restore();
    await DbServer.stop();
  });
  it('testa a chamada com valores corretos', async () => {
    const response = await chai.request(server).post(apiUrl).send({
      walls: [
        mockRigthWall, mockRigthWall, mockRigthWall, mockRigthWall,
      ],
    });
    const expected = {
      18: 4, 0.5: 0, 2.5: 1, 3.6: 4,
    };
    expect(response.status).to.equal(200);
    expect(response.body).to.be.a('object');
    expect(response.body).to.include(expected);
  });
  it('testa a chamada com valores errados na porta', async () => {
    const response = await chai.request(server).post(apiUrl).send({
      walls: [wrongWallHeigth, wrongWallHeigth, wrongWallHeigth, wrongWallHeigth],
    });
    expect(response.status).to.equal(401);
  });
  it('testa a chamada com valores errados de area', async () => {
    const response = await chai.request(server).post(apiUrl).send({
      walls: [wrongWallArea, wrongWallArea, wrongWallArea, wrongWallArea],
    });
    expect(response.status).to.equal(401);
  });
  it('testa a chamada com body invalido', async () => {
    const response = await chai.request(server).post(apiUrl).send({
      ...wrongEntries,
    });
    expect(response.status).to.equal(401);
  });
});
