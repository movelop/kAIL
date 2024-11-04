import mongoose from "mongoose";
import { type } from "os";

const LoanSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    term: {
        type: Number,
        required: true,
    },
    customer: {
        type: Schema.Type.ObjectId,
        ref: 'Customer',
        required: true,
    },
    package: {
        type: String,
        enum: [ 'loan', 'esusu'],
        default: 'esusu',
    },
    repayment: {
        type: Number,
        required: true,
    },
    registeredBy: {
        type: String,
        required: true,
    },
    repaymentPlan:{
        type: String,
        enum: [ 'daily', 'weekly', 'monthly' ],
        default: 'daily',
    },
    scheduledRepayment: [
        {
            date: {
                type: String,
                required: true,
            },
            amount: {
                type: Number,
                required: true,
            },
            status: {
                type: String,
                enum: [ "pending", 'paid', 'partially paid' ],
                default: 'pending'
            },
        },
    ],
    sureties: [
        {
            fullname: {
                type: String,
                required: true,
            },
            Address: {
                type: String,
                required: true,
            },
            phone: {
                type: String,
                required: true,
            },
            bvn: {
                type: Number,
                required: true,
            },
            nin: {
                type: Number,
                required: true,
            },
        },
    ],
    status: {
        type: String,
        enum: [ 'reviewing', 'Pending', 'paid', 'rejected', 'outstanding'],
        default: 'reviewing',
    }
});

export default mongoose.model('Loan', LoanSchema);