require('dotenv').config();
const cors = require('cors')
const express = require('express');
const databaseMiddleware = require('./middleware/database-middleware');
const connectToDB = require('./db/database')
const userRouter = require('./routes/userRouter')
const reviewRouter = require('./routes/reviewRouter')
const authMiddleware = require('./middleware/authentication-middleware')
const swaggerUi = require('swagger-ui-express');
const yaml = require('yaml')
const OpenApiValidator = require('express-openapi-validator');



const app = express()


app.use(express.json())
app.use(cors());

app.use(databaseMiddleware);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(yaml.parse(require('fs').readFileSync('./doc/openapi.yaml', 'utf8'))))
app.use(OpenApiValidator.middleware({ 
  apiSpec: './doc/openapi.yaml'
}))

async function connectDatabase(){
  try {
    await connectToDB();
    console.log("connect db");
  } catch (error) {
    console.log("error connect db", error);
  }
};
connectDatabase();

app.get('/', (req, res)=> { 
  res.send('This is week 11!')
})

app.use('/user', userRouter)
app.use('/review', authMiddleware, reviewRouter)


app.use((err, req, res, next) => {
  console.log(err, `<=================== error ==================`);
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors
  })
})

app.listen(2020, () => {
  console.log('Server is running on port 2020')
})
