import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: [false, 'Please provide first name'],
            maxlength: [60, 'First name cannot be more than 60 characters'],
        },
        last_name: {
            type: String,
            required: [false, 'Please provide last name'],
            maxlength: [60, 'Last name cannot be more than 60 characters'],
        },
        email: {
            type: String,
            required: [false, 'Please provide email'],
            unique: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Please provide a valid email address',
            ],
        },
        emailVerified: {
            type: Boolean,
            default: false
        },
        password: {
            type: String,
            required: [false, 'Please provide password'],
            minlength: [8, 'Password must be at least 8 characters long'],
        },
        type: {
            type: String,
            required: [true, 'Please provide signup type'],
            enum: ['admin'],
            default: 'normal'
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Admin || mongoose.model('Admin', adminSchema);
