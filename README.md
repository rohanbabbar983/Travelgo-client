# TravelGo - Client

The **TravelGo Client** is the frontend of the TravelGo travel booking platform.  
It is built with **React** and **Tailwind CSS**, providing a modern, responsive, and intuitive UI for searching trips, browsing hotels, exploring tourist attractions, and interacting with a simple chatbot.

## Live Demo

Check out the live site: 

## Features

- **Search Functionality** – Search trips by city name.  
- **Hotel Listings** – View hotels with details like price, rating, image, and description.  
- **City Attractions** – Explore top tourist places with images and descriptions.  
- **Chatbot Assistant** – Simple rule-based chatbot for quick travel queries.  
- **Responsive Design** – Works seamlessly on mobile and desktop.
  
## Tech Stack

- **React.js** – Frontend framework  
- **Tailwind CSS** – Styling & responsive design  
- **Axios / Fetch API** – API calls to the backend  
- **React Router** – Navigation between pages

## Installation

1. Clone the repository
    ```bash
    git clone https://github.com/rohanbabbar983/Travelgo-client.git
    cd Travelgo-client
    ```

2. Install dependencies
    ```bash
    npm install
    ```

3. Create a `.env` file in the root directory and add the necessary environment variables:
    ```env
    VITE_BACKEND_URL=http://localhost:5000 || your_base_url_backend
    ```

4. Start the development server
    ```bash
    npm run dev
    ```

## Usage

Visit `http://localhost:5173` to see the application in action.

## Known Issues

- Limited chatbot logic (rule-based only).
- No real-time hotel availability (static data/demo API).

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

