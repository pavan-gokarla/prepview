import { User } from "./schemas";
import { connectDB } from "./mongoDbConnection";

const testAddUser = async () => {
    await connectDB(); // Ensure the database is connected

    const newUser = new User({
        _id: "customUserId123", // Custom _id
        name: "John Doe",
        email: "john.doe@example.com",
        password: "securepassword",
        credits: 20,
    });

    try {
        const savedUser = await newUser.save(); // Save the user to the database
        console.log("New user added:", savedUser);
    } catch (error) {
        console.error("Error adding user:", error);
    }
};

testAddUser();

