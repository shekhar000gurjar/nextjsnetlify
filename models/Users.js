import mongoose from 'mongoose';
import CompaniesDetails from './CompaniesDetails';

const usersSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: [true, 'Please provide first name'],
            maxlength: [60, 'First name cannot be more than 60 characters'],
        },
        last_name: {
            type: String,
            maxlength: [60, 'Last name cannot be more than 60 characters'],
        },
        email: {
            type: String,
            required: [true, 'Please provide email'],
            unique: true,
            match: [
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                'Please provide a valid email address',
            ],
        },
        password: {
            type: String,
            // required: [true, 'Please provide password'],
            minlength: [6, 'Password must be at least 6 characters long'],
        },
        phone_number: {
            type: String,
            validate: {
                validator: function (v) {
                    return v === "" || /^\d{10}$/.test(v); // Validates that phone number is exactly 10 digits or an empty string
                },
                message: props => `${props.value} is not a valid phone number! It should be exactly 10 digits.`,
            },
            default: '',
        },
        company_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CompaniesDetails',
            // required: true
        },
        singup_type: {
            type: String,
            defalut: ''
        },
        resetPasswordToken: {
            type: String,
            required: false
        },
        resetPasswordExpires: {
            type: Date,
            required: false
        },
        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Users || mongoose.model('Users', usersSchema);
