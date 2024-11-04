import Customer from '../models/Customer.js';
import { generateId } from '../utils/helpers.js';
import { createError } from '../utils/error.js';

export const createCustomer = async (req, res, next) => {
    try {
        const existingCustomer = await Customer.findOne({
            $or: [{
                email: req.body.email
            }, {
                phone: req.body.phone
            }]
        });
        if(existingCustomer) return next( createError(400, 'Customer already exist'));
        let customerId = generateId(10);
        const newCustomer = Customer.create({
            ...req.body, accountId: customerId
        });
        await newCustomer.save();
        res.status(200).json({ message: 'Customer created successfully'})
    } catch (error) {
        next(error)
    }
};

export const updateCustomer = async (req, res, next) => {
    try {
        const updatedCustomer = await Customer.findByIdAndUpdate(
            req.params.id, { $set: req.body }, { new: true }
        );
        res.status(200).json(updatedCustomer);
    } catch (error) {
        next(error);
    }
}

export const deleteCustomer = async (req, res, next) => {
    try {
        await Customer.findByIdAndDelete(req.params.id);
        res.status(200).send('Customer has been deleted successfully')
    } catch (error) {
        next(error)
    }
};

export const getCustomer = async (req, res, next) => {
    try {
        const customer = await Customer.findById(req.params.id);
        res.status(200).json(customer);
    } catch (error) {
        next(error);
    }
}


export const getAllCustomers = async (req, res, next) => {
    try {
        const customers = await Customer.find().sort({
            createdAt: -1
        });
        res.status(200).json(customers);
    } catch (error) {   
        next(error);
    }
}