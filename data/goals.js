
const mongoCollections = require("../config/mongoCollections");
const goals = mongoCollections.goals;
const uuid = require("node-uuid");

async function addGoal(type, amount, month, username) {

  return goals().then(goalsCollection => {
    let newGoal = {
        _id: uuid.v4(),
        type: type.toLowerCase(),
        amount: amount,
        month: month,
        username: username
    };

    return goalsCollection
      .insertOne(newGoal)
      .then(newInsertInformation => {
        return newInsertInformation.insertedId;
      })
      .then(newId => {
        return true;
        //return this.getUserById(newId);
      });
  });
}

async function getAllGoals(username) {
  const goalCollection = await goals();
  return await goalCollection.find({username: username}).toArray();
}

 async function removeGoal(goal) {

  const goalCollection = await goals();

  const updatedInfo = await goalCollection.updateOne({ sessionId: sessionId }, { $set: {sessionId: null }});

  if (updatedInfo.modifiedCount === 0) {
    throw "could not update goal successfully";
  }

  return await this.getGoalInfoByUsername(username);
}


let exportedMethods = { addGoal, getAllGoals, removeGoal }
module.exports = exportedMethods;