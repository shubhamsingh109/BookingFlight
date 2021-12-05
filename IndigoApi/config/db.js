import mongoose from 'mongoose';
const databaseName = 'IndigoDb';
const uri = `mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PWD}@indigoapidb.iaqzo.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

export const connectDb = mongoose.connect(uri, options).then(() => {
    console.log('database connected');
}, err => {
    console.log('error connecting database', err);
});
