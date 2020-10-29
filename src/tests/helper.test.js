import ServerMock from 'mock-http-server';
import * as helper from '../helper/helper';

describe('test', () => {
    const server = new ServerMock({host: "localhost", port: 4000});

    beforeEach((done) => {
        server.start(done);
    });
    
    afterEach((done) => {
        server.stop(done);
    });

    it('should do something', (done) => {
        server.on({
            method: 'GET',
            path: '/',
            reply: {
                status: 200,
                headers: {"content-type": "application.json"},
                body: JSON.stringify({"message": "Welcome to Mynode application."})
            }
        });
    });
});