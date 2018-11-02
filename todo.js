var express = require('express');
var router = express.Router();

const f = require('util').format;

const user = encodeURIComponent('chain'); // 
const password = encodeURIComponent('chain555'); //
var dbName = "mobileprogramming" // 
var MongoClient = require('mongodb').MongoClient;
// moogose 
const dbUrl = f("mongodb://%s:%s@ds215563.mlab.com:15563/%s", user, password, dbName);

var ObjectID = require('mongodb').ObjectID;

router.get('/', function (req, res) {
	console.log(req.body)
    MongoClient.connect(dbUrl, function(err, client) {
		const db = client.db(dbName).collection('member').find({}).toArray(function (err, result) {
			client.close();
			if (err) res.send(err);
			res.status(200);
			res.send(result);
		});
	});
});
router.post('/getlogTime', function (req, res) {
	console.log(req.body)
    MongoClient.connect(dbUrl, function(err, client) {
		const db = client.db(dbName).collection('logTime').find(req.body).toArray(function (err, result) {
			client.close();
			if (err) res.send(err);
			res.status(200);
			res.send(result);
		});
	});
});
router.post('/setLogTime', function (req, res) {
	console.log(req.body)
	MongoClient.connect(dbUrl, function(err, client) {
		const db = client.db(dbName).collection('logTime').insertOne(req.body,function (err, result) {
			client.close();
			if (err) res.send(err);
			res.status(200);
			res.send("Insert Success!");
		});
	});
});
router.post('/getUser', function (req, res) {
	console.log(req.body)
    MongoClient.connect(dbUrl, function(err, client) {
		const db = client.db(dbName).collection('member').findOne(req.body,(function (err, result) {
			client.close();
			if (err) res.send(err);
			res.status(200);
			res.send(result);
		}));
	});
});

router.post('/', function (req, res) {
	console.log(req.body)
	MongoClient.connect(dbUrl, function(err, client) {
		const db = client.db(dbName).collection('member').insertOne(req.body,function (err, result) {
			client.close();
			if (err) res.send(err);
			res.status(200);
			res.send("Insert Success!");
		});
	});
})

router.delete('/', function (req, res) {
	MongoClient.connect(dbUrl, function(err, client) {
		const db = client.db(dbName).collection('member').deleteOne({ _id: ObjectID(req.body._id)}, function(err, result){
			client.close();
			if (err) res.send(err);
			res.status(200);
			res.send("remove Success");
			// assert.equal(2, result.insertedCount);
		});
	})
})

router.put('/', function (req, res) {
	MongoClient.connect(dbUrl, function(err, client) {
		id = req.body._id
		const { ['_id']: selected, ...putData } = req.body;
		const db = client.db(dbName).collection('member').update({ _id: ObjectID(id)}, putData, function (err, result) {
			client.close();
			if (err) res.send(err);
			res.status(200);
			res.send("update Success");
		})
	})
})

module.exports = router;