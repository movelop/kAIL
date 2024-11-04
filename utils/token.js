import jwt from 'jsonwebtoken';
import axios from 'axios';
import { createError } from './error.js';

export const verifyToken = ( req, res, next ) =>  {
    const token = req.cookies.accessToken;

    if(!token) {
        return next( createError(401, 'You are not allowed to access this page'));
    };

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next (createError(403, 'Invalid Token'));
        req.user = user;
        next();
    });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if( req.user._id === req.params.id) {
            next()
        } else {
            return next( createError(403, 'You are not authorized to perfoem this action'));
        }
    })
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if( req.user.role === 'admin' || req.user.role === 'dir') {
            next ();
        } else {
            return next( createError(403, 'You are not authorized to perform this action'))
        }
    })
};

export const VerifyDir = ( req, res, next) => {
    verifyToken( req, res, () => {
        if( req.user.role === 'dir') {
            next();
        }else {
            "You are not authorized to perform this action."
        }
    })
};