import { Application } from "express";
// import { uploadContacts, getContacts, _getContacts, pinContact, getPinedContacts, unpinContact } from "./controller";
import * as express from 'express';
import * as cors from 'cors';
import { isAuthenticated } from '../../middlewares';

export function routesConfig(app: Application) {
	app.get('',
	);

	app.get('/:id',
	)

	app.patch('',
	)

	app.delete('',
	)
}