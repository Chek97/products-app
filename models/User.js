import { Schema, model, models } from 'mongoose';

new Schema({
    name: {
        type: String,
        required: [true, "El  nombre es requerido"],
    },
    email: {
        type: String,
        required: true
    }
})