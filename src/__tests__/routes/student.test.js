const supertest = require('supertest');
const app = require('../../../src/app')
const { connectToDB, disconnectDB} = require('../../utils/db')
const Student = require('../../models/students')
const request = supertest(app);

describe('/students', () => {
  //hooks
  beforeAll(() => {
    connectToDB();
  })
  afterAll(async () => {
    await disconnectDB();
  })
  beforeEach(async () => {
    await Student.deleteMany({});
  })
  afterEach(async () => {
    await Student.deleteMany({});
  })
  describe('POST', () => {
    const validStudent = {
      firstName: 'mason',
      lastName: 'xx',
      email: 'jjj@gamil.com'
    }
    const createStudent = (body) => {
      return request.post('/api/students').send(body);
    }

    it('should return 201 if request is valid', async () => {
      const res = await createStudent(validStudent);
      expect(res.statusCode).toBe(201);
      //dump testing database after finished
      // await Student.deleteMany({});
    })

    it('should save student to database if request is valid', async () => {
      await createStudent(validStudent);
      const student = await Student.findOne({ email: validStudent.email });
      expect(student.firstName).toBe(validStudent.firstName);
      expect(student.lastName).toBe(validStudent.lastName);
    })

    it('should return 400 if email is missing', async () => {
      const student = { firstName: 'mason', lastName: 'xx' };
      const res = await createStudent(student);
      expect(res.statusCode).toBe(400);
    })
    it.each`
      field | value
      ${'firstName'} | ${undefined}
      ${'lastName'} | ${undefined}
      ${'email'} | ${undefined}
      ${'firstName'}| ${'a'}
      ${'email'} | ${'@'}
      ${'email'} | ${'a@'}
      ${'email'} | ${'a@b'}
      ${'email'} | ${'a@b.c'}
    `('should return 400 when $field is $value', async({field, value})=>{
      const student = {...validStudent};
      student[field]=value;
      const res = await createStudent(student);
      expect(res.statusCode).toBe(400);
    })
  })
  describe('GET', ()=>{
    const validStudent = {
      id: '61179836af7ec2297c29d50e'
    }
    const getStudent = (params)=>{
      return request.get('/api/students/:id').send(params)
    }
  })


});



// test('1+1==2', () => {
//   expect(1 + 1).toBe(2);
// })

