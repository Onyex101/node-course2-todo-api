const expect = require('expect');
const superTest = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

beforeEach((done) => {
    Todo.remove({}).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var test = 'todo test';
        request(app)
            .post('/todos')
            .send({test})
            .expect(200)
            .expect((res) => {
                console.log('result post', JSON.stringify(res, undefined, 2));
                expect(res.body.text).toBe(test);
            })
            .end((err, res) => {
                console.log('result 2', res);
                if (err) {
                    console.log(err);
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(test);
                    done();
                }).catch((e) => done(e));
            })
    })
})