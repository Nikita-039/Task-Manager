This Task Manager App is a full-stack web application designed to help users manage their tasks efficiently. 
It allows users to add, update, and mark tasks as completed, providing a streamlined dashboard for task tracking. 
The application features user authentication, task categorization, and a responsive UI for seamless accessibility.
The frontend is built using React.js with Bootstrap for styling, while the backend is powered by Node.js, Express.js, and MongoDB for data storage. 
Axios is used for API calls, and React Router handles navigation. The app also includes authentication using JWT stored in localStorage for session management. 
The project is designed to be deployed on Vercel for the frontend and Render for the backend, ensuring scalability and ease of hosting.
To run this Task Manager App locally, begin by cloning the repository and navigating into both the frontend and backend directories. For the backend, install dependencies using npm install, then create a .env file to define your environment variables such as MONGO_URI and PORT. Start the backend server with npm start. For the frontend, also run npm install to install the required packages, then start the development server with npm run dev. Ensure that the backend server is running and accessible from the frontend (you may need to update the API base URL accordingly). Once both servers are running, you can access the app via http://localhost:5173 and begin managing tasks through the UI.






