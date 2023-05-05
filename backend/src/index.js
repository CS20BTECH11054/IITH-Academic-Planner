
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient, ServerApiVersion ,ObjectId} = require('mongodb');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
require('dotenv').config()


const secret = process.env.secret
const app = express();
const port = 5000;


app.use(cors());
app.use(bodyParser.json());
app.use('/api/user', verifyToken);
app.use('/api/admin',verifyToken)


const mongoURI = process.env.mongoURI; 
console.log(mongoURI)
const client = new MongoClient(mongoURI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});




async function getAllSemCourses(userId) {
  try {
    // Connect to the MongoDB server
    await client.connect();
    const userCollection = await client.db("Academic-Planner").collection("users");

    // Find the user's record
    const user = await userCollection.findOne({ _id: new ObjectId(userId) });
    // console.log(user.semCourses)
    if (user) {
      console.log(user.semCourses)
     return user.semCourses
     
  
    } else {
      console.log(`User with _id ${userId} not found`);
    }

  } catch (err) {
    console.log(err);
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}

// getAllSemCourses("644e865d528d80a7529f09c3")



app.get('/api/user/getAllCourses', async (req, res) => {
  try {
    const reqBody = req.body;
    // console.log("reqBody",reqBody)
    const tasks = await getAllSemCourses(req.userId)
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching Courses');
  }
});

async function getPrevSemCourses(userId) {
  try {
    // Connect to the MongoDB server
    await client.connect();
    const userCollection = await client.db("Academic-Planner").collection("users");

    // Find the user's record
    const user = await userCollection.findOne({ _id: new ObjectId(userId) });
    // console.log(user.semCourses)
    if (user) {
      console.log(user.coursesDone)
     return user.coursesDone
     
  
    } else {
      console.log(`User with _id ${userId} not found`);
    }

  } catch (err) {
    console.log(err);
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}


console.log("----------")

// userAddCourse("644e865d528d80a7529f09c3","CS4445",-1);
console.log("---------------------")



// userAddCourse("Vatsav1","cs5121",9);


app.get('/api/user/courses/search', async (req, res) => {
  try {
    const { name, code, credits, slot,dept,sem } = req.query;
    const query = {};

    if (name) {
      query.name = { $regex: `^${name}`, $options: 'i' };
    }
    if (code) {
      query.code = code;
    }
    if (credits) {
      query.credits = credits;
    }
    if (slot) {
      query.slot = slot;
    }
    if(dept) {
     query.dept = dept;
    }
    if(sem) {
      query.sem = sem;
    }
    await client.connect()
    const courseCollection = await client.db("Academic-Planner").collection("Courses");
    const courses = await courseCollection.find(query).toArray();

    res.json(courses);
    console.log("response sent");
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching courses from database');
  }finally{
    await client.close()
  }
});


app.get('/api/user/courseRoad', async (req, res) => {
  try {
    const { dept,sem } = req.query;
    // const query = {dept:"CSE",sem:1};
    const query = {}

   
    if (dept) {
      query.dept = dept;
    }
    if (sem) {
      query.sem = parseInt(sem);
    }

    console.log(query)
    
    await client.connect()
    const courseCollection = await client.db("Academic-Planner").collection("Courses");
    const courses = await courseCollection.find(query).toArray();

    res.json(courses);
    console.log("Course road response sent");
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching courses from database');
  }finally{
    await client.close()
  }
});


//courseRoad
async function addCourseRoad(userId, courseRoad) {
  try {
    await client.connect();
    const userCollection = await client.db("Academic-Planner").collection("users");

    const user = await userCollection.findOne({ _id: new ObjectId(userId) });

    if (user) {
      if (user.courseRoad) {
        const updatedUser = await userCollection.updateOne(
          { _id: new ObjectId(user._id) }, 
          { $set: { courseRoad: courseRoad } }
        );
        console.log(`Course road for user ${userId} updated`);
      } else {
        const newCourseRoad = { courseRoad: courseRoad };
        const updatedUser = await userCollection.updateOne(
          { _id: new ObjectId(user._id) }, 
          { $set: newCourseRoad }
        );
        console.log(`Course road for user ${userId} created`);
      }
    } else {
      console.log(`User with _id ${userId} not found`);
    }

  } catch (err) {
    console.log(err);
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}

addCourseRoad("644e865d528d80a7529f09c3",{1:["cs4443","cs5120"]})





//task 


async function addTask(userId, task, date) {
  try {
    // Connect to the MongoDB server
    await client.connect();
    const userCollection = await client.db("Academic-Planner").collection("users");

    // Find the user's record
    const user = await userCollection.findOne({ _id: new ObjectId(userId) });

    if (user) {
      // If the user already has tasks, update the tasks object
      if (!user.tasks) {
        // Create a new tasks object if it doesn't exist
        user.tasks = {};
      }

      // Check if the date key already exists in the tasks object
      if (!user.tasks[date]) {
        // If the date key doesn't exist, create a new array
        user.tasks[date] = [];
      }

      // Add the new task to the tasks array
      user.tasks[date].push(task);

      // Update the user's record in the database
      const updatedUser = await userCollection.updateOne(
        { _id: new ObjectId(user._id) }, // use user._id to match the document
        { $set: { tasks: user.tasks } }
      );

      console.log(`${updatedUser.modifiedCount} user record updated`);
    } else {
      console.log(`User with _id ${userId} not found`);
    }

    console.log("all tasks",user.tasks)

  } catch (err) {
    console.log(err);
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}

addTask("644e8af0528d80a7529f09c4","Complete swe1 work","03-05-23");

app.post('/api/user/addTask', async (req, res) => {
  try {
    const reqBody = req.body;
    console.log("reqBody",reqBody)
    await addTask(req.userId,reqBody.task,reqBody.date)
    console.log(`Added task ${reqBody.task} to the ${req.userId}`);
    res.send(reqBody);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding course to MongoDB');
  }
});




//get All tasks for a user
async function getAllTasks(userId) {
  try {
    // Connect to the MongoDB server
    await client.connect();
    const userCollection = await client.db("Academic-Planner").collection("users");

    // Find the user's record
    const user = await userCollection.findOne({ _id: new ObjectId(userId) });
    console.log(user.tasks)
    if (user) {

     return user.tasks
     
  
    } else {
      console.log(`User with _id ${userId} not found`);
    }

  } catch (err) {
    console.log(err);
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}



app.get('/api/user/getAllTasks', async (req, res) => {
  try {
    const reqBody = req.body;
    // console.log("reqBody",reqBody)
    const tasks = await getAllTasks(req.userId)
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching Courses');
  }
});



//change Sem

async function changeSem(userId, sem) {
  try {
    // Connect to the MongoDB server
    await client.connect();
    const userCollection = await client.db("Academic-Planner").collection("users");

    // Find the user's record
    const user = await userCollection.findOne({ _id: new ObjectId(userId) });

    if (user) {
      // Check if sem field exists, if not create it
     
        await userCollection.updateOne(
          { _id: new ObjectId(user._id) }, // use user._id to match the document
          { $set: { sem: sem} }
        );
     

      console.log(`Semester updated for user with _id ${userId}`);
    } else {
      console.log(`User with _id ${userId} not found`);
    }

  } catch (err) {
    console.log(err);
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
}


app.post('/api/user/changeSem', async (req, res) => {
  try {
    const reqBody = req.body;
    console.log("reqBody",reqBody)
    await changeSem(req.userId,reqBody.sem)
    console.log(`Updated  sem of  ${req.userId} to ${reqBody.sem} `);
    res.send(reqBody);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error adding course to MongoDB');
  }
});

// changeSem("644e865d528d80a7529f09c3",3)




async function googleLogin(credential,clientID) {

  const googleClient = new OAuth2Client(clientID);
  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: clientID,
    });
    const { name, email, picture } = ticket.getPayload();
    console.log(name)


    await client.connect()
    const userCollection = await client.db("Academic-Planner").collection("users");

   
    const user = await userCollection.findOne({username: name });
    console.log(user)
    let userId;
    if (user) {
     
      userId = new ObjectId(user._id);
      console.log(`${userId} already exists`);

    } else {
      // If the user does not exist create a new document for user
      const newUser = await userCollection.insertOne({
        username:name,
        sem:1
      });
    userId = newUser.insertedId;
      console.log(`New user record created: ${newUser.insertedId}`);
    }
    const jwtToken = jwt.sign({ userId },secret);
    console.log("jwtToken",jwtToken)

    const decodedToken = jwt.verify(jwtToken, secret);
    console.log(decodedToken.userId);



    return jwtToken
  } catch (error) {
    console.error(error);
  }
   finally {
    await client.close()
   }

}


function verifyToken(req, res, next) {
  console.log("===================================vereifyTOKEn")
  const token = req.headers.authorization;

  console.log("verifyTOken",token)

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decodedToken = jwt.verify(token,secret);
    console.log(decodedToken);
    req.userId = decodedToken.userId;
    console.log(req.userId)
    next();
  } catch (error) {
    console.error('Error decoding token: ', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
}




// app.use('/api/user',verifyToken )


app.post('/api/google-login', async (req, res) => {
  const { credential,clientID } = req.body;
  let token = await googleLogin(credential,clientID);
  console.log(token)
  res.send(token)
});












app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
