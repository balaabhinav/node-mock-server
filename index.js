import express from 'express';
import http from 'http';
import cors from 'cors';
import * as properties from './properties';

const app = express();

app.use(cors());

app.get('/properties', (req, res) => {
	res.status(200).json(properties.default);
});

app.post('/properties', (req, res) => {
	res.status(200).json({});
})

app.put('/properties', (req, res) => {
	res.status(200).json({});
})

app.delete('/properties', (req, res) => {
	res.status(200).json({});
})



http.createServer(app).listen('3333', () => {
	console.log("Server running on Port 3333");
})