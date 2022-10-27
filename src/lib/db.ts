import 'dotenv/config';
import mongoose from 'mongoose';

/**
 * It connects to the MongoDB database using the MONGO_URL environment variable
 */
export const InitDB = async () => {
    if (!process.env.MONGO_URL) {
        throw new Error('Please add the MONGO_URL environment variable');
    }

    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    const database = mongoose.connection;

    database.on(
        'error',
        console.error.bind(console, '❌ mongodb connection error')
    );
    database.once('open', () =>
        console.log('✅ mongodb connected successfully')
    );

    mongoose.Promise = Promise;
};
