import mongoose from 'mongoose';
import Users from './Users';

const referPointsDetailsSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
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
        message: {
            type: String,
            default: ""
        },
        total_refer_points: {
            type: Number,
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.models.ReferPointsDetails || mongoose.model('ReferPointsDetails', referPointsDetailsSchema);
