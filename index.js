import express from 'express';
import http from 'http';
import cors from 'cors';
import * as properties from './properties';
import fs from 'fs';
import bodyParser from 'body-parser';

const app = express();

app.use(cors());
app.use(bodyParser.json());

const getProperties = () => {
	return new Promise((resolve, reject) => {
		fs.readFile('./properties.json', 'utf-8', (err, data) => {
			if(!err)
				return resolve(JSON.parse(data))

			return reject(err)
		})
	})
}

const insert = (prop) => {
	return new Promise((resolve, reject) => {
		fs.readFile('./properties.json', 'utf-8', (err, data) => {
			if(!err){
				data = JSON.parse(data);
				data.push(prop);
				fs.writeFile('./properties.json', JSON.stringify(data), (err, data) => {
					if(!err){
						return resolve();
					}
					else{
						return reject(err);
					}
				})
			}
			else{
				return reject(err)
			}
		})
	})
}

const update = (prop) => {
	return new Promise((resolve, reject) => {
		getProperties().then(data => {
			data = data.filter(p => p.id!==prop.id)
			data.push(prop);
			fs.writeFile('./properties.json', JSON.stringify(data), (err,data) => {
				if(!err){
					return resolve()
				}

				return reject()
			})
		})
	})
}

const remove = prop => {
	return new Promise((resolve, reject) => {
		getProperties().then(data => {
			data = data.filter(p => p.id!==prop.id);
			fs.writeFile('./properties.json', JSON.stringify(data), (err,data) => {
				if(!err){
					return resolve()
				}

				return reject()
			})
		})
	})
}

app.get('/properties', (req, res) => {
	getProperties().then(data => res.status(200).json(data)).catch( err => res.status(500).json(err))
});

app.post('/properties', (req, res) => {
	insert(req.body).then(data => res.status(200).json({message : "Success"})).catch( err => res.status(500).json(err));
})

app.put('/properties', (req, res) => {
	update(req.body).then(data => res.status(200).json({message : "Success"})).catch( err => res.status(500).json(err));
})

app.delete('/properties', (req, res) => {
	remove(req.body).then( data => res.status(200).json({ message : "success" })).catch(err => res.status(500).json(err));
})



http.createServer(app).listen('3333', () => {
	console.log("Server running on Port 3333");
})