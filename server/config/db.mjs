import mongoose from 'mongoose';
import consola from 'consola';

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
    });
    consola.success({
      message: `MongoDb Connected: ${connect.connection.host}`,
      badge: true,
    });
  } catch (error) {
    consola.error({
      message: `Error: ${error.message}`,
      badge: true,
    });
    process.exit(1);
  }
};

export default connectDB;
