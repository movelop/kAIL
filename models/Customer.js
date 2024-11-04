import mongoose from "mongoose";
import { type } from "os";

const customerSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    middlename: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    nextOfKin: {
        fullname: String,
        address: String,
        phone: String,
    },
    accountId: {
        type: String,
        required: true,
    }
})