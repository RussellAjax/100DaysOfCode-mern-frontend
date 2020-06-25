const db = require('../models');
const TodoDB = db.todos;
//Get list
exports.findAll = (req, res) => {
	//const title = req.query.title;
	//var condition = title ? {title: {$regex: newRegExp(title), $options: "i"} } : {};

	TodoDB.find(req.query.title)
	  .then(data => {
		  res.send(data);
	  })
	  .catch(err => {
		  res.status(500).send({message: "An error occurred."});
	  });
};

//Get list by id
exports.findOne = (req, res) => {
	const id = req.params.id;

	TodoDB.findById(id)
	  .then(data => {
		  if(!data){
			  res.status(400).send({message: `No such data exists with id: ${id}`});
		  }else{
			  res.send(data);
		  }
	  })
	  .catch(err => {
		  res.status(500).send({message: "An error occured."});
	  })
};

//Post a new list
exports.create = (req, res) => {
	//Validate request, field cannot be empty
	console.log(req.body.todo_description);
	console.log(req.body.todo_responsible);
	console.log(req.body.todo_priority);
	console.log(req.body.todo_completed);
	if(!req.body.todo_description || !req.body.todo_responsible || !req.body.todo_priority || req.body.todo_completed){
		return res.status(400).send({message: "Please fill up all fields."});
	}

	//Create entry for user input
	const todo = new TodoDB({
		todo_description: req.body.todo_description,
		todo_responsible: req.body.todo_responsible,
		todo_priority: req.body.todo_priority,
		todo_completed: req.body.todo_completed
	});

	//Save entry to database
	todo
	  .save(todo)
	  .then(data => { res.send(data) })
	  .catch(err => { res.status(500).send({message: "Cannot save form"}); });
};

//Update list by id
exports.updateById = (req, res) => {
	const id = req.params.id;

	TodoDB.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
	  .then(data => {
		  if(!data){
			  res.status(404).send({message: `No such data with id: ${id}`});
		  }else{
			  res.send({message: "Update successful!"});
		  }
	  })
	  .catch(err => {
		  res.status(500).send({message: "An error occured."});
	  })
};
