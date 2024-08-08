import mongoose from 'mongoose';
import Users from './Users';
import ReferPointsDetails from './ReferPointsDetails';

const pointsTransactionsDetailsSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
            required: true
        },
        refer_details_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ReferPointsDetails',
            required: true
        },
        type: {
            type: String,
            required: [true, 'Please provide valid type'],
            enum: ['credit', 'debit'],
            required: true
        },
        credited: {
            type: Boolean,
            required: true
        },
        debited: {
            type: Boolean,
            required: true
        },
        refer_points: {
            type: Number,
            default: 0,
            required: true
        },
        amount: {
            type: String,
            default: "0"
        },
        message: {
            type: String,
            default: ""
        },
        TXN_ID: {
            type: String,
            unique: true,
            required: true
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.models.PointsTransactionsDetails || mongoose.model('PointsTransactionsDetails', pointsTransactionsDetailsSchema);
